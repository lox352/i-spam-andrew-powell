import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import PlayerScoreBanner from "./PlayerScoreBanner";

export default function Layout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>🎂 Powell Play: The Birthday Trials 🎉</h1>
      </header>
      <PlayerScoreBanner />
      <main className="app-main">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
