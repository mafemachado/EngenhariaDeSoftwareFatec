import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calendar, Clock, User, FileText, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface AppointmentsListProps {
  role: "veterinarian" | "receptionist";
}

const MOCK_APPOINTMENTS = [
  {
    id: "1",
    time: "09:00",
    date: "2025-11-12",
    client: "Maria Silva",
    pet: "Rex",
    petType: "Cachorro",
    service: "Consulta",
    veterinarian: "Dr. Carlos Silva",
    status: "confirmed"
  },
  {
    id: "2",
    time: "10:30",
    date: "2025-11-12",
    client: "João Santos",
    pet: "Mimi",
    petType: "Gato",
    service: "Vacinação",
    veterinarian: "Dra. Maria Santos",
    status: "confirmed"
  },
  {
    id: "3",
    time: "11:00",
    date: "2025-11-12",
    client: "Ana Paula",
    pet: "Thor",
    petType: "Cachorro",
    service: "Cirurgia",
    veterinarian: "Dr. Carlos Silva",
    status: "pending"
  },
  {
    id: "4",
    time: "14:00",
    date: "2025-11-13",
    client: "Pedro Costa",
    pet: "Luna",
    petType: "Gato",
    service: "Exame",
    veterinarian: "Dra. Júlia Costa",
    status: "confirmed"
  },
  {
    id: "5",
    time: "15:30",
    date: "2025-11-11",
    client: "Carla Mendes",
    pet: "Bob",
    petType: "Cachorro",
    service: "Consulta",
    veterinarian: "Dr. Pedro Oliveira",
    status: "completed"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-700 border-green-300";
    case "pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "completed":
      return "bg-blue-100 text-blue-700 border-blue-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "confirmed":
      return "Confirmado";
    case "pending":
      return "Pendente";
    case "completed":
      return "Concluído";
    default:
      return status;
  }
};

export function AppointmentsList({ role }: AppointmentsListProps) {
  // RF7: Filtros para busca de agendamentos
  const [filterDate, setFilterDate] = useState("");
  const [filterService, setFilterService] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Aplicar filtros
  const filteredAppointments = MOCK_APPOINTMENTS.filter(appointment => {
    const dateMatch = !filterDate || appointment.date === filterDate;
    const serviceMatch = filterService === "all" || appointment.service === filterService;
    const statusMatch = filterStatus === "all" || appointment.status === filterStatus;
    
    return dateMatch && serviceMatch && statusMatch;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-gray-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            Agendamentos
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </CardTitle>
        <CardDescription>
          RF7: Busque e filtre agendamentos por data e tipo de serviço
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* RF7: Filtros de busca */}
          {showFilters && (
            <div className="border rounded-lg p-4 bg-blue-50 space-y-4">
              <h4 className="text-gray-800">Filtrar Agendamentos</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Data</Label>
                  <Input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Natureza da Consulta</Label>
                  <Select value={filterService} onValueChange={setFilterService}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Consulta">Consulta</SelectItem>
                      <SelectItem value="Vacinação">Vacinação</SelectItem>
                      <SelectItem value="Cirurgia">Cirurgia</SelectItem>
                      <SelectItem value="Exame">Exame</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="confirmed">Confirmado</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="completed">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilterDate("");
                  setFilterService("all");
                  setFilterStatus("all");
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          )}

          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border rounded-lg p-4 hover:border-green-300 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2 text-green-700">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="text-gray-600">
                        {new Date(appointment.date).toLocaleDateString("pt-BR")}
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {getStatusText(appointment.status)}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-2 text-gray-700">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>Cliente: {appointment.client}</span>
                      </div>
                      <div>
                        <span>Pet: {appointment.pet} ({appointment.petType})</span>
                      </div>
                      <div>
                        <span>Serviço: {appointment.service}</span>
                      </div>
                      <div className="text-blue-600">
                        <span>{appointment.veterinarian}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {role === "veterinarian" && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Prontuário
                      </Button>
                    )}
                    {role === "receptionist" && (
                      <>
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          Cancelar
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAppointments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum agendamento encontrado com os filtros selecionados
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}