import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EpisodeStatusBadge, EpisodeStatus } from "@/components/EpisodeStatusBadge";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  ArrowUpRight, 
  Mic2, 
  FileText, 
  CheckCircle2 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const episodes = [
  { id: 1, title: "Ancestralidade e Tecnologia", guest: "Tiganá Santana", date: "15/10/2023", status: "revisao" as EpisodeStatus, axis: "Axé" },
  { id: 2, title: "Educação de Terreiro", guest: "Mãe Beth de Oxum", date: "18/10/2023", status: "aprovado" as EpisodeStatus, axis: "Educação" },
  { id: 3, title: "Sociedade e Axé", guest: "Douglas Belchior", date: "22/10/2023", status: "roteirizacao" as EpisodeStatus, axis: "Sociedade" },
  { id: 4, title: "Culinária e Memória", guest: "Chef João Diamante", date: "05/10/2023", status: "gravado" as EpisodeStatus, axis: "Sociedade" },
  { id: 5, title: "O Som do Atabaque", guest: "Mestre Gabi Guedes", date: "01/10/2023", status: "gravado" as EpisodeStatus, axis: "Axé" },
];

const Episodes = () => {
  const navigate = useNavigate();

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
            <Input className="pl-10 bg-white border-gray-200" placeholder="Buscar por título ou convidado..." />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={18} /> Filtros
          </Button>
        </div>

        <Card className="border-none shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Episódio</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Convidado</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Eixo</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Data</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {episodes.map((ep) => (
                  <tr key={ep.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4">
                      <p className="font-bold text-[#2D1B14] group-hover:text-[#8B4513] transition-colors">{ep.title}</p>
                      <p className="text-[10px] text-gray-400">#00{ep.id}</p>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{ep.guest}</td>
                    <td className="p-4">
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-orange-50 text-orange-700 border border-orange-100">
                        {ep.axis}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500">{ep.date}</td>
                    <td className="p-4">
                      <EpisodeStatusBadge status={ep.status} />
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-400 hover:text-[#8B4513]"
                          onClick={() => navigate(ep.status === 'gravado' ? `/episodes/post/${ep.id}` : '/scripts')}
                        >
                          {ep.status === 'gravado' ? <Mic2 size={16} /> : <FileText size={16} />}
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
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Episodes;