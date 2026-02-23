import React from 'react'

export default function PageLayout({ title, subtitle, badge, accentColor = '#00ff87', children }) {
  const s = {
    page: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '3rem 2rem',
      animation: 'fadeUp 0.4s ease both',
    },
    header: {
      marginBottom: '2.5rem',
      paddingBottom: '1.5rem',
      borderBottom: '1px solid #161616',
    },
    badge: {
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: '0.68rem',
      letterSpacing: '0.15em',
      color: accentColor,
      textTransform: 'uppercase',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    badgeLine: {
      width: '24px',
      height: '1px',
      backgroundColor: accentColor,
    },
    title: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      fontSize: '2.2rem',
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
      marginBottom: '8px',
    },
    subtitle: {
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: '0.78rem',
      color: '#444',
      letterSpacing: '0.04em',
      lineHeight: 1.6,
    },
    content: {},
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.badge}>
          <span style={s.badgeLine} />
          {badge}
        </div>
        <h1 style={s.title}>{title}</h1>
        <p style={s.subtitle}>{subtitle}</p>
      </div>
      <div style={s.content}>{children}</div>
    </div>
  )
}