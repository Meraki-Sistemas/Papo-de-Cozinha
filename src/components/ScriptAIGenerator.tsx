import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

type Props = {
  onInsert: (text: string) => void;
};

const ScriptAIGenerator: React.FC<Props> = ({ onInsert }) => {
  const [tone, setTone] = useState<string>("acolhedor");
  const [depth, setDepth] = useState<string>("intermediaria");
  const [audience, setAudience] = useState<string>("publico_geral");
  const [sensitive, setSensitive] = useState<string>("");
  const [axes, setAxes] = useState<string[]>([]);

  const toggleAxis = (value: string) => {
    setAxes((prev) => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const generate = () => {
    const title = "# Sugestão de Blocos (Assistente Aiyê)";
    const toneLabel = {
      acolhedor: "acolhedor e respeitoso",
      jornalistico: "jornalístico e objetivo",
      inspirador: "inspirador e reflexivo",
    }[tone];

    const depthLabel = {
      introdutoria: "introdução suave aos temas",
      intermediaria: "aprofundamento moderado",
      aprofundada: "análise profunda com contexto",
    }[depth];

    const audienceLabel = {
      publico_geral: "público geral",
      educadores: "educadores e pesquisadores",
      comunidade_de_terreiro: "comunidade de terreiro",
    }[audience];

    const chosenAxes = axes.length ? axes.join(", ") : "geral";
    const sensitiveNote = sensitive.trim()
      ? `Observações de cuidado do convidado: ${sensitive.trim()}. Evitar abordagens invasivas ou exotizantes.`
      : "Respeitar termos e segredos litúrgicos; evitar exotização e linguagem colonial.";

    const blockApertura = `# Abertura
Tom ${toneLabel}; ${depthLabel}; voltado a ${audienceLabel}.
- Boas-vindas e contextualização do convidado.
- Alinhar expectativas e reforçar que o roteiro é flexível e acolhe pausas.`;

    const blockAxe = `# Bloco: Axé & Espiritualidade
- Como a escuta ativa e o cuidado atravessam sua caminhada?
- De que forma podemos abordar saberes de terreiro sem violar segredos?
- ${sensitiveNote}`;

    const blockEdu = `# Bloco: Educação Popular
- Exemplos de descolonização de currículo a partir da sua vivência.
- Como tecnologias (digitais ou ancestrais) reforçam práticas educativas?`;

    const blockSoc = `# Bloco: Sociedade & Luta
- Quais caminhos você enxerga para políticas de cuidado na sociedade?
- Como ampliar diálogo entre academia, movimentos sociais e terreiros?`;

    const closing = `# Encerramento
- Agradecimentos e referências finais (livros, projetos, redes).
- Convite para mensagens à audiência (${audienceLabel}).`;

    const selectedBlocks: string[] = [blockApertura];
    if (axes.includes("Axé")) selectedBlocks.push(blockAxe);
    if (axes.includes("Educação")) selectedBlocks.push(blockEdu);
    if (axes.includes("Sociedade")) selectedBlocks.push(blockSoc);
    if (selectedBlocks.length === 1) {
      // Nenhum eixo selecionado => proposta geral
      selectedBlocks.push(blockAxe, blockEdu, blockSoc);
    }
    selectedBlocks.push(closing);

    const meta = `Contexto: Eixos selecionados: ${chosenAxes}.`;
    const finalText = [title, meta, ...selectedBlocks].join("\n\n");
    onInsert(finalText);
  };

  return (
    <Card className="border-none shadow-sm bg-[#FDF8F3]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#8B4513]">
          <Sparkles size={16} /> Assistente Aiyê (Gerador)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-2">
            <Label>Tom</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="bg-white border-orange-100">
                <SelectValue placeholder="Selecione um tom" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acolhedor">Acolhedor</SelectItem>
                <SelectItem value="jornalistico">Jornalístico</SelectItem>
                <SelectItem value="inspirador">Inspirador</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Profundidade</Label>
            <Select value={depth} onValueChange={setDepth}>
              <SelectTrigger className="bg-white border-orange-100">
                <SelectValue placeholder="Selecione a profundidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="introdutoria">Introdutória</SelectItem>
                <SelectItem value="intermediaria">Intermediária</SelectItem>
                <SelectItem value="aprofundada">Aprofundada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Público-alvo</Label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger className="bg-white border-orange-100">
                <SelectValue placeholder="Selecione o público" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="publico_geral">Público geral</SelectItem>
                <SelectItem value="educadores">Educadores</SelectItem>
                <SelectItem value="comunidade_de_terreiro">Comunidade de Terreiro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Observações de Cuidado do Convidado</Label>
          <Textarea
            value={sensitive}
            onChange={(e) => setSensitive(e.target.value)}
            placeholder="Temas a evitar, formas de tratamento, calendários litúrgicos..."
            className="bg-white border-orange-100"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-bold text-[#2D1B14]">Eixos</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label className="flex items-center gap-3 p-3 rounded-xl border border-orange-100 bg-white cursor-pointer">
              <Checkbox checked={axes.includes("Axé")} onCheckedChange={() => toggleAxis("Axé")} />
              <span className="text-sm">Axé & Espiritualidade</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl border border-blue-100 bg-white cursor-pointer">
              <Checkbox checked={axes.includes("Educação")} onCheckedChange={() => toggleAxis("Educação")} />
              <span className="text-sm">Educação Popular</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl border border-emerald-100 bg-white cursor-pointer">
              <Checkbox checked={axes.includes("Sociedade")} onCheckedChange={() => toggleAxis("Sociedade")} />
              <span className="text-sm">Sociedade & Luta</span>
            </label>
          </div>
        </div>

        <Button className="w-full bg-[#8B4513] hover:bg-[#6F370F] gap-2" onClick={generate}>
          <Sparkles size={16} /> Gerar blocos e inserir
        </Button>
      </CardContent>
    </Card>
  );
};

export default ScriptAIGenerator;