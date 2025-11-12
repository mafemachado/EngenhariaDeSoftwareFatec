import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Calendar } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function ScheduleAppointment() {
  const [formData, setFormData] = useState({
    clientName: "",
    petName: "",
    petType: "",
    date: "",
    time: "",
    veterinarian: "",
    serviceType: "",
    appointmentType: "", // primeira consulta ou retorno
    observations: "", // observações como animal pesado, precisa de ajuda
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Consulta agendada com sucesso!");
    // Reset form
    setFormData({
      clientName: "",
      petName: "",
      petType: "",
      date: "",
      time: "",
      veterinarian: "",
      serviceType: "",
      appointmentType: "",
      observations: "",
      notes: ""
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Calendar className="w-5 h-5 text-green-600" />
          Novo Agendamento
        </CardTitle>
        <CardDescription>Agende uma nova consulta para o cliente</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Cliente */}
            <div className="space-y-2">
              <Label htmlFor="clientName">Nome do Cliente *</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="João Silva"
                required
              />
            </div>

            {/* Pet */}
            <div className="space-y-2">
              <Label htmlFor="petName">Nome do Pet *</Label>
              <Input
                id="petName"
                value={formData.petName}
                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                placeholder="Rex"
                required
              />
            </div>

            {/* Tipo de Pet */}
            <div className="space-y-2">
              <Label htmlFor="petType">Tipo de Animal *</Label>
              <Select
                value={formData.petType}
                onValueChange={(value) => setFormData({ ...formData, petType: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Cachorro</SelectItem>
                  <SelectItem value="cat">Gato</SelectItem>
                  <SelectItem value="bird">Pássaro</SelectItem>
                  <SelectItem value="rabbit">Coelho</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de Consulta - NOVO */}
            <div className="space-y-2">
              <Label htmlFor="appointmentType">Tipo de Consulta *</Label>
              <Select
                value={formData.appointmentType}
                onValueChange={(value) => setFormData({ ...formData, appointmentType: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">Primeira Consulta</SelectItem>
                  <SelectItem value="return">Retorno</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de Serviço */}
            <div className="space-y-2">
              <Label htmlFor="serviceType">Tipo de Serviço *</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consulta</SelectItem>
                  <SelectItem value="vaccination">Vacinação</SelectItem>
                  <SelectItem value="surgery">Cirurgia</SelectItem>
                  <SelectItem value="exam">Exame</SelectItem>
                  <SelectItem value="grooming">Banho e Tosa</SelectItem>
                  <SelectItem value="emergency">Emergência</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Data */}
            <div className="space-y-2">
              <Label htmlFor="date">Data *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            {/* Horário */}
            <div className="space-y-2">
              <Label htmlFor="time">Horário *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>

            {/* Veterinário */}
            <div className="space-y-2">
              <Label htmlFor="veterinarian">Veterinário *</Label>
              <Select
                value={formData.veterinarian}
                onValueChange={(value) => setFormData({ ...formData, veterinarian: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o veterinário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-jonas">Dr. Jonas Dobermann</SelectItem>
                  <SelectItem value="dr-mike">Dr. Mike Dobermann</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Observações Especiais - NOVO */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="observations">Observações Especiais</Label>
              <Input
                id="observations"
                value={formData.observations}
                onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                placeholder="Ex: Animal pesado, precisa da ajuda da enfermeira para contenção"
              />
            </div>

            {/* Observações Gerais */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Observações Gerais</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Informações adicionais sobre a consulta..."
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Agendar Consulta
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}