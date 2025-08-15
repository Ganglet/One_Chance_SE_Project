import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

// GET /api/quizzes/[id] - Get quiz details by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const quizId = parseInt(id)
    
    if (isNaN(quizId)) {
      return NextResponse.json({ error: 'Invalid quiz ID' }, { status: 400 })
    }

    const quiz = await prisma.quizzes.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            options: true,
            matching_pairs: true,
            drag_drop_items: true,
            ordering_items: true
          }
        },
        teams: true
      }
    })

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
    }

    return NextResponse.json(quiz)

  } catch (error) {
    console.error('Error fetching quiz:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/quizzes/[id] - Update quiz status
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const quizId = parseInt(id)
    
    if (isNaN(quizId)) {
      return NextResponse.json({ error: 'Invalid quiz ID' }, { status: 400 })
    }

    const { status } = await req.json()
    
    if (!status || !['inactive', 'active', 'stopped', 'completed', 'terminated'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status. Must be inactive, active, stopped, completed, or terminated' }, { status: 400 })
    }

    const quiz = await prisma.quizzes.update({
      where: { id: quizId },
      data: { status },
      include: {
        questions: true
      }
    })

    return NextResponse.json({ quiz })

  } catch (error) {
    console.error('Error updating quiz:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 

// PUT /api/quizzes/[id] - Update quiz content and questions
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const quizId = parseInt(id)
    
    if (isNaN(quizId)) {
      return NextResponse.json({ error: 'Invalid quiz ID' }, { status: 400 })
    }

    const { title, description, questions, negativeMarking, teamMode } = await req.json()
    
    console.log('PUT /api/quizzes/[id] - Received data:', {
      quizId,
      title,
      description,
      questionsCount: questions?.length,
      negativeMarking,
      teamMode
    })
    
    if (!title || !questions || !Array.isArray(questions)) {
      return NextResponse.json({ error: 'Title and questions are required' }, { status: 400 })
    }

    // Start a transaction to update quiz and questions
    const result = await prisma.$transaction(async (tx) => {
      console.log('Starting transaction for quiz update')
      
      // Update quiz basic info
      const updatedQuiz = await tx.quizzes.update({
        where: { id: quizId },
        data: {
          title,
          description: description || '',
          negative_marking: negativeMarking || false,
          team_mode: teamMode || false,
        }
      })
      
      console.log('Updated quiz basic info:', updatedQuiz)

      // Get existing questions to preserve their IDs and data
      const existingQuestions = await tx.questions.findMany({
        where: { quiz_id: quizId },
        include: {
          options: true
        }
      })
      
      console.log('Found existing questions:', existingQuestions.length)

      // Update or create questions based on the new data
      for (let i = 0; i < questions.length; i++) {
        const questionData = questions[i]
        
        // Check if this is an existing question by ID
        const existingQuestion = existingQuestions.find(q => q.id.toString() === questionData.id?.toString())
        
        if (existingQuestion) {
          // Update existing question
          console.log('Updating existing question:', existingQuestion.id)
          
          await tx.questions.update({
            where: { id: existingQuestion.id },
            data: {
              question: questionData.question,
              type: questionData.type,
              correct_answer: String(questionData.correctAnswer),
              time_limit: questionData.timeLimit || 30,
              points: questionData.points || 100,
              category: questionData.category || 'General'
            }
          })

          // Update options for multiple choice questions
          if (questionData.type === 'multiple_choice' && questionData.options && Array.isArray(questionData.options)) {
            // Delete existing options
            await tx.options.deleteMany({
              where: { question_id: existingQuestion.id }
            })
            
            // Create new options
            for (let j = 0; j < questionData.options.length; j++) {
              const option = questionData.options[j]
              if (option.trim()) {
                await tx.options.create({
                  data: {
                    question_id: existingQuestion.id,
                    option_text: option,
                    option_index: j
                  }
                })
              }
            }
          }

          // Update matching pairs for matching_pairs questions
          if (questionData.type === 'matching_pairs' && questionData.matchingPairs && Array.isArray(questionData.matchingPairs)) {
            // Delete existing matching pairs
            await tx.matching_pairs.deleteMany({
              where: { question_id: existingQuestion.id }
            })
            
            // Create new matching pairs
            for (let j = 0; j < questionData.matchingPairs.length; j++) {
              const pair = questionData.matchingPairs[j]
              if (pair.left.trim() && pair.right.trim()) {
                await tx.matching_pairs.create({
                  data: {
                    question_id: existingQuestion.id,
                    left_item: pair.left,
                    right_item: pair.right,
                    pair_index: j
                  }
                })
              }
            }
          }

          // Update drag drop items for drag_drop questions
          if (questionData.type === 'drag_drop' && questionData.dragDropItems && Array.isArray(questionData.dragDropItems)) {
            // Delete existing drag drop items
            await tx.drag_drop_items.deleteMany({
              where: { question_id: existingQuestion.id }
            })
            
            // Create new drag drop items
            for (let j = 0; j < questionData.dragDropItems.length; j++) {
              const item = questionData.dragDropItems[j]
              if (item.text.trim() && item.category.trim()) {
                await tx.drag_drop_items.create({
                  data: {
                    question_id: existingQuestion.id,
                    item_text: item.text,
                    category: item.category,
                    item_index: j
                  }
                })
              }
            }
          }

          // Update ordering items for ordering questions
          if (questionData.type === 'ordering' && questionData.orderingItems && Array.isArray(questionData.orderingItems)) {
            // Delete existing ordering items
            await tx.ordering_items.deleteMany({
              where: { question_id: existingQuestion.id }
            })
            
            // Create new ordering items
            for (let j = 0; j < questionData.orderingItems.length; j++) {
              const item = questionData.orderingItems[j]
              if (item.trim()) {
                await tx.ordering_items.create({
                  data: {
                    question_id: existingQuestion.id,
                    item_text: item,
                    correct_order: j
                  }
                })
              }
            }
          }
        } else {
          // Create new question
          console.log('Creating new question')
          const newQuestion = await tx.questions.create({
            data: {
              quiz_id: quizId,
              question: questionData.question,
              type: questionData.type,
              correct_answer: String(questionData.correctAnswer),
              time_limit: questionData.timeLimit || 30,
              points: questionData.points || 100,
              category: questionData.category || 'General'
            }
          })
          
          console.log('Created new question:', newQuestion.id)

          // Create options for multiple choice questions
          if (questionData.type === 'multiple_choice' && questionData.options && Array.isArray(questionData.options)) {
            for (let j = 0; j < questionData.options.length; j++) {
              const option = questionData.options[j]
              if (option.trim()) {
                await tx.options.create({
                  data: {
                    question_id: newQuestion.id,
                    option_text: option,
                    option_index: j
                  }
                })
              }
            }
          }

          // Create matching pairs for matching_pairs questions
          if (questionData.type === 'matching_pairs' && questionData.matchingPairs && Array.isArray(questionData.matchingPairs)) {
            for (let j = 0; j < questionData.matchingPairs.length; j++) {
              const pair = questionData.matchingPairs[j]
              if (pair.left.trim() && pair.right.trim()) {
                await tx.matching_pairs.create({
                  data: {
                    question_id: newQuestion.id,
                    left_item: pair.left,
                    right_item: pair.right,
                    pair_index: j
                  }
                })
              }
            }
          }

          // Create drag drop items for drag_drop questions
          if (questionData.type === 'drag_drop' && questionData.dragDropItems && Array.isArray(questionData.dragDropItems)) {
            for (let j = 0; j < questionData.dragDropItems.length; j++) {
              const item = questionData.dragDropItems[j]
              if (item.text.trim() && item.category.trim()) {
                await tx.drag_drop_items.create({
                  data: {
                    question_id: newQuestion.id,
                    item_text: item.text,
                    category: item.category,
                    item_index: j
                  }
                })
              }
            }
          }

          // Create ordering items for ordering questions
          if (questionData.type === 'ordering' && questionData.orderingItems && Array.isArray(questionData.orderingItems)) {
            for (let j = 0; j < questionData.orderingItems.length; j++) {
              const item = questionData.orderingItems[j]
              if (item.trim()) {
                await tx.ordering_items.create({
                  data: {
                    question_id: newQuestion.id,
                    item_text: item,
                    correct_order: j
                  }
                })
              }
            }
          }
        }
      }

      // Delete questions that are no longer in the new data
      const newQuestionIds = questions.map(q => q.id?.toString()).filter(Boolean)
      const questionsToDelete = existingQuestions.filter(q => !newQuestionIds.includes(q.id.toString()))
      
      if (questionsToDelete.length > 0) {
        console.log('Deleting removed questions:', questionsToDelete.length)
        
        for (const questionToDelete of questionsToDelete) {
          // Delete options first
          await tx.options.deleteMany({
            where: { question_id: questionToDelete.id }
          })

          // Delete matching pairs
          await tx.matching_pairs.deleteMany({
            where: { question_id: questionToDelete.id }
          })

          // Delete drag drop items
          await tx.drag_drop_items.deleteMany({
            where: { question_id: questionToDelete.id }
          })

          // Delete ordering items
          await tx.ordering_items.deleteMany({
            where: { question_id: questionToDelete.id }
          })
          
          // Delete the question (this will cascade delete answers, but that's expected for removed questions)
          await tx.questions.delete({
            where: { id: questionToDelete.id }
          })
        }
      }

      return updatedQuiz
    })

    console.log('Transaction completed successfully')
    return NextResponse.json({ 
      message: 'Quiz updated successfully',
      quiz: result 
    })

  } catch (error) {
    console.error('Error updating quiz:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 

// DELETE /api/quizzes/[id] - Delete quiz and all related data
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const quizId = parseInt(id)
    
    if (isNaN(quizId)) {
      return NextResponse.json({ error: 'Invalid quiz ID' }, { status: 400 })
    }

    // Check if quiz exists
    const existingQuiz = await prisma.quizzes.findUnique({
      where: { id: quizId }
    })

    if (!existingQuiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
    }

    // Check if quiz is currently active
    if (existingQuiz.status === 'active') {
      return NextResponse.json({ error: 'Cannot delete an active quiz. Please stop the quiz first.' }, { status: 400 })
    }

    // Delete quiz and all related data using cascade
    // The database schema should handle cascade deletion for:
    // - questions (cascade to options)
    // - quiz_sessions (cascade to session_participants and answers)
    // - participant_history
    await prisma.quizzes.delete({
      where: { id: quizId }
    })

    return NextResponse.json({ 
      message: 'Quiz deleted successfully',
      deletedQuizId: quizId
    })

  } catch (error) {
    console.error('Error deleting quiz:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 