"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/'
  const isHostRoute = pathname.startsWith('/host')
  const isHostDashboard = pathname === '/dashboard'
  const isParticipantRoute = pathname.startsWith('/participant')
  const isTestProctoringParticipant = pathname.startsWith('/participant/test-proctoring')
  const isTestProctoringHost = pathname.startsWith('/host/test-proctoring')
  const showProfileIcon = !isLoginPage && !isHostRoute && !isHostDashboard
  const showBackButton = !isLoginPage && pathname !== '/dashboard' && pathname !== '/participant/dashboard'

  const logoHref = isParticipantRoute || isTestProctoringParticipant
    ? '/participant/dashboard'
    : (isHostRoute || isHostDashboard || isTestProctoringHost)
      ? '/dashboard'
      : '/dashboard'

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (pathname.startsWith('/participant')) {
      router.push('/participant/quiz-history')
    } else {
      router.push('/participant/dashboard?profile=1')
    }
  }
  
  return (
    <header style={{
      position: 'relative',
      zIndex: 10,
      width: '100%',
      padding: '0.5rem 0',
      background: '#fff',
      boxShadow: '0 2px 16px 0 rgba(0,0,0,0.06)',
      borderBottom: '2px solid #e6c200', // gold
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between', // changed from flex-start to space-between
    }}>
      {isLoginPage ? (
        // On login page, show logo without link
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/college_logo.png"
            alt="NMIMS Logo"
            style={{ height: 56, width: 'auto', marginLeft: 24, marginRight: 16, objectFit: 'contain', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          />
        </div>
      ) : (
        // On other pages, show logo with route-aware link
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href={logoHref} style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/college_logo.png"
              alt="NMIMS Logo"
              style={{ height: 56, width: 'auto', marginLeft: 24, marginRight: 16, objectFit: 'contain', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            />
          </Link>
          {showBackButton && (
            <button
              onClick={() => router.back()}
              style={{
                marginLeft: 8,
                padding: '8px 12px',
                border: '1px solid #e6c200',
                borderRadius: 8,
                background: '#fff8db',
                color: '#7a5d00',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              ⟵ Back
            </button>
          )}
        </div>
      )}
      {/* User icon (right side) - open participant quiz history */}
      {showProfileIcon && (
        <div style={{ marginRight: 32 }}>
          <a href="/participant/quiz-history" aria-label="My Profile" onClick={handleProfileClick} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/vecteezy_people-user-team-png-transparent_9662771.png" alt="User" style={{ height: 36, width: 36, borderRadius: '50%', background: '#eee', objectFit: 'cover' }} />
          </a>
        </div>
      )}
    </header>
  )
} 