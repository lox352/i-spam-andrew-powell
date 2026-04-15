import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/challenges" className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
        <span className="nav-icon">📋</span>
        <span className="nav-label">Challenges</span>
      </NavLink>
      <NavLink to="/feed" className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
        <span className="nav-icon">📣</span>
        <span className="nav-label">Feed</span>
      </NavLink>
      <NavLink to="/leaderboard" className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
        <span className="nav-icon">🏆</span>
        <span className="nav-label">Leaderboard</span>
      </NavLink>
    </nav>
  );
}
