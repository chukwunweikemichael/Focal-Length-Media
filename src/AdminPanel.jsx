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
  
  // --- NEW ADDITIONS: SEARCH, MODAL & FILTER STATES ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

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
    if (selectedContact && selectedContact._id === id) {
      setSelectedContact({ ...selectedContact, status });
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this record?')) return;
    await fetch(`${API}/contacts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (selectedContact && selectedContact._id === id) {
      setSelectedContact(null);
    }
    loadContacts();
  };

  const logout = () => {
    localStorage.removeItem('flm_token');
    setToken(null);
    setContacts([]);
  };

  // --- NEW ADDITION: EXPORT TO EXCEL/CSV DATA TRUCK ---
  const exportToCSV = () => {
    if (contacts.length === 0) return;
    const headers = ['Name', 'Contact', 'Service', 'Message', 'Date', 'Status\n'];
    const rows = contacts.map(c => [
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.contact.replace(/"/g, '""')}"`,
      `"${(c.service || 'Standard').replace(/"/g, '""')}"`,
      `"${(c.message || '').replace(/"/g, '""')}"`,
      `"${new Date(c.createdAt).toLocaleDateString()}"`,
      `"${c.status}"\n`
    ]);
    
    const blob = new Blob([headers.join(','), ...rows.flatMap(r => r.join(','))], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `FLM_Telemetry_Report_${new Date().toISOString().split('T')[0]}.csv`);
    a.click();
  };

  // --- FILTER & SEARCH PROCESSING PIPELINE ---
  const filteredContacts = contacts.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.message && c.message.toLowerCase().includes(searchQuery.toLowerCase()));
      
    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch && c.status === activeFilter;
  });

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
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
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
        <h2 style={{ color: '#0f172a', marginBottom: 6, fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', letterSpacing: '-0.5px' }}>FLM Graph</h2>
        <p style={{ color: '#64748b', fontSize: '13px', textAlign: 'center', marginBottom: 32 }}>Secure Operator Terminal</p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '12px', padding: '14px', marginBottom: 20, color: '#991b1b', fontSize: '13px', textAlign: 'center' }}>{error}</div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: 6, letterSpacing: '0.5px' }}>OPERATOR ID</label>
          <input
            placeholder="Enter your ID"
            value={creds.username}
            onChange={e => setCreds({ ...creds, username: e.target.value })}
            style={{ width: '100%', padding: '14px 16px', background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', borderRadius: '12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: 6, letterSpacing: '0.5px' }}>SECURITY KEY</label>
          <input
            type="password"
            placeholder="••••••••"
            value={creds.password}
            onChange={e => setCreds({ ...creds, password: e.target.value })}
            style={{ width: '100%', padding: '14px 16px', background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', borderRadius: '12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <button onClick={login} disabled={loading} style={{ width: '100%', padding: '16px', background: loading ? '#94a3b8' : 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)', color: '#ffffff', border: 'none', borderRadius: '12px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '14px', boxShadow: loading ? 'none' : '0 10px 20px -5px rgba(79, 70, 229, 0.3)' }}>
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
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }
        .stat-card {
          background: #ffffff;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(15, 23, 42, 0.05);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 16px -4px rgba(15, 23, 42, 0.04);
        }
        .stat-card.active-filter {
          border-color: #4f46e5;
          background: #fafafa;
          box-shadow: 0 0 0 1px #4f46e5;
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
        
        .editorial-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .editorial-table th {
          padding: 16px 24px; text-align: left; color: #64748b; font-weight: 600; font-size: 11px;
          text-transform: uppercase; letter-spacing: 0.5px; background: #f1f5f9; border-bottom: 1px solid #e2e8f0;
        }
        .editorial-table td { padding: 18px 24px; vertical-align: middle; border-bottom: 1px solid #f1f5f9; color: #334155; }
        .editorial-table tr:last-child td { border-bottom: none; }
        .clickable-row { cursor: pointer; transition: background 0.15s; }
        .clickable-row:hover td { background: #f8fafc; }
        
        .search-bar-input {
          width: 100%; max-width: 360px; padding: 12px 16px;
          border: 1px solid #cbd5e1; background: #ffffff; color: #0f172a;
          border-radius: 12px; font-size: 14px; outline: none; transition: all 0.2s;
        }
        .search-bar-input:focus { border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1); }
        
        .select-custom {
          background: #ffffff; border: 1px solid #cbd5e1; padding: 8px 32px 8px 12px;
          font-size: 13px; font-weight: 600; outline: none; cursor: pointer; border-radius: 8px;
          appearance: none; -webkit-appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat; background-position: right 8px center; background-size: 16px; transition: all 0.2s;
        }
        .select-custom:hover { border-color: #94a3b8; }
        .btn-delete-minimal {
          background: transparent; border: none; color: #94a3b8; cursor: pointer; font-size: 12px;
          font-weight: 600; text-transform: uppercase; padding: 8px 12px; border-radius: 8px; transition: all 0.2s;
        }
        .btn-delete-minimal:hover { color: #ef4444; background: #fef2f2; }
        @media (max-width: 1024px) {
          .table-view-matrix { display: none; }
          .cards-view-matrix { display: flex; flex-direction: column; gap: 16px; }
          .search-bar-input { max-width: 100%; }
          .header-actions-panel { width: 100%; flex-direction: column; gap: 16px; align-items: stretch !important; }
        }
      `}</style>

      {/* --- TOP BRAND NAV ARCHITECTURE --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, paddingBottom: 24, borderBottom: '1px solid #e2e8f0' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
            <h1 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.5px' }}>Focal Length</h1>
          </div>
          <p style={{ margin: '4px 0 0 22px', fontSize: '13px', color: '#64748b' }}>Inquiry Management Matrix</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={exportToCSV} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', padding: '10px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
            Export CSV File
          </button>
          <button onClick={loadContacts} style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#334155', padding: '10px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            Sync Feed
          </button>
          <button onClick={logout} style={{ background: 'transparent', border: '1px solid transparent', color: '#64748b', padding: '10px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            Disconnect
          </button>
        </div>
      </div>

      {/* --- METRIC CARDS WITH NEW CLICK TO FILTER FUNCTION --- */}
      <div className="stats-grid">
        {[
          ['Total Feed Packet', stats.total, '#0f172a', 'all'],
          ['Unresolved Actions', stats.new, '#0284c7', 'new'],
          ['Active Diagnostics', stats.replied, '#16a34a', 'replied'],
          ['Archived Vault', stats.closed, '#64748b', 'closed']
        ].map(([label, val, tint, type]) => (
          <div 
            key={label} 
            className={`stat-card ${activeFilter === type ? 'active-filter' : ''}`}
            onClick={() => setActiveFilter(type)}
            title={`Click to filter by ${type}`}
          >
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
              {label}
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: 700, color: tint, lineHeight: 1 }}>
              {val}
            </div>
          </div>
        ))}
      </div>

      {/* --- NEW FILTERS & ENGINE CONTROLS PANEL --- */}
      <div className="header-actions-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: 24 }}>
        <input 
          className="search-bar-input"
          placeholder="🔍 Search name, contact or message..." 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {activeFilter !== 'all' && (
          <button onClick={() => setActiveFilter('all')} style={{ background: '#f1f5f9', border: 'none', color: '#475569', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            Clear Active Filter ({activeFilter}) ×
          </button>
        )}
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
            {filteredContacts.map(c => {
              const status = getStatusStyles(c.status);
              return (
                <tr key={c._id} className="clickable-row">
                  <td onClick={() => setSelectedContact(c)} style={{ fontWeight: 600, color: '#0f172a' }}>{c.name}</td>
                  <td onClick={() => setSelectedContact(c)} style={{ color: '#64748b', fontFamily: 'monospace', fontSize: '13px' }}>{c.contact}</td>
                  <td onClick={() => setSelectedContact(c)}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb', background: '#eff6ff', padding: '6px 12px', borderRadius: '8px' }}>
                      {c.service || 'Standard Portfolio'}
                    </span>
                  </td>
                  <td onClick={() => setSelectedContact(c)} style={{ color: '#475569', maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.message || '—'}
                  </td>
                  <td onClick={() => setSelectedContact(c)} style={{ color: '#64748b' }}>
                    {new Date(c.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td>
                    <div style={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', width: '6px', height: '6px', borderRadius: '50%', background: status.dot }} />
                      <select
                        className="select-custom"
                        value={c.status}
                        onChange={e => updateStatus(c._id, e.target.value)}
                        style={{ color: status.text, background: status.bg, borderColor: 'transparent', paddingLeft: '26px' }}
                      >
                        <option value="new">Live Pulse</option>
                        <option value="replied">Engaged</option>
                        <option value="closed">Concluded</option>
                      </select>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', paddingRight: 16 }}>
                    <button className="btn-delete-minimal" onClick={() => deleteContact(c._id)}>Purge</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredContacts.length === 0 && (
          <div style={{ padding: '80px 24px', textAlign: 'center', color: '#64748b', fontSize: '14px', background: '#ffffff' }}>
            No records match your search parameters.
          </div>
        )}
      </div>

      {/* --- PERFECT MOBILE CARDS --- */}
      <div className="cards-view-matrix">
        {filteredContacts.map(c => {
          const status = getStatusStyles(c.status);
          return (
            <div key={c._id} style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid rgba(15, 23, 42, 0.05)' }}>
              <div onClick={() => setSelectedContact(c)} style={{ cursor: 'pointer' }}>
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
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', background: '#eff6ff', padding: '6px 10px', borderRadius: '6px' }}>
                    {c.service || 'Standard Portfolio'}
                  </span>
                </div>

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', fontSize: '14px', color: '#475569', lineHeight: '1.5', marginBottom: 20, wordBreak: 'break-word', border: '1px solid #e2e8f0' }}>
                  {c.message || <span style={{ color: '#94a3b8' }}>Packet context is empty.</span>}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <span style={{ position: 'absolute', left: '14px', width: '6px', height: '6px', borderRadius: '50%', background: status.dot }} />
                  <select
                    className="select-custom"
                    value={c.status}
                    onChange={e => updateStatus(c._id, e.target.value)}
                    style={{ flex: 1, color: status.text, background: status.bg, borderColor: 'transparent', padding: '12px 32px 12px 30px', height: '46px', borderRadius: '12px' }}
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
        {filteredContacts.length === 0 && (
          <div style={{ padding: '48px 16px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
            No records match your search parameters.
          </div>
        )}
      </div>

      {/* --- NEW ADDITION: PREMIUM MODAL POPUP DISPLAY SYSTEM --- */}
      {selectedContact && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 1000
        }} onClick={() => setSelectedContact(null)}>
          <div style={{
            background: '#ffffff', borderRadius: '24px', width: '100%', maxWidth: 560,
            padding: 40, boxShadow: '0 30px 60px -15px rgba(0,0,0,0.25)',
            border: '1px solid rgba(15, 23, 42, 0.05)', animation: 'modalEntry 0.2s ease'
          }} onClick={e => e.stopPropagation()}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>{selectedContact.name}</h3>
                <p style={{ fontFamily: 'monospace', color: '#64748b', margin: 0, fontSize: '14px' }}>{selectedContact.contact}</p>
              </div>
              <button onClick={() => setSelectedContact(null)} style={{ background: '#f1f5f9', border: 'none', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: '16px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>

            <div style={{ display: 'flex', gap: '24px', marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4 }}>Classification</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#2563eb' }}>{selectedContact.service || 'Standard Portfolio'}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4 }}>Logs Timestamp</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}>{new Date(selectedContact.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8 }}>Message Body Packet</span>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: 20, borderRadius: '14px', fontSize: '15px', color: '#334155', lineHeight: '1.6', maxHeight: '200px', overflowY: 'auto', wordBreak: 'break-word' }}>
                {selectedContact.message || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Message context is completely empty.</span>}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'absolute', left: '12px', width: '6px', height: '6px', borderRadius: '50%', background: getStatusStyles(selectedContact.status).dot }} />
                <select
                  className="select-custom"
                  value={selectedContact.status}
                  onChange={e => updateStatus(selectedContact._id, e.target.value)}
                  style={{ color: getStatusStyles(selectedContact.status).text, background: getStatusStyles(selectedContact.status).bg, borderColor: 'transparent', paddingLeft: '26px' }}
                >
                  <option value="new">Live Pulse</option>
                  <option value="replied">Engaged</option>
                  <option value="closed">Concluded</option>
                </select>
              </div>
              <button style={{ background: '#fef2f2', border: 'none', color: '#ef4444', padding: '12px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }} onClick={() => deleteContact(selectedContact._id)}>
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}