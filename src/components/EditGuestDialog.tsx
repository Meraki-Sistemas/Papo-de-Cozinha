import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guest: any | null;
  onSaved?: () => void;
};

const EditGuestDialog: React.FC<Props> = ({ open, onOpenChange, guest, onSaved }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [care, setCare] = useState("");
  const [axes, setAxes] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!guest) return;
    setName(guest.name || "");
    setRole(guest.role || "");
    setEmail(guest.email || "");
    setPhone(guest.phone || "");
    setWebsite(guest.website || "");
    setCare(guest.care_protocol || "");
    setAxes(guest.axes || []);
  }, [guest]);

  const toggleAxis = (value: string) => {
    setAxes((prev) => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const handleSave = async () => {
    if (!guest?.id) return;
    if (!name.trim()) {
      showError("Informe o nome do convidado.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase
        .from("guests")
        .update({
          name: name.trim(),
          role: role.trim() || null,
          email: email.trim() || null,
          phone: phone.trim() || null,
          website: website.trim() || null,
          care_protocol: care.trim() || null,
          axes: axes.length ? axes : null,
        })
        .eq("id", guest.id);

      if (error) {
        showError(error.message.includes("permission") ? "Permissão negada: ajuste as políticas RLS para permitir UPDATE em 'guests'." : error.message);
        return;
      }
      showSuccess("Convidado atualizado.");
      onSaved?.();
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !saving && onOpenChange(o)}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Editar Convidado</DialogTitle>
          <DialogDescription>Atualize as informações do convidado.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Cargo / Papel</Label>
            <Input value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Telefone</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Website</Label>
            <Input value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Observações de Cuidado</Label>
            <Textarea value={care} onChange={(e) => setCare(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-bold text-[#2D1B14]">Eixos de Atuação</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label className="flex items-center gap-3 p-3 rounded-xl border border-orange-100 bg-orange-50/30 cursor-pointer">
              <Checkbox checked={axes.includes("Axé")} onCheckedChange={() => toggleAxis("Axé")} />
              <span className="text-sm">Axé & Espiritualidade</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl border border-blue-100 bg-blue-50/30 cursor-pointer">
              <Checkbox checked={axes.includes("Educação")} onCheckedChange={() => toggleAxis("Educação")} />
              <span className="text-sm">Educação Popular</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl border border-emerald-100 bg-emerald-50/30 cursor-pointer">
              <Checkbox checked={axes.includes("Sociedade")} onCheckedChange={() => toggleAxis("Sociedade")} />
              <span className="text-sm">Sociedade & Luta</span>
            </label>
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

export default EditGuestDialog;