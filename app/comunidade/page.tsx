import CommunityHeader from "@/components/comunidade/community-header"
import QuickActionsSection from "@/components/comunidade/quick-actions-section"
import GettingStartedSection from "@/components/comunidade/getting-started-section"
import ChurchLaunchCard from "@/components/comunidade/church-launch-card"
import ConnectIllustration from "@/components/comunidade/connect-illustration"
import ConnectFriendsSection from "@/components/comunidade/connect-friends-section"

export default function CommunityPage() {
  const quickActions = [
    { id: "new-intention", label: "Nova Intenção", iconType: "plus", link: "/comunidade/nova-intencao" },
    {
      id: "hallow-feed",
      label: "Hallow",
      iconType: "hallowLogo",
      iconUrl: "/placeholder.svg?width=40&height=40",
      link: "/comunidade/hallow",
    },
    {
      id: "my-intentions",
      label: "Suas Intenções",
      subLabel: "Eu",
      iconType: "userAvatar",
      iconUrl: "/placeholder.svg?width=40&height=40",
      link: "/comunidade/minhas-intencoes",
    },
  ]

  const gettingStartedItems = [
    {
      id: "complete-profile",
      title: "Complete Seu Perfil",
      imageUrl: "/placeholder.svg?width=150&height=150",
      backgroundColor: "bg-purple-100 dark:bg-purple-900/30",
      isCompleted: true,
      link: "/perfil/editar",
    },
    {
      id: "find-friends",
      title: "Find & Add Friends",
      imageUrl: "/placeholder.svg?width=150&height=150",
      backgroundColor: "bg-blue-200 dark:bg-blue-900/30",
      isCompleted: false,
      link: "/comunidade/adicionar-amigos",
    },
    // {
    //   id: 'create-group',
    //   title: 'Create a Group',
    //   imageUrl: '/placeholder.svg?width=150&height=150',
    //   backgroundColor: 'bg-green-100 dark:bg-green-900/30',
    //   isCompleted: false,
    //   link: '/comunidade/criar-grupo'
    // }
  ]

  const churchLaunchData = {
    imageUrl: "/images/comunidade/st-ann-card-image.jpeg", // Usando a imagem fornecida
    title: "St. Ann está pronta para ser lançada com o Hallow",
    subtitle: "Dê o Próximo Passo Para Inspirar Sua Comunidade",
    buttonText: "Lançar Minha Igreja",
    waitingListCount: 27,
    link: "/comunidade/lancar-igreja/st-ann",
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <CommunityHeader
        currentView="Amigos"
        onViewChange={(view) => console.log("View changed to:", view)}
        onSearch={() => console.log("Search clicked")}
        onGroupsClick={() => console.log("Groups clicked")}
      />
      <main className="flex-grow overflow-y-auto pb-20">
        <QuickActionsSection items={quickActions} />
        <GettingStartedSection items={gettingStartedItems} completedCount={1} totalCount={2} />
        <div className="px-4 py-6">
          <ChurchLaunchCard {...churchLaunchData} />
        </div>
        <ConnectIllustration />
        <ConnectFriendsSection
          title="Conecte-se com Amigos"
          subtitle="Explore reflexões compartilhadas e atualizações de orações com seus amigos"
          buttonText="Adicionar Amigos"
          onButtonClick={() => console.log("Adicionar amigos clicado")}
        />
      </main>
    </div>
  )
}
