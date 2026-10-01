import { HRS, POS } from '../data/mockData';
import { ago, go, stat } from '../utils/helpers';
import { useS } from '../context/StoreContext';
import StatusBadge from '../components/StatusBadge';
import KpiCard from '../components/KpiCard';

export default function ManagerOverview(){const S=useS(),{R}=S;
  return <><div className="grid k"><KpiCard l="Active Resumes" v={R.filter(r=>!['Selected','Rejected'].includes(r.st)).length} to="resumes"/><KpiCard l="Selected" v={R.filter(r=>r.st=='Selected').length} to="resumes"/><KpiCard l="Pending Actions" v={S.acts.length} to="actions"/><KpiCard l="Interviews" v={S.I.filter(i=>i.st=='Scheduled').length} to="interviews"/></div>
  <div className="grid g2" style={{marginTop:16}}><div className="card"><h3>Progress by position</h3>{POS.map(p=>{const a=R.filter(r=>r.pos==p),d=a.filter(r=>['Interview','Feedback Pending','Selected'].includes(r.st)).length;return <div key={p} style={{marginBottom:12}}><div className="row" style={{padding:0,border:0}}><span>{p}</span><span className="mut">{a.length} resumes</span></div><div className="pb"><i style={{width:(a.length?d/a.length*100:0)+'%'}}/></div></div>})}</div>
  <div className="card"><h3>Needs attention</h3>{POS.filter(p=>!R.some(r=>r.pos==p&&['Shortlisted','Interview','Feedback Pending','Selected'].includes(r.st))).map(p=><div className="row" key={p}><span>{p}</span><StatusBadge v="High"/></div>)}
   {POS.every(p=>R.some(r=>r.pos==p&&['Shortlisted','Interview','Feedback Pending','Selected'].includes(r.st)))&&<p className="mut">All positions have candidates in progress.</p>}</div>
  <div className="card tw"><h3>HR workload (no ranking)</h3><table><thead><tr><th>HR</th><th>Resumes</th><th>Interviews</th><th>Feedback</th></tr></thead><tbody>{HRS.map(h=>{const s=stat(S,h);return <tr key={h}><td>{h}</td><td>{s.res}</td><td>{s.iv}</td><td>{s.fb}</td></tr>})}</tbody></table></div>
  <div className="card"><h3>Recent activity</h3>{S.L.slice(0,4).map((l,i)=><div className="row" key={i}><span>{l.what} <small className="mut">· {l.ref}</small></span><small className="mut">{ago(l.t)}</small></div>)}<button className="btn sm" onClick={()=>go('log')}>View all →</button></div></div></>}
