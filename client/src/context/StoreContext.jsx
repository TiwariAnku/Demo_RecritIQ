import { useState, useContext, createContext } from 'react';
import { REQ, POS, R0, I0, L0, mk } from '../data/mockData';
import { nm } from '../utils/helpers';

const Ctx=createContext();export const useS=()=>useContext(Ctx);
export function StoreProvider({children}){
  const [R,setR]=useState(R0),[I,setI]=useState(I0),[L,setL]=useState(L0),[T,setT]=useState([{id:1,t:'Approve offer for Anita Das',done:false}]),[sel,setSel]=useState(null);
  const log=(what,ref,who='You (Manager)')=>setL(l=>[{who,what,ref,t:Date.now()},...l]);
  const rn=id=>nm(R.find(r=>r.id==id)||{n:'-'});
  const S={R,I,L,T,sel,setSel,rn,log,
    status(id,s){setR(r=>r.map(x=>x.id==id?{...x,st:s,up:Date.now()}:x));log('Status changed to '+s,rn(id))},
    assign(id,hr){setR(r=>r.map(x=>x.id==id?{...x,hr,up:Date.now()}:x));log('Reassigned to '+hr,rn(id))},
    upload(){const id=Date.now(),p=POS[id%4];setR(r=>[{...mk(id,'Uploaded_Resume_'+(r.length+1)+'.pdf',p,2+id%6,REQ[p].slice(0,2+id%2),'HR 01','New',0,'Low')},...r]);log('Resume uploaded','Uploaded Resume '+(R.length+1))},
    sched(rid,rd,d,t,mode,iv='Panel'){setI(i=>[...i,{id:Date.now(),rid,rd,iv,d,t,mode,st:'Scheduled',fb:'Pending'}]);S.status(rid,'Interview');log('Interview scheduled ('+rd+')',rn(rid))},
    resched(id){setI(i=>i.map(x=>x.id==id?{...x,d:x.d+1}:x));log('Interview rescheduled',rn(I.find(x=>x.id==id).rid))},
    cancel(id){const x=I.find(y=>y.id==id);setI(i=>i.map(y=>y.id==id?{...y,st:'Cancelled'}:y));S.status(x.rid,'Shortlisted')},
    complete(id){const x=I.find(y=>y.id==id);setI(i=>i.map(y=>y.id==id?{...y,st:'Completed'}:y));S.status(x.rid,'Feedback Pending');log('Interview completed',rn(x.rid))},
    fb(id){const x=I.find(y=>y.id==id);setI(i=>i.map(y=>y.id==id?{...y,fb:'Submitted'}:y));S.status(x.rid,'Selected');log('Feedback submitted',rn(x.rid))},
    taskDone(id){setT(t=>t.map(x=>x.id==id?{...x,done:true}:x));log('Manager approval completed','Offer')}};
  S.acts=[...I.filter(i=>i.st=='Completed'&&i.fb=='Pending').map(i=>{const r=R.find(x=>x.id==i.rid);return{k:'f'+i.id,g:'Urgent',t:'Submit interview feedback',r,due:'Overdue',do:()=>S.fb(i.id)}}),
    ...R.filter(r=>r.st=='New').map(r=>({k:'n'+r.id,g:'Today',t:'Screen new resume',r,due:'Today',do:()=>S.status(r.id,'Screening')})),
    ...R.filter(r=>r.st=='Shortlisted'&&!I.some(i=>i.rid==r.id&&i.st=='Scheduled')).map(r=>({k:'s'+r.id,g:'Today',t:'Schedule interview',r,due:'Today',do:()=>S.sched(r.id,'Technical R1',1,'10:00','Video')})),
    ...R.filter(r=>r.st=='Screening').map(r=>({k:'c'+r.id,g:'Upcoming',t:'Complete screening',r,due:'This week',do:()=>S.status(r.id,'Shortlisted')})),
    ...T.filter(x=>!x.done).map(x=>({k:'t'+x.id,g:'Upcoming',t:x.t,r:null,hr:'Manager',due:'This week',do:()=>S.taskDone(x.id)}))];
  return <Ctx.Provider value={S}>{children}</Ctx.Provider>}
