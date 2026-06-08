import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Header from './Header';

export default function Layout() {
  const location = useLocation();
  const hideHeader = location.pathname === '/' || location.pathname === '/auth' || location.pathname === '/dashboard' || location.pathname.startsWith('/nova-analise') || location.pathname.startsWith('/resultado');

  return (
    <div className="min-h-screen bg-background-dark text-slate-50 flex flex-col font-sans relative overflow-x-hidden">
      {!hideHeader && <Header />}
      <main className="flex-1 flex flex-col relative z-10">
        <Outlet />
      </main>
      <Toaster theme="dark" richColors position="top-right" />
    </div>
  );
}
