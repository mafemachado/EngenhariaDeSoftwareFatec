import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Heart, Search, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";

const MOCK_PETS = [
  {
    id: "1",
    name: "Rex",
    species: "Cachorro",
    breed: "Labrador",
    sex: "Macho",
    birthDate: "2020-03-15",
    microchip: "982000123456789",
    owner: "Maria Silva",
    ownerId: "1"
  },
  {
    id: "2",
    name: "Mimi",
    species: "Gato",
    breed: "Siamês",
    sex: "Fêmea",
    birthDate: "2021-06-20",
    microchip: "982000987654321",
    owner: "João Santos",
    ownerId: "2"
  },
  {
    id: "3",
    name: "Thor",
    species: "Cachorro",
    breed: "Pastor Alemão",
    sex: "Macho",
    birthDate: "2019-11-10",
    microchip: "",
    owner: "Ana Paula",
    ownerId: "3"
  },
  {
    id: "4",
    name: "Luna",
    species: "Gato",
    breed: "Vira-lata",
    sex: "Fêmea",
    birthDate: "",
    microchip: "982000456789123",
    owner: "Pedro Costa",
    ownerId: "4"
  }
];

export function PetsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    sex: "",
    birthDate: "",
    microchip: "",
    ownerId: "",
    allergies: "",
    notes: ""
  });

  const filteredPets = MOCK_PETS.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.species.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // RF11: Validação de campos obrigatórios
    if (!formData.name || !formData.species || !formData.sex) {
      toast.error("Nome, espécie e sexo são obrigatórios!");
      return;
    }

    toast.success("Paciente cadastrado com sucesso!");
    setIsDialogOpen(false);
    setFormData({
      name: "",
      species: "",
      breed: "",
      sex: "",
      birthDate: "",
      microchip: "",
      ownerId: "",
      allergies: "",
      notes: ""
    });
  };

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return "Não informado";
    const today = new Date();
    const birth = new Date(birthDate);
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    
    if (years === 0) {
      return `${months} ${months === 1 ? 'mês' : 'meses'}`;
    }
    return `${years} ${years === 1 ? 'ano' : 'anos'}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Heart className="w-5 h-5 text-green-600" />
          Pacientes Cadastrados
        </CardTitle>
        <CardDescription>Gerenciamento de pacientes (animais) da clínica</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and Add */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, tutor ou espécie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Paciente
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Paciente</DialogTitle>
                  <DialogDescription>
                    RF11: Nome, espécie e sexo são obrigatórios. RF12: Data de nascimento e raça podem ser preenchidos depois.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Nome - Obrigatório */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome do Paciente *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Rex"
                        required
                      />
                    </div>

                    {/* Tutor - RF9: Integração com cadastro de tutores */}
                    <div className="space-y-2">
                      <Label htmlFor="owner">Tutor *</Label>
                      <Select
                        value={formData.ownerId}
                        onValueChange={(value) => setFormData({ ...formData, ownerId: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tutor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Maria Silva</SelectItem>
                          <SelectItem value="2">João Santos</SelectItem>
                          <SelectItem value="3">Ana Paula</SelectItem>
                          <SelectItem value="4">Pedro Costa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Espécie - Obrigatório */}
                    <div className="space-y-2">
                      <Label htmlFor="species">Espécie *</Label>
                      <Select
                        value={formData.species}
                        onValueChange={(value) => setFormData({ ...formData, species: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cachorro">Cachorro</SelectItem>
                          <SelectItem value="Gato">Gato</SelectItem>
                          <SelectItem value="Pássaro">Pássaro</SelectItem>
                          <SelectItem value="Coelho">Coelho</SelectItem>
                          <SelectItem value="Outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sexo - Obrigatório */}
                    <div className="space-y-2">
                      <Label htmlFor="sex">Sexo *</Label>
                      <Select
                        value={formData.sex}
                        onValueChange={(value) => setFormData({ ...formData, sex: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Macho">Macho</SelectItem>
                          <SelectItem value="Fêmea">Fêmea</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Raça - Opcional (RF12) */}
                    <div className="space-y-2">
                      <Label htmlFor="breed">Raça</Label>
                      <Input
                        id="breed"
                        value={formData.breed}
                        onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                        placeholder="Ex: Labrador"
                      />
                    </div>

                    {/* Data de Nascimento - Opcional (RF12) */}
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Data de Nascimento</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      />
                    </div>

                    {/* Microchip - RF14 */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="microchip">Número do Microchip</Label>
                      <Input
                        id="microchip"
                        value={formData.microchip}
                        onChange={(e) => setFormData({ ...formData, microchip: e.target.value })}
                        placeholder="Ex: 982000123456789 ou deixe vazio se o animal não foi microchipado"
                      />
                      <p className="text-xs text-gray-500">
                        Se o animal não possui microchip, deixe este campo vazio
                      </p>
                    </div>

                    {/* Alergias - RF17 */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="allergies">Alergias</Label>
                      <Input
                        id="allergies"
                        value={formData.allergies}
                        onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                        placeholder="Ex: Alérgico a penicilina"
                      />
                    </div>

                    {/* Observações Adicionais - RF17 */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes">Observações Adicionais</Label>
                      <Input
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Outras informações relevantes"
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
                      Cadastrar Paciente
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Pets List */}
          <div className="space-y-3">
            {filteredPets.map((pet) => (
              <div
                key={pet.id}
                className="border rounded-lg p-4 hover:border-green-300 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-800">{pet.name}</h3>
                      <Badge className="bg-green-100 text-green-700 border-green-300">
                        {pet.species}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                        {pet.sex}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-gray-600">
                      <p><strong>Tutor:</strong> {pet.owner}</p>
                      <p><strong>Raça:</strong> {pet.breed || "Não informado"}</p>
                      <p><strong>Idade:</strong> {calculateAge(pet.birthDate)}</p>
                      <p><strong>Microchip:</strong> {pet.microchip || "Não cadastrado"}</p>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                      Ver Prontuário
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPets.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum paciente encontrado
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}