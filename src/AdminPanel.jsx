import { useState, useEffect } from 'react';

const API = 'http://localhost:5000/api/admin';

export default function AdminPanel() {
  const [token, setToken]       = useState(null);
  const [contacts, setContacts] = useState([]);
  const [creds, setCreds]       = useState({ username: '', password: '' });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [stats, setStats]       = useState({ total: 0, new: 0, replied: 0, closed: 0 });

  // Check localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('flm_token');
    if (saved) setToken(saved);
  }, []);

  // Load contacts whenever token changes
  useEffect(() => {
    if (token) loadContacts();
  }, [token]);

  const login = async () => {
    if (!creds.username || !creds.password) {
      setError('Enter username and password');
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
        setError(data.error || 'Wrong credentials');
      }
    } catch {
      setError('Cannot connect to server. Is backend running?');
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
      console.error('Failed to load contacts');
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
    if (!window.confirm('Delete this enquiry?')) return;
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

  const statusColor = s =>
    s === 'new' ? '#e74c3c' : s === 'replied' ? '#2ecc71' : '#666';

  // ── LOGIN SCREEN ──
  if (!token) return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      <div style={{
        background: '#111', padding: 40, borderRadius: 8,
        width: 340, border: '1px solid #1e1e1e',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
      }}>
        <h2 style={{
          color: '#fff', marginBottom: 6,
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '2rem', letterSpacing: 4
        }}>
          FLM <span style={{ color: '#c0392b' }}>ADMIN</span>
        </h2>
        <p style={{ color: '#444', fontSize: 12, marginBottom: 28 }}>
          Focal Length Media Dashboard
        </p>

        {error && (
          <div style={{
            background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.3)',
            borderRadius: 4, padding: '10px 12px', marginBottom: 16,
            color: '#e74c3c', fontSize: 12
          }}>{error}</div>
        )}

        <input
          placeholder="Username"
          value={creds.username}
          onChange={e => setCreds({ ...creds, username: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{
            width: '100%', padding: 12, marginBottom: 10,
            background: '#1a1a1a', border: '1px solid #2a2a2a',
            color: '#fff', borderRadius: 4, fontSize: 13,
            outline: 'none', fontFamily: 'Montserrat, sans-serif'
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={creds.password}
          onChange={e => setCreds({ ...creds, password: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{
            width: '100%', padding: 12, marginBottom: 20,
            background: '#1a1a1a', border: '1px solid #2a2a2a',
            color: '#fff', borderRadius: 4, fontSize: 13,
            outline: 'none', fontFamily: 'Montserrat, sans-serif'
          }}
        />
        <button
          onClick={login}
          disabled={loading}
          style={{
            width: '100%', padding: 13,
            background: loading ? '#7a2020' : '#c0392b',
            color: '#fff', border: 'none', borderRadius: 4,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'Bebas Neue, sans-serif',
            letterSpacing: 3, fontSize: '1.05rem',
            transition: 'background .2s'
          }}>
          {loading ? 'LOGGING IN...' : 'LOGIN'}
        </button>
      </div>
    </div>
  );

  // ── DASHBOARD ──
  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0a',
      padding: '24px 32px', color: '#fff',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 28
      }}>
        <h1 style={{
          fontFamily: 'Bebas Neue, sans-serif',
          letterSpacing: 4, fontSize: '2rem'
        }}>
          FLM <span style={{ color: '#c0392b' }}>ENQUIRIES</span>
        </h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={loadContacts} style={{
            padding: '7px 14px', background: 'transparent',
            border: '1px solid #2a2a2a', color: '#888',
            cursor: 'pointer', borderRadius: 4, fontSize: 12
          }}>↻ Refresh</button>
          <button onClick={logout} style={{
            padding: '7px 14px', background: 'transparent',
            border: '1px solid #2a2a2a', color: '#666',
            cursor: 'pointer', borderRadius: 4, fontSize: 12
          }}>Logout</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        gap: 14, marginBottom: 28
      }}>
        {[
          ['Total Enquiries', stats.total, '#fff'],
          ['New', stats.new, '#e74c3c'],
          ['Replied', stats.replied, '#2ecc71'],
          ['Closed', stats.closed, '#666']
        ].map(([label, val, color]) => (
          <div key={label} style={{
            background: '#111', border: '1px solid #1e1e1e',
            borderRadius: 6, padding: '16px 20px'
          }}>
            <div style={{
              fontSize: 10, color: '#444', letterSpacing: 3,
              textTransform: 'uppercase', marginBottom: 8
            }}>{label}</div>
            <div style={{
              fontSize: 30, fontFamily: 'Bebas Neue, sans-serif', color
            }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{
        background: '#111', border: '1px solid #1e1e1e',
        borderRadius: 6, overflowX: 'auto'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
              {['Name', 'Contact', 'Service', 'Message', 'Date', 'Status', 'Actions'].map(h => (
                <th key={h} style={{
                  padding: '12px 16px', textAlign: 'left',
                  color: '#444', fontWeight: 500,
                  letterSpacing: 2, fontSize: 10,
                  textTransform: 'uppercase'
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c._id}
                style={{ borderBottom: '1px solid #161616' }}
                onMouseEnter={e => e.currentTarget.style.background = '#161616'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '13px 16px', fontWeight: 500 }}>{c.name}</td>
                <td style={{ padding: '13px 16px', color: '#aaa' }}>{c.contact}</td>
                <td style={{ padding: '13px 16px', color: '#c0392b', fontSize: 12 }}>
                  {c.service || '—'}
                </td>
                <td style={{
                  padding: '13px 16px', color: '#666',
                  maxWidth: 200, overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                }}>
                  {c.message || '—'}
                </td>
                <td style={{ padding: '13px 16px', color: '#444', fontSize: 11, whiteSpace: 'nowrap' }}>
                  {new Date(c.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit', month: 'short', year: 'numeric'
                  })}
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <select
                    value={c.status}
                    onChange={e => updateStatus(c._id, e.target.value)}
                    style={{
                      background: '#1a1a1a',
                      border: `1px solid ${statusColor(c.status)}55`,
                      color: statusColor(c.status),
                      padding: '5px 8px', borderRadius: 4,
                      cursor: 'pointer', fontSize: 12,
                      fontFamily: 'Montserrat, sans-serif'
                    }}>
                    <option value="new">New</option>
                    <option value="replied">Replied</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <button
                    onClick={() => deleteContact(c._id)}
                    style={{
                      padding: '5px 12px', background: 'transparent',
                      border: '1px solid #c0392b44', color: '#c0392b',
                      cursor: 'pointer', borderRadius: 4, fontSize: 11
                    }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan={7} style={{
                  padding: 40, textAlign: 'center', color: '#333',
                  fontFamily: 'Bebas Neue, sans-serif',
                  letterSpacing: 3, fontSize: '1.1rem'
                }}>
                  NO ENQUIRIES YET
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}