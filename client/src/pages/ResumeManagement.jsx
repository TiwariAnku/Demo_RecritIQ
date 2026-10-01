import { useState } from 'react';
import { HRS, ST, POS, COL } from '../data/mockData';
import { nm, match, ago } from '../utils/helpers';
import { useS } from '../context/StoreContext';
import Drawer from '../components/Drawer';
import ResumeViewer from '../components/ResumeViewer';

export default function ResumeManagement(){const S=useS();const [q,setQ]=useState(''),[st,setSt]=useState(''),[hr,setHr]=useState(''),[ps,setPs]=useState(''),[ex,setEx]=useState('');
  const rows=S.R.filter(r=>(nm(r)+r.sk.join()).toLowerCase().includes(q.toLowerCase())&&(!st||r.st==st)&&(!hr||r.hr==hr)&&(!ps||r.pos==ps)&&(!ex||r.exp>=+ex));
  const v=S.R.find(r=>r.id==S.sel);
  return <><div className="bar"><input placeholder="Search name or skill…" value={q} onChange={e=>setQ(e.target.value)}/>
   <select value={ps} onChange={e=>setPs(e.target.value)}><option value="">All positions</option>{POS.map(p=><option key={p}>{p}</option>)}</select>
   <select value={st} onChange={e=>setSt(e.target.value)}><option value="">All statuses</option>{ST.map(p=><option key={p}>{p}</option>)}</select>
   <select value={hr} onChange={e=>setHr(e.target.value)}><option value="">All HRs</option>{HRS.map(p=><option key={p}>{p}</option>)}</select>
   <select value={ex} onChange={e=>setEx(e.target.value)}><option value="">Any exp.</option><option value="3">3+ yrs</option><option value="5">5+ yrs</option></select>
   <button className="btn pr" style={{marginLeft:'auto'}} onClick={S.upload}>⬆ Upload Resume</button></div>
  <div className="card tw"><table><thead><tr><th>Resume</th><th>Position</th><th>Exp</th><th>Skills</th><th>Owner</th><th>Uploaded</th><th>Status</th><th>Updated</th><th></th></tr></thead><tbody>
  {rows.map(r=><tr className="h" key={r.id}><td><b>{nm(r)}</b></td><td>{r.pos}</td><td>{r.exp} yrs</td><td>{r.sk.slice(0,3).map(s=><span className="tag" key={s}>{s}</span>)}</td>
   <td><select value={r.hr} onChange={e=>S.assign(r.id,e.target.value)}>{HRS.map(h=><option key={h}>{h}</option>)}</select></td><td>{new Date(r.dt).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</td>
   <td><select value={r.st} onChange={e=>S.status(r.id,e.target.value)} style={{color:COL[r.st],fontWeight:600}}>{ST.map(s=><option key={s}>{s}</option>)}</select></td><td>{ago(r.up)}</td><td><button className="btn sm" onClick={()=>S.setSel(r.id)}>View</button></td></tr>)}</tbody></table>
  {!rows.length&&<p className="mut">No resumes match these filters.</p>}</div>
  {v&&<Drawer onClose={()=>S.setSel(null)}><ResumeViewer r={v}/></Drawer>}</>}
