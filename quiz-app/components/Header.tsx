"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const isLoginPage = pathname === '/'
  
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
      justifyContent: 'flex-start',
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
        // On other pages, show logo with link
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/college_logo.png"
            alt="NMIMS Logo"
            style={{ height: 56, width: 'auto', marginLeft: 24, marginRight: 16, objectFit: 'contain', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          />
        </Link>
      )}
    </header>
  )
} 