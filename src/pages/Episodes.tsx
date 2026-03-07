import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EpisodeStatusBadge, EpisodeStatus } from "@/components/EpisodeStatusBadge";
import { Search, Filter, MoreHorizontal, FileText, Loader2, Trash2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { showError, showSuccess } from "@/utils/toast";

type StatusFilter = "all" | EpisodeStatus;

const statusOptions: { label: string; value: StatusFilter }[] = [
  { label: "Todos", value: "all" },
  { label: "Planejado", value: "planejado" },
  { label: "Roteirização", value: "roteirizacao" },
  { label: "Em Revisão", value: "revisao" },
  { label: "Aprovado", value: "aprovado" },
  { label: "Gravado", value: "gravado" },
];

const Episodes = () => {
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('episodes')
        .select('*, guests(name)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setEpisodes(data || []);
    } catch (error) {
      console.error("Erro ao buscar episódios:", error);
      showError("Não foi possível carregar os episódios.");
    } finally {
      setLoading(false);
    }
  };

  const filteredEpisodes = episodes
    .filter(ep => 
      ep.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ep.guests?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(ep => statusFilter === "all" ? true : ep.status === statusFilter);

  const updateStatus = async (id: string, newStatus: EpisodeStatus) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from('episodes')
        .update({ status: newStatus })
        .eq('id', id);
      if (error) throw error;
      showSuccess("Status do episódio atualizado.");
      await fetchEpisodes();
    } catch (err: any) {
      showError(err?.message || "Erro ao atualizar status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteEpisode = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este episódio? Esta ação não pode ser desfeita.")) {
      return;
    }
    setUpdatingId(id);
    try {
      const { error } = await supabase.from('episodes').delete().eq('id', id);
      if (error) throw error;
      showSuccess("Episódio excluído com sucesso.");
      await fetchEpisodes();
    } catch (err: any) {
      showError(err?.message || "Erro ao excluir episódio.");
    } finally {
      setUpdatingId(null);
    }
  };

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

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              className="pl-10 bg-white border-gray-200" 
              placeholder="Buscar por título ou convidado..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
              <SelectTrigger className="w-[200px] bg-white border-gray-200">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                              {updatingId === ep.id ? <Loader2 className="animate-spin" size={16} /> : <MoreHorizontal size={16} />}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => navigate(`/episodes/${ep.id}`)}>
                              <FileText className="mr-2 h-4 w-4" /> Abrir
                            </DropdownMenuItem>
                            <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                              Alterar status
                            </div>
                            {(["planejado","roteirizacao","revisao","aprovado","gravado"] as EpisodeStatus[]).map(st => (
                              <DropdownMenuItem key={st} onClick={() => updateStatus(ep.id, st)}>
                                <CheckCircle2 className="mr-2 h-4 w-4" /> {statusOptions.find(o => o.value === st)?.label}
                              </DropdownMenuItem>
                            ))}
                            <DropdownMenuItem className="text-red-600 focus:text-red-700" onClick={() => deleteEpisode(ep.id)}>
                              <Trash2 className="mr-2 h-4 w-4" /> Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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