import { Link, useLocation } from 'react-router-dom';
import { Satellite } from 'lucide-react';
import { resetAndMockDatabase } from '../infrastructure/repositories/mockDatabase';

export default function Header() {
  const location = useLocation();
  const isAuth = !!localStorage.getItem('produtor');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to={isAuth ? "/dashboard" : "/"} className="flex items-center group">
          <img 
            src="/logo.png" 
            alt="YVY Logo" 
            className="h-10 w-auto object-contain drop-shadow-md transition-transform group-hover:scale-105 cursor-pointer" 
            onClick={(e) => {
              if (e.detail === 4) {
                resetAndMockDatabase();
                window.location.reload();
              }
            }}
          />
        </Link>
      </div>
    </header>
  );
}
