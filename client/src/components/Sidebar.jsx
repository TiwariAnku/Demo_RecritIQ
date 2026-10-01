import { NavLink } from 'react-router-dom';
import { ROUTES } from '../routes';

export default function Sidebar() {
  return (
    <nav className="side">
      <div className="logo">◆ <span>Recruit<span style={{ color: '#C9A183' }}>IQ</span></span></div>
      {ROUTES.map(({ path, label, icon: Icon }) => (
        <NavLink key={path} to={'/' + path} className={({ isActive }) => (isActive ? 'on' : '')}>
          <Icon size={18} /> <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
