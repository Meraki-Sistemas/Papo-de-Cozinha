import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  Globe, 
  Heart, 
  History, 
  MessageSquare,
  ArrowLeft,
  Edit3,
  Loader2
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const GuestDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [guest, setGuest] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        // Busca dados do convidado
        const { data: guestData, error: guestError } = await supabase
          .from('guests')
          .select('*')
          .eq('id', id)
          .single();
        
        if (guestError) throw guestError;
        setGuest(guestData);

        // Busca episódios relacionados
        const { data: episodesData } = await supabase
          .from('episodes')
          .select('*')
          .eq('guest_id', id)
          .order('created_at', { ascending: false });
        
        setEpisodes(episodesData || []);
      } catch (error) {
        console.error("Erro ao buscar dados do convidado:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuestData();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <Loader2 className="animate-spin text-[#8B4513]" size={48} />
        </div>
      </Layout>
    );
  }

  if (!guest) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-500">Convidado não encontrado.</p>
          <Button variant="link" onClick={() => navigate("/guests")}>Voltar para a lista</Button>
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
                  {guest.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold text-[#2D1B14]">{guest.name}</h2>
                <p className="text-sm text-gray-500 mb-6">{guest.role || 'Convidado'}</p>
                
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {guest.axes?.map((axis: string) => (
                    <Badge key={axis} className="bg-orange-50 text-orange-700 border-none">{axis}</Badge>
                  ))}
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
                  <Mail size={16} className="text-gray-400" /> {guest.email || 'Não informado'}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone size={16} className="text-gray-400" /> {guest.phone || 'Não informado'}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Globe size={16} className="text-gray-400" /> {guest.website || 'Não informado'}
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
                  {guest.care_protocol || "Nenhum protocolo de cuidado específico registrado para este convidado."}
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
                {episodes.length > 0 ? (
                  episodes.map((ep) => (
                    <div 
                      key={ep.id} 
                      className="p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group"
                      onClick={() => navigate(`/episodes/${ep.id}`)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-[#2D1B14] group-hover:text-[#8B4513]">{ep.title}</h4>
                        <Badge className="bg-emerald-100 text-emerald-700 border-none uppercase text-[10px]">{ep.status}</Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        {ep.scheduled_date ? `Agendado para ${ep.scheduled_date}` : 'Data não definida'}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">Nenhum episódio registrado com este convidado.</p>
                )}
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