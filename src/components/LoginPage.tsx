import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Heart, AlertCircle, Users } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import type { User } from "../App";

// Usuários mock para demonstração
const MOCK_USERS = [
  {
    id: "1",
    email: "jonas@vetec.com",
    password: "vet123",
    name: "Dr. Jonas Dobermann",
    role: "veterinarian" as const
  },
  {
    id: "2",
    email: "mike@vetec.com",
    password: "vet123",
    name: "Dr. Mike Dobermann",
    role: "veterinarian" as const
  },
  {
    id: "3",
    email: "jude@vetec.com",
    password: "rec123",
    name: "Jude Terrier",
    role: "receptionist" as const
  },
  {
    id: "4",
    email: "leonardo@vetec.com",
    password: "acc123",
    name: "Leonardo Ragdoll",
    role: "accountant" as const
  }
];

interface LoginPageProps {
  onLogin: (user: User) => void;
  onClientPortal: () => void;
}

export function LoginPage({ onLogin, onClientPortal }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simula delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      onLogin({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } else {
      setError("Email ou senha incorretos");
    }

    setIsLoading(false);
  };

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
            <CardTitle className="text-green-700">Vetec</CardTitle>
            <CardDescription>Sistema de Gestão da Clínica Veterinária</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray-300"
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
                className="border-gray-300"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Ou</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-green-300 text-green-700 hover:bg-green-50"
              onClick={onClientPortal}
            >
              <Users className="w-4 h-4 mr-2" />
              Acesso do Cliente
            </Button>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg space-y-2">
              <p className="text-sm text-gray-700">Credenciais de teste (Funcionários):</p>
              <div className="text-xs text-gray-600 space-y-1">
                <p><strong>Dr. Jonas Dobermann:</strong> jonas@vetec.com / vet123</p>
                <p><strong>Dr. Mike Dobermann:</strong> mike@vetec.com / vet123</p>
                <p><strong>Jude Terrier (Recepcionista):</strong> jude@vetec.com / rec123</p>
                <p><strong>Leonardo Ragdoll (Aux. Contas):</strong> leonardo@vetec.com / acc123</p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
