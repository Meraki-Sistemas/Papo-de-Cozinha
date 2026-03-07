import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Mic2, 
  Users, 
  Calendar, 
  FileText, 
  Settings as SettingsIcon,
  Coffee,
  Bell,
  Search,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = React.useState<string>("Usuário");

  React.useEffect(() => {
    let active = true;
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email;
      const userId = session?.user?.id;
      if (!userId) {
        active && setDisplayName("Convidado");
        return;
      }
      // Tenta perfis; se não houver, cai para email
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", userId)
        .single();
      const name = profile?.full_name?.trim();
      active && setDisplayName(name || email || "Usuário");
    };
    loadUser();
    return () => { active = false; };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

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
      <aside className="w-64 bg-[#2D1B14] text-white flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-[#E89D1E] p-2 rounded-lg">
            <Coffee className="text-[#2D1B14]" size={24} />
          </div>
          <h1 className="font-bold text-lg tracking-tight">PApo de Cozinha</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
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
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-bold">Usuário</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium truncate max-w-[150px]" title={displayName}>{displayName}</p>
              <button
                onClick={handleSignOut}
                className="text-gray-300 hover:text-white transition-colors p-1"
                aria-label="Sair"
                title="Sair"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Aiyê Hub</span>
            <span className="text-gray-300">/</span>
            <span className="font-medium text-[#2D1B14]">
              {menuItems.find(i => i.path === location.pathname)?.label || 'Detalhes'}
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Busca rápida..." 
                className="bg-gray-50 border-none rounded-full py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-orange-200 w-48"
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <button className="relative p-2 text-gray-400 hover:text-[#8B4513] transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 border-none shadow-xl rounded-2xl overflow-hidden">
                <div className="bg-[#2D1B14] p-4 text-white">
                  <h3 className="font-bold text-sm">Notificações</h3>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors">
                    <p className="text-xs font-bold text-[#2D1B14]">Roteiro Aprovado!</p>
                    <p className="text-[10px] text-gray-500 mt-1">Um convidado aprovou um roteiro.</p>
                    <p className="text-[9px] text-orange-500 mt-2 font-bold">Há poucos minutos</p>
                  </div>
                </div>
                <button className="w-full py-3 text-[10px] font-bold text-gray-400 hover:text-[#8B4513] bg-gray-50 transition-colors"
                  onClick={() => navigate("/episodes")}
                >
                  Ver todas as notificações
                </button>
              </PopoverContent>
            </Popover>

            <button 
              onClick={() => navigate("/episodes/new")}
              className="bg-[#8B4513] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#6F370F] transition-all shadow-md shadow-orange-900/10"
            >
              Novo Episódio
            </button>
          </div>
        </header>
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;