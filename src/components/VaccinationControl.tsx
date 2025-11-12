import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Syringe, Search, Plus, Calendar, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";
import { Alert, AlertDescription } from "./ui/alert";

const MOCK_VACCINATIONS = [
  {
    id: "1",
    petName: "Rex",
    petId: "1",
    owner: "Maria Silva",
    vaccine: "V10",
    date: "2025-10-15",
    nextDate: "2026-10-15",
    veterinarian: "Dr. Carlos Silva",
    batch: "ABC123",
    status: "Em dia"
  },
  {
    id: "2",
    petName: "Mimi",
    petId: "2",
    owner: "João Santos",
    vaccine: "Antirrábica",
    date: "2025-09-20",
    nextDate: "2026-09-20",
    veterinarian: "Dra. Maria Santos",
    batch: "XYZ789",
    status: "Em dia"
  },
  {
    id: "3",
    petName: "Thor",
    petId: "3",
    owner: "Ana Paula",
    vaccine: "V10",
    date: "2024-11-10",
    nextDate: "2025-11-10",
    veterinarian: "Dr. Carlos Silva",
    batch: "DEF456",
    status: "Vencida"
  },
  {
    id: "4",
    petName: "Luna",
    petId: "4",
    owner: "Pedro Costa",
    vaccine: "Leucemia Felina",
    date: "2025-08-05",
    nextDate: "2025-11-20",
    veterinarian: "Dra. Júlia Costa",
    batch: "GHI789",
    status: "Próximo vencimento"
  }
];

export function VaccinationControl() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    petId: "",
    vaccine: "",
    date: "",
    nextDate: "",
    batch: "",
    notes: ""
  });

  const filteredVaccinations = MOCK_VACCINATIONS.filter(vac =>
    vac.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vac.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vac.vaccine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // RF16: Gerenciamento de vacinas - RF21: Associação automática ao prontuário
    toast.success("Vacina registrada e associada ao prontuário!");
    setIsDialogOpen(false);
    setFormData({
      petId: "",
      vaccine: "",
      date: "",
      nextDate: "",
      batch: "",
      notes: ""
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em dia":
        return "bg-green-100 text-green-700 border-green-300";
      case "Próximo vencimento":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Vencida":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Syringe className="w-5 h-5 text-green-600" />
          Controle de Vacinas
        </CardTitle>
        <CardDescription>RF16: Gerenciamento do controle de vacinas dos pacientes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Alerts */}
          <Alert className="bg-yellow-50 border-yellow-300">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>1 vacina</strong> com vencimento próximo e <strong>1 vacina</strong> vencida
            </AlertDescription>
          </Alert>

          {/* Search and Add */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por pet, tutor ou vacina..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Registrar Vacina
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Registrar Nova Vacina</DialogTitle>
                  <DialogDescription>
                    RF16 e RF21: A vacina será automaticamente associada ao prontuário do paciente
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="petId">Paciente *</Label>
                      <Select
                        value={formData.petId}
                        onValueChange={(value) => setFormData({ ...formData, petId: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o paciente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Rex - Cachorro (Maria Silva)</SelectItem>
                          <SelectItem value="2">Mimi - Gato (João Santos)</SelectItem>
                          <SelectItem value="3">Thor - Cachorro (Ana Paula)</SelectItem>
                          <SelectItem value="4">Luna - Gato (Pedro Costa)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vaccine">Vacina *</Label>
                      <Select
                        value={formData.vaccine}
                        onValueChange={(value) => setFormData({ ...formData, vaccine: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="v8">V8 (Óctupla)</SelectItem>
                          <SelectItem value="v10">V10 (Déctupla)</SelectItem>
                          <SelectItem value="rabies">Antirrábica</SelectItem>
                          <SelectItem value="giardia">Giárdia</SelectItem>
                          <SelectItem value="feline_leukemia">Leucemia Felina</SelectItem>
                          <SelectItem value="feline_triple">Tríplice Felina</SelectItem>
                          <SelectItem value="other">Outra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="batch">Lote da Vacina *</Label>
                      <Input
                        id="batch"
                        value={formData.batch}
                        onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                        placeholder="Ex: ABC123"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Data de Aplicação *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nextDate">Próxima Dose *</Label>
                      <Input
                        id="nextDate"
                        type="date"
                        value={formData.nextDate}
                        onChange={(e) => setFormData({ ...formData, nextDate: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes">Observações</Label>
                      <Input
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Reações, observações..."
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
                      Registrar Vacina
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Vaccinations List */}
          <div className="space-y-3">
            {filteredVaccinations.map((vaccination) => (
              <div
                key={vaccination.id}
                className="border rounded-lg p-4 hover:border-green-300 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-800">{vaccination.petName}</h3>
                      <Badge className={getStatusColor(vaccination.status)}>
                        {vaccination.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-gray-600">
                      <p><strong>Tutor:</strong> {vaccination.owner}</p>
                      <p><strong>Vacina:</strong> {vaccination.vaccine}</p>
                      <p><strong>Lote:</strong> {vaccination.batch}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Aplicada em: {new Date(vaccination.date).toLocaleDateString("pt-BR")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Próxima dose: {new Date(vaccination.nextDate).toLocaleDateString("pt-BR")}</span>
                      </div>
                      <p className="text-blue-600"><strong>Veterinário:</strong> {vaccination.veterinarian}</p>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                      Ver Histórico
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVaccinations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhuma vacina encontrada
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
