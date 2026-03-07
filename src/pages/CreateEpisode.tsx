import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";

const CreateEpisode = () => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState<any[]>([]);
  const [loadingGuests, setLoadingGuests] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [guestId, setGuestId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchGuests = async () => {
      const { data, error } = await supabase.from('guests').select('id, name').order('name');
      if (error) {
        showError("Não foi possível carregar convidados.");
      }
      setGuests(data || []);
      setLoadingGuests(false);
    };
    fetchGuests();
  }, []);

  const handleCreate = async () => {
    if (!title || !guestId) {
      showError("Por favor, preencha o título e selecione um convidado.");
      return;
    }

    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('episodes')
        .insert([
          { 
            title, 
            guest_id: guestId, 
            scheduled_date: date || null,
            status: 'planejado',
            created_by: user?.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      showSuccess("Episódio criado com sucesso!");
      navigate(`/episodes/${data.id}`);
    } catch (error: any) {
      showError("Erro ao criar episódio: " + error.message);
    } finally {
      setSubmitting(false);
    }
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
              <Input 
                id="title" 
                placeholder="Ex: O papel da educação popular nos terreiros" 
                className="bg-gray-50 border-none h-12"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Convidado</Label>
                <Select onValueChange={setGuestId} value={guestId} disabled={loadingGuests || guests.length === 0}>
                  <SelectTrigger className="bg-gray-50 border-none h-12">
                    <SelectValue placeholder={loadingGuests ? "Carregando..." : (guests.length === 0 ? "Nenhum convidado cadastrado" : "Selecione um convidado")} />
                  </SelectTrigger>
                  <SelectContent>
                    {guests.map(guest => (
                      <SelectItem key={guest.id} value={guest.id}>{guest.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {(!loadingGuests && guests.length === 0) && (
                  <p className="text-xs text-gray-500 mt-1">Cadastre um convidado na seção Convidados antes de criar um episódio.</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Data Prevista</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    type="date" 
                    className="pl-10 bg-gray-50 border-none h-12" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Label className="text-base font-bold text-[#2D1B14]">Eixos Temáticos para a IA</Label>
              <p className="text-xs text-gray-500">Selecione os pilares que devem guiar a geração do roteiro:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 rounded-xl border border-orange-100 bg-orange-50/30">
                  <Checkbox id="axe" />
                  <label htmlFor="axe" className="text-sm font-medium leading-none">
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
              <Button 
                className="flex-1 h-12 bg-[#8B4513] hover:bg-[#6F370F] gap-2" 
                onClick={handleCreate}
                disabled={submitting || !title || !guestId}
              >
                {submitting ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                Criar Episódio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateEpisode;