import React, { useState } from 'react';
import StudentNavigation from '../components/StudentNavigation';
import AIAssistant from '../components/AIAssistant';
import MobileSidebar from '../components/ui/mobile-sidebar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Calculator, 
  BookOpen, 
  TrendingUp, 
  Award, 
  FileText, 
  MessageSquare, 
  Activity, 
  User, 
  Settings, 
  LogOut, 
  Home,
  GraduationCap,
  ShoppingBag,
  ListChecks,
  Calendar,
  Presentation,
  LayoutDashboard,
  LayoutList,
  ListOrdered,
  LucideIcon
} from 'lucide-react';
import StudentCourses from '../components/student/StudentCourses';
import StudentStore from '../components/student/StudentStore';
import StudentWallet from '../components/student/StudentWallet';
import StudentSchedules from '../components/student/StudentSchedules';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

const StudentDashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'courses':
        return <StudentCourses />;
      case 'assignments':
        return <div className="p-6"><h1 className="text-2xl font-bold">الواجبات</h1></div>;
      case 'exams':
        return <div className="p-6"><h1 className="text-2xl font-bold">الاختبارات</h1></div>;
      case 'grades':
        return <div className="p-6"><h1 className="text-2xl font-bold">التقديرات</h1></div>;
      case 'messages':
        return <div className="p-6"><h1 className="text-2xl font-bold">الرسائل</h1></div>;
      case 'store':
        return <StudentStore />;
      case 'wallet':
        return <StudentWallet />;
      case 'schedules':
        return <StudentSchedules />;
      case 'settings':
        return <div className="p-6"><h1 className="text-2xl font-bold">الإعدادات</h1></div>;
      default:
        return <StudentDashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-background rtl">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-educational rounded-xl flex items-center justify-center">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-primary">أكاديمية Mymath - لوحة الطالب</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
              العودة للرئيسية
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentPage('store')}
            >
              <ShoppingBag className="h-4 w-4 ml-2" />
              المتجر
            </Button>
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium">أحمد محمد</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile-Responsive Sidebar */}
        <MobileSidebar>
          <StudentNavigation 
            currentPath={`/student/${currentPage === 'dashboard' ? '' : currentPage}`}
            onNavigate={(page) => setCurrentPage(page)}
          />
        </MobileSidebar>

        {/* Main Content */}
        <main className="flex-1 p-6 md:pr-6 pr-4">
          {renderContent()}
          
          {/* AI Assistant for Student */}
          <div className="mt-8">
            <AIAssistant position="inline" context="student" />
          </div>
        </main>
      </div>

      {/* Fixed AI Assistant */}
      <AIAssistant position="fixed" context="student" />
    </div>
  );
};

const StudentDashboardHome = () => {
  const dashboardCards: DashboardCardProps[] = [
    {
      title: "الدروس المتاحة",
      value: "12",
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      title: "الواجبات المعلقة",
      value: "3",
      icon: ListChecks,
      color: "text-orange-500",
    },
    {
      title: "الاختبارات القادمة",
      value: "1",
      icon: Calendar,
      color: "text-green-500",
    },
    {
      title: "متوسط التقييم",
      value: "92%",
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardCards.map((card, index) => (
          <Card key={index} className="card-educational p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-2xl font-bold ${card.color}`}>
                  {card.value}
                </div>
                <div className="text-sm text-muted-foreground">{card.title}</div>
              </div>
              <card.icon className={`h-8 w-8 ${card.color}`} />
            </div>
          </Card>
        ))}
      </div>

      <Card className="card-educational p-6">
        <h2 className="text-xl font-semibold mb-4">الدروس الأخيرة</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="text-lg font-medium">الجبر المتقدم</h3>
              <p className="text-sm text-muted-foreground">
                المعادلات الخطية والمتغيرات
              </p>
            </div>
            <Badge variant="outline">مكتمل</Badge>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="text-lg font-medium">حساب التفاضل والتكامل</h3>
              <p className="text-sm text-muted-foreground">
                المشتقات والتكاملات
              </p>
            </div>
            <Badge variant="secondary">قيد الدراسة</Badge>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="text-lg font-medium">الهندسة التحليلية</h3>
              <p className="text-sm text-muted-foreground">
                الخطوط والمنحنيات والمساحات
              </p>
            </div>
            <Badge variant="secondary">قيد الدراسة</Badge>
          </div>
        </div>
      </Card>
    </>
  );
};

export default StudentDashboard;
