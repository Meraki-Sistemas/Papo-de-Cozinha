import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Coffee, CheckCircle2, MessageSquare, Info, Share2 } from "lucide-react";
import { useState } from "react";
import { showSuccess } from "@/utils/toast";

const PublicScript = () => {
  const [comment, setComment] = useState("");

  return (
    <div className="min-h-screen bg-[#FDFCFB] p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header Público */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-[#E89D1E] p-3 rounded-xl">
              <Coffee className="text-[#2D1B14]" size={28} />
            </div>
            <div>
              <h1 className="font-bold text-xl text-[#2D1B14]">PApo de Cozinha</h1>
              <p className="text-sm text-gray-500">Espaço de Revisão do Convidado</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2 rounded-full" onClick={() => showSuccess("Roteiro aprovado! Obrigado.")}>
              <CheckCircle2 size={18} /> Aprovar Roteiro
            </Button>
          </div>
        </div>

        {/* Conteúdo do Roteiro */}
        <Card className="border-none shadow-sm overflow-hidden">
          <div className="bg-[#2D1B14] p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Ancestralidade e Tecnologia</h2>
            <p className="text-orange-200 text-sm">Convidado: Prof. Dr. Tiganá Santana</p>
          </div>
          <CardContent className="p-8 md:p-12">
            <div className="prose prose-orange max-w-none font-serif text-lg leading-relaxed text-gray-800">
              <h3 className="text-[#8B4513] font-bold text-xl mb-4">Abertura</h3>
              <p className="mb-8">
                Boas vindas à nossa cozinha. Hoje recebemos alguém que transita entre o saber acadêmico e o saber ancestral. 
                Tiganá Santana, é uma honra ter você aqui para falarmos sobre como as tecnologias de ontem moldam o amanhã.
              </p>

              <h3 className="text-[#8B4513] font-bold text-xl mb-4">Bloco 1: Axé e Espiritualidade</h3>
              <p className="mb-4">
                1. Como a sua caminhada no terreiro influenciou sua visão sobre educação popular?
              </p>
              <p className="mb-8">
                2. De que forma o conceito de 'Itan' pode ser aplicado na sala de aula moderna para descolonizar o pensamento?
              </p>

              <h3 className="text-[#8B4513] font-bold text-xl mb-4">Bloco 2: Educação e Sociedade</h3>
              <p className="mb-4">
                3. O papel da universidade na descolonização do pensamento: estamos avançando ou apenas mudando os nomes das coisas?
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Área de Comentários */}
        <Card className="border-none shadow-sm bg-[#FDF8F3] border-t-4 border-orange-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-[#8B4513]">
              <MessageSquare size={20} /> Sugestões ou Ajustes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Sinta-se à vontade para sugerir mudanças em perguntas ou indicar temas que prefere não abordar.
            </p>
            <Textarea 
              placeholder="Escreva aqui suas observações..." 
              className="bg-white border-orange-100 min-h-[120px]"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button 
              className="w-full bg-[#8B4513] hover:bg-[#6F370F]"
              onClick={() => {
                showSuccess("Comentário enviado para a produção!");
                setComment("");
              }}
            >
              Enviar Comentários
            </Button>
          </CardContent>
        </Card>

        <footer className="text-center py-8 text-gray-400 text-xs">
          <p>© 2023 PApo de Cozinha • Tecnologia como ferramenta de cuidado.</p>
        </footer>
      </div>
    </div>
  );
};

export default PublicScript;