import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Mic2, 
  Scissors, 
  Share2, 
  CheckCircle2, 
  Calendar,
  ArrowLeft,
  MessageSquare,
  Loader2
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { EpisodeStatusBadge, EpisodeStatus } from "@/components/EpisodeStatusBadge";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";

const statusOrder: EpisodeStatus[] = ['planejado', 'roteirizacao', 'revisao', 'aprovado', 'gravado'];

const EpisodeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [episode, setEpisode] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const { data, error } = await supabase
          .from('episodes')
          .select('*, guests(*)')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        setEpisode(data);
      } catch (error) {
        console.error("Erro ao buscar episódio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [id]);

  const steps = [
    { label: "Planejamento", key: "planejado", icon: Calendar },
    { label: "Roteirização", key: "roteirizacao", icon: FileText },
    { label: "Revisão", key: "revisao", icon: MessageSquare },
    { label: "Aprovação", key: "aprovado", icon: CheckCircle2 },
    { label: "Gravação", key: "gravado", icon: Mic2 },
  ];

  const getStepStatus = (stepKey: string) => {
    const currentIdx = statusOrder.indexOf(episode?.status || 'planejado');
    const stepIdx = statusOrder.indexOf(stepKey as EpisodeStatus);

    if (stepIdx < currentIdx) return 'complete';
    if (stepIdx === currentIdx) return 'current';
    return 'pending';
  };

  const advanceStatus = async () => {
    if (!episode) return;
    const currentIdx = statusOrder.indexOf(episode.status as EpisodeStatus);
    const nextIdx = Math.min(currentIdx + 1, statusOrder.length - 1);
    const nextStatus = statusOrder[nextIdx];
    if (nextStatus === episode.status) {
      showSuccess("O episódio já está na última etapa.");
      return;
    }
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('episodes')
        .update({ status: nextStatus })
        .eq('id', episode.id);
      if (error) throw error;
      setEpisode((prev: any) => ({ ...prev, status: nextStatus }));
      showSuccess("Etapa avançada com sucesso.");
    } catch (err: any) {
      showError(err?.message || "Erro ao avançar etapa.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <Loader2 className="animate-spin text-[#8B4513]" size={48} />
        </div>
      </Layout>
    );
  }

  if (!episode) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-500">Episódio não encontrado.</p>
          <Button variant="link" onClick={() => navigate("/episodes")}>Voltar para a lista</Button>
        </div>
      </Layout>
    );
  }

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
              <h1 className="text-3xl font-bold text-[#2D1B14]">{episode.title}</h1>
              <EpisodeStatusBadge status={episode.status as EpisodeStatus} />
            </div>
            <p className="text-gray-500">
              Episódio #{episode.id.slice(0, 4)} • Convidado: 
              <span 
                className="font-semibold text-[#8B4513] cursor-pointer hover:underline ml-1"
                onClick={() => navigate(`/guests/${episode.guests?.id}`)}
              >
                {episode.guests?.name}
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <MessageSquare size={18} /> Notas da Equipe
            </Button>
            <Button 
              className="bg-[#8B4513] hover:bg-[#6F370F] gap-2"
              onClick={advanceStatus}
              disabled={updating}
            >
              {updating ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
              Próxima Etapa
            </Button>
          </div>
        </div>

        {/* Timeline de Progresso */}
        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardContent className="p-8">
            <div className="relative flex justify-between">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
              {steps.map((step) => {
                const status = getStepStatus(step.key);
                return (
                  <div key={step.label} className="relative z-10 flex flex-col items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-all ${
                      status === 'complete' ? 'bg-emerald-500 text-white' : 
                      status === 'current' ? 'bg-[#E89D1E] text-[#2D1B14] scale-110' : 
                      'bg-gray-100 text-gray-400'
                    }`}>
                      <step.icon size={20} />
                    </div>
                    <span className={`text-xs font-bold ${status === 'current' ? 'text-[#2D1B14]' : 'text-gray-400'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
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
                <div className="bg-[#FDF8F3] p-4 rounded-xl border border-orange-50 mb-4">
                  <p className="text-xs font-bold text-[#8B4513] uppercase mb-1">Protocolo do Convidado</p>
                  <p className="text-sm text-gray-600 italic">"{episode.guests?.care_protocol || 'Sem observações específicas.'}"</p>
                </div>
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
                    <p className="text-xs text-gray-500">Clique para abrir o editor</p>
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
                    <p className="text-xs text-gray-500">{episode.scheduled_date || 'Data a definir'}</p>
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
                    "Este episódio foca na interseção entre tecnologia e ancestralidade. O roteiro atual está sendo processado com base nos eixos selecionados."
                  </p>
                </div>
                <Button variant="secondary" className="w-full bg-white/10 border-none text-white hover:bg-white/20 text-xs">
                  Gerar Briefing para Equipe
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EpisodeDetail;