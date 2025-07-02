"use client"

import { useState } from "react"

export default function DebugLoginPage() {
  const [step, setStep] = useState(1)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testSupabase = async () => {
    try {
      addLog("Testing Supabase import...")
      const { createClient } = await import("@/lib/supabase/client")
      addLog("✅ Supabase client imported successfully")
      setStep(2)
    } catch (error) {
      addLog(`❌ Supabase import failed: ${error}`)
    }
  }

  const testProvider = async () => {
    try {
      addLog("Testing Supabase provider...")
      const { useSupabaseClient } = await import("@/components/providers/supabase-provider")
      addLog("✅ Supabase provider imported successfully")
      setStep(3)
    } catch (error) {
      addLog(`❌ Supabase provider failed: ${error}`)
    }
  }

  const testComponents = async () => {
    try {
      addLog("Testing UI components...")
      const { Button } = await import("@/components/ui/button")
      addLog("✅ UI components imported successfully")
      setStep(4)
    } catch (error) {
      addLog(`❌ UI components failed: ${error}`)
    }
  }

  const testComplete = () => {
    addLog("🎉 All tests passed! The issue might be environment-specific.")
  }

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'monospace', 
      backgroundColor: '#1a1a1a', 
      color: '#00ff00',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#fff', marginBottom: '20px' }}>🔍 Agape Debug Page</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#ffd93d' }}>System Info:</h2>
        <div style={{ background: '#2a2a2a', padding: '10px', borderRadius: '4px' }}>
          <div>URL: {typeof window !== 'undefined' ? window.location.href : 'Server-side'}</div>
          <div>User Agent: {typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}</div>
          <div>Timestamp: {new Date().toISOString()}</div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#ffd93d' }}>Progressive Tests:</h2>
        
        <button 
          onClick={testSupabase}
          style={{ 
            margin: '5px', 
            padding: '10px 20px', 
            backgroundColor: step >= 1 ? '#0070f3' : '#555',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          disabled={step > 1}
        >
          1. Test Supabase Import
        </button>

        <button 
          onClick={testProvider}
          style={{ 
            margin: '5px', 
            padding: '10px 20px', 
            backgroundColor: step >= 2 ? '#0070f3' : '#555',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          disabled={step < 2 || step > 2}
        >
          2. Test Provider
        </button>

        <button 
          onClick={testComponents}
          style={{ 
            margin: '5px', 
            padding: '10px 20px', 
            backgroundColor: step >= 3 ? '#0070f3' : '#555',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          disabled={step < 3 || step > 3}
        >
          3. Test Components
        </button>

        <button 
          onClick={testComplete}
          style={{ 
            margin: '5px', 
            padding: '10px 20px', 
            backgroundColor: step >= 4 ? '#00aa00' : '#555',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          disabled={step < 4}
        >
          4. Complete Test
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#ffd93d' }}>Test Logs:</h2>
        <div style={{ 
          background: '#2a2a2a', 
          padding: '10px', 
          borderRadius: '4px',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {logs.length === 0 ? (
            <div style={{ color: '#888' }}>No logs yet. Click "Test Supabase Import" to start.</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{ 
                marginBottom: '5px',
                color: log.includes('❌') ? '#ff6b6b' : log.includes('✅') ? '#6bcf7f' : '#00ff00'
              }}>
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', background: '#2d1b1b', borderRadius: '8px' }}>
        <h3 style={{ color: '#ff6b6b' }}>Instructions:</h3>
        <ol style={{ color: '#fff' }}>
          <li>Click the test buttons in order (1 → 2 → 3 → 4)</li>
          <li>Watch the logs for any errors</li>
          <li>Share the logs with me to identify the issue</li>
          <li>This page is completely separate from your main login</li>
        </ol>
      </div>

      <div style={{ marginTop: '20px' }}>
        <a 
          href="/login" 
          style={{ 
            color: '#0070f3', 
            textDecoration: 'underline',
            fontSize: '16px'
          }}
        >
          ← Back to Main Login (your original page is untouched)
        </a>
      </div>
    </div>
  )
}