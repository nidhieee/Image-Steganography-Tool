import React from 'react'
import { ShieldCheck, Lock, Mail, Github } from 'lucide-react'
import { Link } from 'react-router-dom'

const modules = [
  { label: 'Text in Text',   path: '/text-to-text',   accent: '#00ff87' },
  { label: 'Text in Image',  path: '/text-to-image',  accent: '#00d4ff' },
  { label: 'Image in Image', path: '/image-to-image', accent: '#ff3cac' },
  { label: 'Text in GIF',    path: '/text-to-gif',    accent: '#ffc740' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: '1px solid #1e1e1e',
      backgroundColor: '#060606',
      width: '100%',
    }}>
      {/* Main footer content */}
      <div style={{
        width: '100%', padding: '4rem 5vw 3rem',
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr',
        gap: '4rem',
      }}>

        {/* Brand column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px', height: '34px', border: '1px solid #00ff87',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ShieldCheck size={16} color="#00ff87" strokeWidth={1.5} />
            </div>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: '1.2rem', color: '#ffffff',
            }}>
              Stego<span style={{ color: '#00ff87' }}>Vault</span>
            </span>
          </div>

          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1rem', color: '#8b8b8b', lineHeight: 1.8, maxWidth: '320px',
          }}>
            A steganography suite for hiding and extracting secret data within digital media — text, images, and GIFs.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.5rem' }}>
            <Lock size={13} color="#00ff87" strokeWidth={1.5} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.82rem', color: '#8b8b8b', letterSpacing: '0.06em',
            }}>
              Encrypted · Secure · Zero Trace
            </span>
          </div>
        </div>

        {/* Modules column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.78rem', color: '#8b8b8b',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            Modules
          </h4>
          {modules.map(mod => (
            <Link key={mod.path} to={mod.path} style={{ textDecoration: 'none' }}>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1rem', color: '#666',
                transition: 'color 0.2s', display: 'block',
              }}
              onMouseEnter={e => e.target.style.color = mod.accent}
              onMouseLeave={e => e.target.style.color = '#666'}
              >
                {mod.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Info column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {[
            'Academic Use Only',
          ].map(item => (
            <span key={item} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1rem', color: '#8b8b8b',
            }}>
              {item}
            </span>
          ))}
          <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.82rem', color: '#8b8b8b',
          letterSpacing: '0.06em',
        }}>
          © {year} StegoVault. All rights reserved.
        </span>
        </div>
      </div>

    </footer>
  )
}