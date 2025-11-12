import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageSquare, Send, Bot, User as UserIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";

type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
  options?: { label: string; value: string }[];
  timeSlots?: string[];
};

interface ChatbotSchedulerProps {
  clientMode?: boolean;
  clientData?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    pets: { id: string; name: string; species: string; breed: string }[];
  };
}

// RF6 e RF8: Horários disponíveis baseados na agenda médica
const AVAILABLE_DATES = [
  "2025-11-15",
  "2025-11-16", 
  "2025-11-18",
  "2025-11-19",
  "2025-11-20"
];

const AVAILABLE_TIMES = {
  "2025-11-15": ["09:00", "10:00", "14:00", "15:00"],
  "2025-11-16": ["08:00", "09:00", "11:00", "16:00"],
  "2025-11-18": ["09:00", "13:00", "14:00", "15:00"],
  "2025-11-19": ["08:00", "10:00", "11:00", "14:00"],
  "2025-11-20": ["09:00", "10:00", "15:00", "16:00"]
};

export function ChatbotScheduler({ clientMode = false, clientData }: ChatbotSchedulerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Olá${clientMode && clientData ? `, ${clientData.name}` : ""}! Sou o assistente virtual da Vetec. Como posso ajudar você hoje?`,
      sender: "bot",
      options: [
        { label: "Agendar consulta", value: "schedule" },
        { label: "Ver agendamentos", value: "view" },
        { label: "Cancelar consulta", value: "cancel" }
      ]
    }
  ]);
  
  const [currentStep, setCurrentStep] = useState<string>("initial");
  const [appointmentData, setAppointmentData] = useState<any>({});
  const [inputValue, setInputValue] = useState("");

  const addMessage = (text: string, sender: "bot" | "user", options?: any[], timeSlots?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      options,
      timeSlots
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOptionClick = (option: { label: string; value: string }) => {
    addMessage(option.label, "user");

    if (option.value === "schedule") {
      setTimeout(() => {
        if (clientMode && clientData) {
          // Cliente logado - pula para seleção de pet
          if (clientData.pets.length > 0) {
            const petOptions = clientData.pets.map(pet => ({
              label: `${pet.name} (${pet.species})`,
              value: pet.id
            }));
            addMessage(
              "Qual pet você deseja agendar?",
              "bot",
              petOptions
            );
            setAppointmentData({ owner: clientData.name, ownerId: clientData.id });
            setCurrentStep("get_pet_selection");
          }
        } else {
          addMessage(
            "Ótimo! Vou ajudá-lo a agendar uma consulta. Qual é o nome do tutor?",
            "bot"
          );
          setCurrentStep("get_owner");
        }
      }, 500);
    } else if (option.value === "view") {
      setTimeout(() => {
        addMessage(
          "Você pode visualizar seus agendamentos na aba 'Agendamentos' do menu principal.",
          "bot"
        );
        setCurrentStep("initial");
      }, 500);
    } else if (option.value === "cancel") {
      setTimeout(() => {
        addMessage(
          "Para cancelar uma consulta, acesse a aba 'Agendamentos' e selecione a opção de cancelamento.",
          "bot"
        );
        setCurrentStep("initial");
      }, 500);
    }
  };

  const handleDateClick = (date: string) => {
    addMessage(new Date(date).toLocaleDateString("pt-BR"), "user");
    setAppointmentData({ ...appointmentData, date });

    setTimeout(() => {
      const times = AVAILABLE_TIMES[date as keyof typeof AVAILABLE_TIMES] || [];
      addMessage(
        "Perfeito! Agora escolha um dos horários disponíveis:",
        "bot",
        undefined,
        times
      );
      setCurrentStep("get_time");
    }, 500);
  };

  const handleTimeClick = (time: string) => {
    addMessage(time, "user");
    setAppointmentData({ ...appointmentData, time });

    setTimeout(() => {
      addMessage(
        "Qual é o tipo de serviço necessário?",
        "bot",
        [
          { label: "Consulta", value: "consultation" },
          { label: "Vacinação", value: "vaccination" },
          { label: "Cirurgia", value: "surgery" },
          { label: "Exame", value: "exam" }
        ]
      );
      setCurrentStep("get_service");
    }, 500);
  };

  const handleServiceClick = (option: { label: string; value: string }) => {
    addMessage(option.label, "user");
    setAppointmentData({ ...appointmentData, service: option.value, serviceLabel: option.label });

    setTimeout(() => {
      const summary = `
        Confirme os dados do agendamento:
        
        📅 Data: ${new Date(appointmentData.date).toLocaleDateString("pt-BR")}
        🕐 Horário: ${appointmentData.time}
        👤 Tutor: ${appointmentData.owner}
        🐾 Pet: ${appointmentData.pet}
        🏥 Serviço: ${option.label}
        
        Está tudo correto?
      `;
      
      addMessage(summary, "bot", [
        { label: "Sim, confirmar", value: "confirm" },
        { label: "Não, cancelar", value: "restart" }
      ]);
      setCurrentStep("confirm");
    }, 500);
  };

  const handleConfirmation = (option: { label: string; value: string }) => {
    addMessage(option.label, "user");

    if (option.value === "confirm") {
      setTimeout(() => {
        addMessage(
          "✅ Agendamento realizado com sucesso! Você receberá uma confirmação por email.",
          "bot",
          [{ label: "Fazer novo agendamento", value: "schedule" }]
        );
        setAppointmentData({});
        setCurrentStep("initial");
        toast.success("Consulta agendada via chatbot!");
      }, 500);
    } else {
      setTimeout(() => {
        addMessage(
          "Agendamento cancelado. Deseja fazer um novo agendamento?",
          "bot",
          [
            { label: "Sim", value: "schedule" },
            { label: "Não", value: "end" }
          ]
        );
        setAppointmentData({});
        setCurrentStep("initial");
      }, 500);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, "user");
    const message = inputValue;
    setInputValue("");

    setTimeout(() => {
      if (currentStep === "get_owner") {
        setAppointmentData({ ...appointmentData, owner: message });
        addMessage("Qual é o nome do pet?", "bot");
        setCurrentStep("get_pet");
      } else if (currentStep === "get_pet") {
        setAppointmentData({ ...appointmentData, pet: message });
        
        // RF6: Fornece datas disponíveis
        const dateOptions = AVAILABLE_DATES.map(date => ({
          label: new Date(date).toLocaleDateString("pt-BR"),
          value: date
        }));
        
        addMessage(
          "Escolha uma das datas disponíveis para atendimento:",
          "bot",
          dateOptions
        );
        setCurrentStep("get_date");
      }
    }, 500);
  };

  return (
    <Card className="h-[calc(100vh-300px)] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <MessageSquare className="w-5 h-5 text-green-600" />
          Chatbot de Agendamento
        </CardTitle>
        <CardDescription>
          RF5 e RF6: Agende consultas através do assistente virtual
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === "bot" 
                    ? "bg-gradient-to-br from-green-500 to-blue-600" 
                    : "bg-gray-300"
                }`}>
                  {message.sender === "bot" ? (
                    <Bot className="w-4 h-4 text-white" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-gray-700" />
                  )}
                </div>
                <div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "bot"
                        ? "bg-green-50 text-gray-800"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                  
                  {/* Options */}
                  {message.options && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.options.map((option, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (currentStep === "get_date") {
                              handleDateClick(option.value);
                            } else if (currentStep === "get_service") {
                              handleServiceClick(option);
                            } else if (currentStep === "confirm") {
                              handleConfirmation(option);
                            } else {
                              handleOptionClick(option);
                            }
                          }}
                          className="border-green-300 hover:bg-green-50"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Time Slots */}
                  {message.timeSlots && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.timeSlots.map((time, index) => (
                        <Badge
                          key={index}
                          className="cursor-pointer bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200"
                          onClick={() => handleTimeClick(time)}
                        >
                          {time}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex gap-2 border-t pt-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Digite sua mensagem..."
            disabled={!["get_owner", "get_pet"].includes(currentStep)}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!["get_owner", "get_pet"].includes(currentStep)}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}