'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/login'
      } else {
        setUser(user)
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Bem-vindo!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Materiais</h3>
            <p className="text-gray-600">Gerencie seu catálogo</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Estoque</h3>
            <p className="text-gray-600">Controle de entradas e saídas</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Relatórios</h3>
            <p className="text-gray-600">Análises e exportações</p>
          </div>
        </div>
      </main>
    </div>
  )
}