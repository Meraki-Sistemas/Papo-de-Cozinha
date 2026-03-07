import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { Loader2, UserPlus } from "lucide-react";

type NewGuestDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (guest: any) => void;
};

const NewGuestDialog = ({ open, onOpenChange, onCreated }: NewGuestDialogProps) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [care, setCare] = useState("");
  const [axes, setAxes] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const toggleAxis = (value: string) => {
    setAxes((prev) => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const resetForm = () => {
    setName("");
    setRole("");
    setEmail("");
    setPhone("");
    setWebsite("");
    setCare("");
    setAxes([]);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      showError("Informe o nome do convidado.");
      return;
    }
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const payload = {
        name: name.trim(),
        role: role.trim() || null,
        email: email.trim() || null,
        phone: phone.trim() || null,
        website: website.trim() || null,
        care_protocol: care.trim() || null,
        axes: axes.length ? axes : null,
        created_by: user?.id || null,
      };

      const { data, error } = await supabase.from("guests").insert([payload]).select().single();
      if (error) throw error;

      showSuccess("Convidado cadastrado com sucesso!");
      onCreated?.(data);
      resetForm();
      onOpenChange(false);
    } catch (err: any) {
      showError(err?.message || "Erro ao cadastrar convidado.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !submitting && onOpenChange(o)}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus size={18} className="text-[#8B4513]" />
            Novo Convidado
          </DialogTitle>
          <DialogDescription>
            Cadastre um novo convidado com observações de cuidado e eixos de atuação.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Tiganá Santana" />
          </div>
          <div className="space-y-2">
            <Label>Cargo / Papel</Label>
            <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Ex: Compositor e Pesquisador" />
          </div>
          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contato@exemplo.com" />
          </div>
          <div className="space-y-2">
            <Label>Telefone</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(11) 99999-9999" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Website</Label>
            <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Observações de Cuidado</Label>
            <Textarea value={care} onChange={(e) => setCare(e.target.value)} placeholder="Preferências, temas sensíveis, formas de tratamento..." />
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

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
            Cancelar
          </Button>
          <Button className="bg-[#8B4513] hover:bg-[#6F370F]" onClick={handleSubmit} disabled={submitting}>
            {submitting ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
            Salvar Convidado
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewGuestDialog;