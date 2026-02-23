import React, { useState } from 'react'
import { Download, Copy, CheckCheck, Terminal, Sparkles } from 'lucide-react'

export default function OutputPanel({ output, type = 'text', loading = false, accentColor = '#00ff87' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (typeof output === 'string') {
      navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div style={{
      border: '1px solid #1a1a1a',
      borderRadius: '8px',
      backgroundColor: '#0a0a0a',
      overflow: 'hidden',
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px',
        borderBottom: '1px solid #141414',
        backgroundColor: '#0f0f0f',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => (
              <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: c, opacity: 0.6 }} />
            ))}
          </div>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem', color: '#333', letterSpacing: '0.1em',
          }}>
            OUTPUT — {type.toUpperCase()}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {output && type === 'text' && (
            <button onClick={handleCopy} style={{
              background: 'none', border: '1px solid #1e1e1e', borderRadius: '4px',
              color: copied ? accentColor : '#444', padding: '3px 10px', cursor: 'pointer',
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
              display: 'flex', alignItems: 'center', gap: '5px', transition: 'all 0.2s',
            }}>
              {copied ? <CheckCheck size={11} /> : <Copy size={11} />}
              {copied ? 'copied!' : 'copy'}
            </button>
          )}
          {output && type !== 'text' && (
            <button style={{
              background: 'none', border: '1px solid #1e1e1e', borderRadius: '4px',
              color: '#444', padding: '3px 10px', cursor: 'pointer',
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              <Download size={11} /> download
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{
        padding: '1.5rem',
        minHeight: '180px',
        display: 'flex',
        alignItems: loading || !output ? 'center' : 'flex-start',
        justifyContent: loading || !output ? 'center' : 'flex-start',
      }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <Sparkles size={20} color={accentColor} style={{ opacity: 0.5, animation: 'blink 1s infinite' }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem', color: '#333', letterSpacing: '0.08em',
            }}>
              processing...
            </span>
            <div style={{ width: '160px', height: '2px', backgroundColor: '#1a1a1a', borderRadius: '1px', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', height: '100%', width: '55%',
                backgroundColor: accentColor, borderRadius: '1px',
                animation: 'slideLoader 1.2s ease-in-out infinite',
              }} />
            </div>
          </div>
        ) : output ? (
          type === 'text' ? (
            <pre style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.82rem', color: accentColor,
              lineHeight: 1.8, wordBreak: 'break-all', whiteSpace: 'pre-wrap',
              width: '100%',
            }}>{output}</pre>
          ) : (
            <img src={output} alt="output" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px', objectFit: 'contain' }} />
          )
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Terminal size={18} color="#222" style={{ marginBottom: '8px' }} />
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem', color: '#222',
            }}>
              // output will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  )
}