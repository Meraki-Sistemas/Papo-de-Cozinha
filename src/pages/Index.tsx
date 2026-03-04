import Layout from "@/components/Layout";
import { EpisodeStatusBadge, EpisodeStatus } from "@/components/EpisodeStatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic2, Users, FileCheck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: 'Episódios Ativos', value: '12', icon: Mic2, color: 'text-orange-600' },
  { label: 'Convidados', value: '48', icon: Users, color: 'text-blue-600' },
  { label: 'Roteiros Aprovados', value: '8', icon: FileCheck, color: 'text-emerald-600' },
  { label: 'Horas de Gravação', value: '24h', icon: Clock, color: 'text-purple-600' },
];

const recentEpisodes = [
  { id: 1, title: "Ancestralidade e Tecnologia", guest: "Prof. Dr. Tiganá Santana", date: "15 Out", status: "revisao" as EpisodeStatus },
  { id: 2, title: "Educação de Terreiro", guest: "Mãe Beth de Oxum", date: "18 Out", status: "aprovado" as EpisodeStatus },
  { id: 3, title: "Sociedade e Axé", guest: "Douglas Belchior", date: "22 Out", status: "roteirizacao" as EpisodeStatus },
];

const Dashboard = () => {
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
                {recentEpisodes.map((ep) => (
                  <div key={ep.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#F5E6D3] flex items-center justify-center text-[#8B4513] font-bold">
                        {ep.guest.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#2D1B14] group-hover:text-[#8B4513] transition-colors">{ep.title}</h4>
                        <p className="text-sm text-gray-500">{ep.guest} • {ep.date}</p>
                      </div>
                    </div>
                    <EpisodeStatusBadge status={ep.status} />
                  </div>
                ))}
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