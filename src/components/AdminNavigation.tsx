
import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  UserCheck, 
  FileText, 
  Brain, 
  CreditCard, 
  BarChart3, 
  Settings,
  Shield,
  AlertTriangle,
  TrendingUp,
  Database,
  Bell,
  FileCheck,
  ShoppingBag,
  Baby,
  BookOpen
} from 'lucide-react';

interface NavigationItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  badge?: number;
  important?: boolean;
}

const navigationItems: NavigationItem[] = [
  { icon: Home, label: 'لوحة المراقبة', href: '/admin' },
  { icon: UserCheck, label: 'مراجعة حسابات المدرسين', href: '/admin/teacher-approval', badge: 8, important: true },
  { icon: Users, label: 'إدارة الطلاب', href: '/admin/students' },
  { icon: FileText, label: 'مراقبة المحتوى', href: '/admin/content-moderation', badge: 3 },
  { icon: FileCheck, label: 'مراجعة الاختبارات', href: '/admin/exam-review', badge: 12 },
  { icon: Brain, label: 'الإشراف على الذكاء الاصطناعي', href: '/admin/ai-supervision' },
  { icon: ShoppingBag, label: 'متجر الأدوات الدراسية', href: '/admin/store' },
  { icon: Baby, label: 'قسم ما قبل المدرسة', href: '/admin/preschool' },
  { icon: BookOpen, label: 'الدورات والأنشطة', href: '/admin/courses' },
  { icon: CreditCard, label: 'إدارة الاشتراكات والخطط', href: '/admin/subscriptions' },
  { icon: BarChart3, label: 'التقارير والتحليلات', href: '/admin/analytics' },
  { icon: AlertTriangle, label: 'البلاغات والشكاوى', href: '/admin/reports', badge: 5, important: true },
  { icon: Bell, label: 'إدارة الإشعارات', href: '/admin/notifications' },
  { icon: Database, label: 'إعدادات النظام', href: '/admin/system-settings' },
  { icon: Settings, label: 'الإعدادات العامة', href: '/admin/settings' },
];

interface AdminNavigationProps {
  currentPath?: string;
  onNavigate?: (page: string) => void;
}

const AdminNavigation = ({ currentPath = '/admin', onNavigate }: AdminNavigationProps) => {
  const getPageFromPath = (href: string) => {
    if (href === '/admin') return 'dashboard';
    return href.split('/').pop() || 'dashboard';
  };

  return (
    <nav className="space-y-2">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-primary mb-4">لوحة الإدارة</h2>
        <div className="bg-gradient-to-r from-primary/10 to-destructive/10 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-destructive rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-medium">المشرف العام</p>
              <p className="text-sm text-muted-foreground">إدارة My Math</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                  مدير النظام
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.href;
        
        return (
          <Button
            key={item.href}
            variant={isActive ? "default" : "ghost"}
            className={cn(
              "w-full justify-start text-right h-12 px-4",
              isActive && "shadow-md",
              item.important && !isActive && "border border-destructive/20 hover:border-destructive/40"
            )}
            asChild
          >
            <div 
              onClick={() => onNavigate?.(getPageFromPath(item.href))}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Icon className={cn(
                    "h-5 w-5",
                    item.important && !isActive && "text-destructive"
                  )} />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={cn(
                    "text-white text-xs rounded-full w-5 h-5 flex items-center justify-center",
                    item.important ? "bg-destructive" : "bg-primary"
                  )}>
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          </Button>
        );
      })}

      {/* Admin Quick Stats */}
      <div className="mt-8 space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">إحصائيات My Math</h3>
        <div className="space-y-2">
          <div className="bg-primary/10 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">إجمالي المدرسين</span>
              <span className="text-xl font-bold text-primary">850</span>
            </div>
          </div>
          <div className="bg-educational/10 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">إجمالي الطلاب</span>
              <span className="text-xl font-bold text-educational">12,500</span>
            </div>
          </div>
          <div className="bg-success/10 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">مبيعات المتجر</span>
              <span className="text-xl font-bold text-success">1,240</span>
            </div>
          </div>
          <div className="bg-destructive/10 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">يحتاج مراجعة</span>
              <span className="text-xl font-bold text-destructive">28</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">حالة النظام</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-success/10 rounded">
            <span className="text-sm">الخوادم</span>
            <div className="w-2 h-2 bg-success rounded-full"></div>
          </div>
          <div className="flex items-center justify-between p-2 bg-success/10 rounded">
            <span className="text-sm">قاعدة البيانات</span>
            <div className="w-2 h-2 bg-success rounded-full"></div>
          </div>
          <div className="flex items-center justify-between p-2 bg-success/10 rounded">
            <span className="text-sm">المساعد الذكي</span>
            <div className="w-2 h-2 bg-success rounded-full"></div>
          </div>
          <div className="flex items-center justify-between p-2 bg-success/10 rounded">
            <span className="text-sm">المتجر الإلكتروني</span>
            <div className="w-2 h-2 bg-success rounded-full"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;
