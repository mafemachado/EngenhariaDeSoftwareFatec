import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Heart, ArrowLeft, Calendar, MessageSquare, FileText, User } from "lucide-react";
import { ChatbotScheduler } from "./ChatbotScheduler";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ClientPortalProps {
  onBackToStaff: () => void;
}

type ClientView = "login" | "register" | "dashboard";

const MOCK_CLIENT = {
  id: "1",
  name: "Maria Silva",
  email: "maria@email.com",
  phone: "(11) 98765-4321",
  pets: [
    { id: "1", name: "Rex", species: "Cachorro", breed: "Labrador" }
  ],
  appointments: [
    {
      id: "1",
      date: "2025-11-15",
      time: "10:00",
      pet: "Rex",
      service: "Consulta",
      veterinarian: "Dr. Jonas Dobermann",
      status: "confirmed"
    }
  ]
};

export function ClientPortal({ onBackToStaff }: ClientPortalProps) {
  const [view, setView] = useState<ClientView>("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setView("dashboard");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setView("dashboard");
  };

  if (view === "dashboard" && isLoggedIn) {
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
                  <p className="text-gray-600">Portal do Cliente</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-gray-700">{MOCK_CLIENT.name}</p>
                  <p className="text-green-600">Cliente</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setView("login");
                  }}
                >
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="appointments" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="appointments">
                <Calendar className="w-4 h-4 mr-2" />
                Agendamentos
              </TabsTrigger>
              <TabsTrigger value="chatbot">
                <MessageSquare className="w-4 h-4 mr-2" />
                Agendar Consulta
              </TabsTrigger>
              <TabsTrigger value="pets">
                <Heart className="w-4 h-4 mr-2" />
                Meus Pets
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-800">Meus Agendamentos</CardTitle>
                  <CardDescription>Consultas agendadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {MOCK_CLIENT.appointments.map(apt => (
                      <div key={apt.id} className="border rounded-lg p-4 bg-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-gray-800">
                              <strong>{apt.pet}</strong> - {apt.service}
                            </p>
                            <p className="text-gray-600">
                              {new Date(apt.date).toLocaleDateString("pt-BR")} às {apt.time}
                            </p>
                            <p className="text-blue-600">{apt.veterinarian}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chatbot">
              <ChatbotScheduler clientMode={true} clientData={MOCK_CLIENT} />
            </TabsContent>

            <TabsContent value="pets">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-800">Meus Pets</CardTitle>
                  <CardDescription>Informações dos seus animais de estimação</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {MOCK_CLIENT.pets.map(pet => (
                      <div key={pet.id} className="border rounded-lg p-4 bg-white">
                        <h3 className="text-gray-800">{pet.name}</h3>
                        <p className="text-gray-600">
                          {pet.species} - {pet.breed}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button
            variant="outline"
            onClick={onBackToStaff}
            className="mt-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Login de Funcionários
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-green-500 to-blue-600 p-3 rounded-2xl">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>
          </div>
          <div className="text-center">
            <CardTitle className="text-green-700">Vetec - Portal do Cliente</CardTitle>
            <CardDescription>
              {view === "login" ? "Entre com sua conta" : "Crie sua conta"}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {view === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Entrar
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setView("register")}
                  className="text-green-600 hover:text-green-700"
                >
                  Não tem conta? Cadastre-se
                </button>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded text-center">
                <p className="text-xs text-gray-600">
                  Teste: maria@email.com / senha: 123
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input id="name" placeholder="Seu nome completo" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input id="cpf" placeholder="000.000.000-00" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input id="phone" placeholder="(00) 00000-0000" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email">Email *</Label>
                <Input id="reg-email" type="email" placeholder="seu@email.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password">Senha *</Label>
                <Input id="reg-password" type="password" placeholder="••••••••" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço *</Label>
                <Input id="address" placeholder="Rua, número, bairro" required />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Cadastrar
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="text-green-600 hover:text-green-700"
                >
                  Já tem conta? Faça login
                </button>
              </div>
            </form>
          )}

          <Button
            variant="ghost"
            onClick={onBackToStaff}
            className="w-full mt-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Login de Funcionários
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
