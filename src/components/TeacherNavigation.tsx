import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { 
  Home, 
  BookOpen, 
  Users, 
  Gift, 
  CreditCard, 
  Star, 
  ShoppingBag, 
  User,
  FileText,
  Bell,
  Settings,
  Award
} from 'lucide-react';

interface NavigationItem {
  icon: React.ComponentType<any>;
  label: string;
  id: string;
  badge?: number;
}

const navigationItems: NavigationItem[] = [
  { icon: Home, label: '🏠 الرئيسية', id: 'home' },
  { icon: BookOpen, label: '🎓 إدارة الكورسات', id: 'courses' },
  { icon: Users, label: '👨‍👧 مجموعات طلابي', id: 'student-groups' },
  { icon: Gift, label: '🎁 الظرف الأحمر', id: 'envelope' },
  { icon: Star, label: '⭐ التقييمات', id: 'reviews' },
  { icon: ShoppingBag, label: '🛍️ المتجر', id: 'store' },
  { icon: User, label: '📄 إعداد البروفايل', id: 'profile' },
  { icon: FileText, label: '📒 تحضير الدروس', id: 'lessons' },
  { icon: Bell, label: '🔔 الإشعارات', id: 'notifications', badge: 5 },
  { icon: Settings, label: '⚙️ إعدادات الحساب', id: 'settings' },
];

interface TeacherNavigationProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const TeacherNavigation = ({ activeTab = 'home', setActiveTab }: TeacherNavigationProps) => {
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
        const isActive = activeTab === item.id;
        
        return (
          <Button
            key={item.id}
            variant={isActive ? "educational" : "ghost"}
            className={cn(
              "w-full justify-start text-right h-12 px-4",
              isActive && "shadow-md"
            )}
            onClick={() => setActiveTab?.(item.id)}
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