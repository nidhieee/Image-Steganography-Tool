import React, { useState } from 'react'
import { Image, Info } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import TabSwitcher from '../components/TabSwitcher'
import UploadZone from '../components/UploadZone'
import OutputPanel from '../components/OutputPanel'

const ACCENT = '#00d4ff'

const label = (text) => (
  <label style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.65rem', color: '#8b8b8b',
    letterSpacing: '0.12em', textTransform: 'uppercase',
    display: 'block', marginBottom: '8px',
  }}>{text}</label>
)

const Tip = ({ text, color = ACCENT }) => (
  <div style={{
    display: 'flex', alignItems: 'flex-start', gap: '8px',
    backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a',
    borderLeft: `2px solid ${color}50`,
    borderRadius: '4px', padding: '10px 14px',
  }}>
    <Info size={12} color={color} style={{ marginTop: '2px', opacity: 0.5, flexShrink: 0 }} />
    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', color: '#8b8b8b', lineHeight: 1.6 }}>
      {text}
    </p>
  </div>
)

export default function TextToImage() {
  const [mode, setMode] = useState('encrypt')
  const [carrierImg, setCarrierImg] = useState(null)
  const [stegoImg, setStegoImg] = useState(null)
  const [secret, setSecret] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRun = () => {
    setLoading(true); setOutput('')
    setTimeout(() => {
      setOutput(mode === 'encrypt' ? null : '// Decoded text will appear here')
      setLoading(false)
    }, 1500)
  }

  return (
    <PageLayout
      title="Text in Image"
      subtitle="Embed hidden text into the least significant bits of image pixels. The stego image is visually indistinguishable from the original."
      badge="Module 02 — Steganography"
      accentColor={ACCENT}
      icon={Image}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <TabSwitcher active={mode} onChange={setMode} accentColor={ACCENT} />

        {mode === 'encrypt' ? (
          <>
            <Tip text="Encryption: Upload a carrier image (PNG or BMP). Your secret text will be encoded into the image's pixel data using LSB steganography. Download the output image — it looks identical." />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                {label('Carrier Image (PNG or BMP)')}
                <UploadZone accept=".png,.bmp" label="carrier image" onFile={setCarrierImg} file={carrierImg} accentColor={ACCENT} />
              </div>
              <div>
                {label('Secret Text to Embed')}
                <textarea
                  style={{
                    width: '100%', backgroundColor: '#0f0f0f',
                    border: '1px solid #1e1e1e', borderRadius: '6px',
                    padding: '14px 16px', color: '#f0f0f0',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.82rem', lineHeight: 1.7,
                    resize: 'vertical', outline: 'none', minHeight: '140px',
                    transition: 'border-color 0.2s',
                  }}
                  placeholder="Enter the text message to hide inside the image..."
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
            <Tip text="Decryption: Upload the stego image (the image with hidden text). The tool will extract the LSB data from pixels and reconstruct the hidden text message." />
            <div style={{ maxWidth: '500px' }}>
              {label('Stego Image (image containing hidden text)')}
              <UploadZone accept=".png,.bmp" label="stego image" onFile={setStegoImg} file={stegoImg} accentColor={ACCENT} />
            </div>
            <div style={{
              backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a',
              borderRadius: '6px', padding: '1rem 1.5rem',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem', color: '#333', lineHeight: 1.8,
            }}>
              <p>// What happens:</p>
              <p style={{ color: '#2a2a2a' }}>1. Read each pixel's RGB values</p>
              <p style={{ color: '#2a2a2a' }}>2. Extract least significant bits</p>
              <p style={{ color: '#2a2a2a' }}>3. Reassemble bits into bytes → ASCII text</p>
              <p style={{ color: '#2a2a2a' }}>4. Output the hidden message</p>
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
            {mode === 'encrypt' ? 'Embed into Image →' : 'Extract from Image →'}
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