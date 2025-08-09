import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/db'

// GET /api/quizzes/[id]/export-csv - Export quiz results as CSV with charts
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quizId = parseInt(params.id)
    if (!quizId) {
      return NextResponse.json({ error: 'Invalid quiz ID' }, { status: 400 })
    }

    // Get session code from query parameters (optional)
    const { searchParams } = new URL(req.url)
    const sessionCode = searchParams.get('sessionCode')

    // Get quiz details
    const quiz = await prisma.quizzes.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            options: true
          }
        },
      },
    })

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
    }

    // Get sessions for this quiz (filter by session code if provided)
    const sessionsWhere = sessionCode 
      ? { quiz_id: quizId, code: sessionCode }
      : { quiz_id: quizId }

    const sessions = await prisma.quiz_sessions.findMany({
      where: sessionsWhere,
      include: {
        session_participants: {
          include: {
            users: true,
          },
        },
      },
    })

    if (sessionCode && sessions.length === 0) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Get all answers for this quiz
    const answers = await prisma.answers.findMany({
      where: {
        questions: {
          quiz_id: quizId,
        },
      },
      include: {
        session_participants: {
          include: {
            users: true,
            quiz_sessions: true,
          },
        },
        questions: {
          include: {
            options: true
          }
        },
      },
    })

    // Filter answers by session if session code is provided
    const filteredAnswers = sessionCode 
      ? answers.filter(a => {
          const sessionParticipant = sessions
            .flatMap(s => s.session_participants)
            .find(sp => sp.id === a.session_participant_id)
          return sessionParticipant !== undefined
        })
      : answers

    // Process participants data for charts
    const participants = sessions.flatMap(s => s.session_participants.map(p => ({
      id: p.id.toString(),
      name: p.users.username,
      score: p.score || 0,
      streak: p.streak || 0,
      accuracy: p.accuracy || 0,
      answered: p.answered || false,
      totalAnswers: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      averageTimeTaken: 0,
      totalTimeTaken: 0,
      totalPointsEarned: p.score || 0,
      fastestAnswer: 0,
      slowestAnswer: 0,
      questionsAnswered: 0,
      questionsCorrect: 0,
      questionsIncorrect: 0,
      averagePointsPerQuestion: 0,
      efficiency: p.accuracy || 0,
    })))

    // Calculate enhanced statistics for each participant
    participants.forEach(participant => {
      const participantAnswers = filteredAnswers.filter(a => 
        sessions.flatMap(s => s.session_participants).find(p => p.id.toString() === participant.id)?.id === a.session_participant_id
      )
      
      participant.totalAnswers = participantAnswers.length
      participant.correctAnswers = participantAnswers.filter(a => a.is_correct).length
      participant.incorrectAnswers = participantAnswers.filter(a => !a.is_correct).length
      participant.questionsAnswered = participantAnswers.length
      participant.questionsCorrect = participant.correctAnswers
      participant.questionsIncorrect = participant.incorrectAnswers
      
      if (participantAnswers.length > 0) {
        participant.totalTimeTaken = participantAnswers.reduce((sum, a) => sum + (a.time_taken || 0), 0)
        participant.averageTimeTaken = participant.totalTimeTaken / participantAnswers.length
        participant.fastestAnswer = Math.min(...participantAnswers.map(a => a.time_taken || 0))
        participant.slowestAnswer = Math.max(...participantAnswers.map(a => a.time_taken || 0))
        participant.averagePointsPerQuestion = participant.totalPointsEarned / participantAnswers.length
      }
    })

    // Generate comprehensive CSV content with charts
    const exportType = sessionCode ? 'Session-Specific' : 'All Sessions'
    let csvContent = `"${exportType} Quiz Results Export - Complete Analytics Report"\n\n`
    
    // Header Information
    csvContent += `"QUIZ INFORMATION"\n`
    csvContent += `"Quiz Title","${quiz.title}"\n`
    csvContent += `"Quiz Description","${quiz.description || 'No description'}"\n`
    csvContent += `"Total Questions","${quiz.questions.length}"\n`
    csvContent += `"Quiz Status","${quiz.status}"\n`
    if (sessionCode) {
      csvContent += `"Session Code","${sessionCode}"\n`
    }
    csvContent += `"Export Date","${new Date().toISOString().split('T')[0]}"\n`
    csvContent += `"Export Time","${new Date().toLocaleTimeString()}"\n\n`

    // Overall Statistics
    const totalParticipants = sessions.reduce((sum, s) => sum + s.session_participants.length, 0)
    const overallSuccessRate = filteredAnswers.length > 0 ? (filteredAnswers.filter(a => a.is_correct).length / filteredAnswers.length) * 100 : 0
    const avgTimePerAnswer = filteredAnswers.length > 0 ? filteredAnswers.reduce((sum, a) => sum + (a.time_taken || 0), 0) / filteredAnswers.length : 0
    
    csvContent += `"OVERALL STATISTICS"\n`
    csvContent += `"Metric","Value","Description"\n`
    csvContent += `"Total Sessions","${sessions.length}","Number of quiz sessions conducted"\n`
    csvContent += `"Total Participants","${totalParticipants}","Total number of participants across all sessions"\n`
    csvContent += `"Total Answers Submitted","${filteredAnswers.length}","Total number of answers submitted"\n`
    csvContent += `"Total Correct Answers","${filteredAnswers.filter(a => a.is_correct).length}","Total number of correct answers"\n`
    csvContent += `"Overall Success Rate","${overallSuccessRate.toFixed(2)}%","Percentage of correct answers across all participants"\n`
    csvContent += `"Average Time Per Answer","${avgTimePerAnswer.toFixed(2)} seconds","Average time taken per answer"\n\n`

    // Performance Distribution Chart Data
    csvContent += `"PERFORMANCE DISTRIBUTION CHART DATA"\n`
    csvContent += `"Performance Category","Count","Percentage","Color Code"\n`
    const excellent = participants.filter(p => p.efficiency >= 80).length
    const good = participants.filter(p => p.efficiency >= 60 && p.efficiency < 80).length
    const average = participants.filter(p => p.efficiency >= 40 && p.efficiency < 60).length
    const needsImprovement = participants.filter(p => p.efficiency < 40).length
    
    csvContent += `"Excellent (80%+)","${excellent}","${totalParticipants > 0 ? (excellent / totalParticipants * 100).toFixed(2) : 0}%","Green"\n`
    csvContent += `"Good (60-79%)","${good}","${totalParticipants > 0 ? (good / totalParticipants * 100).toFixed(2) : 0}%","Blue"\n`
    csvContent += `"Average (40-59%)","${average}","${totalParticipants > 0 ? (average / totalParticipants * 100).toFixed(2) : 0}%","Orange"\n`
    csvContent += `"Needs Improvement (<40%)","${needsImprovement}","${totalParticipants > 0 ? (needsImprovement / totalParticipants * 100).toFixed(2) : 0}%","Red"\n\n`

    // Score Distribution Chart Data
    csvContent += `"SCORE DISTRIBUTION CHART DATA"\n`
    csvContent += `"Participant Name","Score","Rank","Accuracy","Questions Answered","Performance Level"\n`
    participants
      .sort((a, b) => b.score - a.score)
      .forEach((participant, index) => {
        const performanceLevel = participant.efficiency >= 80 ? 'Excellent' : 
                                participant.efficiency >= 60 ? 'Good' : 
                                participant.efficiency >= 40 ? 'Average' : 'Needs Improvement'
        csvContent += `"${participant.name}","${participant.score}","${index + 1}","${participant.efficiency}%","${participant.questionsAnswered}","${performanceLevel}"\n`
      })
    csvContent += '\n'

    // Accuracy vs Time Scatter Plot Data
    csvContent += `"ACCURACY VS TIME SCATTER PLOT DATA"\n`
    csvContent += `"Participant Name","Accuracy (%)","Average Time (seconds)","Score","Performance Color","Questions Answered"\n`
    participants.forEach(participant => {
      const performanceColor = participant.efficiency >= 80 ? 'Green' : 
                              participant.efficiency >= 60 ? 'Blue' : 
                              participant.efficiency >= 40 ? 'Orange' : 'Red'
      csvContent += `"${participant.name}","${participant.efficiency}","${participant.averageTimeTaken.toFixed(2)}","${participant.score}","${performanceColor}","${participant.questionsAnswered}"\n`
    })
    csvContent += '\n'

    // Question Performance Heatmap Data
    csvContent += `"QUESTION PERFORMANCE HEATMAP DATA"\n`
    csvContent += `"Question Number","Question Text","Success Rate (%)","Average Time (seconds)","Difficulty Level","Color Code","Total Attempts","Correct Attempts"\n`
    quiz.questions.forEach((question, index) => {
      const questionAnswers = filteredAnswers.filter(a => a.question_id === question.id)
      const correctAttempts = questionAnswers.filter(a => a.is_correct).length
      const successRate = questionAnswers.length > 0 ? (correctAttempts / questionAnswers.length) * 100 : 0
      const avgTime = questionAnswers.length > 0 ? questionAnswers.reduce((sum, a) => sum + (a.time_taken || 0), 0) / questionAnswers.length : 0
      
      let difficulty = 'Unknown'
      let colorCode = 'Gray'
      if (successRate >= 80) {
        difficulty = 'Easy'
        colorCode = 'Green'
      } else if (successRate >= 60) {
        difficulty = 'Medium'
        colorCode = 'Orange'
      } else if (successRate >= 40) {
        difficulty = 'Hard'
        colorCode = 'Red'
      } else {
        difficulty = 'Very Hard'
        colorCode = 'Dark Red'
      }
      
      csvContent += `"${index + 1}","${question.question.replace(/"/g, '""')}","${successRate.toFixed(2)}","${avgTime.toFixed(2)}","${difficulty}","${colorCode}","${questionAnswers.length}","${correctAttempts}"\n`
    })
    csvContent += '\n'

    // Session Performance Data
    csvContent += `"SESSION PERFORMANCE DATA"\n`
    csvContent += `"Session Code","Status","Duration (minutes)","Total Participants","Average Score","Average Accuracy","Success Rate","Performance Level"\n`
    sessions.forEach(session => {
      const participants = session.session_participants
      const sessionAnswers = filteredAnswers.filter(a => 
        participants.some(p => p.id === a.session_participant_id)
      )
      
      const avgScore = participants.length > 0 
        ? participants.reduce((sum, p) => sum + (p.score || 0), 0) / participants.length 
        : 0
      
      const avgAccuracy = participants.length > 0
        ? participants.reduce((sum, p) => sum + (p.accuracy || 0), 0) / participants.length
        : 0

      const successRate = sessionAnswers.length > 0
        ? (sessionAnswers.filter(a => a.is_correct).length / sessionAnswers.length) * 100
        : 0

      const duration = session.started_at && session.ended_at
        ? Math.round((new Date(session.ended_at).getTime() - new Date(session.started_at).getTime()) / (1000 * 60))
        : 0

      const performanceLevel = successRate >= 80 ? 'Excellent' : 
                              successRate >= 60 ? 'Good' : 
                              successRate >= 40 ? 'Average' : 'Needs Improvement'
      
      csvContent += `"${session.code}","${session.status}","${duration}","${participants.length}","${avgScore.toFixed(2)}","${avgAccuracy.toFixed(2)}","${successRate.toFixed(2)}","${performanceLevel}"\n`
    })
    csvContent += '\n'

    // Detailed Participant Results (Enhanced Table)
    csvContent += `"DETAILED PARTICIPANT RESULTS TABLE"\n`
    csvContent += `"Rank","Session Code","Participant Name","Score","Streak","Accuracy","Questions Answered","Correct Answers","Incorrect Answers","Success Rate","Total Time (seconds)","Average Time Per Question","Fastest Answer","Slowest Answer","Points Per Minute","Completion Rate","Performance Level","Efficiency Score"\n`
    
    let rankCounter = 1
    sessions.forEach(session => {
      const participants = session.session_participants
      participants
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .forEach((participant) => {
        const participantAnswers = filteredAnswers.filter(a => a.session_participant_id === participant.id)
          const correctAnswers = participantAnswers.filter(a => a.is_correct)
          const incorrectAnswers = participantAnswers.filter(a => !a.is_correct)
        const totalTime = participantAnswers.reduce((sum, a) => sum + (a.time_taken || 0), 0)
          const avgTime = participantAnswers.length > 0 ? totalTime / participantAnswers.length : 0
          const fastestAnswer = participantAnswers.length > 0 ? Math.min(...participantAnswers.map(a => a.time_taken || 0)) : 0
          const slowestAnswer = participantAnswers.length > 0 ? Math.max(...participantAnswers.map(a => a.time_taken || 0)) : 0
          const successRate = participantAnswers.length > 0 ? (correctAnswers.length / participantAnswers.length) * 100 : 0
          const pointsPerMinute = totalTime > 0 ? ((participant.score || 0) / totalTime) * 60 : 0
          const completionRate = quiz.questions.length > 0 ? (participantAnswers.length / quiz.questions.length) * 100 : 0
          const performanceLevel = participant.accuracy >= 80 ? 'Excellent' : 
                                  participant.accuracy >= 60 ? 'Good' : 
                                  participant.accuracy >= 40 ? 'Average' : 'Needs Improvement'
          
          csvContent += `"${rankCounter}","${session.code}","${participant.users.username}","${participant.score || 0}","${participant.streak || 0}","${participant.accuracy || 0}%","${participantAnswers.length}","${correctAnswers.length}","${incorrectAnswers.length}","${successRate.toFixed(2)}%","${totalTime.toFixed(2)}","${avgTime.toFixed(2)}","${fastestAnswer.toFixed(2)}","${slowestAnswer.toFixed(2)}","${pointsPerMinute.toFixed(2)}","${completionRate.toFixed(2)}%","${performanceLevel}","${participant.accuracy || 0}"\n`
          rankCounter++
        })
    })
    csvContent += '\n'

    // Question-by-Question Analysis (Enhanced Table)
    csvContent += `"QUESTION-BY-QUESTION ANALYSIS TABLE"\n`
    csvContent += `"Question Number","Question Text","Question Type","Correct Answer","Options","Total Attempts","Correct Attempts","Incorrect Attempts","Success Rate (%)","Average Time (seconds)","Fastest Correct Answer","Slowest Correct Answer","Difficulty Level","Points Value","Time Limit","Performance Rating","Color Code"\n`
    
    quiz.questions.forEach((question, index) => {
      const questionAnswers = filteredAnswers.filter(a => a.question_id === question.id)
      const correctAttempts = questionAnswers.filter(a => a.is_correct).length
      const incorrectAttempts = questionAnswers.filter(a => !a.is_correct).length
      const successRate = questionAnswers.length > 0 ? (correctAttempts / questionAnswers.length) * 100 : 0
      const avgTime = questionAnswers.length > 0 ? questionAnswers.reduce((sum, a) => sum + (a.time_taken || 0), 0) / questionAnswers.length : 0
      const correctAnswerTimes = questionAnswers.filter(a => a.is_correct).map(a => a.time_taken || 0)
      const fastestCorrect = correctAnswerTimes.length > 0 ? Math.min(...correctAnswerTimes) : 0
      const slowestCorrect = correctAnswerTimes.length > 0 ? Math.max(...correctAnswerTimes) : 0
      
      let difficulty = 'Unknown'
      let performanceRating = 'Unknown'
      let colorCode = 'Gray'
      if (successRate >= 80) {
        difficulty = 'Easy'
        performanceRating = 'Excellent'
        colorCode = 'Green'
      } else if (successRate >= 60) {
        difficulty = 'Medium'
        performanceRating = 'Good'
        colorCode = 'Orange'
      } else if (successRate >= 40) {
        difficulty = 'Hard'
        performanceRating = 'Challenging'
        colorCode = 'Red'
      } else {
        difficulty = 'Very Hard'
        performanceRating = 'Very Difficult'
        colorCode = 'Dark Red'
      }

      const options = question.options?.map(opt => opt.option_text).join(' | ') || 'N/A'
      
      csvContent += `"${index + 1}","${question.question.replace(/"/g, '""')}","${question.type}","${question.correct_answer}","${options}","${questionAnswers.length}","${correctAttempts}","${incorrectAttempts}","${successRate.toFixed(2)}","${avgTime.toFixed(2)}","${fastestCorrect.toFixed(2)}","${slowestCorrect.toFixed(2)}","${difficulty}","${question.points || 100}","${question.time_limit || 30}","${performanceRating}","${colorCode}"\n`
    })

    csvContent += '\n'

    // Performance Analytics Summary
    csvContent += `"PERFORMANCE ANALYTICS SUMMARY"\n`
    csvContent += `"Metric","Value","Description","Category"\n`
    
    const avgScore = sessions.reduce((sum, s) => sum + s.session_participants.reduce((pSum, p) => pSum + (p.score || 0), 0), 0) / totalParticipants
    const avgAccuracy = sessions.reduce((sum, s) => sum + s.session_participants.reduce((pSum, p) => pSum + (p.accuracy || 0), 0), 0) / totalParticipants
    
    csvContent += `"Total Participants","${totalParticipants}","Total number of participants across all sessions","Engagement"\n`
    csvContent += `"Overall Success Rate","${overallSuccessRate.toFixed(2)}%","Percentage of correct answers across all participants","Performance"\n`
    csvContent += `"Average Score","${avgScore.toFixed(2)}","Average score per participant","Performance"\n`
    csvContent += `"Average Accuracy","${avgAccuracy.toFixed(2)}%","Average accuracy percentage per participant","Performance"\n`
    csvContent += `"Total Questions","${quiz.questions.length}","Number of questions in the quiz","Content"\n`
    csvContent += `"Total Sessions","${sessions.length}","Number of quiz sessions conducted","Engagement"\n`
    csvContent += `"Average Session Duration","${sessions.filter(s => s.started_at && s.ended_at).length > 0 ? (sessions.filter(s => s.started_at && s.ended_at).reduce((sum, s) => sum + (new Date(s.ended_at!).getTime() - new Date(s.started_at!).getTime()) / (1000 * 60), 0) / sessions.filter(s => s.started_at && s.ended_at).length).toFixed(2) : 0} minutes","Average duration of completed sessions","Engagement"\n`
    csvContent += `"Most Difficult Question","${(() => {
      const questionStats = quiz.questions.map((q, i) => {
        const qAnswers = filteredAnswers.filter(a => a.question_id === q.id)
        const successRate = qAnswers.length > 0 ? (qAnswers.filter(a => a.is_correct).length / qAnswers.length) * 100 : 0
        return { number: i + 1, successRate }
      })
      const hardest = questionStats.reduce((min, q) => q.successRate < min.successRate ? q : min, questionStats[0])
      return hardest ? `Question ${hardest.number} (${hardest.successRate.toFixed(2)}% success rate)` : 'N/A'
    })()}","Question with the lowest success rate","Content Analysis"\n`
    csvContent += `"Easiest Question","${(() => {
      const questionStats = quiz.questions.map((q, i) => {
        const qAnswers = filteredAnswers.filter(a => a.question_id === q.id)
        const successRate = qAnswers.length > 0 ? (qAnswers.filter(a => a.is_correct).length / qAnswers.length) * 100 : 0
        return { number: i + 1, successRate }
      })
      const easiest = questionStats.reduce((max, q) => q.successRate > max.successRate ? q : max, questionStats[0])
      return easiest ? `Question ${easiest.number} (${easiest.successRate.toFixed(2)}% success rate)` : 'N/A'
    })()}","Question with the highest success rate","Content Analysis"\n`
    csvContent += `"Top Performer","${participants.length > 0 ? participants.sort((a, b) => b.score - a.score)[0].name : 'N/A'}","Participant with highest score","Performance"\n`
    csvContent += `"Fastest Responder","${participants.length > 0 ? participants.sort((a, b) => a.averageTimeTaken - b.averageTimeTaken)[0].name : 'N/A'}","Participant with lowest average response time","Performance"\n`
    csvContent += `"Most Accurate","${participants.length > 0 ? participants.sort((a, b) => b.efficiency - a.efficiency)[0].name : 'N/A'}","Participant with highest accuracy","Performance"\n`

    // Set response headers for CSV download
    const headers = new Headers()
    headers.set('Content-Type', 'text/csv; charset=utf-8')
    const filename = sessionCode 
      ? `quiz-${quizId}-session-${sessionCode}-complete-analytics-${new Date().toISOString().split('T')[0]}.csv`
      : `quiz-${quizId}-all-sessions-complete-analytics-${new Date().toISOString().split('T')[0]}.csv`
    headers.set('Content-Disposition', `attachment; filename="${filename}"`)

    return new NextResponse(csvContent, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error('Error exporting CSV:', error)
    return NextResponse.json({ error: 'Failed to export CSV' }, { status: 500 })
  }
} 