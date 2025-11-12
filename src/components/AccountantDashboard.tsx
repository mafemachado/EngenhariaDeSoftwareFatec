import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Heart, LogOut, DollarSign, TrendingUp, FileText, AlertCircle } from "lucide-react";
import { FinancialManagement } from "./FinancialManagement";
import type { User } from "../App";

interface AccountantDashboardProps {
  user: User;
  onLogout: () => void;
}

export function AccountantDashboard({ user, onLogout }: AccountantDashboardProps) {
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
                <p className="text-gray-600">Painel Financeiro</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-gray-700">{user.name}</p>
                <p className="text-green-600">Auxiliar de Contas</p>
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
              <CardTitle className="text-gray-700">Faturamento Hoje</CardTitle>
              <DollarSign className="w-5 h-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-green-700">R$ 8.450,00</div>
              <p className="text-gray-600">12 transações</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-700">Mês Atual</CardTitle>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-blue-700">R$ 124.380,00</div>
              <p className="text-gray-600">+15% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-700">Contas a Pagar</CardTitle>
              <FileText className="w-5 h-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-orange-700">R$ 15.200,00</div>
              <p className="text-gray-600">8 pendentes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-700">Contas a Receber</CardTitle>
              <AlertCircle className="w-5 h-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-green-700">R$ 22.450,00</div>
              <p className="text-gray-600">15 pendentes</p>
            </CardContent>
          </Card>
        </div>

        {/* Financial Management */}
        <FinancialManagement />
      </main>
    </div>
  );
}
