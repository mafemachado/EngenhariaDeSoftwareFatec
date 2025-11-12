import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MessageSquare, User, Clock, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

type ChatSession = {
  id: string;
  clientName: string;
  startTime: string;
  status: "active" | "completed" | "waiting";
  messages: { sender: "client" | "bot"; text: string; time: string }[];
  appointmentDetails?: {
    pet: string;
    date: string;
    time: string;
    service: string;
  };
};

const MOCK_SESSIONS: ChatSession[] = [
  {
    id: "1",
    clientName: "João Silva",
    startTime: "14:35",
    status: "active",
    messages: [
      { sender: "bot", text: "Olá! Como posso ajudá-lo?", time: "14:35" },
      { sender: "client", text: "Quero agendar uma consulta para meu cachorro", time: "14:36" },
      { sender: "bot", text: "Qual o nome do seu pet?", time: "14:36" },
      { sender: "client", text: "Max", time: "14:37" }
    ]
  },
  {
    id: "2",
    clientName: "Maria Santos",
    startTime: "13:20",
    status: "completed",
    messages: [
      { sender: "bot", text: "Olá! Como posso ajudá-lo?", time: "13:20" },
      { sender: "client", text: "Agendar vacina", time: "13:21" },
      { sender: "bot", text: "Qual o nome do tutor?", time: "13:21" },
      { sender: "client", text: "Maria Santos", time: "13:21" }
    ],
    appointmentDetails: {
      pet: "Luna",
      date: "2025-11-15",
      time: "10:00",
      service: "Vacinação"
    }
  },
  {
    id: "3",
    clientName: "Pedro Costa",
    startTime: "12:45",
    status: "waiting",
    messages: [
      { sender: "bot", text: "Olá! Como posso ajudá-lo?", time: "12:45" },
      { sender: "client", text: "Preciso tirar uma dúvida sobre o horário", time: "12:46" },
      { sender: "bot", text: "Por favor, aguarde. Em breve um atendente entrará em contato.", time: "12:46" }
    ]
  }
];

export function ChatbotMonitor() {
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewSession = (session: ChatSession) => {
    setSelectedSession(session);
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-300";
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "waiting":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Em andamento";
      case "completed":
        return "Concluído";
      case "waiting":
        return "Aguardando atendente";
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <MessageSquare className="w-5 h-5 text-green-600" />
          Monitor do Chatbot
        </CardTitle>
        <CardDescription>
          Acompanhe as conversas do chatbot com os clientes (somente leitura)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {MOCK_SESSIONS.map((session) => (
            <div
              key={session.id}
              className="border rounded-lg p-4 hover:border-green-300 transition-colors"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <h3 className="text-gray-800">{session.clientName}</h3>
                    <Badge className={getStatusColor(session.status)}>
                      {getStatusText(session.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Iniciado às {session.startTime}</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Última mensagem:</strong>{" "}
                    {session.messages[session.messages.length - 1].text.substring(0, 50)}
                    {session.messages[session.messages.length - 1].text.length > 50 ? "..." : ""}
                  </p>
                  {session.appointmentDetails && (
                    <div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span>Agendamento concluído</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        {session.appointmentDetails.pet} - {session.appointmentDetails.service} em{" "}
                        {new Date(session.appointmentDetails.date).toLocaleDateString("pt-BR")} às{" "}
                        {session.appointmentDetails.time}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex md:flex-col gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewSession(session)}
                    className="flex-1 md:flex-none"
                  >
                    Ver Conversa
                  </Button>
                  {session.status === "waiting" && (
                    <Button
                      size="sm"
                      className="flex-1 md:flex-none bg-gradient-to-r from-green-600 to-blue-600"
                    >
                      Atender
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Dialog para visualizar conversa completa */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Conversa com {selectedSession?.clientName}
            </DialogTitle>
          </DialogHeader>
          {selectedSession && (
            <div className="space-y-3">
              {selectedSession.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[70%] ${msg.sender === "client" ? "text-right" : ""}`}>
                    <div
                      className={`rounded-lg p-3 ${
                        msg.sender === "bot"
                          ? "bg-green-50 text-gray-800"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}

              {selectedSession.appointmentDetails && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="text-gray-800 mb-2">Detalhes do Agendamento</h4>
                  <div className="space-y-1 text-gray-700">
                    <p><strong>Pet:</strong> {selectedSession.appointmentDetails.pet}</p>
                    <p><strong>Serviço:</strong> {selectedSession.appointmentDetails.service}</p>
                    <p>
                      <strong>Data:</strong>{" "}
                      {new Date(selectedSession.appointmentDetails.date).toLocaleDateString("pt-BR")} às{" "}
                      {selectedSession.appointmentDetails.time}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
