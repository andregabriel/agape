"use client"
import Link from "next/link"
import Image from "next/image"
import { X, Mail, Apple } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex flex-col h-screen bg-[#202020] text-white">
      <div className="flex justify-between items-center p-4">
        <div></div> {/* Spacer */}
        <Link href="/" className="p-2">
          <X size={24} />
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center px-8 pt-8">
        <Image
          src="/images/hallow-logo-placeholder.png"
          alt="Hallow Logo"
          width={150}
          height={50}
          className="object-contain mb-2"
        />
        <p className="text-gray-400 text-sm mb-10">Terço Diário</p>
      </div>

      <div className="relative w-full h-48 mb-12">
        <Image
          src="/images/login-background.jpeg"
          alt="Rosary"
          layout="fill"
          objectFit="contain"
          className="opacity-80"
        />
      </div>

      <div className="flex flex-col items-center space-y-4 px-6">
        <button className="w-full bg-white text-black py-3 rounded-full flex items-center justify-center space-x-2 font-semibold">
          <Image src="/images/google-logo.png" alt="Google" width={20} height={20} />
          <span>Continuar com o Google</span>
        </button>
        <button className="w-full bg-gray-700 text-white py-3 rounded-full flex items-center justify-center space-x-2 font-semibold">
          <Mail size={20} />
          <span>Continue com E-mail</span>
        </button>
        <button className="w-full bg-gray-700 text-white py-3 rounded-full flex items-center justify-center space-x-2 font-semibold">
          <Apple size={20} />
          <span>Continuar com a Apple</span>
        </button>
      </div>

      <p className="text-center text-xs text-gray-500 mt-auto pb-6 px-6">
        Ao usar o Hallow, você concorda com nossos Termos.
      </p>
    </div>
  )
}
