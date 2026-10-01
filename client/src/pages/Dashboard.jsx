import { HRS, ST, POS, COL } from '../data/mockData';
import { nm, go } from '../utils/helpers';
import { useS } from '../context/StoreContext';
import StatusBadge from '../components/StatusBadge';
import KpiCard from '../components/KpiCard';

export default function Dashboard(){const S=useS(),{R,I}=S,c=s=>R.filter(r=>r.st==s).length,fbn=S.acts.filter(a=>a.g=='Urgent').length;
  const mx=Math.max(...ST.map(c),1);
  return <><div className="grid k">
   <KpiCard l="Open Positions" v={POS.length} to="manager"/><KpiCard l="Resumes Received" v={R.length} to="resumes"/><KpiCard l="Under Review" v={c('New')+c('Screening')} to="resumes"/><KpiCard l="Shortlisted" v={c('Shortlisted')} to="resumes"/><KpiCard l="Interviews" v={I.filter(i=>i.st=='Scheduled').length} to="interviews"/><KpiCard l="Feedback Pending" v={fbn} to="actions"/><KpiCard l="Selected" v={c('Selected')} to="resumes"/></div>
  <div className="grid g2" style={{marginTop:16}}>
   <div className="card"><h3>Recruitment Pipeline</h3>{ST.map(s=><div key={s} style={{marginBottom:10}}><div className="row" style={{padding:0,border:0}}><span>{s}</span><b>{c(s)}</b></div><div className="pb"><i style={{width:c(s)/mx*100+'%',background:COL[s]}}/></div></div>)}</div>
   <div className="card"><h3>Action Required</h3>{S.acts.slice(0,5).map(a=><div className="row" key={a.k}><span><StatusBadge v={a.g=='Urgent'?'High':a.g=='Today'?'Medium':'Low'}/> {a.t}<br/><small className="mut">{a.r?nm(a.r):'Manager'}</small></span><button className="btn sm" onClick={()=>go('actions')}>Open</button></div>)}</div>
   <div className="card"><h3>Today's Interviews</h3>{I.filter(i=>i.d==0&&i.st=='Scheduled').map(i=><div className="row" key={i.id}><span>{S.rn(i.rid)}<br/><small className="mut">{i.rd} · {i.t}</small></span><StatusBadge v={i.mode}/></div>)}{!I.some(i=>i.d==0&&i.st=='Scheduled')&&<p className="mut">No interviews today.</p>}</div>
   <div className="card"><h3>HR Workload</h3>{HRS.map(h=>{const n=R.filter(r=>r.hr==h).length;return <div key={h} style={{marginBottom:10}} onClick={()=>go('workspace')}><div className="row" style={{padding:0,border:0}}><span>{h}</span><span className="mut">{n} resumes</span></div><div className="pb"><i style={{width:n*20+'%'}}/></div></div>})}</div></div></>}
