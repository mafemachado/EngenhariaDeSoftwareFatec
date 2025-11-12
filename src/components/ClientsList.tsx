import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Users, Search, Plus, Phone, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner@2.0.3";

const MOCK_CLIENTS = [
  {
    id: "1",
    name: "Maria Silva",
    phone: "(11) 98765-4321",
    email: "maria.silva@email.com",
    address: "Rua das Flores, 123",
    cpf: "123.456.789-00",
    pets: [
      { name: "Rex", type: "Cachorro", breed: "Labrador" }
    ]
  },
  {
    id: "2",
    name: "João Santos",
    phone: "(11) 98765-1234",
    email: "joao.santos@email.com",
    address: "Av. Paulista, 456",
    cpf: "987.654.321-00",
    pets: [
      { name: "Mimi", type: "Gato", breed: "Siamês" },
      { name: "Fifi", type: "Gato", breed: "Persa" }
    ]
  },
  {
    id: "3",
    name: "Ana Paula",
    phone: "(11) 98765-5678",
    email: "ana.paula@email.com",
    address: "Rua dos Veterinários, 789",
    cpf: "456.789.123-00",
    pets: [
      { name: "Thor", type: "Cachorro", breed: "Pastor Alemão" }
    ]
  },
  {
    id: "4",
    name: "Pedro Costa",
    phone: "(11) 98765-9012",
    email: "pedro.costa@email.com",
    address: "Rua das Palmeiras, 321",
    cpf: "789.123.456-00",
    pets: [
      { name: "Luna", type: "Gato", breed: "Vira-lata" }
    ]
  },
  {
    id: "5",
    name: "Carla Mendes",
    phone: "(11) 98765-3456",
    email: "carla.mendes@email.com",
    address: "Av. Brasil, 654",
    cpf: "321.654.987-00",
    pets: [
      { name: "Bob", type: "Cachorro", breed: "Beagle" },
      { name: "Mel", type: "Cachorro", breed: "Golden Retriever" }
    ]
  }
];

export function ClientsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    cpf: ""
  });

  const filteredClients = MOCK_CLIENTS.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // RF10: Validação de campos obrigatórios
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error("Nome, telefone e email são obrigatórios!");
      return;
    }

    toast.success("Tutor cadastrado com sucesso!");
    setIsDialogOpen(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      cpf: ""
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Users className="w-5 h-5 text-green-600" />
          Tutores Cadastrados
        </CardTitle>
        <CardDescription>Gerencie os tutores (clientes) e seus pets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and Add */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, telefone ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Tutor
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Tutor</DialogTitle>
                  <DialogDescription>
                    RF10: Todos os campos do tutor são obrigatórios
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nome completo do tutor"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        value={formData.cpf}
                        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                        placeholder="000.000.000-00"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(00) 00000-0000"
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@exemplo.com"
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Endereço *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Rua, número, bairro"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      Cadastrar Tutor
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Clients List */}
          <div className="space-y-3">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="border rounded-lg p-4 hover:border-green-300 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-800 mb-2">{client.name}</h3>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{client.email}</span>
                      </div>
                      <p>CPF: {client.cpf}</p>
                      <p>Endereço: {client.address}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-gray-700 mb-1">Pets:</p>
                      <div className="flex flex-wrap gap-2">
                        {client.pets.map((pet, index) => (
                          <div
                            key={index}
                            className="bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200"
                          >
                            {pet.name} - {pet.type} ({pet.breed})
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                      Ver Detalhes
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum tutor encontrado
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}