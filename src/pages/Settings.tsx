import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Sparkles, ShieldCheck, Globe, Bell, Save } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const Settings = () => {
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
                  defaultValue="Priorizar termos de acolhimento. Evitar perguntas invasivas sobre segredos litúrgicos. Manter tom de escuta ativa e respeito à ancestralidade."
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-[#8B4513]">Filtro de Sensibilidade Cultural</Label>
                  <p className="text-xs text-gray-500">Bloqueia automaticamente perguntas que possam ser desrespeitosas.</p>
                </div>
                <Switch defaultChecked />
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
                  <Input defaultValue="PApo de Cozinha" className="bg-gray-50 border-none" />
                </div>
                <div className="space-y-2">
                  <Label>Slogan / Descrição Curta</Label>
                  <Input defaultValue="Tecnologia como ferramenta de cuidado." className="bg-gray-50 border-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Link Base para Aprovação</Label>
                <Input defaultValue="https://papodecozinha.com/revisao/" className="bg-gray-50 border-none" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Restaurar Padrões</Button>
            <Button className="bg-[#8B4513] hover:bg-[#6F370F] gap-2" onClick={() => showSuccess("Configurações salvas com sucesso!")}>
              <Save size={18} /> Salvar Alterações
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;