import { cn } from "@/lib/utils";

export type EpisodeStatus = 'planejado' | 'roteirizacao' | 'revisao' | 'aprovado' | 'gravado';

const statusConfig = {
  planejado: { label: 'Planejado', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  roteirizacao: { label: 'Roteirização', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  revisao: { label: 'Em Revisão', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  aprovado: { label: 'Aprovado', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  gravado: { label: 'Gravado', color: 'bg-gray-100 text-gray-700 border-gray-200' },
};

export const EpisodeStatusBadge = ({ status }: { status: EpisodeStatus }) => {
  const config = statusConfig[status];
  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-xs font-semibold border",
      config.color
    )}>
      {config.label}
    </span>
  );
};