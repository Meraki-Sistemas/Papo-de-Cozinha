import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  episode: any | null;
  onSaved?: () => void;
};

const RescheduleDialog: React.FC<Props> = ({ open, onOpenChange, episode, onSaved }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Presencial");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!episode) return;
    setDate(episode.scheduled_date || "");
    setTime(episode.scheduled_time || "");
    setLocation(episode.location || "");
    setType(episode.type || "Presencial");
  }, [episode]);

  const handleSave = async () => {
    if (!episode?.id) return;
    if (!date) {
      showError("Escolha uma data para o agendamento.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase
        .from("episodes")
        .update({
          scheduled_date: date,
          scheduled_time: time || null,
          location: location || null,
          type: type || "Presencial",
        })
        .eq("id", episode.id);
      if (error) throw error;
      showSuccess("Agendamento atualizado.");
      onSaved?.();
      onOpenChange(false);
    } catch (err: any) {
      showError(err?.message || "Erro ao atualizar agendamento.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !saving && onOpenChange(o)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reagendar Episódio</DialogTitle>
          <DialogDescription>Atualize data, hora e local da gravação.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Data</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Hora</Label>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Local</Label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Estúdio / Link de reunião" />
          </div>
          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue placeholder="Selecione o tipo" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Presencial">Presencial</SelectItem>
                <SelectItem value="Remoto">Remoto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancelar</Button>
          <Button onClick={handleSave} className="bg-[#8B4513] hover:bg-[#6F370F]" disabled={saving}>
            {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleDialog;