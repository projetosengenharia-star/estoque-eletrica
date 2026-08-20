import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redireciona automaticamente qualquer pessoa que entrar na raiz do site ("/") 
  // direto para o seu Dashboard ("/dashboard")
  redirect('/dashboard');
}