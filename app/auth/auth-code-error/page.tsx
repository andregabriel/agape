import Link from "next/link"

export default function AuthErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">Erro de Autenticação</h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Não foi possível completar o seu login. Por favor, tente novamente.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Voltar para o Login
        </Link>
      </div>
    </div>
  )
}
