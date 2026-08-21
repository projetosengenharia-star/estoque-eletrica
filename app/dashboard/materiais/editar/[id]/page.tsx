'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditarMaterialPage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const materialId = params.id;

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  // Buscar categorias
  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select('*').order('name');
      setCategories(data || []);
    }
    fetchCategories();
  }, [supabase]);

  // Buscar o material pelo ID
  useEffect(() => {
    async function fetchMaterial() {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .eq('id', materialId)
        .single();

      if (error) {
        alert('Erro ao buscar material: ' + error.message);
        router.push('/dashboard/materiais');
      } else if (data) {
        setForm({
          internal_code: data.internal_code || '',
          manufacturer_code: data.manufacturer_code || '',
          name: data.name || '',
          description: data.description || '',
          category_id: data.category_id || '',
          unit: data.unit || '',
          current_stock: data.current_stock || 0,
          minimum_stock: data.minimum_stock || 0,
          last_purchase_price: data.last_purchase_price || 0,
          avg_purchase_price: data.avg_purchase_price || 0,
          profit_margin: data.profit_margin || 0,
          sale_price: data.sale_price || 0,
          location: data.location || '',
          manufacturer: data.manufacturer || '',
          is_active: data.is_active ?? true,
        });
        setLoading(false);
      }
    }

    if (materialId) {
      fetchMaterial();
    }
  }, [materialId, router, supabase]);

  function handleChange(e: any) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setSaving(true);

    // Corrige o uuid vazio
    const categoryValue = form.category_id === '' ? null : form.category_id;

    const payload = {
      ...form,
      category_id: categoryValue,
      current_stock: parseFloat(form.current_stock as any) || 0,
      minimum_stock: parseFloat(form.minimum_stock as any) || 0,
      last_purchase_price: parseFloat(form.last_purchase_price as any) || 0,
      avg_purchase_price: parseFloat(form.avg_purchase_price as any) || 0,
      profit_margin: parseFloat(form.profit_margin as any) || 0,
      sale_price: parseFloat(form.sale_price as any) || 0,
    };

    const { error } = await supabase
      .from('materials')
      .update(payload)
      .eq('id', materialId);

    if (error) {
      alert('Erro ao editar: ' + error.message);
      setSaving(false);
    } else {
      router.push('/dashboard/materiais');
      router.refresh();
    }
  }

  if (loading) {
    return <div className="p-6 text-gray-500">Carregando material...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Material</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Nome *</label>
            <input required type="text" name="name" value={form.name} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Código Interno</label>
            <input type="text" name="internal_code" value={form.internal_code} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Código Fabricante</label>
            <input type="text" name="manufacturer_code" value={form.manufacturer_code} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoria</label>
            <select name="category_id" value={form.category_id || ''} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="">Selecione...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Unidade (UN, CX, M)</label>
            <input type="text" name="unit" value={form.unit} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Localização (Prateleira)</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Fabricante</label>
            <input type="text" name="manufacturer" value={form.manufacturer} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Estoque Atual</label>
            <input type="number" step="0.01" name="current_stock" value={form.current_stock} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Estoque Mínimo</label>
            <input type="number" step="0.01" name="minimum_stock" value={form.minimum_stock} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Último Preço de Compra</label>
            <input type="number" step="0.01" name="last_purchase_price" value={form.last_purchase_price} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Margem de Lucro (%)</label>
            <input type="number" step="0.01" name="profit_margin" value={form.profit_margin} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Preço de Venda</label>
            <input type="number" step="0.01" name="sale_price" value={form.sale_price} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50">
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          <button type="button" onClick={() => router.push('/dashboard/materiais')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}