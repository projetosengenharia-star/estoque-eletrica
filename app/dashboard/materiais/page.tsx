'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function MateriaisPage() {
  const supabase = createClient();
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMaterials() {
      // Tenta buscar os materiais
      const { data, error } = await supabase
        .from('materials')
        .select(`
          *,
          categories (name)
        `)
        .order('name', { ascending: true });

      if (error) {
        // Se der erro (ex: falta de variáveis de ambiente), a gente mostra o erro na tela ao invés de quebrar o site
        setError('Erro ao carregar materiais: ' + error.message);
        console.error(error);
      } else {
        setMaterials(data || []);
      }
      setLoading(false);
    }

    fetchMaterials();
  }, [supabase]);

  if (loading) {
    return <div className="p-6 text-gray-500">Carregando materiais...</div>;
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-lg">
        <h2 className="font-bold">Ops! Erro ao carregar.</h2>
        <p className="mt-2">{error}</p>
        <p className="mt-4 text-sm">Verifique se as variáveis de ambiente (NEXT_PUBLIC_SUPABASE_URL e ANON_KEY) estão configuradas na Vercel.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Catálogo de Materiais</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition">
          + Novo Material
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {materials.length > 0 ? (
              materials.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.code || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {material.categories?.name || 'Sem categoria'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {material.price ? `R$ ${material.price.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${material.quantity > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {material.quantity || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                    <button className="text-red-600 hover:text-red-900">Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Nenhum material cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}