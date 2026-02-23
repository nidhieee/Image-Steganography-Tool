import React, { useState } from 'react'
import { Layers, Info } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import TabSwitcher from '../components/TabSwitcher'
import UploadZone from '../components/UploadZone'
import OutputPanel from '../components/OutputPanel'

const ACCENT = '#ff3cac'

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

export default function ImageToImage() {
  const [mode, setMode] = useState('encrypt')
  const [carrierImg, setCarrierImg] = useState(null)
  const [secretImg, setSecretImg] = useState(null)
  const [stegoImg, setStegoImg] = useState(null)
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRun = () => {
    setLoading(true); setOutput('')
    setTimeout(() => { setOutput(null); setLoading(false) }, 1600)
  }

  return (
    <PageLayout
      title="Image in Image"
      subtitle="Conceal an entire secret image inside a carrier image by mixing bit planes. The output is visually indistinguishable from the carrier."
      badge="Module 03 — Steganography"
      accentColor={ACCENT}
      icon={Layers}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <TabSwitcher active={mode} onChange={setMode} accentColor={ACCENT} />

        {mode === 'encrypt' ? (
          <>
            <Tip text="Encryption: The carrier image's 4 most significant bits are preserved. The secret image's 4 MSBs are encoded into the carrier's 4 LSBs. Output looks identical to carrier." />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                {label('Carrier Image (the visible image)')}
                <UploadZone accept=".png,.bmp" label="carrier image" onFile={setCarrierImg} file={carrierImg} accentColor={ACCENT} />
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#2a2a2a', marginTop: '8px' }}>
                  // This is what people see
                </p>
              </div>
              <div>
                {label('Secret Image (to hide inside carrier)')}
                <UploadZone accept=".png,.bmp,.jpg" label="secret image" onFile={setSecretImg} file={secretImg} accentColor={ACCENT} />
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#2a2a2a', marginTop: '8px' }}>
                  // This is hidden from view
                </p>
              </div>
            </div>

            {/* Visual explanation */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              gap: '1px', backgroundColor: '#141414',
              border: '1px solid #141414', borderRadius: '6px', overflow: 'hidden',
            }}>
              {[
                { label: 'Carrier MSBs', val: '4 bits', desc: 'Kept intact', color: ACCENT },
                { label: 'Secret MSBs', val: '4 bits', desc: 'Extracted and mixed in', color: '#888' },
                { label: 'Output LSBs', val: '4 bits', desc: 'Carries hidden image', color: ACCENT },
              ].map(item => (
                <div key={item.label} style={{ backgroundColor: '#0a0a0a', padding: '1rem 1.2rem' }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#333', marginBottom: '4px' }}>{item.label}</p>
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', color: item.color, letterSpacing: '0.04em' }}>{item.val}</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', color: '#333' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <Tip text="Decryption: Upload the stego image. The tool will isolate and amplify the 4 least significant bits of each pixel to reconstruct and reveal the hidden image." />
            <div style={{ maxWidth: '500px' }}>
              {label('Stego Image (image containing hidden image)')}
              <UploadZone accept=".png,.bmp" label="stego image" onFile={setStegoImg} file={stegoImg} accentColor={ACCENT} />
            </div>
            <div style={{
              backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a',
              borderRadius: '6px', padding: '1rem 1.5rem',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem', color: '#333', lineHeight: 1.8,
            }}>
              <p>// What happens:</p>
              <p style={{ color: '#2a2a2a' }}>1. Read the 4 least significant bits from each pixel</p>
              <p style={{ color: '#2a2a2a' }}>2. Amplify (shift left by 4) to make them visible</p>
              <p style={{ color: '#2a2a2a' }}>3. Reconstruct and output the hidden image</p>
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
            {mode === 'encrypt' ? 'Merge Images →' : 'Reveal Hidden Image →'}
          </button>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: '#2a2a2a' }}>
            // Python API integration pending
          </span>
        </div>

        <OutputPanel output={output} type="image" loading={loading} accentColor={ACCENT} />
      </div>
    </PageLayout>
  )
}