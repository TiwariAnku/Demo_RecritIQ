import { useState } from 'react';
import { REQ } from '../data/mockData';
import { nm, match } from '../utils/helpers';
import { useS } from '../context/StoreContext';
import StatusBadge from './StatusBadge';

export default function ResumeViewer({r}){const S=useS();const [ai,setAi]=useState(false);const m=match(r),miss=REQ[r.pos].filter(s=>!r.sk.includes(s));
  return <><h3>{nm(r)}</h3><div><StatusBadge v={r.st}/> <span className="mut">{r.pos} · {r.exp} yrs · {r.hr}</span></div>
  <div className="bar" style={{marginTop:12}}><button className={'btn sm '+(!ai?'pr':'')} onClick={()=>setAi(false)}>Resume Viewer</button><button className={'btn sm '+(ai?'pr':'')} onClick={()=>setAi(true)}>✨ AI Analysis</button></div>
  {!ai?<div className="doc"><b>{r.n}</b>{[90,70,95,60,85,75,50].map((w,i)=><i key={i} style={{width:w+'%'}}/>)}<small className="mut">PDF preview (mock)</small></div>:<>
   <div className="card" style={{textAlign:'center'}}><div className="mut">Job Match</div><b style={{fontSize:34,color:m>70?'var(--ok)':'var(--w)'}}>{m}%</b><div className="pb"><i style={{width:m+'%'}}/></div></div>
   <p><b>Experience:</b> {r.exp} years · <b>Education:</b> B.Tech (suggested)</p>
   <p><b>Matching skills</b><br/>{REQ[r.pos].filter(s=>r.sk.includes(s)).map(s=><span key={s} className="tag">{s}</span>)}</p>
   <p><b>Missing skills</b><br/>{miss.length?miss.map(s=><span key={s} className="tag x">{s}</span>):'None'}</p>
   <p><b>AI Content Indicator:</b> <StatusBadge v={r.ai}/></p>
   <div className="note">Assistive signal only. It cannot confirm whether a resume was AI-generated; always use human judgement.</div></>}
  <div className="bar"><button className="btn pr" onClick={()=>S.status(r.id,'Shortlisted')}>Shortlist</button><button className="btn" onClick={()=>S.status(r.id,'Screening')}>Move to Screening</button><button className="btn" onClick={()=>{const n=prompt('Add note');n&&S.log('Note: '+n,nm(r))}}>Add Note</button></div></>}
