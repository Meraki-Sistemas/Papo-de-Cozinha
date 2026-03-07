import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Save, Share2, MessageSquare, Info, History, Clock } from "lucide-react";
import { useState } from "react";
import { showSuccess } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import ScriptAIGenerator from "@/components/ScriptAIGenerator";

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

  const [displayName, setDisplayName] = useState<string>("");

  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email;
      const userId = session?.user?.id;
      if (!userId) {
        setDisplayName(email || "");
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", userId)
        .single();
      setDisplayName(profile?.full_name?.trim() || email || "");
    };
    loadUser();
  }, []);

  const insertSnippet = (text: string) => {
    setScript((prev) => `${prev}\n${text}`);
  };

  const handleShare = async () => {
    const link = `${window.location.origin}/public/script/demo`;
    await navigator.clipboard.writeText(link);
    showSuccess("Link público copiado!");
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D1B14]">Editor de Roteiro</h1>
            <p className="text-sm text-gray-500">Episódio: Ancestralidade e Tecnologia • Convidado: Tiganá Santana</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={handleShare}>
              <Share2 size={18} /> Compartilhar
            </Button>
            <Button className="bg-[#8B4513] hover:bg-[#6F370F] gap-2" onClick={() => showSuccess("Versão salva com sucesso!")}>
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
            <Tabs defaultValue="ai" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger value="ai" className="gap-2"><Sparkles size={14} /> IA</TabsTrigger>
                <TabsTrigger value="history" className="gap-2"><History size={14} /> Histórico</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ai">
                <Card className="border-none shadow-sm bg-[#FDF8F3] mt-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#8B4513]">
                      Assistente Aiyê
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ScriptAIGenerator onInsert={insertSnippet} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card className="border-none shadow-sm mt-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold">Versões Salvas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-2 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-100 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-[#8B4513]">v2.1 (Atual)</span>
                        <Clock size={10} className="text-gray-400" />
                      </div>
                      <p className="text-[10px] text-gray-500">Hoje, 14:30 {displayName ? `por ${displayName}` : ""}</p>
                    </div>
                    <div className="p-2 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-100 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-gray-400">v2.0</span>
                        <Clock size={10} className="text-gray-400" />
                      </div>
                      <p className="text-[10px] text-gray-500">Ontem, 18:15 {displayName ? `por ${displayName}` : ""}</p>
                    </div>
                    <div className="p-2 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-100 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-gray-400">v1.0 (IA Inicial)</span>
                        <Clock size={10} className="text-gray-400" />
                      </div>
                      <p className="text-[10px] text-gray-500">14 Out, 10:00 por Sistema</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <MessageSquare size={16} /> Comentários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Info size={24} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-xs text-gray-400">Nenhum comentário ainda.</p>
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