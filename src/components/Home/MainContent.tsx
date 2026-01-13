'use client'
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export default function MainContent({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { state } = useSidebar()
  const isExpanded = state === "expanded"
  
  return (
    <main 
      className={cn(
        "relative flex flex-1 flex-col bg-[#0f1535] min-h-screen transition-all duration-200"
      )}
      style={{
        marginLeft: isExpanded ? 'var(--sidebar-width)' : '0',
      }}
    >
      {children}
    </main>
  )
}

