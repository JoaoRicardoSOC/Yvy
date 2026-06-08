import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PageTransition } from './components/PageTransition';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NovaAnalise from './pages/NovaAnalise';
import Resultado from './pages/Resultado';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageTransition><LandingPage /></PageTransition>} />
          <Route path="auth" element={<PageTransition><Login /></PageTransition>} />
          
          <Route path="dashboard" element={
            <ProtectedRoute>
              <PageTransition><Dashboard /></PageTransition>
            </ProtectedRoute>
          } />
          
          <Route path="nova-analise/:talhaoId" element={
            <ProtectedRoute>
              <PageTransition><NovaAnalise /></PageTransition>
            </ProtectedRoute>
          } />
          
          <Route path="resultado" element={
            <ProtectedRoute>
              <PageTransition><Resultado /></PageTransition>
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

import { useEffect } from 'react';
import { FazendaProvider } from './application/context/FazendaContext';
import { initializeMockDatabase, resetAndMockDatabase } from './infrastructure/repositories/mockDatabase';

function App() {
  useEffect(() => {
    initializeMockDatabase();

    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        resetAndMockDatabase();
        window.location.reload();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <FazendaProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </FazendaProvider>
  );
}

export default App;
