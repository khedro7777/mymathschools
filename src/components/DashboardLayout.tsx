import React from 'react';
import { cn } from '@/lib/utils';
import { Sidebar } from './ui/sidebar';
import { Button } from './ui/button';
import { Menu, X, Bell, User, Settings, LogOut, Home } from 'lucide-react';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'student' | 'teacher' | 'admin';
  userName?: string;
  userAvatar?: string;
}

const DashboardLayout = ({ children, userType, userName = 'المستخدم', userAvatar }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background rtl">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Logo and Toggle */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-educational rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-primary">منصة التعلم</h1>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-educational text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Profile */}
            <div className="flex items-center gap-3 bg-muted rounded-lg px-3 py-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">
                  {userType === 'student' && 'طالب'}
                  {userType === 'teacher' && 'مدرس'}
                  {userType === 'admin' && 'مشرف'}
                </p>
              </div>
            </div>

            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 right-0 z-30 w-64 bg-card border-l border-border transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            {/* Navigation will be added here based on user type */}
            <div className="flex-1 px-4 py-6">
              {children}
            </div>
            
            {/* Logout Button */}
            <div className="p-4 border-t border-border">
              <Button variant="ghost" className="w-full justify-start text-right" size="lg">
                <LogOut className="h-5 w-5 ml-3" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:mr-64">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;