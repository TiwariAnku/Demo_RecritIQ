import { useState } from 'react';
import { HRS } from '../data/mockData';
import { nm, ago } from '../utils/helpers';
import { useS } from '../context/StoreContext';
import StatusBadge from './StatusBadge';

export default function WorkQueue({hr}){const S=useS();const [pick,setPick]=useState([]),[to,setTo]=useState(HRS.find(h=>h!=hr)||HRS[0]);
  const items=S.R.filter(r=>r.hr==hr&&!['Selected','Rejected'].includes(r.st));
  const mv=()=>{pick.forEach(id=>S.assign(id,to));setPick([])};
  return <div className="card"><h3>Work queue — {hr}</h3>{items.map(r=><div className="row" key={r.id}><label><input type="checkbox" checked={pick.includes(r.id)} onChange={e=>setPick(e.target.checked?[...pick,r.id]:pick.filter(x=>x!=r.id))}/> <b>{nm(r)}</b> <small className="mut">{r.pos}</small></label><span><StatusBadge v={r.st}/> <small className="mut">Updated {ago(r.up)}</small></span></div>)}
   {!items.length&&<p className="mut">No active work.</p>}
   <div className="bar" style={{marginTop:12}}><span>Reassign selected to</span><select value={to} onChange={e=>setTo(e.target.value)}>{HRS.filter(h=>h!=hr).map(h=><option key={h}>{h}</option>)}</select><button className="btn pr" disabled={!pick.length} onClick={mv}>Reassign ({pick.length})</button></div></div>}
