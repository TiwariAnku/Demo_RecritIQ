import { nm, go } from '../utils/helpers';
import { useS } from '../context/StoreContext';

export default function ActionCenter(){const S=useS();
  return <div className="grid">{['Urgent','Today','Upcoming'].map(g=><div className="card" key={g}><h3>{g} <span className="mut">({S.acts.filter(a=>a.g==g).length})</span></h3>
   {S.acts.filter(a=>a.g==g).map(a=><div className="row" key={a.k}><span><b>{a.t}</b><br/><small className="mut">{a.r?nm(a.r)+' · '+a.r.pos+' · '+a.r.hr:'Manager'} · Due: {a.due}</small></span>
    <span className="bar" style={{margin:0}}>{a.r&&<button className="btn sm" onClick={()=>{S.setSel(a.r.id);go('resumes')}}>Open Related Item</button>}<button className="btn sm pr" onClick={a.do}>Mark Complete</button></span></div>)}
   {!S.acts.some(a=>a.g==g)&&<p className="mut">✔ All clear.</p>}</div>)}</div>}
