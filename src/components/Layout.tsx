import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import PlayerScoreBanner from "./PlayerScoreBanner";

export default function Layout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>
          <span className="title-main">Powell Play</span>
          <span className="title-sub">🎂 The Birthday Trials 🎉</span>
        </h1>
      </header>
      <PlayerScoreBanner />
      <main className="app-main">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
