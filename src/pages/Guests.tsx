import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, UserPlus, MoreVertical, Heart } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const guests = [
  { 
    id: 1, 
    name: "Tiganá Santana", 
    role: "Compositor e Pesquisador", 
    axes: ["Axé", "Educação"],
    care: "Prefere ser tratado por 'Professor'. Evitar perguntas sobre ritos internos.",
    status: "Ativo"
  },
  { 
    id: 2, 
    name: "Mãe Beth de Oxum", 
    role: "Ialorixá e Comunicadora", 
    axes: ["Axé", "Sociedade"],
    care: "Consultar disponibilidade de acordo com o calendário litúrgico.",
    status: "Ativo"
  },
  { 
    id: 3, 
    name: "Douglas Belchior", 
    role: "Educador e Ativista", 
    axes: ["Educação", "Sociedade"],
    care: "Focar na relação entre movimentos sociais e educação popular.",
    status: "Ativo"
  }
];

const Guests = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D1B14]">Convidados</h1>
            <p className="text-sm text-gray-500">Gerencie a rede de saberes do PApo de Cozinha.</p>
          </div>
          <Button className="bg-[#8B4513] hover:bg-[#6F370F] gap-2">
            <UserPlus size={18} /> Novo Convidado
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input className="pl-10 bg-white border-gray-200" placeholder="Buscar por nome, cargo ou eixo..." />
          </div>
          <Button variant="outline">Filtros</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {guests.map((guest) => (
            <Card key={guest.id} className="border-none shadow-sm hover:shadow-md transition-all group">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#F5E6D3] flex items-center justify-center text-[#8B4513] text-xl font-bold border-2 border-white shadow-sm">
                    {guest.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-[#2D1B14] group-hover:text-[#8B4513] transition-colors">
                      {guest.name}
                    </CardTitle>
                    <p className="text-xs text-gray-500">{guest.role}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <MoreVertical size={18} />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  {guest.axes.map(axis => (
                    <Badge key={axis} variant="secondary" className="bg-orange-50 text-orange-700 border-orange-100 text-[10px]">
                      {axis}
                    </Badge>
                  ))}
                </div>
                
                <div className="bg-[#FDF8F3] p-3 rounded-lg border border-orange-50">
                  <div className="flex items-center gap-2 text-[#8B4513] text-[10px] font-bold uppercase tracking-wider mb-1">
                    <Heart size={12} /> Observação de Cuidado
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed italic">
                    "{guest.care}"
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button variant="link" className="text-[#8B4513] text-xs p-0 h-auto font-bold">
                    Ver Histórico de Episódios →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Guests;