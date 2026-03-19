import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { AiChatWidget } from '@/components/AiChatWidget';
import { Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border bg-surface px-4 shrink-0">
            <SidebarTrigger className="mr-4" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Workplace Resource Management</span>
          </header>
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
        <AiChatWidget />
      </div>
    </SidebarProvider>
  );
}
