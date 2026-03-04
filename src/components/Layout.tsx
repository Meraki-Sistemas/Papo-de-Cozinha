import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Mic2, 
  Users, 
  Calendar, 
  FileText, 
  Settings as SettingsIcon,
  Coffee
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Mic2, label: 'Episódios', path: '/episodes' },
    { icon: Users, label: 'Convidados', path: '/guests' },
    { icon: Calendar, label: 'Agenda', path: '/calendar' },
    { icon: FileText, label: 'Roteiros', path: '/scripts' },
    { icon: SettingsIcon, label: 'Configurações', path: '/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#FDFCFB]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2D1B14] text-white flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-[#E89D1E] p-2 rounded-lg">
            <Coffee className="text-[#2D1B14]" size={24} />
          </div>
          <h1 className="font-bold text-lg tracking-tight">PApo de Cozinha</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                location.pathname === item.path 
                  ? "bg-[#E89D1E] text-[#2D1B14] font-semibold shadow-lg shadow-orange-900/20" 
                  : "hover:bg-white/5 text-gray-400 hover:text-white"
              )}
            >
              <item.icon size={20} className={cn(
                location.pathname === item.path ? "text-[#2D1B14]" : "group-hover:scale-110 transition-transform"
              )} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">Perfil: Produtor</p>
            <p className="text-sm font-medium">Mãe Silvana</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-gray-500 font-medium">Aiyê Hub <span className="mx-2 text-gray-300">/</span> {menuItems.find(i => i.path === location.pathname)?.label || 'Detalhes'}</h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/episodes/new")}
              className="bg-[#F5E6D3] text-[#8B4513] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#EBD5B8] transition-colors"
            >
              Novo Episódio
            </button>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;