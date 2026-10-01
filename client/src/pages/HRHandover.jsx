import { useState } from 'react';
import { HRS } from '../data/mockData';
import { nm, stat } from '../utils/helpers';
import { useS } from '../context/StoreContext';
import StatusBadge from '../components/StatusBadge';
import WorkQueue from '../components/WorkQueue';

export default function HRHandover(){const S=useS();const [h,setH]=useState('HR 01'),[abs,setAbs]=useState(false);const s=stat(S,h);const its=S.R.filter(r=>r.hr==h);
  return <><div className="bar"><select value={h} onChange={e=>{setH(e.target.value);setAbs(false)}}>{HRS.map(x=><option key={x}>{x}</option>)}</select><button className="btn" onClick={()=>{setAbs(true);S.log('Marked unavailable',h)}}>Simulate absence</button>{abs&&<StatusBadge v="High"/>}{abs&&<span className="mut">{h} is unavailable</span>}</div>
  <div className="grid k" style={{marginBottom:16}}>{[['Screening',its.filter(r=>r.st=='Screening').length],['Shortlisted',its.filter(r=>r.st=='Shortlisted').length],['Interviews scheduled',s.iv],['Feedback pending',s.fb]].map(([l,v])=><div className="card" key={l}><small>{l}</small><div><b style={{fontSize:28}}>{v}</b></div></div>)}</div>
  <div className="card" style={{marginBottom:16}}><h3>Priority tasks to pick up</h3>{S.acts.filter(a=>a.r?.hr==h).map(a=><div className="row" key={a.k}><span>{a.t} — {nm(a.r)}</span><StatusBadge v={a.g=='Urgent'?'High':'Medium'}/></div>)}{!S.acts.some(a=>a.r?.hr==h)&&<p className="mut">No priority tasks.</p>}</div>
  <WorkQueue hr={h} key={h}/></>}
