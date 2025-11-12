import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DollarSign, Plus, Trash2, Calculator } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";

type BillingItem = {
  id: string;
  type: "service" | "product";
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

const MOCK_SERVICES = [
  { id: "1", name: "Consulta Veterinária", price: 150 },
  { id: "2", name: "Vacinação", price: 80 },
  { id: "3", name: "Cirurgia Pequeno Porte", price: 500 },
  { id: "4", name: "Exame de Sangue", price: 120 },
  { id: "5", name: "Banho e Tosa", price: 70 },
  { id: "6", name: "Raio-X", price: 200 }
];

const MOCK_PRODUCTS = [
  { id: "1", name: "Ração Premium 15kg", price: 180 },
  { id: "2", name: "Antipulgas", price: 45 },
  { id: "3", name: "Vermífugo", price: 35 },
  { id: "4", name: "Shampoo Medicado", price: 28 },
  { id: "5", name: "Coleira Antiparasitas", price: 55 }
];

const MOCK_BILLINGS = [
  {
    id: "1",
    date: "2025-11-12",
    client: "Maria Silva",
    pet: "Rex",
    total: 350,
    status: "Pago",
    paymentMethod: "Cartão de Crédito"
  },
  {
    id: "2",
    date: "2025-11-12",
    client: "João Santos",
    pet: "Mimi",
    total: 215,
    status: "Pendente",
    paymentMethod: "-"
  },
  {
    id: "3",
    date: "2025-11-11",
    client: "Ana Paula",
    pet: "Thor",
    total: 680,
    status: "Pago",
    paymentMethod: "PIX"
  }
];

export function BillingModule() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  const [items, setItems] = useState<BillingItem[]>([]);
  const [itemType, setItemType] = useState<"service" | "product">("service");
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  // RF24: Cálculo automatizado de valores
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const addItem = () => {
    const sourceList = itemType === "service" ? MOCK_SERVICES : MOCK_PRODUCTS;
    const item = sourceList.find(i => i.id === selectedItem);
    
    if (item) {
      const newItem: BillingItem = {
        id: Date.now().toString(),
        type: itemType,
        description: item.name,
        quantity,
        unitPrice: item.price,
        total: item.price * quantity
      };
      
      setItems([...items, newItem]);
      setSelectedItem("");
      setQuantity(1);
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    if (!selectedClient || !selectedPet || items.length === 0) {
      toast.error("Selecione cliente, pet e adicione itens!");
      return;
    }

    // RF23 e RF24: Gestão e processamento financeiro com cálculo automatizado
    toast.success(`Cobrança de R$ ${calculateTotal().toFixed(2)} gerada com sucesso!`);
    setIsDialogOpen(false);
    setSelectedClient("");
    setSelectedPet("");
    setItems([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <DollarSign className="w-5 h-5 text-green-600" />
            Módulo de Cobrança
          </CardTitle>
          <CardDescription>
            RF23 e RF24: Gestão e processamento financeiro de produtos e serviços
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Cobrança
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Nova Cobrança</DialogTitle>
                  <DialogDescription>
                    Adicione serviços e produtos para gerar a cobrança
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  {/* Cliente e Pet */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Cliente *</Label>
                      <Select value={selectedClient} onValueChange={setSelectedClient}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Maria Silva</SelectItem>
                          <SelectItem value="2">João Santos</SelectItem>
                          <SelectItem value="3">Ana Paula</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Pet *</Label>
                      <Select value={selectedPet} onValueChange={setSelectedPet}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o pet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Rex</SelectItem>
                          <SelectItem value="2">Mimi</SelectItem>
                          <SelectItem value="3">Thor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Adicionar Itens */}
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="text-gray-800 mb-3">Adicionar Item</h4>
                    <div className="grid md:grid-cols-4 gap-3">
                      <div className="space-y-2">
                        <Label>Tipo</Label>
                        <Select value={itemType} onValueChange={(v: any) => setItemType(v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="service">Serviço</SelectItem>
                            <SelectItem value="product">Produto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Item</Label>
                        <Select value={selectedItem} onValueChange={setSelectedItem}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {(itemType === "service" ? MOCK_SERVICES : MOCK_PRODUCTS).map(item => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.name} - R$ {item.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Quantidade</Label>
                        <Input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="invisible">Ação</Label>
                        <Button onClick={addItem} className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Lista de Itens */}
                  {items.length > 0 && (
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="p-2 text-left text-gray-700">Descrição</th>
                            <th className="p-2 text-center text-gray-700">Tipo</th>
                            <th className="p-2 text-center text-gray-700">Qtd</th>
                            <th className="p-2 text-right text-gray-700">Valor Unit.</th>
                            <th className="p-2 text-right text-gray-700">Total</th>
                            <th className="p-2 text-center text-gray-700">Ação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map(item => (
                            <tr key={item.id} className="border-t">
                              <td className="p-2 text-gray-800">{item.description}</td>
                              <td className="p-2 text-center">
                                <Badge className={item.type === "service" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}>
                                  {item.type === "service" ? "Serviço" : "Produto"}
                                </Badge>
                              </td>
                              <td className="p-2 text-center text-gray-700">{item.quantity}</td>
                              <td className="p-2 text-right text-gray-700">R$ {item.unitPrice.toFixed(2)}</td>
                              <td className="p-2 text-right text-gray-700">R$ {item.total.toFixed(2)}</td>
                              <td className="p-2 text-center">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-gray-100">
                          <tr>
                            <td colSpan={4} className="p-3 text-right text-gray-800">
                              <Calculator className="w-4 h-4 inline mr-2" />
                              Total:
                            </td>
                            <td className="p-3 text-right text-green-700">
                              R$ {calculateTotal().toFixed(2)}
                            </td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      Gerar Cobrança
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Lista de Cobranças */}
          <div className="space-y-3">
            {MOCK_BILLINGS.map(billing => (
              <div
                key={billing.id}
                className="border rounded-lg p-4 hover:border-green-300 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-800">{billing.client}</h3>
                      <Badge
                        className={
                          billing.status === "Pago"
                            ? "bg-green-100 text-green-700 border-green-300"
                            : "bg-yellow-100 text-yellow-700 border-yellow-300"
                        }
                      >
                        {billing.status}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-gray-600">
                      <p><strong>Pet:</strong> {billing.pet}</p>
                      <p><strong>Data:</strong> {new Date(billing.date).toLocaleDateString("pt-BR")}</p>
                      <p><strong>Total:</strong> <span className="text-green-700">R$ {billing.total.toFixed(2)}</span></p>
                      <p><strong>Pagamento:</strong> {billing.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                      Ver Detalhes
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                      Imprimir
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
