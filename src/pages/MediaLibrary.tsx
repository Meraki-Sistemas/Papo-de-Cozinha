import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Music, 
  Play, 
  Download, 
  Search, 
  Plus, 
  MoreVertical,
  Volume2,
  Mic2
} from "lucide-react";

const assets = [
  { id: 1, name: "Vinheta_Abertura_Cozinha.mp3", type: "Vinheta", duration: "0:15", size: "2.4 MB" },
  { id: 2, name: "Trilha_Fundo_Ancestral.wav", type: "Trilha", duration: "3:45", size: "45 MB" },
  { id: 3, name: "Efeito_Fogo_Lenha.mp3", type: "Efeito", duration: "1:00", size: "8.2 MB" },
  { id: 4, name: "Vinheta_Encerramento.mp3", type: "Vinheta", duration: "0:20", size: "3.1 MB" },
];

const MediaLibrary = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D1B14]">Biblioteca de Mídias</h1>
            <p className="text-sm text-gray-500">Os temperos sonoros que dão vida ao PApo de Cozinha.</p>
          </div>
          <Button className="bg-[#8B4513] hover:bg-[#6F370F] gap-2">
            <Plus size={18} /> Upload de Arquivo
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input className="pl-10 bg-white border-gray-200" placeholder="Buscar por nome ou tipo..." />
          </div>
          <Button variant="outline">Filtros</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assets.map((asset) => (
            <Card key={asset.id} className="border-none shadow-sm hover:shadow-md transition-all group">
              <CardContent className="p-6">
                <div className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center mb-4 relative group-hover:bg-orange-50 transition-colors">
                  <Music size={48} className="text-gray-200 group-hover:text-orange-200 transition-colors" />
                  <Button size="icon" className="absolute bg-[#8B4513] hover:bg-[#6F370F] rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={20} fill="currentColor" />
                  </Button>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-[#2D1B14] truncate">{asset.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-orange-600 uppercase">{asset.type}</span>
                    <span className="text-[10px] text-gray-400">{asset.duration}</span>
                  </div>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-4">
                  <span className="text-[10px] text-gray-400">{asset.size}</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><Download size={14} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><MoreVertical size={14} /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MediaLibrary;