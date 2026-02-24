import React, { useState } from 'react'
import { FileText, Info } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import TabSwitcher from '../components/TabSwitcher'
import OutputPanel from '../components/OutputPanel'

const ACCENT = '#00ff87'

const label = (text) => (
  <label style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.82rem', color: '#aaa',
    letterSpacing: '0.12em', textTransform: 'uppercase',
    display: 'block', marginBottom: '10px',
  }}>{text}</label>
)

const textarea = (props) => (
  <textarea
    {...props}
    style={{
      width: '100%', backgroundColor: '#0f0f0f',
      border: '1px solid #1e1e1e', borderRadius: '6px',
      padding: '16px 18px', color: '#ffffff',
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '1rem', lineHeight: 1.75,
      resize: 'vertical', outline: 'none',
      minHeight: props.tall ? '160px' : '120px',
      transition: 'border-color 0.2s',
      ...props.style,
    }}
    onFocus={e => e.target.style.borderColor = props.focusColor || ACCENT}
    onBlur={e => e.target.style.borderColor = '#1e1e1e'}
  />
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

export default function TextToText() {
  const [mode, setMode] = useState('encrypt')
  const [coverText, setCoverText] = useState('')
  const [secretMsg, setSecretMsg] = useState('')
  const [stegoInput, setStegoInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRun = () => {
    setLoading(true); setOutput('')
    setTimeout(() => {
      setOutput(mode === 'encrypt'
        ? '// Encoded output will appear here once Python API is connected'
        : '// Decoded secret message will appear here once Python API is connected'
      )
      setLoading(false)
    }, 1300)
  }

  return (
    <PageLayout
      title="Text in Text"
      subtitle="Hide secret messages inside ordinary cover text using zero-width Unicode characters — invisible to readers, extractable by the tool."
      badge="Module 01 — Steganography"
      accentColor={ACCENT}
      icon={FileText}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <TabSwitcher active={mode} onChange={setMode} accentColor={ACCENT} />

        {mode === 'encrypt' ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                {label('Your Text (public-facing)')}
                {textarea({ placeholder: 'Enter the innocent-looking text that will carry the hidden message...', value: coverText, onChange: e => setCoverText(e.target.value), tall: true })}
              </div>
              <div>
                {label('Secret Message (to hide)')}
                {textarea({ placeholder: 'Enter the secret message you want to conceal...', value: secretMsg, onChange: e => setSecretMsg(e.target.value), tall: true })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              {label('Stego Text (paste text to decode)')}
              {textarea({ placeholder: 'Paste the text that may contain a hidden message. The tool will scan for invisible zero-width characters...', value: stegoInput, onChange: e => setStegoInput(e.target.value), tall: true, style: { minHeight: '180px' } })}
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
              cursor: 'pointer', letterSpacing: '0.02em', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.target.style.opacity = '0.85'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            {mode === 'encrypt' ? 'Encode Message →' : 'Extract Secret →'}
          </button>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: '#2a2a2a' }}>
            // Python API integration pending
          </span>
        </div>

        <OutputPanel output={output} type="text" loading={loading} accentColor={ACCENT} />
      </div>
    </PageLayout>
  )
}