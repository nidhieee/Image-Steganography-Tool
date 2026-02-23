import React from 'react'
import { ShieldCheck, Github, Lock } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: '1px solid #141414',
      backgroundColor: '#0a0a0a',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: '1400px', margin: '0 auto',
        padding: '2.5rem 2rem',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '2rem',
      }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={14} color="#00ff87" strokeWidth={1.5} />
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: '0.9rem', color: '#f0f0f0',
            }}>
              Stego<span style={{ color: '#00ff87' }}>Vault</span>
            </span>
          </div>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem', color: '#333', letterSpacing: '0.05em',
          }}>
            // data hidden in plain sight
          </p>
        </div>

        {/* Center */}
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem', color: '#2e2e2e', letterSpacing: '0.08em',
          }}>
            © {year} StegoVault. All rights reserved.
          </p>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem', color: '#222', marginTop: '4px',
          }}>
            Built for academic purposes · NMIMS SEM 6 · CS
          </p>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem', color: '#333',
          }}>
            <Lock size={11} color="#333" />
            Encrypted · Secure · Zero Trace
          </div>
        </div>
      </div>
    </footer>
  )
}