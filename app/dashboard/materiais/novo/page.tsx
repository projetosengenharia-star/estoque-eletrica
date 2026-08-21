'use client';

import { supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NovoMaterialPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Estado do formulário
  const [form, setForm] = useState({
    internal_code: '',
    manufacturer_code: '',
    name: '',
    description: '',
    category_id: '',
    unit: '',
    current_stock: 0,
    minimum_stock: 0,
    last_purchase_price: 0,
    avg_purchase_price: 0,
    profit_margin: 0,
    sale_price: 0,
    location: '',
    manufacturer: '',
    is_active: true,
  });

  // Buscar categorias para o select
  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select('*').order('name');
      setCategories(data || []);
    }
    fetchCategories();
  }, []);

  // Função para atualizar os campos
  function handleChange(e: any) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  // Função para salvar
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    // Converte strings para números
    const payload = {
      ...form,
      current_stock: parseFloat(form.current_stock as any) || 0,
      minimum_stock: parseFloat(form.minimum_stock as any) || 0,
      last_purchase_price: parseFloat(form.last_purchase_price as any) || 0,
      avg_purchase_price: parseFloat(form.avg_purchase_price as any) || 0,
      profit_margin: parseFloat(form.profit_margin as any) || 0,
      sale_price: parseFloat(form.sale_price as any) || 0,
    };

    const { error } = await supabase.from('materials').insert([payload]);

    if (error) {
      alert('Erro ao salvar: ' + error.message);
      setLoading(false);
    } else {
      router.push('/dashboard/materiais');
      router.refresh();
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Novo Material</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Nome */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Nome *</label>
            <input required type="text" name="name" value={form.name} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          {/* Código Interno */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Código Interno</label>
            <input type="text" name="internal_code" value={form.internal_code} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          {/* Código Fabricante */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Código Fabricante</label>
            <input type="text" name="manufacturer_code" value={form.manufacturer_code} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Categoria</label>
            <select name="category_id" value={form.category_id} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="">Selecione...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Unidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Unidade (UN, CX, M)</label>
            <input type="text" name="unit" value={form.unit} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          {/* Localização */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Localização (Prateleira)</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          {/* Fabricante */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Fabricante</label>
            <input type="text" name="manufacturer" value={form.manufacturer} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          {/* Descrição */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          {/* Estoque */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Estoque Atual</label>
            <input type="number" step="0.01" name="current_stock" value={form.current_stock} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          {/* Estoque Mínimo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Estoque Mínimo</label>
            <input type="number" step="0.01" name="minimum_stock" value={form.minimum_stock} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          {/* Preço de Compra */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Último Preço de Compra</label>
            <input type="number" step="0.01" name="last_purchase_price" value={form.last_purchase_price} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          {/* Margem de Lucro */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Margem de Lucro (%)</label>
            <input type="number" step="0.01" name="profit_margin" value={form.profit_margin} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          {/* Preço de Venda */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Preço de Venda</label>
            <input type="number" step="0.01" name="sale_price" value={form.sale_price} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50">
            {loading ? 'Salvando...' : 'Salvar Material'}
          </button>
          <button type="button" onClick={() => router.push('/dashboard/materiais')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}