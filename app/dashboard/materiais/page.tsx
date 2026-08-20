import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Cabeçalho da página */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Bem-vindo!</h1>

      {/* Grid de Cards com Navegação */}
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