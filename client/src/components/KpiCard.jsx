import { go } from '../utils/helpers';

const KpiCard=({l,v,to})=><div className="card kpi" onClick={()=>go(to)}><small>{l}</small><div><b>{v}</b></div></div>;

export default KpiCard;
