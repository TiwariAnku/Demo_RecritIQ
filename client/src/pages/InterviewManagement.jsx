import { useState } from 'react';
import { nm, dl } from '../utils/helpers';
import { useS } from '../context/StoreContext';
import StatusBadge from '../components/StatusBadge';

export default function InterviewManagement(){const S=useS();const [cal,setCal]=useState(false),[f,setF]=useState({rid:'',rd:'Technical R1',d:1,t:'11:00',mode:'Video'});
  const elig=S.R.filter(r=>['Screening','Shortlisted'].includes(r.st));const days=[...new Set(S.I.map(i=>i.d))].sort();
  const Card=i=><div className="row" key={i.id}><span><b>{S.rn(i.rid)}</b> <small className="mut">· {S.R.find(r=>r.id==i.rid)?.pos}</small><br/><small className="mut">{i.rd} · {i.iv} · {S.R.find(r=>r.id==i.rid)?.hr} · {dl(i.d)} {i.t} · {i.mode}</small></span>
   <span className="bar" style={{margin:0}}><StatusBadge v={i.st}/><StatusBadge v={i.fb}/>{i.st=='Scheduled'&&<><button className="btn sm" onClick={()=>S.resched(i.id)}>Reschedule</button><button className="btn sm" onClick={()=>S.cancel(i.id)}>Cancel</button><button className="btn sm pr" onClick={()=>S.complete(i.id)}>Mark Completed</button></>}</span></div>;
  return <><div className="card" style={{marginBottom:16}}><h3>Schedule Interview</h3><div className="bar">
   <select value={f.rid} onChange={e=>setF({...f,rid:e.target.value})}><option value="">Select resume…</option>{elig.map(r=><option key={r.id} value={r.id}>{nm(r)}</option>)}</select>
   <select value={f.rd} onChange={e=>setF({...f,rd:e.target.value})}>{['Technical R1','Technical R2','HR Round'].map(x=><option key={x}>{x}</option>)}</select>
   <select value={f.d} onChange={e=>setF({...f,d:+e.target.value})}>{[0,1,2,3].map(d=><option key={d} value={d}>{dl(d)}</option>)}</select>
   <input type="time" value={f.t} onChange={e=>setF({...f,t:e.target.value})}/><select value={f.mode} onChange={e=>setF({...f,mode:e.target.value})}><option>Video</option><option>Onsite</option></select>
   <button className="btn pr" disabled={!f.rid} onClick={()=>{S.sched(+f.rid,f.rd,f.d,f.t,f.mode);setF({...f,rid:''})}}>Schedule</button></div></div>
  <div className="bar"><button className={'btn '+(!cal?'pr':'')} onClick={()=>setCal(false)}>List</button><button className={'btn '+(cal?'pr':'')} onClick={()=>setCal(true)}>Calendar</button></div>
  {!cal?<div className="card">{S.I.length?[...S.I].sort((a,b)=>a.d-b.d).map(Card):<p className="mut">No interviews yet.</p>}</div>
  :<div className="grid g2">{days.map(d=><div className="card" key={d}><h3>{dl(d)}</h3>{S.I.filter(i=>i.d==d).map(Card)}</div>)}</div>}</>}
