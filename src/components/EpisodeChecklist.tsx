import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Plus, Trash2 } from "lucide-react";

type Item = { id: string; text: string; done: boolean };
type Props = { episodeId: string };

const EpisodeChecklist: React.FC<Props> = ({ episodeId }) => {
  const storageKey = useMemo(() => `episode_checklist__${episodeId}`, [episodeId]);
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const list = JSON.parse(raw) as Item[];
        setItems(Array.isArray(list) ? list : []);
      } catch {
        setItems([]);
      }
    }
  }, [storageKey]);

  const persist = (list: Item[]) => localStorage.setItem(storageKey, JSON.stringify(list));

  const addItem = () => {
    if (!text.trim()) return;
    const next = [{ id: String(Date.now()), text: text.trim(), done: false }, ...items];
    setItems(next);
    persist(next);
    setText("");
  };
  const toggle = (id: string) => {
    const next = items.map(i => (i.id === id ? { ...i, done: !i.done } : i));
    setItems(next); persist(next);
  };
  const removeItem = (id: string) => {
    const next = items.filter(i => i.id !== id);
    setItems(next); persist(next);
  };

  const defaults: Item[] = [
    { id: "d1", text: "Consultar calendário litúrgico do convidado", done: false },
    { id: "d2", text: "Revisar termos sensíveis com a produção", done: false },
    { id: "d3", text: "Enviar link de aprovação do roteiro", done: false },
    { id: "d4", text: "Preparar ambiente de acolhimento no estúdio", done: false },
  ];

  useEffect(() => {
    if (items.length === 0) {
      setItems(defaults);
      persist(defaults);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Adicionar item ao checklist..." />
        <Button onClick={addItem} className="bg-[#8B4513] hover:bg-[#6F370F]"><Plus size={16} /></Button>
      </div>
      <div className="space-y-2">
        {items.map(i => (
          <div key={i.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
            <button onClick={() => toggle(i.id)} className="flex items-center gap-2 text-left">
              <CheckCircle2 size={18} className={i.done ? "text-emerald-600" : "text-gray-300"} />
              <span className={`text-sm ${i.done ? "line-through text-gray-400" : "text-gray-700"}`}>{i.text}</span>
            </button>
            <Button variant="ghost" size="icon" onClick={() => removeItem(i.id)}><Trash2 size={16} /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeChecklist;