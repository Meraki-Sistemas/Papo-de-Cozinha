import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Mic2, 
  Scissors, 
  Share2, 
  CheckCircle2, 
  Clock, 
  Calendar,
  ArrowLeft,
  MessageSquare
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { EpisodeStatusBadge } from "@/components/EpisodeStatusBadge";

const EpisodeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const steps = [
    { label: "Planejamento", status: "complete", icon: Calendar },
    { label: "Roteirização", status: "current", icon: FileText },
    { label: "Gravação", status: "pending", icon: Mic2 },
    { label: "Edição", status: "pending", icon: Scissors },
    { label: "Distribuição", status: "pending", icon: Share2 },
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">
        <Button 
          variant="ghost" 
          className="gap-2 text-gray-500 hover:text-[#8B4513]"
          onClick={() => navigate("/episodes")}
        >
          <ArrowLeft size={16} /> Voltar para a lista
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-[#2D1B14]">Ancestralidade e Tecnologia</h1>
              <EpisodeStatusBadge status="revisao" />
            </div>
            <p className="text-gray-500">Episódio #012 • Convidado: <span className="font-semibold text-[#8B4513]">Tiganá Santana</span></p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <MessageSquare size={18} /> Notas da Equipe
            </Button>
            <Button className="bg-[#8B4513] hover:bg-[#6F370F] gap-2">
              <CheckCircle2 size={18} /> Aprovar Etapa
            </Button>
          </div>
        </div>

        {/* Timeline de Progresso */}
        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardContent className="p-8">
            <div className="relative flex justify-between">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
              {steps.map((step, idx) => (
                <div key={step.label} className="relative z-10 flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-all ${
                    step.status === 'complete' ? 'bg-emerald-500 text-white' : 
                    step.status === 'current' ? 'bg-[#E89D1E] text-[#2D1B14] scale-110' : 
                    'bg-gray-100 text-gray-400'
                  }`}>
                    <step.icon size={20} />
                  </div>
                  <span className={`text-xs font-bold ${step.status === 'current' ? 'text-[#2D1B14]' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Checklist Ético */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-emerald-500" /> Checklist de Cuidado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Consultar calendário litúrgico do convidado",
                  "Revisar termos sensíveis na Base de Saberes",
                  "Enviar link de aprovação prévia do roteiro",
                  "Preparar ambiente de acolhimento no estúdio"
                ].map((task, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="w-5 h-5 rounded border-2 border-gray-200 group-hover:border-[#E89D1E] transition-colors" />
                    <span className="text-sm text-gray-700">{task}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Ações Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-none shadow-sm hover:bg-orange-50 transition-colors cursor-pointer" onClick={() => navigate("/scripts")}>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-orange-600">
                    <FileText size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-[#2D1B14]">Editar Roteiro</p>
                    <p className="text-xs text-gray-500">Última edição há 2h</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm hover:bg-blue-50 transition-colors cursor-pointer" onClick={() => navigate("/calendar")}>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-[#2D1B14]">Ver na Agenda</p>
                    <p className="text-xs text-gray-500">15 Out • 14:00</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-[#2D1B14] text-white">
              <CardHeader>
                <CardTitle className="text-sm font-bold">Resumo da IA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    "Este episódio foca na interseção entre tecnologia e ancestralidade. O roteiro atual está 85% alinhado com as diretrizes éticas de linguagem não colonial."
                  </p>
                </div>
                <Button variant="secondary" className="w-full bg-white/10 border-none text-white hover:bg-white/20 text-xs">
                  Gerar Briefing para Equipe
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold">Arquivos Relacionados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between p-2 text-xs text-gray-600 hover:bg-gray-50 rounded">
                  <span className="flex items-center gap-2"><FileText size={14} /> Roteiro_v2.pdf</span>
                  <Clock size={12} />
                </div>
                <div className="flex items-center justify-between p-2 text-xs text-gray-600 hover:bg-gray-50 rounded">
                  <span className="flex items-center gap-2"><Mic2 size={14} /> Referencia_Audio.mp3</span>
                  <Clock size={12} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EpisodeDetail;