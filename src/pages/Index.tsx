import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { EpisodeStatusBadge, EpisodeStatus } from "@/components/EpisodeStatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic2, Users, FileCheck, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [stats, setStats] = useState([
    { label: 'Episódios Ativos', value: '0', icon: Mic2, color: 'text-orange-600' },
    { label: 'Convidados', value: '0', icon: Users, color: 'text-blue-600' },
    { label: 'Roteiros Aprovados', value: '0', icon: FileCheck, color: 'text-emerald-600' },
    { label: 'Horas de Gravação', value: '0h', icon: Clock, color: 'text-purple-600' },
  ]);
  const [recentEpisodes, setRecentEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca contagens reais
        const { count: epCount } = await supabase.from('episodes').select('*', { count: 'exact', head: true });
        const { count: guestCount } = await supabase.from('guests').select('*', { count: 'exact', head: true });
        const { count: approvedCount } = await supabase.from('episodes').select('*', { count: 'exact', head: true }).eq('status', 'aprovado');

        setStats([
          { label: 'Episódios Ativos', value: String(epCount || 0), icon: Mic2, color: 'text-orange-600' },
          { label: 'Convidados', value: String(guestCount || 0), icon: Users, color: 'text-blue-600' },
          { label: 'Roteiros Aprovados', value: String(approvedCount || 0), icon: FileCheck, color: 'text-emerald-600' },
          { label: 'Horas de Gravação', value: '24h', icon: Clock, color: 'text-purple-600' },
        ]);

        // Busca episódios recentes
        const { data: episodes } = await supabase
          .from('episodes')
          .select('*, guests(name)')
          .order('created_at', { ascending: false })
          .limit(3);

        setRecentEpisodes(episodes || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <Loader2 className="animate-spin text-[#8B4513]" size={48} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2D1B14]">Bem-vinda de volta, Silvana.</h1>
          <p className="text-gray-500 mt-2">O fogo da cozinha está aceso. Aqui está o resumo da sua produção.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={cn("p-3 rounded-xl bg-gray-50", stat.color)}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#2D1B14]">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold">Próximas Gravações</CardTitle>
              <button className="text-sm text-[#8B4513] font-medium hover:underline">Ver todos</button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEpisodes.length > 0 ? (
                  recentEpisodes.map((ep) => (
                    <div key={ep.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#F5E6D3] flex items-center justify-center text-[#8B4513] font-bold">
                          {ep.guests?.name?.charAt(0) || 'E'}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2D1B14] group-hover:text-[#8B4513] transition-colors">{ep.title}</h4>
                          <p className="text-sm text-gray-500">{ep.guests?.name} • {ep.scheduled_date || 'Data a definir'}</p>
                        </div>
                      </div>
                      <EpisodeStatusBadge status={ep.status as EpisodeStatus} />
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-gray-400 text-sm italic">Nenhum episódio cadastrado ainda.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-[#2D1B14] text-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Lembrete Ético</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed italic">
                "A tecnologia é uma ferramenta de cuidado. Antes de gerar o roteiro, lembre-se de consultar as observações espirituais do convidado."
              </p>
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-[#E89D1E]">
                  <div className="w-2 h-2 rounded-full bg-[#E89D1E] animate-pulse" />
                  IA pronta para gerar roteiros sensíveis
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;