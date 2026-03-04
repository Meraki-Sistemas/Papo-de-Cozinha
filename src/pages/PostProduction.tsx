import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileAudio, Scissors, Share2, MessageSquare, CheckCircle2, Download } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const PostProduction = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-gray-100 text-gray-600 border-none">Episódio #012</Badge>
              <Badge className="bg-emerald-100 text-emerald-700 border-none">Gravado</Badge>
            </div>
            <h1 className="text-2xl font-bold text-[#2D1B14]">Ancestralidade e Tecnologia</h1>
            <p className="text-sm text-gray-500">Convidado: Prof. Dr. Tiganá Santana • Gravado em 15/10/2023</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2" onClick={() => showSuccess("Episódio enviado para publicação!")}>
            <CheckCircle2 size={18} /> Finalizar Episódio
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <FileAudio size={20} className="text-[#8B4513]" /> Arquivos Brutos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FileAudio size={24} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Audio_Master_Tigana.wav</p>
                      <p className="text-xs text-gray-500">450 MB • Alta Fidelidade</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon"><Download size={18} /></Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FileAudio size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Audio_Backup_Ambiente.wav</p>
                      <p className="text-xs text-gray-500">120 MB • Backup</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon"><Download size={18} /></Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Scissors size={20} className="text-[#8B4513]" /> Notas de Edição
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-[#FDF8F3] rounded-xl border border-orange-100">
                  <p className="text-xs font-bold text-[#8B4513] mb-2">Minuto 12:45</p>
                  <p className="text-sm text-gray-700">"Remover ruído de fundo durante a explicação sobre o conceito de Itan. Manter a pausa dramática."</p>
                </div>
                <div className="p-4 bg-[#FDF8F3] rounded-xl border border-orange-100">
                  <p className="text-xs font-bold text-[#8B4513] mb-2">Minuto 34:20</p>
                  <p className="text-sm text-gray-700">"Destaque para corte de redes sociais: A fala sobre a universidade e a descolonização."</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-[#2D1B14] text-white">
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Share2 size={16} className="text-[#E89D1E]" /> Kit de Divulgação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="secondary" className="w-full justify-start text-xs bg-white/10 border-none text-white hover:bg-white/20">
                  Gerar Legendas com IA
                </Button>
                <Button variant="secondary" className="w-full justify-start text-xs bg-white/10 border-none text-white hover:bg-white/20">
                  Extrair Citações (Quotes)
                </Button>
                <Button variant="secondary" className="w-full justify-start text-xs bg-white/10 border-none text-white hover:bg-white/20">
                  Criar Capa do Episódio
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <MessageSquare size={16} /> Feedback do Convidado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-500 italic">
                  "O convidado adorou a dinâmica e solicitou que o link do seu novo livro seja incluído na descrição."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostProduction;