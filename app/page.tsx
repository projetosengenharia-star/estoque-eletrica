// app/page.tsx

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Estoque Elétrica</h1>
        <p className="text-lg text-gray-600 mb-8">Sistema de gerenciamento de materiais</p>
        
        <div className="flex flex-col gap-4">
          <a 
            href="/dashboard" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Acessar o Sistema
          </a>
          <a 
            href="/login" 
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Fazer Login
          </a>
        </div>
      </div>
    </main>
  );
}