import React, { useState } from 'react';
import TeacherNavigation from '../components/TeacherNavigation';
import AIAssistant from '../components/AIAssistant';
import MobileSidebar from '../components/ui/mobile-sidebar';

// Import all teacher components
import TeacherHome from '../components/teacher/TeacherHome';
import CoursesManagement from '../components/teacher/CoursesManagement';
import StudentGroups from '../components/teacher/StudentGroups';
import RedEnvelope from '../components/teacher/RedEnvelope';

// Import UI components
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  BookOpen,
  Video,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Calculator,
  Brain,
  Award,
  UserPlus
} from 'lucide-react';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <TeacherHome />;
      case 'courses':
        return <CoursesManagement />;
      case 'students':
        return <StudentGroups />;
      case 'envelope':
        return <RedEnvelope />;
      case 'payments':
        return <StudentPaymentsPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'store':
        return <TeacherStorePage />;
      case 'profile':
        return <ProfileSetupPage />;
      case 'lessons':
        return <LessonPreparationPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'settings':
        return <AccountSettingsPage />;
      default:
        return <TeacherHome />;
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
            <h1 className="text-xl font-bold text-primary">أكاديمية Mymath - لوحة المدرس</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
              العودة للرئيسية
            </Button>
            <Button variant="educational" size="sm">
              <Brain className="h-4 w-4 ml-2" />
              المساعد الذكي
            </Button>
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
              <div className="w-8 h-8 bg-educational rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium">د. سارة أحمد</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile-Responsive Sidebar */}
        <MobileSidebar>
          <TeacherNavigation 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </MobileSidebar>

        {/* Main Content */}
        <main className="flex-1 p-6 md:pr-6 pr-4">
          {renderContent()}
          
          {/* AI Assistant for Teacher */}
          <div className="mt-8">
            <AIAssistant position="inline" context="teacher" />
          </div>
        </main>
      </div>

      {/* Fixed AI Assistant */}
      <AIAssistant position="fixed" context="teacher" />
    </div>
  );
};

// Placeholder components for remaining tabs
const StudentPaymentsPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">مدفوعات الطلبة</h1>
    <Card className="p-6">
      <p className="text-muted-foreground">صفحة مدفوعات الطلبة - قيد التطوير</p>
    </Card>
  </div>
);

const ReviewsPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">التقييمات</h1>
    <Card className="p-6">
      <p className="text-muted-foreground">صفحة التقييمات - قيد التطوير</p>
    </Card>
  </div>
);

const TeacherStorePage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">المتجر</h1>
    <Card className="p-6">
      <p className="text-muted-foreground">صفحة المتجر - قيد التطوير</p>
    </Card>
  </div>
);

const ProfileSetupPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">إعداد البروفايل</h1>
    <Card className="p-6">
      <p className="text-muted-foreground">صفحة إعداد البروفايل - قيد التطوير</p>
    </Card>
  </div>
);

const LessonPreparationPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">تحضير الدروس</h1>
    <Card className="p-6">
      <p className="text-muted-foreground">صفحة تحضير الدروس - قيد التطوير</p>
    </Card>
  </div>
);

const NotificationsPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">الإشعارات</h1>
    <Card className="p-6">
      <p className="text-muted-foreground">صفحة الإشعارات - قيد التطوير</p>
    </Card>
  </div>
);

const AccountSettingsPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">إعدادات الحساب</h1>
    <Card className="p-6">
      <p className="text-muted-foreground">صفحة إعدادات الحساب - قيد التطوير</p>
    </Card>
  </div>
);

export default TeacherDashboard;

