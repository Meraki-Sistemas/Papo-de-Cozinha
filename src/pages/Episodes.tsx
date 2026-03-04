import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EpisodeStatusBadge, EpisodeStatus } from "@/components/EpisodeStatusBadge";
import { Search, Filter, MoreHorizontal, Mic2, FileText, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Episodes = () => {
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      const { data, error } = await supabase
        .from('episodes')
        .select('*, guests(name)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setEpisodes(data || []);
    } catch (error) {
      console.error("Erro ao buscar episódios:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEpisodes = episodes.filter(ep => 
    ep.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ep.guests?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D1B14]">Acervo de Episódios</h1>
            <p className="text-sm text-gray-500">Gerencie o ciclo de vida de cada conversa.</p>
          </div>
          <Button className="bg-[#8B4513] hover:bg-[#6F370F]" onClick={() => navigate("/episodes/new")}>
            Novo Episódio
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              className="pl-10 bg-white border-gray-200" 
              placeholder="Buscar por título ou convidado..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={18} /> Filtros
          </Button>
        </div>

        <Card className="border-none shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-[#8B4513]" size={32} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Episódio</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Convidado</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Data</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredEpisodes.map((ep) => (
                    <tr key={ep.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="p-4">
                        <p className="font-bold text-[#2D1B14] group-hover:text-[#8B4513] transition-colors">{ep.title}</p>
                        <p className="text-[10px] text-gray-400">ID: {ep.id.slice(0, 8)}</p>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{ep.guests?.name || 'N/A'}</td>
                      <td className="p-4 text-sm text-gray-500">{ep.scheduled_date || 'A definir'}</td>
                      <td className="p-4">
                        <EpisodeStatusBadge status={ep.status as EpisodeStatus} />
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-400 hover:text-[#8B4513]"
                            onClick={() => navigate(`/episodes/${ep.id}`)}
                          >
                            <FileText size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                            <MoreHorizontal size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredEpisodes.length === 0 && (
                <div className="text-center py-12 text-gray-400 italic">
                  Nenhum episódio encontrado.
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default Episodes;