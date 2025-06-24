"use client"

import { Button } from "@/components/ui/button"

interface ConnectFriendsSectionProps {
  title: string
  subtitle: string
  buttonText: string
  onButtonClick: () => void
}

export default function ConnectFriendsSection({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}: ConnectFriendsSectionProps) {
  return (
    <section className="px-4 py-6 text-center">
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{subtitle}</p>
      <Button
        onClick={onButtonClick}
        className="w-full max-w-xs mx-auto bg-foreground text-background hover:bg-foreground/90 py-3 text-base"
      >
        {buttonText}
      </Button>
    </section>
  )
}
