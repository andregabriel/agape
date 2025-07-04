"use client"

import { useState } from "react"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Search, Plus, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

// Mock data for Instagram-style content
const stories = [
  { id: 1, username: "Sua História", image: "/placeholder.svg", isOwn: true, hasStory: false },
  { id: 2, username: "pe_antonio", image: "/placeholder.svg", hasStory: true },
  { id: 3, username: "irmã_clara", image: "/placeholder.svg", hasStory: true },
  { id: 4, username: "joão_silva", image: "/placeholder.svg", hasStory: true },
  { id: 5, username: "maria_santos", image: "/placeholder.svg", hasStory: true },
  { id: 6, username: "grupo_oracao", image: "/placeholder.svg", hasStory: true },
]

const highlights = [
  { id: 1, title: "Oração", image: "/placeholder.svg" },
  { id: 2, title: "Eventos", image: "/placeholder.svg" },
  { id: 3, title: "Testemunhos", image: "/placeholder.svg" },
  { id: 4, title: "Bíblia", image: "/placeholder.svg" },
]

const posts = [
  { id: 1, image: "/placeholder.svg", likes: 142, isLiked: false },
  { id: 2, image: "/placeholder.svg", likes: 89, isLiked: true },
  { id: 3, image: "/placeholder.svg", likes: 203, isLiked: false },
  { id: 4, image: "/placeholder.svg", likes: 156, isLiked: false },
  { id: 5, image: "/placeholder.svg", likes: 97, isLiked: true },
  { id: 6, image: "/placeholder.svg", likes: 234, isLiked: false },
  { id: 7, image: "/placeholder.svg", likes: 178, isLiked: false },
  { id: 8, image: "/placeholder.svg", likes: 92, isLiked: false },
  { id: 9, image: "/placeholder.svg", likes: 145, isLiked: true },
]

export default function ComunidadePage() {
  const [postsData, setPostsData] = useState(posts)
  const [showInviteModal, setShowInviteModal] = useState(false)

  const handleLike = (postId: number) => {
    setPostsData(prev => 
      prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked, 
              likes: post.isLiked ? post.likes - 1 : post.likes + 1 
            }
          : post
      )
    )
  }

  const handleInviteFriends = () => {
    setShowInviteModal(true)
    // Simulate sharing
    if (navigator.share) {
      navigator.share({
        title: 'Junte-se à Comunidade Agape',
        text: 'Venha fazer parte da nossa comunidade de fé!',
        url: window.location.origin + '/comunidade'
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.origin + '/comunidade')
      alert('Link copiado para a área de transferência!')
    }
    setTimeout(() => setShowInviteModal(false), 2000)
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">comunidade_agape</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleInviteFriends}>
              <Share className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto">
        {/* Stories Section */}
        <div className="px-4 py-3 border-b">
          <div className="flex space-x-4 overflow-x-auto no-scrollbar">
            {stories.map((story) => (
              <div key={story.id} className="flex flex-col items-center space-y-1 min-w-[60px]">
                <div className={`p-0.5 rounded-full ${story.hasStory ? 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500' : 'bg-gray-300'}`}>
                  <div className="relative">
                    <Avatar className="h-14 w-14 border-2 border-background">
                      <AvatarImage src={story.image} />
                      <AvatarFallback>{story.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {story.isOwn && (
                      <Plus className="absolute bottom-0 right-0 h-5 w-5 bg-blue-500 text-white rounded-full p-1" />
                    )}
                  </div>
                </div>
                <span className="text-xs text-center">{story.username}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="px-4 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex space-x-8 text-center">
                <div>
                  <div className="font-semibold">{posts.length}</div>
                  <div className="text-sm text-muted-foreground">publicações</div>
                </div>
                <div>
                  <div className="font-semibold">2.5k</div>
                  <div className="text-sm text-muted-foreground">seguidores</div>
                </div>
                <div>
                  <div className="font-semibold">180</div>
                  <div className="text-sm text-muted-foreground">seguindo</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold">Comunidade Agape</h2>
            <p className="text-sm text-muted-foreground">
              ✟ Comunidade de fé e oração
              <br />
              🙏 Compartilhando amor e esperança
              <br />
              📖 Estudos bíblicos e reflexões
            </p>
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1" variant="outline">
              Seguir
            </Button>
            <Button className="flex-1" variant="outline">
              Mensagem
            </Button>
            <Button variant="outline" size="icon" onClick={handleInviteFriends}>
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="px-4 py-3 border-b">
          <div className="flex space-x-4 overflow-x-auto no-scrollbar">
            {highlights.map((highlight) => (
              <div key={highlight.id} className="flex flex-col items-center space-y-1 min-w-[60px]">
                <div className="p-0.5 rounded-full border">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={highlight.image} />
                    <AvatarFallback>{highlight.title[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-xs text-center">{highlight.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-1">
          {postsData.map((post) => (
            <div key={post.id} className="relative aspect-square">
              <Image
                src={post.image}
                alt={`Post ${post.id}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                <div className="flex items-center space-x-4 text-white">
                  <div className="flex items-center space-x-1">
                    <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-5 w-5" />
                    <span>{Math.floor(Math.random() * 20)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleLike(post.id)}
                className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity"
              >
                <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </button>
            </div>
          ))}
        </div>

        {/* Invite Friends Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg mx-4">
              <h3 className="text-lg font-semibold mb-2">Convite Enviado!</h3>
              <p className="text-sm text-muted-foreground">
                Link da comunidade copiado para compartilhar com seus amigos.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
