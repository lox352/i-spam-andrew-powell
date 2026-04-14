import { Routes, Route, Navigate } from "react-router-dom";
import { usePlayerContext } from "./context/PlayerContext";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import ChallengesPage from "./pages/ChallengesPage";
import LeaderboardPage from "./pages/LeaderboardPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { player, loading } = usePlayerContext();
  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!player) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { player, loading } = usePlayerContext();
  if (loading) return <div className="loading-screen">Loading...</div>;
  if (player) return <Navigate to="/challenges" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
