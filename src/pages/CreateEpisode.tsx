import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Mic2, Sparkles, Calendar as CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "@/utils/toast";

const CreateEpisode = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    showSuccess("Episódio criado! Redirecionando para o editor de roteiro...");
    setTimeout(() => navigate("/scripts"), 1500);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[#2D1B14]">Novo Episódio</h1>
          <p className="text-sm text-gray-500">Defina o tema e prepare o terreno para a conversa.</p>
        </div>

        <Card className="border-none shadow-sm">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Episódio</Label>
              <Input id="title" placeholder="Ex: O papel da educação popular nos terreiros" className="bg-gray-50 border-none h-12" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Convidado</Label>
                <Select>
                  <SelectTrigger className="bg-gray-50 border-none h-12">
                    <SelectValue placeholder="Selecione um convidado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Tiganá Santana</SelectItem>
                    <SelectItem value="2">Mãe Beth de Oxum</SelectItem>
                    <SelectItem value="3">Douglas Belchior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Data Prevista</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input type="date" className="pl-10 bg-gray-50 border-none h-12" />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Label className="text-base font-bold text-[#2D1B14]">Eixos Temáticos para a IA</Label>
              <p className="text-xs text-gray-500">Selecione os pilares que devem guiar a geração do roteiro:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 rounded-xl border border-orange-100 bg-orange-50/30">
                  <Checkbox id="axe" />
                  <label htmlFor="axe" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Axé & Espiritualidade
                  </label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl border border-blue-100 bg-blue-50/30">
                  <Checkbox id="edu" />
                  <label htmlFor="edu" className="text-sm font-medium leading-none">
                    Educação Popular
                  </label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl border border-emerald-100 bg-emerald-50/30">
                  <Checkbox id="soc" />
                  <label htmlFor="soc" className="text-sm font-medium leading-none">
                    Sociedade & Luta
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-6 flex gap-4">
              <Button variant="outline" className="flex-1 h-12" onClick={() => navigate("/")}>
                Cancelar
              </Button>
              <Button className="flex-1 h-12 bg-[#8B4513] hover:bg-[#6F370F] gap-2" onClick={handleCreate}>
                <Sparkles size={18} /> Gerar Roteiro com IA
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateEpisode;