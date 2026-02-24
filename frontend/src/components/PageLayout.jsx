import React from 'react'

export default function PageLayout({ title, subtitle, badge, accentColor = '#00ff87', icon: Icon, children }) {
  return (
    <div style={{
      width: '100%',
      padding: '2rem 5vw 4rem',
      animation: 'fadeUp 0.4s ease both',
    }}>
      {/* Page header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'end',
        gap: '1.5rem',
        marginBottom: '2.5rem',
        paddingBottom: '2rem',
        borderBottom: '1px solid #1a1a1a',
      }}>
        <div>
          {/* Badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            marginBottom: '0.8rem',
          }}>
            <div style={{ width: '28px', height: '1px', backgroundColor: accentColor }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem', color: accentColor,
              letterSpacing: '0.18em', textTransform: 'uppercase',
            }}>
              {badge}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2.8rem, 5vw, 5rem)',
            letterSpacing: '0.04em',
            color: '#ffffff',
            lineHeight: 0.95,
            marginBottom: '0.9rem',
          }}>
            {title}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
            color: '#777',
            lineHeight: 1.75,
            maxWidth: '680px',
          }}>
            {subtitle}
          </p>
        </div>

        {/* Icon box */}
        {Icon && (
          <div style={{
            width: '72px', height: '72px',
            border: `1px solid ${accentColor}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: `${accentColor}08`,
          }}>
            <Icon size={30} color={accentColor} strokeWidth={1} style={{ opacity: 0.6 }} />
          </div>
        )}
      </div>

      {/* Page content */}
      {children}
    </div>
  )
}