import { useState } from 'react';
import { HRS } from '../data/mockData';
import { stat } from '../utils/helpers';
import { useS } from '../context/StoreContext';
import WorkQueue from '../components/WorkQueue';

export default function HRWorkspace(){const S=useS();const [h,setH]=useState('');
  return <><div className="bar"><select value={h} onChange={e=>setH(e.target.value)}><option value="">All HRs</option>{HRS.map(x=><option key={x}>{x}</option>)}</select></div>
  <div className="grid g2">{HRS.filter(x=>!h||x==h).map(x=>{const s=stat(S,x);return <div className="card" key={x}><div className="row" style={{border:0}}><b>{x}</b><button className="btn sm" onClick={()=>setH(x)}>Open Work Queue</button></div>
   <div className="grid" style={{gridTemplateColumns:'repeat(4,1fr)',textAlign:'center'}}>{[['Positions',s.pos],['Resumes',s.res],['Interviews',s.iv],['Feedback',s.fb]].map(([l,v])=><div key={l}><b style={{fontSize:22}}>{v}</b><br/><small className="mut">{l}</small></div>)}</div></div>})}</div>
  {h&&<div style={{marginTop:16}}><WorkQueue hr={h}/></div>}</>}
