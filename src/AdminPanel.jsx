import { useState, useEffect } from 'react';

const API = 'http://localhost:5000/api/admin';

export default function AdminPanel() {
  const [token, setToken] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ total: 0, new: 0, replied: 0, closed: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('flm_token');
    if (saved) setToken(saved);
  }, []);

  useEffect(() => {
    if (token) loadContacts();
  }, [token]);

  const login = async () => {
    if (!creds.username || !creds.password) {
      setError('Awaiting identification fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds)
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('flm_token', data.token);
        setToken(data.token);
      } else {
        setError(data.error || 'Access denied. Security handshake failed.');
      }
    } catch {
      setError('Core disconnect. Verify server environment.');
    }
    setLoading(false);
  };

  const loadContacts = async () => {
    try {
      const res = await fetch(`${API}/contacts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401) {
        logout();
        return;
      }
      const data = await res.json();
      setContacts(data);
      setStats({
        total:   data.length,
        new:     data.filter(c => c.status === 'new').length,
        replied: data.filter(c => c.status === 'replied').length,
        closed:  data.filter(c => c.status === 'closed').length,
      });
    } catch {
      console.error('Telemetry matrix failure.');
    }
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API}/contacts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    loadContacts();
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Purge this record from core memory?')) return;
    await fetch(`${API}/contacts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    loadContacts();
  };

  const logout = () => {
    localStorage.removeItem('flm_token');
    setToken(null);
    setContacts([]);
  };

  const statusColor = s => s === 'new' ? '#00ffcc' : s === 'replied' ? '#38bdf8' : '#64748b';
  const statusGlow = s => s === 'new' ? '0 0 12px rgba(0,255,204,0.3)' : s === 'replied' ? '0 0 12px rgba(56,189,248,0.2)' : 'none';

  // --- NEXT-GEN AUTHENTICATION INTERFACE ---
  if (!token) return (
    <div style={{
      minHeight: '100vh', background: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '"SF Pro Display", -apple-system, system-ui, sans-serif', padding: 24
    }}>
      <div style={{
        background: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        padding: '56px 40px', borderRadius: '24px', width: '100%', maxWidth: 380,
        border: '1px solid rgba(255, 255, 255, 0.05)', boxShadow: '0 30px 60px rgba(0,0,0,0.4)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #00ffcc, #38bdf8)', boxShadow: '0 0 20px rgba(0,255,204,0.4)' }} />
        </div>
        <h2 style={{
          color: '#ffffff', marginBottom: 6, fontSize: '1.2rem',
          letterSpacing: '4px', fontWeight: 600, textAlign: 'center', textTransform: 'uppercase'
        }}>
          FLM GRAPH
        </h2>
        <p style={{ color: '#64748b', fontSize: '10px', textAlign: 'center', letterSpacing: '1.5px', marginBottom: 40, textTransform: 'uppercase' }}>
          Secure Operator Gate
        </p>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px',
            padding: '14px', marginBottom: 24, color: '#fca5a5', fontSize: '12px', textAlign: 'center'
          }}>{error}</div>
        )}

        <input
          placeholder="OPERATOR ID"
          value={creds.username}
          onChange={e => setCreds({ ...creds, username: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{
            width: '100%', padding: '16px', marginBottom: 14,
            background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255,255,255,0.03)',
            color: '#fff', borderRadius: '14px', fontSize: '11px', letterSpacing: '1.5px',
            outline: 'none', fontFamily: 'inherit', transition: 'all 0.2s'
          }}
        />
        <input
          type="password"
          placeholder="SECURITY KEY"
          value={creds.password}
          onChange={e => setCreds({ ...creds, password: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{
            width: '100%', padding: '16px', marginBottom: 28,
            background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255,255,255,0.03)',
            color: '#fff', borderRadius: '14px', fontSize: '11px', letterSpacing: '1.5px',
            outline: 'none', fontFamily: 'inherit', transition: 'all 0.2s'
          }}
        />
        <button
          onClick={login}
          disabled={loading}
          style={{
            width: '100%', padding: '16px',
            background: loading ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #00ffcc 0%, #38bdf8 100%)',
            color: loading ? '#64748b' : '#020617', border: 'none', borderRadius: '14px',
            cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 600, letterSpacing: '1.5px',
            fontSize: '11px', textTransform: 'uppercase', transition: 'all 0.3s',
            boxShadow: loading ? 'none' : '0 12px 30px rgba(0,255,204,0.2)'
          }}>
          {loading ? 'Initializing Interface...' : 'Establish Connection'}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh', background: '#030712',
      padding: '56px max(5%, 24px) 100px', color: '#f3f4f6',
      fontFamily: '"SF Pro Display", -apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }}>
      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 48px;
        }
        .stat-card {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 28px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }
        .table-view-matrix { display: block; }
        .cards-view-matrix { display: none; }
        
        .editorial-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 10px;
          font-size: 13px;
          margin-top: -10px;
        }
        .editorial-table th {
          padding: 16px 24px;
          text-align: left;
          color: #64748b;
          font-weight: 500;
          letter-spacing: 1.5px;
          font-size: 10px;
          text-transform: uppercase;
        }
        .editorial-table td {
          padding: 22px 24px;
          vertical-align: middle;
          background: rgba(15, 23, 42, 0.3);
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: all 0.25s ease;
        }
        .editorial-table td:first-child {
          border-left: 1px solid rgba(255, 255, 255, 0.03);
          border-top-left-radius: 16px;
          border-bottom-left-radius: 16px;
        }
        .editorial-table td:last-child {
          border-right: 1px solid rgba(255, 255, 255, 0.03);
          border-top-right-radius: 16px;
          border-bottom-right-radius: 16px;
        }
        .editorial-table tr:hover td {
          background: rgba(30, 41, 59, 0.5);
          border-color: rgba(56, 189, 248, 0.15);
          transform: translateY(-1px);
        }
        .select-custom {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: #ffffff;
          padding: 8px 14px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.5px;
          outline: none;
          cursor: pointer;
          border-radius: 10px;
          appearance: none;
          -webkit-appearance: none;
          transition: all 0.2s;
        }
        .select-custom:hover {
          border-color: rgba(255,255,255,0.15);
        }
        .btn-delete-minimal {
          background: transparent;
          border: none;
          color: #475569;
          cursor: pointer;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .btn-delete-minimal:hover {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }
        @media (max-width: 1100px) {
          .table-view-matrix { display: none; }
          .cards-view-matrix { display: flex; flex-direction: column; gap: 16px; }
        }
      `}</style>

      {/* --- CYBER HEADER ARCHITECTURE --- */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 56,
        paddingBottom: 24,
        borderBottom: '1px solid rgba(255,255,255,0.04)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ffcc', boxShadow: '0 0 10px #00ffcc' }} />
            <h1 style={{ letterSpacing: '3px', fontSize: '1.25rem', margin: 0, fontWeight: 600, textTransform: 'uppercase' }}>
              Focal Length
            </h1>
          </div>
          <p style={{ margin: '6px 0 0 20px', fontSize: '9px', letterSpacing: '1.5px', color: '#64748b', textTransform: 'uppercase', fontWeight: 500 }}>
            Inquiry Telemetry Control
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={loadContacts} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#f3f4f6', padding: '8px 16px', borderRadius: '10px', fontSize: '11px', cursor: 'pointer', transition: 'all 0.2s' }}>
            Sync Feed
          </button>
          <button onClick={logout} style={{ background: 'transparent', border: '1px solid transparent', color: '#64748b', padding: '8px 12px', fontSize: '11px', cursor: 'pointer', transition: 'all 0.2s' }}>
            Disconnect
          </button>
        </div>
      </div>

      {/* --- NEXT-GEN VISUAL METRICS --- */}
      <div className="stats-grid">
        {[
          ['Total Feed Packet', stats.total, '#ffffff'],
          ['Unresolved Actions', stats.new, '#00ffcc'],
          ['Active Diagnostics', stats.replied, '#38bdf8'],
          ['Archived Vault', stats.closed, '#64748b']
        ].map(([label, val, tint]) => (
          <div key={label} className="stat-card">
            <div style={{ fontSize: '9px', color: '#64748b', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 500, marginBottom: 14 }}>
              {label}
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 600, color: tint, lineHeight: 1, letterSpacing: '-0.5px', textShadow: tint !== '#ffffff' ? `0 0 20px ${tint}33` : 'none' }}>
              {val}
            </div>
          </div>
        ))}
      </div>

      {/* --- DESKTOP MATRIX SYSTEM --- */}
      <div className="table-view-matrix">
        <table className="editorial-table">
          <thead>
            <tr>
              {['Origin Client', 'Routing Alias', 'Focus Classification', 'Data Extract', 'Timestamp', 'Pipeline Frame', ''].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c._id}>
                <td style={{ fontWeight: 600, color: '#ffffff', fontSize: '13px' }}>{c.name}</td>
                <td style={{ color: '#94a3b8', fontSize: '12px', fontFamily: 'monospace' }}>{c.contact}</td>
                <td>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: '#38bdf8', background: 'rgba(56,189,248,0.06)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(56,189,248,0.1)' }}>
                    {c.service || 'Standard Portfolio'}
                  </span>
                </td>
                <td style={{ color: '#cbd5e1', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 32 }} title={c.message}>
                  {c.message || '—'}
                </td>
                <td style={{ color: '#64748b', fontSize: '12px' }}>
                  {new Date(c.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td>
                  <select
                    className="select-custom"
                    value={c.status}
                    onChange={e => updateStatus(c._id, e.target.value)}
                    style={{ color: statusColor(c.status), boxShadow: statusGlow(c.status), borderColor: `${statusColor(c.status)}33` }}
                  >
                    <option value="new">Live Pulse</option>
                    <option value="replied">Engaged</option>
                    <option value="closed">Concluded</option>
                  </select>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn-delete-minimal" onClick={() => deleteContact(c._id)}>Purge</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {contacts.length === 0 && (
          <div style={{ padding: '72px 24px', textAlign: 'center', color: '#475569', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', background: 'rgba(15,23,42,0.15)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.02)' }}>
            No telemetry logs queued.
          </div>
        )}
      </div>

      {/* --- RESPONSIVE MOBILE MATRIX ARCHITECTURE --- */}
      <div className="cards-view-matrix">
        {contacts.map(c => (
          <div key={c._id} style={{
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '20px', padding: '28px 24px',
            border: '1px solid rgba(255, 255, 255, 0.04)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>{c.name}</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', fontFamily: 'monospace' }}>{c.contact}</div>
              </div>
              <div style={{ fontSize: '11px', color: '#475569' }}>
                {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <span style={{ fontSize: '10px', fontWeight: 500, color: '#38bdf8', background: 'rgba(56,189,248,0.06)', padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase', border: '1px solid rgba(56,189,248,0.1)' }}>
                {c.service || 'Standard Portfolio'}
              </span>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.15)', padding: '16px', borderRadius: '12px',
              fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: 20, wordBreak: 'break-word',
              border: '1px solid rgba(255,255,255,0.01)'
            }}>
              {c.message || <span style={{ color: '#475569' }}>Packet context is empty.</span>}
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
              <select
                className="select-custom"
                value={c.status}
                onChange={e => updateStatus(c._id, e.target.value)}
                style={{ flex: 1, color: statusColor(c.status), padding: '12px', height: '42px', borderRadius: '12px', borderColor: `${statusColor(c.status)}33` }}
              >
                <option value="new">Live Pulse</option>
                <option value="replied">Engaged</option>
                <option value="closed">Concluded</option>
              </select>
              <button className="btn-delete-minimal" onClick={() => deleteContact(c._id)} style={{ border: '1px solid rgba(255,255,255,0.03)', padding: '12px 16px', height: '42px', borderRadius: '12px' }}>
                Purge
              </button>
            </div>
          </div>
        ))}
        {contacts.length === 0 && (
          <div style={{ padding: '48px 16px', textAlign: 'center', color: '#475569', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            No telemetry logs queued.
          </div>
        )}
      </div>
    </div>
  );
}