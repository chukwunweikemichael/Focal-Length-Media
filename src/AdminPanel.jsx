import { useState, useEffect } from 'react';
import API_URL from './config';

const API = `${API_URL}/api/admin`;

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
      setError('Please fill in all identification fields.');
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
        setError(data.error || 'Authentication failed. Please check your credentials.');
      }
    } catch {
      setError('Server connection error. Please verify your environment.');
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
      console.error('Failed to fetch contact logs.');
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
    if (!window.confirm('Are you sure you want to permanently delete this record?')) return;
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

  // Modern, clean, professional semantic badges
  const getStatusStyles = s => {
    if (s === 'new') return { bg: '#e0f2fe', text: '#0369a1', dot: '#0ea5e9' };
    if (s === 'replied') return { bg: '#dcfce7', text: '#15803d', dot: '#22c55e' };
    return { bg: '#f1f5f9', text: '#475569', dot: '#94a3b8' };
  };

  // --- PREMIUM LOGIN INTERFACE ---
  if (!token) return (
    <div style={{
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', 
      padding: 24
    }}>
      <div style={{
        background: '#ffffff',
        padding: '48px 40px', borderRadius: '24px', width: '100%', maxWidth: 400,
        boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'linear-gradient(135deg, #4f46e5, #6366f1)', boxShadow: '0 8px 16px rgba(79, 70, 229, 0.25)' }} />
        </div>
        <h2 style={{
          color: '#0f172a', marginBottom: 6, fontSize: '1.5rem',
          fontWeight: 700, textAlign: 'center', letterSpacing: '-0.5px'
        }}>
          FLM Graph
        </h2>
        <p style={{ color: '#64748b', fontSize: '13px', textAlign: 'center', marginBottom: 32 }}>
          Secure Operator Terminal
        </p>

        {error && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '12px',
            padding: '14px', marginBottom: 20, color: '#991b1b', fontSize: '13px', textAlign: 'center'
          }}>{error}</div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: 6, letterSpacing: '0.5px' }}>OPERATOR ID</label>
          <input
            placeholder="Enter your ID"
            value={creds.username}
            onChange={e => setCreds({ ...creds, username: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{
              width: '100%', padding: '14px 16px',
              background: '#f8fafc', border: '1px solid #cbd5e1',
              color: '#0f172a', borderRadius: '12px', fontSize: '14px',
              outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: 6, letterSpacing: '0.5px' }}>SECURITY KEY</label>
          <input
            type="password"
            placeholder="••••••••"
            value={creds.password}
            onChange={e => setCreds({ ...creds, password: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{
              width: '100%', padding: '14px 16px',
              background: '#f8fafc', border: '1px solid #cbd5e1',
              color: '#0f172a', borderRadius: '12px', fontSize: '14px',
              outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={login}
          disabled={loading}
          style={{
            width: '100%', padding: '16px',
            background: loading ? '#94a3b8' : 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
            color: '#ffffff', border: 'none', borderRadius: '12px',
            cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 600,
            fontSize: '14px', transition: 'all 0.2s',
            boxShadow: loading ? 'none' : '0 10px 20px -5px rgba(79, 70, 229, 0.3)'
          }}>
          {loading ? 'Establishing Session...' : 'Connect to Console'}
        </button>
      </div>
    </div>
  );

  // --- PREMIUM DASHBOARD INTERFACE ---
  return (
    <div style={{
      minHeight: '100vh', background: '#f8fafc',
      padding: '40px max(5%, 24px) 80px', color: '#0f172a',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      WebkitFontSmoothing: 'antialiased', boxSizing: 'border-box'
    }}>
      <style>{`
        * { box-sizing: border-box; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }
        .stat-card {
          background: #ffffff;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(15, 23, 42, 0.05);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 16px -4px rgba(15, 23, 42, 0.04);
        }
        .table-container {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid rgba(15, 23, 42, 0.05);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          overflow: hidden;
        }
        .table-view-matrix { display: block; }
        .cards-view-matrix { display: none; }
        
        .editorial-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .editorial-table th {
          padding: 16px 24px;
          text-align: left;
          color: #64748b;
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: #f1f5f9;
          border-bottom: 1px solid #e2e8f0;
        }
        .editorial-table td {
          padding: 18px 24px;
          vertical-align: middle;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
          transition: background 0.2s;
        }
        .editorial-table tr:last-child td {
          border-bottom: none;
        }
        .editorial-table tr:hover td {
          background: #f8fafc;
        }
        .select-custom {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 8px 32px 8px 12px;
          font-size: 13px;
          font-weight: 600;
          outline: none;
          cursor: pointer;
          border-radius: 8px;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 8px center;
          background-size: 16px;
          transition: all 0.2s;
        }
        .select-custom:hover {
          border-color: #94a3b8;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .btn-delete-minimal {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .btn-delete-minimal:hover {
          color: #ef4444;
          background: #fef2f2;
        }
        @media (max-width: 1024px) {
          .table-view-matrix { display: none; }
          .cards-view-matrix { display: flex; flex-direction: column; gap: 16px; }
        }
      `}</style>

      {/* --- TOP BRAND NAV ARCHITECTURE --- */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
        paddingBottom: 24,
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
            <h1 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.5px' }}>
              Focal Length
            </h1>
          </div>
          <p style={{ margin: '4px 0 0 22px', fontSize: '13px', color: '#64748b', fontWeight: 400 }}>
            Inquiry Management Matrix
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={loadContacts} style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#334155', padding: '10px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            Sync Feed
          </button>
          <button onClick={logout} style={{ background: 'transparent', border: '1px solid transparent', color: '#64748b', padding: '10px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
            Disconnect
          </button>
        </div>
      </div>

      {/* --- METRIC CARDS --- */}
      <div className="stats-grid">
        {[
          ['Total Feed Packet', stats.total, '#0f172a'],
          ['Unresolved Actions', stats.new, '#0284c7'],
          ['Active Diagnostics', stats.replied, '#16a34a'],
          ['Archived Vault', stats.closed, '#64748b']
        ].map(([label, val, tint]) => (
          <div key={label} className="stat-card">
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
              {label}
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: 700, color: tint, lineHeight: 1 }}>
              {val}
            </div>
          </div>
        ))}
      </div>

      {/* --- DESKTOP MATRIX WORKSTATION --- */}
      <div className="table-container table-view-matrix">
        <table className="editorial-table">
          <thead>
            <tr>
              {['Origin Client', 'Routing Alias', 'Focus Classification', 'Data Extract', 'Timestamp', 'Pipeline Frame', ''].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => {
              const status = getStatusStyles(c.status);
              return (
                <tr key={c._id}>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{c.name}</td>
                  <td style={{ color: '#64748b', fontFamily: 'monospace', fontSize: '13px' }}>{c.contact}</td>
                  <td>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb', background: '#eff6ff', padding: '6px 12px', borderRadius: '8px' }}>
                      {c.service || 'Standard Portfolio'}
                    </span>
                  </td>
                  <td style={{ color: '#475569', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={c.message}>
                    {c.message || '—'}
                  </td>
                  <td style={{ color: '#64748b' }}>
                    {new Date(c.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td>
                    <div style={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', width: '6px', height: '6px', borderRadius: '50%', background: status.dot }} />
                      <select
                        className="select-custom"
                        value={c.status}
                        onChange={e => updateStatus(c._id, e.target.value)}
                        style={{ 
                          color: status.text, 
                          background: status.bg, 
                          borderColor: 'transparent',
                          paddingLeft: '26px'
                        }}
                      >
                        <option value="new">Live Pulse</option>
                        <option value="replied">Engaged</option>
                        <option value="closed">Concluded</option>
                      </select>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn-delete-minimal" onClick={() => deleteContact(c._id)}>Purge</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {contacts.length === 0 && (
          <div style={{ padding: '80px 24px', textAlign: 'center', color: '#64748b', fontSize: '14px', background: '#ffffff' }}>
            No telemetry logs queued in the network.
          </div>
        )}
      </div>

      {/* --- PERFECT MOBILE CARDS --- */}
      <div className="cards-view-matrix">
        {contacts.map(c => {
          const status = getStatusStyles(c.status);
          return (
            <div key={c._id} style={{
              background: '#ffffff',
              borderRadius: '16px', padding: '24px',
              border: '1px solid rgba(15, 23, 42, 0.05)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{c.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', fontFamily: 'monospace' }}>{c.contact}</div>
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>
                  {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', background: '#eff6ff', padding: '6px 10px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {c.service || 'Standard Portfolio'}
                </span>
              </div>

              <div style={{
                background: '#f8fafc', padding: '16px', borderRadius: '12px',
                fontSize: '14px', color: '#475569', lineHeight: '1.5', marginBottom: 20, wordBreak: 'break-word',
                border: '1px solid #e2e8f0'
              }}>
                {c.message || <span style={{ color: '#94a3b8', italic: true }}>Packet context is empty.</span>}
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <span style={{ position: 'absolute', left: '14px', width: '6px', height: '6px', borderRadius: '50%', background: status.dot }} />
                  <select
                    className="select-custom"
                    value={c.status}
                    onChange={e => updateStatus(c._id, e.target.value)}
                    style={{ 
                      flex: 1, 
                      color: status.text, 
                      background: status.bg, 
                      borderColor: 'transparent',
                      padding: '12px 32px 12px 30px', 
                      height: '46px', 
                      borderRadius: '12px' 
                    }}
                  >
                    <option value="new">Live Pulse</option>
                    <option value="replied">Engaged</option>
                    <option value="closed">Concluded</option>
                  </select>
                </div>
                <button className="btn-delete-minimal" onClick={() => deleteContact(c._id)} style={{ border: '1px solid #cbd5e1', padding: '12px 16px', height: '46px', borderRadius: '12px', background: '#ffffff' }}>
                  Purge
                </button>
              </div>
            </div>
          );
        })}
        {contacts.length === 0 && (
          <div style={{ padding: '48px 16px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
            No telemetry logs queued in the network.
          </div>
        )}
      </div>
    </div>
  );
}