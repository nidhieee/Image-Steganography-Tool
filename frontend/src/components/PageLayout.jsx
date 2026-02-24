import React from 'react'

export default function PageLayout({ title, subtitle, badge, accentColor = '#00ff87', icon: Icon, children }) {
  return (
    <div style={{
      width: '100%',
      padding: '4rem 5vw 6rem',
      animation: 'fadeUp 0.4s ease both',
    }}>
      {/* Page header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'end',
        gap: '2rem',
        marginBottom: '4rem',
        paddingBottom: '3rem',
        borderBottom: '1px solid #1a1a1a',
      }}>
        <div>
          {/* Badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            marginBottom: '1.5rem',
          }}>
            <div style={{ width: '40px', height: '1px', backgroundColor: accentColor }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.88rem', color: accentColor,
              letterSpacing: '0.18em', textTransform: 'uppercase',
            }}>
              {badge}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(4.5rem, 8vw, 9rem)',
            letterSpacing: '0.04em',
            color: '#ffffff',
            lineHeight: 0.92,
            marginBottom: '1.8rem',
          }}>
            {title}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
            color: '#888',
            lineHeight: 1.9,
            maxWidth: '720px',
          }}>
            {subtitle}
          </p>
        </div>

        {/* Icon box */}
        {Icon && (
          <div style={{
            width: '100px', height: '100px',
            border: `1px solid ${accentColor}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: `${accentColor}08`,
          }}>
            <Icon size={42} color={accentColor} strokeWidth={1} style={{ opacity: 0.6 }} />
          </div>
        )}
      </div>

      {/* Page content */}
      {children}
    </div>
  )
}