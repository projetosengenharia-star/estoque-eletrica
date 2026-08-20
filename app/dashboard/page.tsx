'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      // Pega o usuário logado
      const { data: { user } } = await supabase.auth.getUser();
      
      // Se NÃO tiver usuário, manda pro login
      if (!user) {
        router.push('/login');
      } else {
        // Se tiver usuário, libera o dashboard
        setLoading(false);
      }
    }

    checkUser();
  }, [supabase, router]);

  // Enquanto verifica o login, mostra um loading para não dar erro de loop
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-lg">Carregando seu painel...</div>
      </div>
    );
  }

  // --- A PARTIR DAQUI É O SEU DASHBOARD (O que você já tinha) ---
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Bem-vindo!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/materiais">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Materiais</h2>
            <p className="text-gray-500 mt-2">Gerencie seu catálogo</p>
          </div>
        </Link>

        <Link href="/dashboard/estoque">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Estoque</h2>
            <p className="text-gray-500 mt-2">Controle de entradas e saídas</p>
          </div>
        </Link>

        <Link href="/dashboard/relatorios">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Relatórios</h2>
            <p className="text-gray-500 mt-2">Análises e exportações</p>
          </div>
        </Link>
      </div>
    </div>
  );
}