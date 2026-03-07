import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, MoreVertical, Heart, Loader2, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import NewGuestDialog from "@/components/NewGuestDialog";
import EditGuestDialog from "@/components/EditGuestDialog";
import { showError, showSuccess } from "@/utils/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Guests = () => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openNewGuest, setOpenNewGuest] = useState(false);
  const [openEditGuest, setOpenEditGuest] = useState(false);
  const [currentGuest, setCurrentGuest] = useState<any | null>(null);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setGuests(data || []);
    } catch (error: any) {
      console.error("Erro ao buscar convidados:", error);
      showError("Não foi possível carregar os convidados.");
    } finally {
      setLoading(false);
    }
  };

  const askDelete = async (guest: any) => {
    if (!window.confirm(`Excluir convidado "${guest.name}"? Esta ação não pode ser desfeita.`)) return;
    try {
      const { error } = await supabase.from("guests").delete().eq("id", guest.id);
      if (error) {
        showError(error.message.includes("permission") ? "Permissão negada: ajuste as políticas RLS para permitir DELETE em 'guests'." : error.message);
        return;
      }
      showSuccess("Convidado excluído.");
      fetchGuests();
    } catch (err: any) {
      showError(err?.message || "Erro ao excluir convidado.");
    }
  };

  const filteredGuests = guests.filter(guest => 
    guest.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D1B14]">Convidados</h1>
            <p className="text-sm text-gray-500">Gerencie a rede de saberes do PApo de Cozinha.</p>
          </div>
          <Button className="bg-[#8B4513] hover:bg-[#6F370F] gap-2" onClick={() => setOpenNewGuest(true)}>
            <UserPlus size={18} /> Novo Convidado
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              className="pl-10 bg-white border-gray-200" 
              placeholder="Buscar por nome ou cargo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={() => showSuccess("Filtros em breve.")}>Filtros</Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-[#8B4513]" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredGuests.map((guest) => (
              <Card 
                key={guest.id} 
                className="border-none shadow-sm hover:shadow-md transition-all group cursor-pointer"
                onClick={() => navigate(`/guests/${guest.id}`)}
              >
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#F5E6D3] flex items-center justify-center text-[#8B4513] text-xl font-bold border-2 border-white shadow-sm">
                      {guest.name?.charAt(0) || "?"}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-[#2D1B14] group-hover:text-[#8B4513] transition-colors">
                        {guest.name}
                      </CardTitle>
                      <p className="text-xs text-gray-500">{guest.role}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-400" onClick={(e) => e.stopPropagation()}>
                        <MoreVertical size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenuItem onClick={() => { setCurrentGuest(guest); setOpenEditGuest(true); }}>
                        <Pencil className="mr-2 h-4 w-4" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 focus:text-red-700" onClick={() => askDelete(guest)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {guest.axes?.map((axis: string) => (
                      <Badge key={axis} variant="secondary" className="bg-orange-50 text-orange-700 border-orange-100 text-[10px]">
                        {axis}
                      </Badge>
                    ))}
                  </div>
                  
                  {guest.care_protocol && (
                    <div className="bg-[#FDF8F3] p-3 rounded-lg border border-orange-50">
                      <div className="flex items-center gap-2 text-[#8B4513] text-[10px] font-bold uppercase tracking-wider mb-1">
                        <Heart size={12} /> Observação de Cuidado
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed italic">
                        "{guest.care_protocol}"
                      </p>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <Button 
                      variant="link" 
                      className="text-[#8B4513] text-xs p-0 h-auto font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/guests/${guest.id}`);
                      }}
                    >
                      Ver Detalhes →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredGuests.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-400 italic">
                Nenhum convidado encontrado.
              </div>
            )}
          </div>
        )}

        <NewGuestDialog 
          open={openNewGuest} 
          onOpenChange={setOpenNewGuest}
          onCreated={() => fetchGuests()}
        />

        <EditGuestDialog
          open={openEditGuest}
          onOpenChange={setOpenEditGuest}
          guest={currentGuest}
          onSaved={() => fetchGuests()}
        />
      </div>
    </Layout>
  );
};

export default Guests;