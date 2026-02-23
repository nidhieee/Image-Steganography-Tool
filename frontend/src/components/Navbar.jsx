import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShieldCheck, FileText, Image, Layers, Film, Menu, X } from 'lucide-react'

const navItems = [
  { path: '/text-to-text',   label: 'Text in Text',   sub: 'Hide messages in plain text', icon: FileText,  accent: '#00ff87' },
  { path: '/text-to-image',  label: 'Text in Image',  sub: 'Embed text into image pixels', icon: Image,    accent: '#00d4ff' },
  { path: '/image-to-image', label: 'Image in Image', sub: 'Hide image inside image',      icon: Layers,   accent: '#ff3cac' },
  { path: '/text-to-gif',    label: 'Text in GIF',    sub: 'Encode text across GIF frames', icon: Film,    accent: '#ffc740' },
]

export default function Navbar() {
  const location = useLocation()
  const [time, setTime] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        borderBottom: '1px solid #1a1a1a',
        backgroundColor: 'rgba(8,8,8,0.96)',
        backdropFilter: 'blur(16px)',
      }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          padding: '0 2rem', height: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', border: '1px solid #00ff87',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ShieldCheck size={16} color="#00ff87" strokeWidth={1.5} />
            </div>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: '1.1rem', color: '#f0f0f0', letterSpacing: '-0.02em',
            }}>
              Stego<span style={{ color: '#00ff87' }}>Vault</span>
            </span>
          </Link>

          {/* Nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {navItems.map(item => {
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={item.sub}
                  style={{
                    textDecoration: 'none',
                    padding: '6px 14px',
                    borderRadius: '4px',
                    border: `1px solid ${active ? item.accent : 'transparent'}`,
                    backgroundColor: active ? `${item.accent}14` : 'transparent',
                    transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: '7px',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = '#ffffff08' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  <item.icon size={13} color={active ? item.accent : '#555'} strokeWidth={1.5} />
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.8rem', fontWeight: active ? 600 : 400,
                    color: active ? item.accent : '#888',
                    letterSpacing: '0.01em',
                  }}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Clock */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem', color: '#333',
            letterSpacing: '0.08em',
            border: '1px solid #1a1a1a',
            padding: '4px 10px',
          }}>
            {time}
          </div>
        </div>
      </nav>
    </>
  )
}