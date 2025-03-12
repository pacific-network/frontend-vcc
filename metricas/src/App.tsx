import React from 'react';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'; // Importa QueryClient y QueryClientProvider/ Asegúrate de importar tu archivo theme.ts
import Login from './pages/login.page'; // Suponiendo que Login es tu componente principal

// Crea una instancia de QueryClient
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}> {/* Envuelve con QueryClientProvider */}
    
      <Login />
    </QueryClientProvider>
  );
};

export default App;