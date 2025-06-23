import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomeHeader() {
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-background z-40">
      <h1 className="text-3xl font-bold">Início</h1>
      <Button variant="ghost" size="icon">
        <Bell className="h-6 w-6" />
      </Button>
    </div>
  )
}
