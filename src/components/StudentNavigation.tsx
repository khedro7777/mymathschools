import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  FileText, 
  MessageSquare, 
  User, 
  CreditCard,
  Clock,
  Trophy,
  GraduationCap,
  ShoppingBag,
  Wallet
} from 'lucide-react';

interface NavigationItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  badge?: number;
}

const navigationItems: NavigationItem[] = [
  { icon: Home, label: 'الرئيسية', href: '/student' },
  { icon: BookOpen, label: 'كورساتي', href: '/student/courses', badge: 3 },
  { icon: Calendar, label: 'جدول الحصص', href: '/student/schedule' },
  { icon: FileText, label: 'الاختبارات', href: '/student/exams', badge: 2 },
  { icon: Trophy, label: 'النتائج والدرجات', href: '/student/results' },
  { icon: MessageSquare, label: 'التذاكر والاستفسارات', href: '/student/tickets', badge: 1 },
  { icon: GraduationCap, label: 'التقدم الأكاديمي', href: '/student/progress' },
  { icon: User, label: 'الملف الشخصي', href: '/student/profile' },
  { icon: CreditCard, label: 'المدفوعات والاشتراكات', href: '/student/payments' },
];

const additionalItems: NavigationItem[] = [
  { icon: ShoppingBag, label: 'المتجر', href: '/student/store' },
  { icon: Wallet, label: 'محفظتي', href: '/student/wallet', badge: 180 },
];

const allNavigationItems = [...navigationItems, ...additionalItems];

interface StudentNavigationProps {
  currentPath?: string;
  onNavigate?: (page: string) => void;
}

const StudentNavigation = ({ currentPath = '/student', onNavigate }: StudentNavigationProps) => {
  const getPageFromPath = (href: string) => {
    if (href === '/student') return 'dashboard';
    return href.split('/').pop() || 'dashboard';
  };
  return (
    <nav className="space-y-2">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-primary mb-4">لوحة الطالب</h2>
        <div className="bg-gradient-to-r from-primary/10 to-educational/10 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-educational rounded-full flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-medium">أحمد محمد</p>
              <p className="text-sm text-muted-foreground">الصف الثالث الثانوي</p>
            </div>
          </div>
        </div>
      </div>

      {allNavigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.href;
        
        return (
          <Button
            key={item.href}
            variant={isActive ? "educational" : "ghost"}
            className={cn(
              "w-full justify-start text-right h-12 px-4",
              isActive && "shadow-md"
            )}
            asChild
          >
            <div 
              onClick={() => onNavigate?.(getPageFromPath(item.href))}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-educational text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          </Button>
        );
      })}

      {/* Quick Stats */}
      <div className="mt-8 space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">إحصائيات سريعة</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-success/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-success">87%</div>
            <div className="text-xs text-muted-foreground">نسبة الحضور</div>
          </div>
          <div className="bg-educational/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-educational">24</div>
            <div className="text-xs text-muted-foreground">دروس مكتملة</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavigation;
