import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Save, Share2, MessageSquare, Info } from "lucide-react";
import { useState } from "react";
import { showSuccess } from "@/utils/toast";

const ScriptEditor = () => {
  const [script, setScript] = useState(`
# Abertura
Boas vindas à nossa cozinha. Hoje recebemos alguém que transita entre o saber acadêmico e o saber ancestral...

# Bloco 1: Axé e Espiritualidade
- Como a sua caminhada no terreiro influenciou sua visão sobre educação popular?
- [IA Sugestão]: De que forma o conceito de 'Itan' pode ser aplicado na sala de aula moderna?

# Bloco 2: Educação e Sociedade
- O papel da universidade na descolonização do pensamento.
  `);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D1B14]">Editor de Roteiro</h1>
            <p className="text-sm text-gray-500">Episódio: Ancestralidade e Tecnologia • Convidado: Tiganá Santana</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={() => showSuccess("Link público copiado!")}>
              <Share2 size={18} /> Compartilhar
            </Button>
            <Button className="bg-[#8B4513] hover:bg-[#6F370F] gap-2">
              <Save size={18} /> Salvar Versão
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <Card className="border-none shadow-sm min-h-[600px]">
              <CardContent className="p-0">
                <textarea 
                  className="w-full h-[600px] p-8 focus:outline-none resize-none font-serif text-lg leading-relaxed bg-transparent"
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  placeholder="Comece a escrever ou use a IA para gerar blocos..."
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-[#FDF8F3]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#8B4513]">
                  <Sparkles size={16} /> Assistente Aiyê
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-gray-600">Gere perguntas baseadas nos eixos do podcast:</p>
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="secondary" size="sm" className="justify-start text-xs bg-white border-orange-100 hover:bg-orange-50">
                    Eixo: Axé & Espiritualidade
                  </Button>
                  <Button variant="secondary" size="sm" className="justify-start text-xs bg-white border-orange-100 hover:bg-orange-50">
                    Eixo: Educação Popular
                  </Button>
                  <Button variant="secondary" size="sm" className="justify-start text-xs bg-white border-orange-100 hover:bg-orange-50">
                    Eixo: Sociedade & Luta
                  </Button>
                </div>
                <div className="pt-4 border-t border-orange-100">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-2">Contexto do Convidado</p>
                  <div className="bg-white p-3 rounded-lg text-xs text-gray-600 border border-orange-50">
                    "Tiganá Santana é o primeiro compositor brasileiro a apresentar um álbum com canções em línguas africanas..."
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <MessageSquare size={16} /> Comentários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Info size={24} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-xs text-gray-400">Nenhum comentário do convidado ainda.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScriptEditor;