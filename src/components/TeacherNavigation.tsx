import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { 
  Home, 
  User, 
  Users, 
  Video, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  CreditCard,
  UserPlus,
  Calendar,
  Settings,
  BookOpen,
  Brain,
  Award
} from 'lucide-react';

interface NavigationItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  badge?: number;
}

const navigationItems: NavigationItem[] = [
  { icon: Home, label: 'الرئيسية', href: '/teacher' },
  { icon: User, label: 'ملفي الشخصي', href: '/teacher/profile' },
  { icon: Users, label: 'إدارة المجموعات الدراسية', href: '/teacher/groups' },
  { icon: Video, label: 'المحاضرات المسجلة', href: '/teacher/lectures' },
  { icon: Calendar, label: 'جدول الحصص المباشرة', href: '/teacher/schedule' },
  { icon: Brain, label: 'الاختبارات الذكية (AI)', href: '/teacher/ai-tests', badge: 2 },
  { icon: UserPlus, label: 'دعوة الطلاب', href: '/teacher/invitations' },
  { icon: MessageSquare, label: 'استفسارات الطلاب', href: '/teacher/tickets', badge: 5 },
  { icon: BarChart3, label: 'تقارير الأداء', href: '/teacher/reports' },
  { icon: CreditCard, label: 'الأرباح والمدفوعات', href: '/teacher/earnings' },
  { icon: Settings, label: 'الحسابات الفرعية', href: '/teacher/sub-accounts' },
];

interface TeacherNavigationProps {
  currentPath?: string;
  onNavigate?: (page: string) => void;
}

const TeacherNavigation = ({ currentPath = '/teacher', onNavigate }: TeacherNavigationProps) => {
  const getPageFromPath = (href: string) => {
    if (href === '/teacher') return 'dashboard';
    return href.split('/').pop() || 'dashboard';
  };
  return (
    <nav className="space-y-2">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-primary mb-4">لوحة المدرس</h2>
        <div className="bg-gradient-to-r from-educational/10 to-primary/10 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-educational to-primary rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-medium">د. سارة أحمد</p>
              <p className="text-sm text-muted-foreground">أستاذة الرياضيات</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="text-xs bg-success/20 text-success px-2 py-1 rounded">
                  معتمد
                </div>
                <div className="text-xs text-muted-foreground">
                  142 طالب
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
                  <span className="text-sm">{item.label}</span>
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

      {/* Teacher Stats */}
      <div className="mt-8 space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">إحصائيات هذا الشهر</h3>
        <div className="space-y-2">
          <div className="bg-primary/10 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">إجمالي الطلاب</span>
              <span className="text-xl font-bold text-primary">142</span>
            </div>
          </div>
          <div className="bg-success/10 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">الأرباح</span>
              <span className="text-xl font-bold text-success">12,450 ج.م</span>
            </div>
          </div>
          <div className="bg-educational/10 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">حصص مكتملة</span>
              <span className="text-xl font-bold text-educational">48</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TeacherNavigation;