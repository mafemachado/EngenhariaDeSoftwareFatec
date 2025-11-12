import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Activity, Calendar, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface SurgeriesScheduleProps {
  veterinarianName: string;
}

const MOCK_SURGERIES = [
  {
    id: "1",
    date: "2025-11-14",
    time: "09:00",
    petName: "Thor",
    petType: "Cachorro",
    owner: "Ana Paula",
    ownerPhone: "(11) 98765-5678",
    procedure: "Cirurgia de fratura na pata",
    veterinarian: "Dr. Jonas Dobermann",
    duration: "2h",
    status: "scheduled",
    notes: "Animal pesado, necessita ajuda da enfermeira para contenção"
  },
  {
    id: "2",
    date: "2025-11-15",
    time: "14:00",
    petName: "Mel",
    petType: "Cachorro",
    owner: "Carla Mendes",
    ownerPhone: "(11) 98765-3456",
    procedure: "Castração",
    veterinarian: "Dr. Mike Dobermann",
    duration: "1h",
    status: "scheduled",
    notes: ""
  },
  {
    id: "3",
    date: "2025-11-12",
    time: "10:00",
    petName: "Rex",
    petType: "Cachorro",
    owner: "Maria Silva",
    ownerPhone: "(11) 98765-4321",
    procedure: "Remoção de tumor",
    veterinarian: "Dr. Jonas Dobermann",
    duration: "3h",
    status: "completed",
    notes: ""
  }
];

export function SurgeriesSchedule({ veterinarianName }: SurgeriesScheduleProps) {
  const [filter, setFilter] = useState<"all" | "scheduled" | "completed">("scheduled");

  const filteredSurgeries = MOCK_SURGERIES.filter(surgery => {
    if (filter === "all") return true;
    return surgery.status === filter;
  });

  const mySurgeries = filteredSurgeries.filter(s => s.veterinarian === veterinarianName);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "completed":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Agendada";
      case "completed":
        return "Concluída";
      default:
        return status;
    }
  };

  const upcomingSurgeries = MOCK_SURGERIES.filter(
    s => s.status === "scheduled" && new Date(s.date) >= new Date()
  ).length;

  return (
    <div className="space-y-6">
      {upcomingSurgeries > 0 && (
        <Alert className="bg-yellow-50 border-yellow-300">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>{upcomingSurgeries} cirurgia(s)</strong> agendada(s) nas próximas semanas
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <Activity className="w-5 h-5 text-green-600" />
            Cirurgias Agendadas
          </CardTitle>
          <CardDescription>
            Visualização das cirurgias marcadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filtros */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={filter === "all" ? "bg-gradient-to-r from-green-600 to-blue-600" : ""}
              >
                Todas
              </Button>
              <Button
                size="sm"
                variant={filter === "scheduled" ? "default" : "outline"}
                onClick={() => setFilter("scheduled")}
                className={filter === "scheduled" ? "bg-gradient-to-r from-green-600 to-blue-600" : ""}
              >
                Agendadas
              </Button>
              <Button
                size="sm"
                variant={filter === "completed" ? "default" : "outline"}
                onClick={() => setFilter("completed")}
                className={filter === "completed" ? "bg-gradient-to-r from-green-600 to-blue-600" : ""}
              >
                Concluídas
              </Button>
            </div>

            {/* Lista de Cirurgias */}
            <div className="space-y-3">
              {filteredSurgeries.map((surgery) => (
                <div
                  key={surgery.id}
                  className={`border rounded-lg p-4 transition-colors ${
                    surgery.veterinarian === veterinarianName
                      ? "bg-green-50 border-green-300"
                      : "hover:border-green-300"
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-gray-800">{surgery.petName}</h3>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                          {surgery.petType}
                        </Badge>
                        <Badge className={getStatusColor(surgery.status)}>
                          {getStatusText(surgery.status)}
                        </Badge>
                        {surgery.veterinarian === veterinarianName && (
                          <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                            Minha cirurgia
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-1 text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{new Date(surgery.date).toLocaleDateString("pt-BR")}</span>
                          <Clock className="w-4 h-4 text-gray-400 ml-2" />
                          <span>{surgery.time}</span>
                          <span>•</span>
                          <span>Duração: {surgery.duration}</span>
                        </div>

                        <p><strong>Procedimento:</strong> {surgery.procedure}</p>
                        <p><strong>Tutor:</strong> {surgery.owner} - {surgery.ownerPhone}</p>
                        <p className="text-blue-600"><strong>Veterinário:</strong> {surgery.veterinarian}</p>

                        {surgery.notes && (
                          <div className="mt-2 p-2 bg-orange-50 rounded border border-orange-200">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
                              <div>
                                <p className="text-orange-800">
                                  <strong>Observações:</strong>
                                </p>
                                <p className="text-orange-700">{surgery.notes}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2">
                      {surgery.status === "scheduled" && (
                        <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                          Ver Detalhes
                        </Button>
                      )}
                      {surgery.status === "completed" && (
                        <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Relatório
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredSurgeries.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhuma cirurgia encontrada
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
