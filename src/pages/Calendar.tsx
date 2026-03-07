import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, Video, ChevronLeft, ChevronRight, Loader2, Pencil } from "lucide-react";
import { EpisodeStatusBadge } from "@/components/EpisodeStatusBadge";
import { supabase } from "@/integrations/supabase/client";
import { format, isSameMonth, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "@/utils/toast";
import RescheduleDialog from "@/components/RescheduleDialog";

const CalendarPage = () => {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [reschedOpen, setReschedOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('episodes')
      .select('*, guests(name)')
      .not('scheduled_date', 'is', null)
      .order('scheduled_date', { ascending: true });
    if (!error) setEpisodes(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return episodes.filter((e) => {
      if (!e.scheduled_date) return false;
      const d = typeof e.scheduled_date === "string" ? parseISO(e.scheduled_date) : new Date(e.scheduled_date);
      return isSameMonth(d, currentMonth);
    });
  }, [episodes, currentMonth]);

  const monthLabel = format(currentMonth, "LLLL yyyy", { locale: ptBR });

  const prevMonth = () => setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D1B14]">Agenda de Gravações</h1>
            <p className="text-sm text-gray-500">Organize o tempo e o espaço para a escuta ativa.</p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-100">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prevMonth}><ChevronLeft size={16} /></Button>
            <span className="text-sm font-bold px-2 capitalize">{monthLabel}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextMonth}><ChevronRight size={16} /></Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-[#8B4513]" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((item) => (
              <Card key={item.id} className="border-none shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-[#8B4513] text-white p-6 flex flex-col items-center justify-center min-w-[120px]">
                    <span className="text-xs uppercase font-bold opacity-80">
                      {item.scheduled_date ? format(new Date(item.scheduled_date), 'MMM', { locale: ptBR }) : '---'}
                    </span>
                    <span className="text-3xl font-black">
                      {item.scheduled_date ? format(new Date(item.scheduled_date), 'dd') : '--'}
                    </span>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <h3 className="font-bold text-lg text-[#2D1B14]">{item.title}</h3>
                        <EpisodeStatusBadge status={item.status as any} />
                      </div>
                      <p className="text-sm text-gray-600">Convidado: <span className="font-semibold">{item.guests?.name || 'N/A'}</span></p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock size={14} className="text-[#E89D1E]" /> {item.scheduled_time || 'Horário a definir'}
                        </div>
                        <div className="flex items-center gap-1">
                          {item.type === 'Presencial' ? <MapPin size={14} className="text-[#E89D1E]" /> : <Video size={14} className="text-[#E89D1E]" />}
                          {item.location || 'Local a definir'}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/episodes/${item.id}`)}>Detalhes</Button>
                      <Button variant="outline" size="sm" onClick={() => { setSelected(item); setReschedOpen(true); }}>
                        <Pencil size={14} className="mr-2" /> Reagendar
                      </Button>
                      <Button className="bg-[#8B4513] hover:bg-[#6F370F] size-sm" onClick={() => showSuccess("Checklist de preparação do estúdio acionado!")}>Preparar Estúdio</Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400 italic bg-white rounded-2xl border border-dashed border-gray-200">
                Nenhuma gravação agendada neste mês.
              </div>
            )}
          </div>
        )}
      </div>

      <RescheduleDialog
        open={reschedOpen}
        onOpenChange={setReschedOpen}
        episode={selected}
        onSaved={() => load()}
      />
    </Layout>
  );
};

export default CalendarPage;