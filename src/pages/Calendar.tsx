import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, MapPin, Video, ChevronLeft, ChevronRight } from "lucide-react";
import { EpisodeStatusBadge } from "@/components/EpisodeStatusBadge";

const schedule = [
  {
    id: 1,
    date: "15 Out",
    time: "14:00",
    title: "Ancestralidade e Tecnologia",
    guest: "Tiganá Santana",
    type: "Presencial",
    location: "Estúdio Aiyê",
    status: "revisao"
  },
  {
    id: 2,
    date: "18 Out",
    time: "10:30",
    title: "Educação de Terreiro",
    guest: "Mãe Beth de Oxum",
    type: "Remoto",
    location: "Google Meet",
    status: "aprovado"
  },
  {
    id: 3,
    date: "22 Out",
    time: "16:00",
    title: "Sociedade e Axé",
    guest: "Douglas Belchior",
    type: "Presencial",
    location: "Estúdio Aiyê",
    status: "roteirizacao"
  }
];

const CalendarPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D1B14]">Agenda de Gravações</h1>
            <p className="text-sm text-gray-500">Organize o tempo e o espaço para a escuta ativa.</p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-100">
            <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft size={16} /></Button>
            <span className="text-sm font-bold px-2">Outubro 2023</span>
            <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight size={16} /></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {schedule.map((item) => (
            <Card key={item.id} className="border-none shadow-sm hover:shadow-md transition-all overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="bg-[#8B4513] text-white p-6 flex flex-col items-center justify-center min-w-[120px]">
                  <span className="text-xs uppercase font-bold opacity-80">Out</span>
                  <span className="text-3xl font-black">{item.date.split(' ')[0]}</span>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <h3 className="font-bold text-lg text-[#2D1B14]">{item.title}</h3>
                      <EpisodeStatusBadge status={item.status as any} />
                    </div>
                    <p className="text-sm text-gray-600">Convidado: <span className="font-semibold">{item.guest}</span></p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-[#E89D1E]" /> {item.time}
                      </div>
                      <div className="flex items-center gap-1">
                        {item.type === 'Presencial' ? <MapPin size={14} className="text-[#E89D1E]" /> : <Video size={14} className="text-[#E89D1E]" />}
                        {item.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Detalhes</Button>
                    <Button className="bg-[#8B4513] hover:bg-[#6F370F] size-sm">Preparar Estúdio</Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;