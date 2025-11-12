import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Pill, Search, Plus, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const MOCK_PRESCRIPTIONS = [
  {
    id: "1",
    date: "2025-11-10",
    petName: "Rex",
    owner: "Maria Silva",
    medication: "Amoxicilina 500mg",
    dosage: "1 comprimido a cada 12h",
    duration: "7 dias",
    status: "Ativo"
  },
  {
    id: "2",
    date: "2025-11-08",
    petName: "Thor",
    owner: "Ana Paula",
    medication: "Anti-inflamatório",
    dosage: "1/2 comprimido a cada 24h",
    duration: "5 dias",
    status: "Ativo"
  },
  {
    id: "3",
    date: "2025-11-05",
    petName: "Luna",
    owner: "Pedro Costa",
    medication: "Vermífugo",
    dosage: "Dose única",
    duration: "1 dia",
    status: "Concluído"
  },
  {
    id: "4",
    date: "2025-11-01",
    petName: "Mimi",
    owner: "João Santos",
    medication: "Suplemento vitamínico",
    dosage: "5ml ao dia",
    duration: "30 dias",
    status: "Ativo"
  }
];

export function Prescriptions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPrescriptions = MOCK_PRESCRIPTIONS.filter(prescription =>
    prescription.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.medication.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Pill className="w-5 h-5 text-green-600" />
          Prescrições Médicas
        </CardTitle>
        <CardDescription>Gerenciamento de medicamentos prescritos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and Add */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por pet, tutor ou medicamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Prescrição
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Nova Prescrição Médica</DialogTitle>
                  <DialogDescription>
                    Registre uma nova prescrição de medicamento
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Pet</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o pet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rex">Rex (Cachorro)</SelectItem>
                          <SelectItem value="mimi">Mimi (Gato)</SelectItem>
                          <SelectItem value="thor">Thor (Cachorro)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Data da Prescrição</Label>
                      <Input type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Medicamento</Label>
                    <Input placeholder="Nome do medicamento" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Dosagem</Label>
                      <Input placeholder="Ex: 1 comprimido a cada 12h" />
                    </div>
                    <div className="space-y-2">
                      <Label>Duração do Tratamento</Label>
                      <Input placeholder="Ex: 7 dias" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Instruções de Uso</Label>
                    <Textarea placeholder="Instruções detalhadas..." rows={3} />
                  </div>

                  <div className="space-y-2">
                    <Label>Observações</Label>
                    <Textarea placeholder="Observações adicionais..." rows={2} />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      Salvar Prescrição
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Prescriptions List */}
          <div className="space-y-3">
            {filteredPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="border rounded-lg p-4 hover:border-green-300 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-800">{prescription.petName}</h3>
                      <Badge
                        className={
                          prescription.status === "Ativo"
                            ? "bg-green-100 text-green-700 border-green-300"
                            : "bg-gray-100 text-gray-700 border-gray-300"
                        }
                      >
                        {prescription.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(prescription.date).toLocaleDateString("pt-BR")}</span>
                        <span>•</span>
                        <span>Tutor: {prescription.owner}</span>
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-gray-800">
                          <Pill className="w-4 h-4 inline mr-2 text-green-600" />
                          {prescription.medication}
                        </p>
                        <p><strong>Dosagem:</strong> {prescription.dosage}</p>
                        <p><strong>Duração:</strong> {prescription.duration}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                      Ver Completo
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                      Imprimir
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPrescriptions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhuma prescrição encontrada
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
