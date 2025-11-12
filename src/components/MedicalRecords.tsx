import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { FileText, Search, Plus, Calendar, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const MOCK_RECORDS = [
  {
    id: "1",
    date: "2025-11-10",
    petName: "Rex",
    petType: "Cachorro",
    petBreed: "Labrador",
    petSex: "Macho",
    petAge: "5 anos",
    microchip: "982000123456789",
    owner: "Maria Silva",
    ownerPhone: "(11) 98765-4321",
    diagnosis: "Otite",
    treatment: "Antibiótico prescrito",
    medications: ["Amoxicilina 500mg"],
    allergies: "Nenhuma",
    notes: "Reação leve ao medicamento",
    status: "Em tratamento",
    veterinarian: "Dr. Carlos Silva"
  },
  {
    id: "2",
    date: "2025-11-08",
    petName: "Mimi",
    petType: "Gato",
    petBreed: "Siamês",
    petSex: "Fêmea",
    petAge: "4 anos",
    microchip: "982000987654321",
    owner: "João Santos",
    ownerPhone: "(11) 98765-1234",
    diagnosis: "Vacinação anual",
    treatment: "Vacina múltipla aplicada",
    medications: [],
    allergies: "Alérgica a penicilina",
    notes: "",
    status: "Concluído",
    veterinarian: "Dra. Maria Santos"
  }
];

export function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<typeof MOCK_RECORDS[0] | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredRecords = MOCK_RECORDS.filter(record =>
    record.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewRecord = (record: typeof MOCK_RECORDS[0]) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <FileText className="w-5 h-5 text-green-600" />
          Prontuários Médicos
        </CardTitle>
        <CardDescription>
          RF13-RF22: Prontuário eletrônico completo com histórico do paciente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and Add */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por pet, tutor ou diagnóstico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Prontuário
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Novo Prontuário Médico</DialogTitle>
                  <DialogDescription>
                    RF13-RF18: Registre o atendimento completo do paciente
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <Tabs defaultValue="patient">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="patient">Paciente</TabsTrigger>
                      <TabsTrigger value="consultation">Consulta</TabsTrigger>
                      <TabsTrigger value="history">Histórico</TabsTrigger>
                    </TabsList>

                    {/* RF14: Informações do Paciente */}
                    <TabsContent value="patient" className="space-y-4">
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
                          <Label>Data do Atendimento</Label>
                          <Input type="date" />
                        </div>
                      </div>

                      {/* RF14: Exibe informações do paciente automaticamente */}
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="text-gray-800 mb-3">Informações do Paciente</h4>
                        <div className="grid md:grid-cols-2 gap-2 text-gray-700">
                          <p><strong>Espécie:</strong> Cachorro</p>
                          <p><strong>Raça:</strong> Labrador</p>
                          <p><strong>Sexo:</strong> Macho</p>
                          <p><strong>Idade:</strong> 5 anos</p>
                          <p><strong>Tutor:</strong> Maria Silva</p>
                          <p><strong>Telefone:</strong> (11) 98765-4321</p>
                          <p className="md:col-span-2"><strong>Microchip:</strong> 982000123456789</p>
                          <p className="md:col-span-2 text-red-600"><strong>Alergias:</strong> Nenhuma</p>
                        </div>
                      </div>
                    </TabsContent>

                    {/* RF15 e RF18: Situação Clínica e Diagnóstico */}
                    <TabsContent value="consultation" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Queixa Principal</Label>
                        <Textarea placeholder="Descreva o motivo da consulta..." rows={2} />
                      </div>

                      <div className="space-y-2">
                        <Label>Diagnóstico</Label>
                        <Textarea placeholder="Diagnóstico médico..." rows={3} />
                      </div>

                      <div className="space-y-2">
                        <Label>Tratamento Prescrito</Label>
                        <Textarea placeholder="Tratamento e procedimentos..." rows={3} />
                      </div>

                      {/* RF20: Registro de Medicamentos */}
                      <div className="space-y-2">
                        <Label>Medicamentos Utilizados (RF20 e RF21)</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Adicionar medicamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="amox">Amoxicilina 500mg</SelectItem>
                            <SelectItem value="anti">Anti-inflamatório</SelectItem>
                            <SelectItem value="verm">Vermífugo</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-gray-600">
                          Os medicamentos serão automaticamente associados ao prontuário
                        </p>
                      </div>

                      {/* RF17: Anotações Adicionais */}
                      <div className="space-y-2">
                        <Label>Observações e Anotações Adicionais (RF17)</Label>
                        <Textarea placeholder="Anotações, reações, observações..." rows={3} />
                      </div>
                    </TabsContent>

                    {/* RF15 e RF19: Histórico Completo */}
                    <TabsContent value="history" className="space-y-4">
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="text-gray-800 mb-3">RF15 e RF19: Histórico Completo</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-gray-700"><strong>Consultas Anteriores:</strong> 3 registros</p>
                            <p className="text-sm text-gray-600">Última consulta: 15/10/2025</p>
                          </div>
                          <div>
                            <p className="text-gray-700"><strong>Vacinas:</strong> Em dia</p>
                            <p className="text-sm text-gray-600">V10 (15/10/2025), Antirrábica (01/09/2025)</p>
                          </div>
                          <div>
                            <p className="text-gray-700"><strong>Medicamentos em Uso:</strong></p>
                            <p className="text-sm text-gray-600">Amoxicilina 500mg - Desde 10/11/2025</p>
                          </div>
                          <div>
                            <p className="text-gray-700"><strong>Exames Realizados:</strong> 2 registros</p>
                            <p className="text-sm text-gray-600">Hemograma (20/09/2025), Ultrassom (15/08/2025)</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      Salvar Prontuário
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Records List */}
          <div className="space-y-3">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="border rounded-lg p-4 hover:border-green-300 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-800">{record.petName}</h3>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                        {record.petType}
                      </Badge>
                      <Badge
                        className={
                          record.status === "Concluído"
                            ? "bg-green-100 text-green-700 border-green-300"
                            : "bg-yellow-100 text-yellow-700 border-yellow-300"
                        }
                      >
                        {record.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(record.date).toLocaleDateString("pt-BR")}</span>
                        <span>•</span>
                        <span>Tutor: {record.owner}</span>
                      </div>
                      <p><strong>Diagnóstico:</strong> {record.diagnosis}</p>
                      <p><strong>Tratamento:</strong> {record.treatment}</p>
                      <p className="text-blue-600"><strong>Veterinário:</strong> {record.veterinarian}</p>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 md:flex-none"
                      onClick={() => viewRecord(record)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Completo
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum prontuário encontrado
            </div>
          )}
        </div>
      </CardContent>

      {/* RF19: Visualização Completa do Histórico */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Prontuário Completo - {selectedRecord?.petName}</DialogTitle>
            <DialogDescription>
              RF19: Acesso fácil a todo histórico do paciente
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              {/* RF14: Informações do Paciente */}
              <div className="border rounded-lg p-4 bg-green-50">
                <h4 className="text-gray-800 mb-3">Informações do Paciente</h4>
                <div className="grid md:grid-cols-2 gap-2 text-gray-700">
                  <p><strong>Nome:</strong> {selectedRecord.petName}</p>
                  <p><strong>Espécie:</strong> {selectedRecord.petType}</p>
                  <p><strong>Raça:</strong> {selectedRecord.petBreed}</p>
                  <p><strong>Sexo:</strong> {selectedRecord.petSex}</p>
                  <p><strong>Idade:</strong> {selectedRecord.petAge}</p>
                  <p><strong>Microchip:</strong> {selectedRecord.microchip}</p>
                  <p><strong>Tutor:</strong> {selectedRecord.owner}</p>
                  <p><strong>Telefone:</strong> {selectedRecord.ownerPhone}</p>
                  <p className="md:col-span-2 text-red-600"><strong>Alergias:</strong> {selectedRecord.allergies}</p>
                </div>
              </div>

              {/* Consulta Atual */}
              <div className="border rounded-lg p-4">
                <h4 className="text-gray-800 mb-3">Consulta - {new Date(selectedRecord.date).toLocaleDateString("pt-BR")}</h4>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Diagnóstico:</strong> {selectedRecord.diagnosis}</p>
                  <p><strong>Tratamento:</strong> {selectedRecord.treatment}</p>
                  
                  {/* RF22: Histórico de Medicamentos */}
                  {selectedRecord.medications.length > 0 && (
                    <div>
                      <p><strong>Medicamentos (RF22):</strong></p>
                      <ul className="list-disc list-inside pl-4">
                        {selectedRecord.medications.map((med, idx) => (
                          <li key={idx}>
                            {med} - Prescrito em {new Date(selectedRecord.date).toLocaleDateString("pt-BR")} por {selectedRecord.veterinarian}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <p><strong>Veterinário:</strong> {selectedRecord.veterinarian}</p>
                  {selectedRecord.notes && (
                    <p><strong>Observações:</strong> {selectedRecord.notes}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}