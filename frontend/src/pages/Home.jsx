import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Image, Layers, Film, ArrowRight, Lock, Cpu, Shield } from 'lucide-react'
import LetterGlitch from '../components/LetterGlitch'

const modules = [
  {
    id: '01', label: 'Text in Text',
    desc: 'Conceal secret messages inside ordinary-looking cover text using invisible zero-width Unicode characters.',
    path: '/text-to-text', icon: FileText, accent: '#00ff87',
    tags: ['Zero-Width Encoding', 'Unicode'],
  },
  {
    id: '02', label: 'Text in Image',
    desc: 'Embed hidden text into image pixel data using LSB steganography. Output is visually identical.',
    path: '/text-to-image', icon: Image, accent: '#00d4ff',
    tags: ['LSB Encoding', 'PNG / BMP'],
  },
  {
    id: '03', label: 'Image in Image',
    desc: 'Conceal a full secret image inside a carrier image by blending across bit planes.',
    path: '/image-to-image', icon: Layers, accent: '#ff3cac',
    tags: ['Pixel Blending', 'Bit-plane'],
  },
  {
    id: '04', label: 'Text in GIF',
    desc: 'Encode secret messages across GIF animation frames using inter-frame delta techniques.',
    path: '/text-to-gif', icon: Film, accent: '#ffc740',
    tags: ['Frame Delta', 'Palette Order'],
  },
]

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <div style={{
        position: 'relative',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <LetterGlitch opacity={0.09} speed={70} />

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 80% at center, transparent 20%, #080808 75%)',
        }} />

        {/* Hero content */}
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: '1400px', margin: '0 auto',
          padding: '0 2rem', width: '100%',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '4rem', alignItems: 'center',
          animation: 'fadeUp 0.6s ease both',
        }}>
          <div>
            {/* Status badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: '1px solid #1e1e1e', borderRadius: '100px',
              padding: '5px 16px', marginBottom: '2.5rem',
              backgroundColor: 'rgba(15,15,15,0.85)',
              backdropFilter: 'blur(8px)',
            }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#00ff87', animation: 'blink 2s infinite' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#555', letterSpacing: '0.1em' }}>
                Steganography Suite — v1.0
              </span>
            </div>

            {/* Big heading */}
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(5.5rem, 9.5vw, 10rem)',
              letterSpacing: '0.03em', lineHeight: 0.9,
              marginBottom: '2rem',
            }}>
              HIDDEN<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '2px #252525' }}>IN PLAIN</span><br />
              SIGHT.
            </h1>

            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.15rem', color: '#5a5a5a',
              lineHeight: 1.85, maxWidth: '440px', marginBottom: '3rem',
            }}>
              Conceal encrypted messages within digital media using four steganographic methods. Encrypt and decrypt — zero visible trace.
            </p>

            {/* Feature badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '3rem' }}>
              {[
                { icon: Lock,   text: 'Encrypt & Decrypt', color: '#00ff87' },
                { icon: Shield, text: '4 Stego Methods',   color: '#00d4ff' },
                { icon: Cpu,    text: 'Python Backend',    color: '#ff3cac' },
              ].map(item => (
                <div key={item.text} style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  border: '1px solid #1a1a1a', borderRadius: '4px',
                  padding: '8px 14px', backgroundColor: 'rgba(12,12,12,0.8)',
                  backdropFilter: 'blur(4px)',
                }}>
                  <item.icon size={13} color={item.color} strokeWidth={1.5} />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.83rem', color: '#4a4a4a' }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link to="/text-to-text" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  backgroundColor: '#00ff87', border: 'none', borderRadius: '6px',
                  color: '#080808', fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: '1rem', padding: '15px 38px',
                  cursor: 'pointer', letterSpacing: '0.02em', transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.target.style.opacity = '0.85'}
                onMouseLeave={e => e.target.style.opacity = '1'}
              >
                Start Hiding Data →
              </button>
            </Link>
          </div>

          {/* Stats panel */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '1px', backgroundColor: '#141414',
            border: '1px solid #141414',
            backdropFilter: 'blur(16px)',
          }}>
            {[
              { val: '4',   label: 'Stego Methods',    accent: '#00ff87' },
              { val: '2',   label: 'Ops per Method',   accent: '#00d4ff' },
              { val: 'LSB', label: 'Core Algorithm',   accent: '#ff3cac' },
              { val: '0px', label: 'Visual Diff',      accent: '#ffc740' },
            ].map(stat => (
              <div key={stat.label} style={{
                backgroundColor: 'rgba(10,10,10,0.92)',
                padding: '2.2rem',
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '3.8rem', color: stat.accent,
                  letterSpacing: '0.04em', lineHeight: 1,
                }}>
                  {stat.val}
                </span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.68rem', color: '#2e2e2e',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#222', letterSpacing: '0.2em' }}>
            SCROLL
          </span>
          <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, #2a2a2a, transparent)', animation: 'blink 2s infinite' }} />
        </div>
      </div>

      {/* MODULE GRID */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 2rem 6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ width: '32px', height: '1px', backgroundColor: '#00ff87' }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#00ff87', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Select Module
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#141414' }} />
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px', backgroundColor: '#141414',
          border: '1px solid #141414', borderRadius: '8px', overflow: 'hidden',
        }}>
          {modules.map(mod => (
            <Link key={mod.id} to={mod.path} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div
                style={{
                  backgroundColor: '#0a0a0a', padding: '2.5rem 2rem',
                  height: '100%', display: 'flex', flexDirection: 'column', gap: '1.2rem',
                  transition: 'background-color 0.2s', cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#0f0f0f'
                  e.currentTarget.querySelector('.card-arrow').style.opacity = '1'
                  e.currentTarget.querySelector('.card-arrow').style.transform = 'translateX(5px)'
                  e.currentTarget.querySelector('.card-line').style.width = '100%'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#0a0a0a'
                  e.currentTarget.querySelector('.card-arrow').style.opacity = '0.2'
                  e.currentTarget.querySelector('.card-arrow').style.transform = 'translateX(0)'
                  e.currentTarget.querySelector('.card-line').style.width = '0%'
                }}
              >
                <div className="card-line" style={{ height: '2px', backgroundColor: mod.accent, width: '0%', transition: 'width 0.3s ease', marginBottom: '4px' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: mod.accent, letterSpacing: '0.15em', opacity: 0.5 }}>
                    {mod.id} ——
                  </span>
                  <mod.icon size={16} color={mod.accent} strokeWidth={1.5} style={{ opacity: 0.4 }} />
                </div>

                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem', letterSpacing: '0.04em', color: '#f0f0f0', lineHeight: 1 }}>
                  {mod.label}
                </h3>

                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.83rem', color: '#444', lineHeight: 1.7, flex: 1 }}>
                  {mod.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {mod.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: mod.accent,
                      border: `1px solid ${mod.accent}25`, padding: '2px 8px', borderRadius: '2px',
                      letterSpacing: '0.06em', opacity: 0.6,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <ArrowRight size={15} color={mod.accent} className="card-arrow" style={{ opacity: 0.2, transition: 'all 0.25s ease' }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}