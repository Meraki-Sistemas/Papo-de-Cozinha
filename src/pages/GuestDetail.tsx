import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Heart, 
  History, 
  MessageSquare,
  ArrowLeft,
  Edit3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const GuestDetail = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">
        <Button 
          variant="ghost" 
          className="gap-2 text-gray-500 hover:text-[#8B4513]"
          onClick={() => navigate("/guests")}
        >
          <ArrowLeft size={16} /> Voltar para convidados
        </Button>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar do Perfil */}
          <div className="w-full md:w-80 space-y-6">
            <Card className="border-none shadow-sm overflow-hidden">
              <div className="h-32 bg-[#8B4513]" />
              <CardContent className="p-6 -mt-16 text-center">
                <div className="w-32 h-32 rounded-full bg-[#F5E6D3] border-4 border-white shadow-lg mx-auto flex items-center justify-center text-[#8B4513] text-4xl font-bold mb-4">
                  T
                </div>
                <h2 className="text-2xl font-bold text-[#2D1B14]">Tiganá Santana</h2>
                <p className="text-sm text-gray-500 mb-6">Compositor e Pesquisador</p>
                
                <div className="flex justify-center gap-2 mb-6">
                  <Badge className="bg-orange-50 text-orange-700 border-none">Axé</Badge>
                  <Badge className="bg-blue-50 text-blue-700 border-none">Educação</Badge>
                </div>

                <Button className="w-full bg-[#8B4513] hover:bg-[#6F370F] gap-2">
                  <Edit3 size={16} /> Editar Perfil
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold">Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail size={16} className="text-gray-400" /> tigana@exemplo.com
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone size={16} className="text-gray-400" /> (11) 99999-9999
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Globe size={16} className="text-gray-400" /> tiganasantana.com
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo Principal */}
          <div className="flex-1 space-y-6">
            <Card className="border-none shadow-sm bg-[#FDF8F3] border-l-4 border-[#8B4513]">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-[#8B4513]">
                  <Heart size={20} /> Protocolo de Cuidado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "Tiganá valoriza o silêncio e a escuta profunda. Prefere ser tratado por 'Professor'. Evitar perguntas sobre ritos internos de sua casa. Consultar disponibilidade sempre com 30 dias de antecedência devido às suas viagens de pesquisa."
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <History size={20} /> Histórico no Podcast
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-[#2D1B14] group-hover:text-[#8B4513]">Ep #012: Ancestralidade e Tecnologia</h4>
                    <Badge className="bg-emerald-100 text-emerald-700 border-none">Concluído</Badge>
                  </div>
                  <p className="text-xs text-gray-500">Gravado em 15 Out, 2023 • 54 min de conversa</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-[#2D1B14] group-hover:text-[#8B4513]">Ep #003: O Som do Silêncio</h4>
                    <Badge className="bg-emerald-100 text-emerald-700 border-none">Concluído</Badge>
                  </div>
                  <p className="text-xs text-gray-500">Gravado em 10 Jan, 2023 • 42 min de conversa</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <MessageSquare size={20} /> Notas de Produção
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs font-bold text-gray-400 mb-1">Silvana • 14 Out</p>
                    <p className="text-sm text-gray-600">"O convidado solicitou que o link do seu novo livro seja incluído na descrição do episódio."</p>
                  </div>
                  <Button variant="outline" className="w-full border-dashed text-gray-400 hover:text-[#8B4513] hover:border-[#8B4513]">
                    + Adicionar Nota
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GuestDetail;