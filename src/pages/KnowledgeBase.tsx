import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Plus, Bookmark, Quote, Library } from "lucide-react";

const references = [
  {
    id: 1,
    term: "Itan",
    category: "Conceito",
    description: "Narrativas mitológicas da cultura iorubá que preservam a história, a ética e a visão de mundo dos Orixás.",
    usage: "Usar para contextualizar perguntas sobre ancestralidade e continuidade."
  },
  {
    id: 2,
    term: "Educação de Terreiro",
    category: "Metodologia",
    description: "Processo educativo baseado na oralidade, na convivência e no respeito aos ciclos da natureza e da comunidade.",
    usage: "Base para o eixo de Educação Popular."
  },
  {
    id: 3,
    term: "Tecnologia Ancestral",
    category: "Filosofia",
    description: "O entendimento de que saberes tradicionais (agricultura, metalurgia, medicina) são formas avançadas de tecnologia.",
    usage: "Conectar com discussões sobre inovação e futuro."
  }
];

const KnowledgeBase = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D1B14]">Base de Saberes</h1>
            <p className="text-sm text-gray-500">O alicerce de conhecimento que guia nossas conversas.</p>
          </div>
          <Button className="bg-[#8B4513] hover:bg-[#6F370F] gap-2">
            <Plus size={18} /> Novo Registro
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold">Categorias</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {['Todos', 'Conceitos', 'Metodologias', 'Filosofia', 'História'].map(cat => (
                  <Button key={cat} variant="ghost" className="w-full justify-start text-sm font-medium hover:bg-orange-50 hover:text-[#8B4513]">
                    {cat}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input className="pl-10 bg-white border-gray-200" placeholder="Pesquisar termos ou referências..." />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {references.map((ref) => (
                <Card key={ref.id} className="border-none shadow-sm hover:shadow-md transition-all group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg text-orange-700">
                          <BookOpen size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-[#2D1B14]">{ref.term}</h3>
                          <Badge variant="secondary" className="bg-gray-100 text-gray-500 border-none text-[10px]">
                            {ref.category}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-gray-300 group-hover:text-orange-500">
                        <Bookmark size={18} />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {ref.description}
                    </p>
                    <div className="bg-[#FDF8F3] p-3 rounded-lg border border-orange-50">
                      <div className="flex items-center gap-2 text-[#8B4513] text-[10px] font-bold uppercase tracking-wider mb-1">
                        <Quote size={12} /> Como aplicar no roteiro
                      </div>
                      <p className="text-xs text-gray-500 italic">
                        "{ref.usage}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KnowledgeBase;