import React, { useState } from 'react'
import { Film, Info, ChevronDown } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import TabSwitcher from '../components/TabSwitcher'
import UploadZone from '../components/UploadZone'
import OutputPanel from '../components/OutputPanel'

const ACCENT = '#ffc740'

const label = (text) => (
  <label style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.65rem', color: '#444',
    letterSpacing: '0.12em', textTransform: 'uppercase',
    display: 'block', marginBottom: '8px',
  }}>{text}</label>
)

const Tip = ({ text }) => (
  <div style={{
    display: 'flex', alignItems: 'flex-start', gap: '8px',
    backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a',
    borderLeft: `2px solid ${ACCENT}50`,
    borderRadius: '4px', padding: '10px 14px',
  }}>
    <Info size={12} color={ACCENT} style={{ marginTop: '2px', opacity: 0.5, flexShrink: 0 }} />
    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', color: '#444', lineHeight: 1.6 }}>
      {text}
    </p>
  </div>
)

const methods = [
  { id: 'frame_delta', label: 'Frame Delta', desc: 'Encodes bits in pixel differences between consecutive frames' },
  { id: 'palette_order', label: 'Palette Order', desc: 'Reorders color palette entries to encode bits in the GIF color table' },
  { id: 'frame_delay', label: 'Frame Delay', desc: 'Encodes bits in the timing delay between animation frames' },
]

export default function TextToGif() {
  const [mode, setMode] = useState('encrypt')
  const [gif, setGif] = useState(null)
  const [stegoGif, setStegoGif] = useState(null)
  const [secret, setSecret] = useState('')
  const [method, setMethod] = useState('frame_delta')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const selectedMethod = methods.find(m => m.id === method)

  const handleRun = () => {
    setLoading(true); setOutput('')
    setTimeout(() => {
      setOutput(mode === 'encrypt' ? null : '// Extracted text from GIF frames will appear here')
      setLoading(false)
    }, 1800)
  }

  return (
    <PageLayout
      title="Text in GIF"
      subtitle="Encode secret messages across GIF animation frames using inter-frame delta encoding or palette manipulation. The animation plays normally."
      badge="Module 04 — Steganography"
      accentColor={ACCENT}
      icon={Film}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <TabSwitcher active={mode} onChange={setMode} accentColor={ACCENT} />

        {mode === 'encrypt' ? (
          <>
            <Tip text="Encryption: Your text is encoded across the GIF's animation frames. The GIF continues to play normally — the hidden data is invisible to viewers." />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  {label('GIF File (animated)')}
                  <UploadZone accept=".gif" label="animated GIF" onFile={setGif} file={gif} accentColor={ACCENT} />
                </div>
                <div>
                  {label('Encoding Method')}
                  <div style={{ position: 'relative' }}>
                    <select
                      value={method}
                      onChange={e => setMethod(e.target.value)}
                      style={{
                        width: '100%', backgroundColor: '#0f0f0f',
                        border: '1px solid #1e1e1e', borderRadius: '6px',
                        padding: '10px 40px 10px 14px', color: '#f0f0f0',
                        fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem',
                        outline: 'none', cursor: 'pointer', appearance: 'none',
                        transition: 'border-color 0.2s',
                      }}
                    >
                      {methods.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
                    </select>
                    <ChevronDown size={14} color="#444" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                  {selectedMethod && (
                    <p style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.65rem', color: '#333', marginTop: '6px',
                    }}>
                      // {selectedMethod.desc}
                    </p>
                  )}
                </div>
              </div>
              <div>
                {label('Secret Message to Encode')}
                <textarea
                  style={{
                    width: '100%', backgroundColor: '#0f0f0f',
                    border: '1px solid #1e1e1e', borderRadius: '6px',
                    padding: '14px 16px', color: '#f0f0f0',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.82rem', lineHeight: 1.7,
                    resize: 'vertical', outline: 'none', minHeight: '160px',
                    transition: 'border-color 0.2s',
                  }}
                  placeholder="Enter the message to encode across GIF frames..."
                  value={secret}
                  onChange={e => setSecret(e.target.value)}
                  onFocus={e => e.target.style.borderColor = ACCENT}
                  onBlur={e => e.target.style.borderColor = '#1e1e1e'}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <Tip text="Decryption: Upload the stego GIF. The tool will analyze frame differences or palette ordering to extract the hidden message encoded across frames." />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                {label('Stego GIF (GIF containing hidden message)')}
                <UploadZone accept=".gif" label="stego GIF" onFile={setStegoGif} file={stegoGif} accentColor={ACCENT} />
              </div>
              <div>
                {label('Detection Method')}
                <div style={{ position: 'relative' }}>
                  <select
                    value={method}
                    onChange={e => setMethod(e.target.value)}
                    style={{
                      width: '100%', backgroundColor: '#0f0f0f',
                      border: '1px solid #1e1e1e', borderRadius: '6px',
                      padding: '10px 40px 10px 14px', color: '#f0f0f0',
                      fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem',
                      outline: 'none', cursor: 'pointer', appearance: 'none',
                    }}
                  >
                    {methods.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
                  </select>
                  <ChevronDown size={14} color="#444" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#333', marginTop: '6px' }}>
                  // Must match the method used to encode
                </p>
                <div style={{
                  marginTop: '1rem',
                  backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a',
                  borderRadius: '6px', padding: '1rem 1.2rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.65rem', color: '#333', lineHeight: 1.9,
                }}>
                  <p>// Decoding steps:</p>
                  <p style={{ color: '#2a2a2a' }}>1. Parse all GIF frames</p>
                  <p style={{ color: '#2a2a2a' }}>2. Analyze using selected method</p>
                  <p style={{ color: '#2a2a2a' }}>3. Extract and reconstruct bits</p>
                  <p style={{ color: '#2a2a2a' }}>4. Output hidden text</p>
                </div>
              </div>
            </div>
          </>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={handleRun}
            style={{
              backgroundColor: ACCENT, border: 'none', borderRadius: '6px',
              color: '#080808', fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: '0.9rem', padding: '12px 32px',
              cursor: 'pointer', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.target.style.opacity = '0.85'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            {mode === 'encrypt' ? 'Encode into GIF →' : 'Extract from GIF →'}
          </button>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: '#2a2a2a' }}>
            // Python API integration pending
          </span>
        </div>

        <OutputPanel
          output={output}
          type={mode === 'encrypt' ? 'image' : 'text'}
          loading={loading}
          accentColor={ACCENT}
        />
      </div>
    </PageLayout>
  )
}