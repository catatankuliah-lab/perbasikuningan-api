import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

// Halaman Dashboard sederhana untuk testing
const Dashboard = () => (
  <div className="p-10 text-center">
    <h1 className="text-2xl font-bold">Dashboard Perbasi</h1>
    <p>Halaman ini hanya bisa dilihat jika sudah login.</p>
    <button 
        onClick={() => { localStorage.clear(); window.location.href = '/'; }}
        className="mt-4 text-red-500 underline"
    >
        Logout
    </button>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Redirect jika route tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;