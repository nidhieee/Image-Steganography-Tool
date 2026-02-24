import React, { useState, useRef } from 'react'
import { UploadCloud, FileCheck, X, AlertCircle } from 'lucide-react'

export default function UploadZone({ accept, label, onFile, file, accentColor = '#00ff87' }) {
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef()

  const handleFile = (f) => {
    if (!f) return
    setError('')
    onFile(f)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `1px dashed ${dragging ? accentColor : '#222'}`,
          borderRadius: '8px',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          backgroundColor: dragging ? `${accentColor}08` : '#0f0f0f',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
        }}
        onMouseEnter={e => { if (!file) e.currentTarget.style.borderColor = '#333' }}
        onMouseLeave={e => { if (!file) e.currentTarget.style.borderColor = '#222' }}
      >
        <UploadCloud size={24} color={dragging ? accentColor : '#2a2a2a'} strokeWidth={1.5} />
        <div>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.85rem', color: '#555', marginBottom: '4px',
          }}>
            Drop {label} here or{' '}
            <span style={{ color: accentColor, cursor: 'pointer' }}>browse</span>
          </p>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem', color: '#2a2a2a',
          }}>
            {accept}
          </p>
        </div>
        <input ref={inputRef} type="file" accept={accept} style={{ display: 'none' }}
          onChange={e => e.target.files[0] && handleFile(e.target.files[0])} />
      </div>

      {file && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: `${accentColor}0d`,
          border: `1px solid ${accentColor}30`,
          borderRadius: '6px', padding: '10px 14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCheck size={14} color={accentColor} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem', color: accentColor,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '220px',
            }}>
              {file.name}
            </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem', color: '#8b8b8b',
            }}>
              {(file.size / 1024).toFixed(1)} KB
            </span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onFile(null) }}
            style={{ background: 'none', border: 'none', color: '#8b8b8b', cursor: 'pointer', display: 'flex' }}>
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  )
}