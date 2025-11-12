import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Heart, LogOut, Calendar, Users, Plus, Clock, DollarSign, MessageSquare } from "lucide-react";
import { ScheduleAppointment } from "./ScheduleAppointment";
import { AppointmentsList } from "./AppointmentsList";
import { ClientsList } from "./ClientsList";
import { PetsList } from "./PetsList";
import { BillingModule } from "./BillingModule";
import { ChatbotMonitor } from "./ChatbotMonitor";
import type { User } from "../App";

interface ReceptionistDashboardProps {
  user: User;
  onLogout: () => void;
}

type ActiveTab = "appointments" | "schedule" | "clients" | "pets" | "billing" | "chatbot";

export function ReceptionistDashboard({ user, onLogout }: ReceptionistDashboardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("appointments");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-blue-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-green-700">Vetec</h1>
                <p className="text-gray-600">Painel da Recepção</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-gray-700">{user.name}</p>
                <p className="text-green-600">Recepcionista</p>
              </div>
              <Button
                variant="outline"
                onClick={onLogout}
                className="border-gray-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-700">Hoje</CardTitle>
              <Calendar className="w-5 h-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-green-700">12 consultas</div>
              <p className="text-gray-600">Agendadas para hoje</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-700">Próximas</CardTitle>
              <Clock className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-blue-700">3 consultas</div>
              <p className="text-gray-600">Nas próximas 2 horas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-700">Clientes</CardTitle>
              <Users className="w-5 h-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-green-700">245 ativos</div>
              <p className="text-gray-600">Cadastrados no sistema</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={activeTab === "appointments" ? "default" : "outline"}
            onClick={() => setActiveTab("appointments")}
            className={activeTab === "appointments" ? "bg-gradient-to-r from-green-600 to-blue-600" : ""}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Agendamentos
          </Button>
          <Button
            variant={activeTab === "schedule" ? "default" : "outline"}
            onClick={() => setActiveTab("schedule")}
            className={activeTab === "schedule" ? "bg-gradient-to-r from-green-600 to-blue-600" : ""}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Agendamento
          </Button>
          <Button
            variant={activeTab === "chatbot" ? "default" : "outline"}
            onClick={() => setActiveTab("chatbot")}
            className={activeTab === "chatbot" ? "bg-gradient-to-r from-green-600 to-blue-600" : ""}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Monitor Chatbot
          </Button>
          <Button
            variant={activeTab === "clients" ? "default" : "outline"}
            onClick={() => setActiveTab("clients")}
            className={activeTab === "clients" ? "bg-gradient-to-r from-green-600 to-blue-600" : ""}
          >
            <Users className="w-4 h-4 mr-2" />
            Tutores
          </Button>
          <Button
            variant={activeTab === "pets" ? "default" : "outline"}
            onClick={() => setActiveTab("pets")}
            className={activeTab === "pets" ? "bg-gradient-to-r from-green-600 to-blue-600" : ""}
          >
            <Heart className="w-4 h-4 mr-2" />
            Pacientes
          </Button>
          <Button
            variant={activeTab === "billing" ? "default" : "outline"}
            onClick={() => setActiveTab("billing")}
            className={activeTab === "billing" ? "bg-gradient-to-r from-green-600 to-blue-600" : ""}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Cobrança
          </Button>
        </div>

        {/* Content Area */}
        {activeTab === "appointments" && <AppointmentsList role="receptionist" />}
        {activeTab === "schedule" && <ScheduleAppointment />}
        {activeTab === "chatbot" && <ChatbotMonitor />}
        {activeTab === "clients" && <ClientsList />}
        {activeTab === "pets" && <PetsList />}
        {activeTab === "billing" && <BillingModule role="receptionist" />}
      </main>
    </div>
  );
}
