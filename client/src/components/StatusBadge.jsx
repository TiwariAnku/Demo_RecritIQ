import { COL } from '../data/mockData';

const StatusBadge=({v})=><span className="bd" style={{background:(COL[v]||'#8A7C6F')+'1f',color:COL[v]||'#8A7C6F'}}>{v}</span>;
export default StatusBadge;
