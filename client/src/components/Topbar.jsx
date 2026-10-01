import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../routes';

export default function Topbar() {
  const { pathname } = useLocation();
  const cur = ROUTES.find((r) => '/' + r.path === pathname) || ROUTES[0];

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [status, setStatus] = useState('Online');

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close popups when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="top">
      <div className="top-title-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <h1>{cur.label}</h1>
        <span className="badge" style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '12px', background: '#f1f5f9', color: '#64748b', fontWeight: '600' }}>
          RecruitIQ Enterprise
        </span>
      </div>

      <div className="top-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Quick Search */}
        <div className="search-bar" style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search candidates, HRs..."
            style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', outline: 'none' }}
          />
        </div>

        {/* Notifications Dropdown */}
        <div className="notif-wrapper" ref={notifRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', position: 'relative', padding: '4px' }}
            title="Notifications"
          >
            🔔
            <span style={{ position: 'absolute', top: '2px', right: '2px', width: '7px', height: '7px', background: '#2563eb', borderRadius: '50%' }}></span>
          </button>

          {isNotifOpen && (
            <div className="card" style={{ position: 'absolute', right: 0, top: '35px', width: '260px', zIndex: 100, padding: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid #f1f5f9', pb: '6px' }}>
                <strong style={{ fontSize: '12px' }}>Notifications</strong>
                <span className="badge" style={{ fontSize: '10px', background: '#eff6ff', color: '#2563eb', padding: '2px 6px', borderRadius: '4px' }}>3 New</span>
              </div>
              <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ padding: '6px', borderRadius: '4px', background: '#f8fafc' }}>
                  <div style={{ fontWeight: '600', color: '#1e293b' }}>Interview Scheduled</div>
                  <div style={{ color: '#64748b', fontSize: '11px' }}>David Miller for .NET Developer</div>
                </div>
                <div style={{ padding: '6px', borderRadius: '4px', background: '#f8fafc' }}>
                  <div style={{ fontWeight: '600', color: '#1e293b' }}>Handover Requested</div>
                  <div style={{ color: '#64748b', fontSize: '11px' }}>HR 02 reassigned 4 active items</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Popup */}
        <div className="profile-wrapper" ref={profileRef} style={{ position: 'relative' }}>
          <div
            className="av"
            title="Manager"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            M
            <span style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              border: '2px solid #ffffff',
              background: status === 'Online' ? '#10b981' : status === 'Busy' ? '#f59e0b' : '#94a3b8'
            }} />
          </div>

          {isProfileOpen && (
            <div className="card" style={{ position: 'absolute', right: 0, top: '45px', width: '240px', zIndex: 100, padding: '14px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', itemsCenter: 'center', gap: '10px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px', marginBottom: '10px' }}>
                <div className="av" style={{ width: '36px', height: '36px', fontSize: '14px' }}>M</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>Marcus Vance</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>marcus@recruitiq.io</div>
                  <span style={{ fontSize: '9px', background: '#dbeafe', color: '#1e40af', padding: '1px 5px', borderRadius: '4px', fontWeight: '600' }}>Admin Manager</span>
                </div>
              </div>

              {/* Status Selector */}
              <div style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Set Status</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
                  {['Online', 'Busy', 'Away'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatus(st)}
                      style={{
                        padding: '3px 0',
                        fontSize: '11px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px',
                        background: status === st ? '#1e293b' : '#ffffff',
                        color: status === st ? '#ffffff' : '#475569',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
                <button onClick={() => setIsProfileOpen(false)} style={{ textAlign: 'left', background: 'none', border: 'none', padding: '6px 8px', borderRadius: '4px', cursor: 'pointer', color: '#334155' }}>
                  👤 View Full Profile
                </button>
                <button onClick={() => setIsProfileOpen(false)} style={{ textAlign: 'left', background: 'none', border: 'none', padding: '6px 8px', borderRadius: '4px', cursor: 'pointer', color: '#334155' }}>
                  ⚙️ Platform Settings
                </button>
                <button onClick={() => setIsProfileOpen(false)} style={{ textAlign: 'left', background: 'none', border: 'none', padding: '6px 8px', borderRadius: '4px', cursor: 'pointer', color: '#dc2626', borderTop: '1px solid #f1f5f9', marginTop: '4px', paddingTop: '8px' }}>
                  🚪 Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}