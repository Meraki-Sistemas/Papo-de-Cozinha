import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Heart, Share2 } from "lucide-react";

const data = [
  { name: 'Axé', value: 45 },
  { name: 'Educação', value: 30 },
  { name: 'Sociedade', value: 25 },
];

const COLORS = ['#E89D1E', '#8B4513', '#2D1B14'];

const Analytics = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[#2D1B14]">Impacto & Alcance</h1>
          <p className="text-sm text-gray-500">Métricas que refletem a nossa missão e diversidade.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Crescimento Mensal</p>
                <p className="text-2xl font-bold text-[#2D1B14]">+12.5%</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Ouvintes Únicos</p>
                <p className="text-2xl font-bold text-[#2D1B14]">8.4k</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                <Heart size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Taxa de Engajamento</p>
                <p className="text-2xl font-bold text-[#2D1B14]">68%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Distribuição por Eixos Temáticos</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4">
                {data.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-xs text-gray-500">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-[#2D1B14] text-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Insights da IA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm font-bold text-orange-400 mb-2">Oportunidade de Conteúdo</p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  "O público tem demonstrado alto interesse em episódios que conectam 'Tecnologia' e 'Educação Popular'. Sugerimos convidar mais especialistas nestas áreas para o próximo trimestre."
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm font-bold text-blue-400 mb-2">Diversidade de Vozes</p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  "Sua rede de convidados atual possui 60% de representatividade feminina. Excelente equilíbrio mantido nos últimos 6 meses."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;