import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Share2, MessageSquare, Info, History, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { showSuccess } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";

type ScriptVersion = {
  id: string;
  createdAt: string;
  author?: string;
  content: string;
};

const STORAGE_KEY = "script_versions";

const ScriptEditor = () => {
  const [script, setScript] = useState(`
# Abertura
Boas vindas à nossa cozinha. Hoje recebemos alguém que transita entre o saber acadêmico e o saber ancestral...

# Bloco 1: Axé e Espiritualidade
- Como a sua caminhada no terreiro influenciou sua visão sobre educação popular?

# Bloco 2: Educação e Sociedade
- O papel da universidade na descolonização do pensamento.
  `);

  const [displayName, setDisplayName] = useState<string>("");
  const [versions, setVersions] = useState<ScriptVersion[]>([]);

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

  // Carrega versões do storage ao montar
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const list = JSON.parse(raw) as ScriptVersion[];
        setVersions(Array.isArray(list) ? list : []);
      } catch {
        setVersions([]);
      }
    }
  }, []);

  const saveVersionsToStorage = (list: ScriptVersion[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const handleShare = async () => {
    const link = `${window.location.origin}/public/script/demo`;
    await navigator.clipboard.writeText(link);
    showSuccess("Link público copiado!");
  };

  const handleSaveVersion = () => {
    const newVersion: ScriptVersion = {
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      author: displayName || undefined,
      content: script,
    };
    const next = [newVersion, ...versions].slice(0, 50);
    setVersions(next);
    saveVersionsToStorage(next);
    showSuccess("Versão salva com sucesso!");
  };

  const loadVersion = (v: ScriptVersion) => {
    setScript(v.content);
    showSuccess("Versão carregada no editor.");
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D1B14]">Editor de Roteiro</h1>
            <p className="text-sm text-gray-500">Edite e salve versões do roteiro para revisão e aprovação.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={handleShare}>
              <Share2 size={18} /> Compartilhar
            </Button>
            <Button className="bg-[#8B4513] hover:bg-[#6F370F] gap-2" onClick={handleSaveVersion}>
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
                  placeholder="Comece a escrever o roteiro..."
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <History size={16} /> Versões Salvas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {versions.length === 0 ? (
                  <div className="text-xs text-gray-500 italic">Nenhuma versão salva ainda.</div>
                ) : (
                  versions.map((v, idx) => (
                    <button
                      key={v.id}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all"
                      onClick={() => loadVersion(v)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-bold ${idx === 0 ? "text-[#8B4513]" : "text-gray-400"}`}>
                          {idx === 0 ? "Mais recente" : `v${versions.length - idx}`}
                        </span>
                        <Clock size={10} className="text-gray-400" />
                      </div>
                      <p className="text-[10px] text-gray-500">
                        {new Date(v.createdAt).toLocaleString()} {v.author ? `• ${v.author}` : ""}
                      </p>
                    </button>
                  ))
                )}
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