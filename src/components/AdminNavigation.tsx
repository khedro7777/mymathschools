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
  BookOpen,
  Gift,
  Star,
  User,
  Award,
  UserPlus,
  CheckCircle,
  ClipboardList
} from 'lucide-react';

interface NavigationItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  badge?: number | string;
  important?: boolean;
}

const navigationItems: NavigationItem[] = [
  { icon: Home, label: 'لوحة المراقبة', href: '/admin' },
  
  // إدارة المدرسين والطلاب - المكونات الجديدة
  { icon: Users, label: 'إدارة المدرسين والطلاب', href: '/admin/teacher-student-management', badge: 'جديد', important: true },
  { icon: CheckCircle, label: 'موافقة طلبات المدرسين', href: '/admin/teacher-approval', badge: 3, important: true },
  { icon: UserPlus, label: 'إضافة مدرس مباشرة', href: '/admin/add-teacher-directly', badge: 'جديد' },
  
  // إدارة المدرسين والطلاب
  { icon: UserCheck, label: 'مراجعة حسابات المدرسين', href: '/admin/teachers', badge: 8 },
  { icon: Users, label: 'إدارة الطلاب', href: '/admin/students' },
  { icon: BookOpen, label: 'إدارة الكورسات (المدرسين)', href: '/admin/courses-management' },
  { icon: Users, label: 'مجموعات الطلاب (المدرسين)', href: '/admin/student-groups' },
  
  // إدارة المدفوعات والتقييمات
  { icon: Gift, label: 'الظرف الأحمر (المدرسين)', href: '/admin/red-envelope' },
  { icon: CreditCard, label: 'مدفوعات الطلبة (المدرسين)', href: '/admin/student-payments', badge: 3 },
  { icon: Star, label: 'التقييمات (المدرسين)', href: '/admin/teacher-reviews' },
  { icon: User, label: 'إعداد بروفايل المدرسين', href: '/admin/teacher-profiles' },
  { icon: ClipboardList, label: 'تحضير الدروس (المدرسين)', href: '/admin/lesson-preparation' },
  
  // إدارة المحتوى والمراقبة
  { icon: FileText, label: 'مراقبة المحتوى', href: '/admin/content', badge: 3 },
  { icon: FileCheck, label: 'مراجعة الاختبارات', href: '/admin/exam-review', badge: 12 },
  { icon: Brain, label: 'الإشراف على الذكاء الاصطناعي', href: '/admin/ai-oversight' },
  
  // إدارة المتجر والخدمات
  { icon: ShoppingBag, label: 'متجر الأدوات الدراسية', href: '/admin/store' },
  { icon: Baby, label: 'قسم ما قبل المدرسة', href: '/admin/preschool' },
  { icon: BookOpen, label: 'الدورات والأنشطة', href: '/admin/courses' },
  
  // إدارة الاشتراكات والتحليلات
  { icon: CreditCard, label: 'إدارة الاشتراكات والخطط', href: '/admin/payments' },
  { icon: BarChart3, label: 'التقارير والتحليلات', href: '/admin/analytics' },
  
  // إدارة البلاغات والإشعارات
  { icon: AlertTriangle, label: 'البلاغات والشكاوى', href: '/admin/reports', badge: 5, important: true },
  { icon: Bell, label: 'إدارة الإشعارات', href: '/admin/notifications' },
  { icon: Bell, label: 'إشعارات المدرسين', href: '/admin/teacher-notifications', badge: 5 },
  
  // إعدادات النظام
  { icon: Database, label: 'إعدادات النظام', href: '/admin/settings' },
  { icon: Settings, label: 'إعدادات حسابات المدرسين', href: '/admin/teacher-account-settings' },
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
        <h2 className="text-lg font-semibold text-primary mb-4">لوحة الإدارة الشاملة</h2>
        <div className="bg-gradient-to-r from-primary/10 to-destructive/10 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-destructive rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-medium">المشرف العام</p>
              <p className="text-sm text-muted-foreground">إدارة My Math الشاملة</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                  مدير النظام والمدرسين
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
                    "text-white text-xs rounded-full px-2 py-1 flex items-center justify-center min-w-5 h-5",
                    item.badge === 'جديد' ? "bg-success" : item.important ? "bg-destructive" : "bg-primary"
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
        <h3 className="text-sm font-medium text-muted-foreground">إحصائيات My Math الشاملة</h3>
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
          <div className="bg-warning/10 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">أرباح المدرسين</span>
              <span className="text-xl font-bold text-warning">245,000 ج.م</span>
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
          <div className="flex items-center justify-between p-2 bg-success/10 rounded">
            <span className="text-sm">نظام المدرسين</span>
            <div className="w-2 h-2 bg-success rounded-full"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;

