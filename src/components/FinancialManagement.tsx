import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { DollarSign, Search, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const MOCK_TRANSACTIONS = [
  {
    id: "1",
    date: "2025-11-12",
    description: "Consulta - Rex",
    amount: 150.00,
    type: "receita",
    status: "pago",
    paymentMethod: "Cartão de Crédito"
  },
  {
    id: "2",
    date: "2025-11-12",
    description: "Vacinação - Mimi",
    amount: 80.00,
    type: "receita",
    status: "pago",
    paymentMethod: "PIX"
  },
  {
    id: "3",
    date: "2025-11-12",
    description: "Cirurgia - Thor",
    amount: 680.00,
    type: "receita",
    status: "pendente",
    paymentMethod: "-"
  },
  {
    id: "4",
    date: "2025-11-11",
    description: "Fornecedor - Medicamentos",
    amount: 1200.00,
    type: "despesa",
    status: "pago",
    paymentMethod: "Transferência"
  },
  {
    id: "5",
    date: "2025-11-10",
    description: "Aluguel da Clínica",
    amount: 5000.00,
    type: "despesa",
    status: "pendente",
    paymentMethod: "-"
  }
];

const MOCK_RECEIVABLES = [
  {
    id: "1",
    clientCode: "CLI-001",
    amount: 680.00,
    dueDate: "2025-11-15",
    status: "pendente",
    description: "Cirurgia"
  },
  {
    id: "2",
    clientCode: "CLI-045",
    amount: 150.00,
    dueDate: "2025-11-18",
    status: "pendente",
    description: "Consulta"
  },
  {
    id: "3",
    clientCode: "CLI-023",
    amount: 220.00,
    dueDate: "2025-11-20",
    status: "pendente",
    description: "Exames"
  }
];

const MOCK_PAYABLES = [
  {
    id: "1",
    supplier: "Fornecedor Medicamentos Ltda",
    amount: 5000.00,
    dueDate: "2025-11-15",
    status: "pendente",
    description: "Medicamentos"
  },
  {
    id: "2",
    supplier: "Imobiliária XYZ",
    amount: 5000.00,
    dueDate: "2025-11-10",
    status: "atrasado",
    description: "Aluguel"
  },
  {
    id: "3",
    supplier: "Energia Elétrica",
    amount: 850.00,
    dueDate: "2025-11-20",
    status: "pendente",
    description: "Conta de luz"
  }
];

export function FinancialManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "receita" | "despesa">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "pago" | "pendente">("all");

  const filteredTransactions = MOCK_TRANSACTIONS.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalReceitas = MOCK_TRANSACTIONS
    .filter(t => t.type === "receita" && t.status === "pago")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDespesas = MOCK_TRANSACTIONS
    .filter(t => t.type === "despesa" && t.status === "pago")
    .reduce((sum, t) => sum + t.amount, 0);

  const saldo = totalReceitas - totalDespesas;

  return (
    <div className="space-y-6">
      {/* Resumo Financeiro */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-700 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Receitas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-green-700">R$ {totalReceitas.toFixed(2)}</div>
            <p className="text-gray-600">Pagamentos recebidos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-700 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-red-700">R$ {totalDespesas.toFixed(2)}</div>
            <p className="text-gray-600">Pagamentos efetuados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-700 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Saldo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={saldo >= 0 ? "text-blue-700" : "text-red-700"}>
              R$ {saldo.toFixed(2)}
            </div>
            <p className="text-gray-600">Resultado do período</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Gestão */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">Transações</TabsTrigger>
          <TabsTrigger value="receivables">Contas a Receber</TabsTrigger>
          <TabsTrigger value="payables">Contas a Pagar</TabsTrigger>
        </TabsList>

        {/* Transações */}
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800">Transações Financeiras</CardTitle>
              <CardDescription>
                Histórico de receitas e despesas (sem dados sensíveis de clientes)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Filtros */}
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Buscar transação..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterType} onValueChange={(v: any) => setFilterType(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="receita">Receitas</SelectItem>
                      <SelectItem value="despesa">Despesas</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={(v: any) => setFilterStatus(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pago">Pago</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Lista de Transações */}
                <div className="space-y-2">
                  {filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="border rounded-lg p-3 hover:border-green-300 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              className={
                                transaction.type === "receita"
                                  ? "bg-green-100 text-green-700 border-green-300"
                                  : "bg-red-100 text-red-700 border-red-300"
                              }
                            >
                              {transaction.type === "receita" ? "Receita" : "Despesa"}
                            </Badge>
                            <Badge
                              className={
                                transaction.status === "pago"
                                  ? "bg-blue-100 text-blue-700 border-blue-300"
                                  : "bg-yellow-100 text-yellow-700 border-yellow-300"
                              }
                            >
                              {transaction.status === "pago" ? "Pago" : "Pendente"}
                            </Badge>
                          </div>
                          <p className="text-gray-800">{transaction.description}</p>
                          <div className="flex items-center gap-2 text-gray-600 mt-1">
                            <Calendar className="w-3 h-3" />
                            <span className="text-sm">
                              {new Date(transaction.date).toLocaleDateString("pt-BR")}
                            </span>
                            {transaction.paymentMethod !== "-" && (
                              <>
                                <span>•</span>
                                <span className="text-sm">{transaction.paymentMethod}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div
                          className={`text-right ${
                            transaction.type === "receita" ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          {transaction.type === "receita" ? "+" : "-"}R$ {transaction.amount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contas a Receber */}
        <TabsContent value="receivables">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800">Contas a Receber</CardTitle>
              <CardDescription>
                Valores pendentes (identificados por código de cliente, sem dados pessoais)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {MOCK_RECEIVABLES.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-3 hover:border-green-300 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-gray-800">
                          <strong>Cliente:</strong> {item.clientCode}
                        </p>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Vencimento: {new Date(item.dueDate).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-green-700">R$ {item.amount.toFixed(2)}</div>
                        <Button size="sm" variant="outline" className="mt-2">
                          Registrar Pagamento
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contas a Pagar */}
        <TabsContent value="payables">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800">Contas a Pagar</CardTitle>
              <CardDescription>
                Compromissos financeiros da clínica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {MOCK_PAYABLES.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-3 hover:border-green-300 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-gray-800"><strong>{item.supplier}</strong></p>
                          {item.status === "atrasado" && (
                            <Badge className="bg-red-100 text-red-700 border-red-300">
                              Atrasado
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Vencimento: {new Date(item.dueDate).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-red-700">R$ {item.amount.toFixed(2)}</div>
                        <Button size="sm" variant="outline" className="mt-2">
                          Registrar Pagamento
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
