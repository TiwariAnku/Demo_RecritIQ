import { useState } from 'react';
import { useS } from '../context/StoreContext';

export default function ActivityLog(){const S=useS();const [h,setH]=useState(''),[q,setQ]=useState('');
  const rows=S.L.filter(l=>(!h||l.who==h)&&(l.what+l.ref).toLowerCase().includes(q.toLowerCase()));
  return <><div className="bar"><select value={h} onChange={e=>setH(e.target.value)}><option value="">All users</option>{[...new Set(S.L.map(l=>l.who))].map(x=><option key={x}>{x}</option>)}</select><input placeholder="Filter action / resume…" value={q} onChange={e=>setQ(e.target.value)}/></div>
  <div className="card"><div className="tl">{rows.map((l,i)=><div key={i}><b>{l.what}</b> <span className="mut">· {l.ref}</span><br/><small className="mut">{l.who} · {new Date(l.t).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</small></div>)}</div>{!rows.length&&<p className="mut">No activity found.</p>}</div></>}
