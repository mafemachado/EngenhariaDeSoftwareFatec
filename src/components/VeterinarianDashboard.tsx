import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Heart, LogOut, Calendar, FileText, Pill, Activity, Syringe } from "lucide-react";
import { AppointmentsList } from "./AppointmentsList";
import { MedicalRecords } from "./MedicalRecords";
import { SurgeriesSchedule } from "./SurgeriesSchedule";
import type { User } from "../App";

interface VeterinarianDashboardProps {
  user: User;
  onLogout: () => void;
}

type ActiveTab = "appointments" | "records" | "surgeries";

export function VeterinarianDashboard({ user, onLogout }: VeterinarianDashboardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("appointments");

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
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
                <p className="text-gray-600">Painel do Veterinário</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-gray-700">{user.name}</p>
                <p className="text-green-600">Veterinário(a)</p>
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
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-700">Consultas Hoje</CardTitle>
              <Calendar className="w-5 h-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-green-700">8 pacientes</div>
              <p className="text-gray-600">Agendados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-700">Prontuários</CardTitle>
              <FileText className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-blue-700">156 registros</div>
              <p className="text-gray-600">Total de prontuários</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-700">Prescrições</CardTitle>
              <Pill className="w-5 h-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-green-700">23 ativas</div>
              <p className="text-gray-600">Em andamento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-700">Cirurgias</CardTitle>
              <Activity className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-blue-700">2 agendadas</div>
              <p className="text-gray-600">Esta semana</p>
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
            Agenda (Visualização)
          </Button>
          <Button
            variant={activeTab === "records" ? "default" : "outline"}
            onClick={() => setActiveTab("records")}
            className={activeTab === "records" ? "bg-gradient-to-r from-green-600 to-blue-600" : ""}
          >
            <FileText className="w-4 h-4 mr-2" />
            Prontuários
          </Button>
          <Button
            variant={activeTab === "surgeries" ? "default" : "outline"}
            onClick={() => setActiveTab("surgeries")}
            className={activeTab === "surgeries" ? "bg-gradient-to-r from-green-600 to-blue-600" : ""}
          >
            <Activity className="w-4 h-4 mr-2" />
            Cirurgias
          </Button>
        </div>

        {/* Content Area */}
        {activeTab === "appointments" && <AppointmentsList role="veterinarian" userName={user.name} />}
        {activeTab === "records" && <MedicalRecords veterinarianName={user.name} />}
        {activeTab === "surgeries" && <SurgeriesSchedule veterinarianName={user.name} />}
      </main>
    </div>
  );
}
