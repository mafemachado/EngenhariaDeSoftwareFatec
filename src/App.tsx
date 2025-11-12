import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { VeterinarianDashboard } from "./components/VeterinarianDashboard";
import { ReceptionistDashboard } from "./components/ReceptionistDashboard";
import { AccountantDashboard } from "./components/AccountantDashboard";
import { ClientPortal } from "./components/ClientPortal";

export type UserRole = "veterinarian" | "receptionist" | "accountant" | "client" | null;

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isClientPortal, setIsClientPortal] = useState(false);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsClientPortal(false);
  };

  const handleClientPortalToggle = () => {
    setIsClientPortal(!isClientPortal);
    setCurrentUser(null);
  };

  if (isClientPortal) {
    return <ClientPortal onBackToStaff={handleClientPortalToggle} />;
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} onClientPortal={handleClientPortalToggle} />;
  }

  if (currentUser.role === "veterinarian") {
    return <VeterinarianDashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (currentUser.role === "receptionist") {
    return <ReceptionistDashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (currentUser.role === "accountant") {
    return <AccountantDashboard user={currentUser} onLogout={handleLogout} />;
  }

  return null;
}
