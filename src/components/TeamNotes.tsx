import React, { useEffect, useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess } from "@/utils/toast";
import { Trash2 } from "lucide-react";

type Note = { id: string; text: string; author?: string; createdAt: string };
type Props = { storagePrefix: "episode_notes" | "guest_notes"; entityId: string };

const TeamNotes: React.FC<Props> = ({ storagePrefix, entityId }) => {
  const storageKey = useMemo(() => `${storagePrefix}__${entityId}`, [storagePrefix, entityId]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");
  const [author, setAuthor] = useState<string>("");

  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email;
      const userId = session?.user?.id;
      if (!userId) {
        setAuthor(email || "Usuário");
        return;
      }
      const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", userId).single();
      setAuthor((profile?.full_name || email || "Usuário") as string);
    };
    loadUser();
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const list = JSON.parse(raw) as Note[];
        setNotes(Array.isArray(list) ? list : []);
      } catch {
        setNotes([]);
      }
    }
  }, [storageKey]);

  const persist = (list: Note[]) => localStorage.setItem(storageKey, JSON.stringify(list));

  const addNote = () => {
    if (!draft.trim()) return;
    const newNote: Note = { id: String(Date.now()), text: draft.trim(), author, createdAt: new Date().toISOString() };
    const next = [newNote, ...notes];
    setNotes(next);
    persist(next);
    setDraft("");
    showSuccess("Nota adicionada.");
  };

  const removeNote = (id: string) => {
    const next = notes.filter(n => n.id !== id);
    setNotes(next);
    persist(next);
  };

  return (
    <div className="space-y-3">
      <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Adicionar nota..." className="bg-white" />
      <Button onClick={addNote} className="bg-[#8B4513] hover:bg-[#6F370F] w-full">Adicionar Nota</Button>
      <div className="space-y-2">
        {notes.map(n => (
          <div key={n.id} className="p-3 rounded-lg border">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">{n.text}</p>
              <Button variant="ghost" size="icon" onClick={() => removeNote(n.id)}><Trash2 size={16} /></Button>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              {new Date(n.createdAt).toLocaleString()} {n.author ? `• ${n.author}` : ""}
            </p>
          </div>
        ))}
        {notes.length === 0 && <p className="text-xs text-gray-400 italic text-center">Sem notas ainda.</p>}
      </div>
    </div>
  );
};

export default TeamNotes;