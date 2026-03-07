import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Sparkles, Globe, Save } from "lucide-react";
import { showSuccess } from "@/utils/toast";

type SettingsState = {
  aiGuidelines: string;
  sensitivityFilter: boolean;
  podcastName: string;
  podcastSlogan: string;
  approvalBaseUrl: string;
};

const DEFAULTS: SettingsState = {
  aiGuidelines:
    "Priorizar termos de acolhimento. Evitar perguntas invasivas sobre segredos litúrgicos. Manter tom de escuta ativa e respeito à ancestralidade.",
  sensitivityFilter: true,
  podcastName: "PApo de Cozinha",
  podcastSlogan: "Tecnologia como ferramenta de cuidado.",
  approvalBaseUrl: "https://papodecozinha.com/revisao/",
};

const STORAGE_KEY = "aiye_hub_settings";

const Settings = () => {
  const [state, setState] = useState<SettingsState>(DEFAULTS);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as SettingsState;
        setState({ ...DEFAULTS, ...parsed });
      } catch {
        setState(DEFAULTS);
      }
    }
  }, []);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    showSuccess("Configurações salvas com sucesso!");
  };

  const restore = () => {
    setState(DEFAULTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULTS));
    showSuccess("Configurações restauradas para os padrões.");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[#2D1B14]">Configurações do Hub</h1>
          <p className="text-sm text-gray-500">Ajuste as diretrizes éticas e os parâmetros do sistema.</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* IA Ética */}
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-700">
                <Sparkles size={20} />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Diretrizes da IA Assistente</CardTitle>
                <p className="text-xs text-gray-500">Defina como a IA deve se comportar ao gerar roteiros.</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Linguagem e Tom</Label>
                <Textarea
                  placeholder="Ex: Use linguagem não colonial, evite termos exóticos para ritos de terreiro..."
                  className="bg-gray-50 border-none min-h-[100px]"
                  value={state.aiGuidelines}
                  onChange={(e) => setState((s) => ({ ...s, aiGuidelines: e.target.value }))}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-[#8B4513]">Filtro de Sensibilidade Cultural</Label>
                  <p className="text-xs text-gray-500">Bloqueia automaticamente perguntas que possam ser desrespeitosas.</p>
                </div>
                <Switch
                  checked={state.sensitivityFilter}
                  onCheckedChange={(val) => setState((s) => ({ ...s, sensitivityFilter: Boolean(val) }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Metadados do Podcast */}
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                <Globe size={20} />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Informações do Podcast</CardTitle>
                <p className="text-xs text-gray-500">Dados que aparecem nos links públicos e exportações.</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome do Podcast</Label>
                  <Input
                    value={state.podcastName}
                    onChange={(e) => setState((s) => ({ ...s, podcastName: e.target.value }))}
                    className="bg-gray-50 border-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slogan / Descrição Curta</Label>
                  <Input
                    value={state.podcastSlogan}
                    onChange={(e) => setState((s) => ({ ...s, podcastSlogan: e.target.value }))}
                    className="bg-gray-50 border-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Link Base para Aprovação</Label>
                <Input
                  value={state.approvalBaseUrl}
                  onChange={(e) => setState((s) => ({ ...s, approvalBaseUrl: e.target.value }))}
                  className="bg-gray-50 border-none"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={restore}>Restaurar Padrões</Button>
            <Button className="bg-[#8B4513] hover:bg-[#6F370F] gap-2" onClick={save}>
              <Save size={18} /> Salvar Alterações
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;