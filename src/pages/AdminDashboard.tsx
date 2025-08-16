import React, { useState } from 'react';
import AdminNavigation from '../components/AdminNavigation';
import StoreManagement from '../components/StoreManagement';
import PreschoolSection from '../components/PreschoolSection';
import AIAssistant from '../components/AIAssistant';
import MobileSidebar from '../components/ui/mobile-sidebar';

// Import teacher components for admin management
import TeacherHome from '../components/teacher/TeacherHome';
import CoursesManagement from '../components/teacher/CoursesManagement';
import StudentGroups from '../components/teacher/StudentGroups';
import RedEnvelope from '../components/teacher/RedEnvelope';
import StudentPayments from '../components/teacher/StudentPayments';
import Reviews from '../components/teacher/Reviews';
import TeacherStore from '../components/teacher/TeacherStore';
import ProfileSetup from '../components/teacher/ProfileSetup';
import LessonPreparation from '../components/teacher/LessonPreparation';
import TeacherNotifications from '../components/teacher/TeacherNotifications';
import AccountSettings from '../components/teacher/AccountSettings';

// Import new admin components
import TeacherStudentManagement from '../components/admin/TeacherStudentManagement';
import TeacherApproval from '../components/admin/TeacherApproval';
import AddTeacherDirectly from '../components/admin/AddTeacherDirectly';
import PaymentApproval from '../components/admin/PaymentApproval';

import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign, 
  Brain,
  Shield,
  Activity,
  UserCheck,
  FileText,
  BarChart3,
  Calendar,
  Globe,
  Server,
  Database,
  Zap,
  Eye,
  Settings,
  ArrowUp,
  ArrowDown,
  Calculator,
  ShoppingBag,
  Baby,
  BookOpen,
  Award
} from 'lucide-react';

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderContent = () => {
    switch (currentPage) {
      // إدارة المدرسين والطلاب - المكونات الجديدة
      case 'teacher-student-management':
        return <TeacherStudentManagement />;
      case 'teacher-approval':
        return <TeacherApproval />;
      case 'add-teacher-directly':
        return <AddTeacherDirectly />;
      case 'payment-approval':
        return <PaymentApproval />;
      
      // إدارة المدرسين والطلاب
      case 'teachers':
        return <div className="p-6"><h1 className="text-2xl font-bold">إدارة المدرسين</h1></div>;
      case 'students':
        return <div className="p-6"><h1 className="text-2xl font-bold">إدارة الطلاب</h1></div>;
      
      // وظائف المدرسين المنقولة للإدارة
      case 'courses-management':
        return (
          <div className="p-6">
            <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h2 className="text-lg font-semibold text-primary mb-2">إدارة كورسات المدرسين</h2>
              <p className="text-sm text-muted-foreground">يمكن للإدارة الآن مراقبة وإدارة جميع كورسات المدرسين</p>
            </div>
            <CoursesManagement />
          </div>
        );
      case 'student-groups':
        return (
          <div className="p-6">
            <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h2 className="text-lg font-semibold text-primary mb-2">إدارة مجموعات الطلاب</h2>
              <p className="text-sm text-muted-foreground">مراقبة وإدارة جميع مجموعات الطلاب عبر المنصة</p>
            </div>
            <StudentGroups />
          </div>
        );
      case 'red-envelope':
        return (
          <div className="p-6">
            <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h2 className="text-lg font-semibold text-primary mb-2">إدارة الظرف الأحمر</h2>
              <p className="text-sm text-muted-foreground">مراقبة وإدارة نظام الظرف الأحمر للمدرسين</p>
            </div>
            <RedEnvelope />
          </div>
        );
      case 'student-payments':
        return (
          <div className="p-6">
            <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h2 className="text-lg font-semibold text-primary mb-2">إدارة مدفوعات الطلبة</h2>
              <p className="text-sm text-muted-foreground">مراقبة وإدارة جميع مدفوعات الطلبة للمدرسين</p>
            </div>
            <StudentPayments />
          </div>
        );
      case 'teacher-reviews':
        return (
          <div className="p-6">
            <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h2 className="text-lg font-semibold text-primary mb-2">إدارة تقييمات المدرسين</h2>
              <p className="text-sm text-muted-foreground">مراقبة وإدارة جميع تقييمات المدرسين</p>
            </div>
            <Reviews />
          </div>
        );
      case 'teacher-profiles':
        return (
          <div className="p-6">
            <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h2 className="text-lg font-semibold text-primary mb-2">إدارة بروفايلات المدرسين</h2>
              <p className="text-sm text-muted-foreground">مراقبة وإدارة بروفايلات جميع المدرسين</p>
            </div>
            <ProfileSetup />
          </div>
        );
      case 'lesson-preparation':
        return (
          <div className="p-6">
            <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h2 className="text-lg font-semibold text-primary mb-2">إدارة تحضير الدروس</h2>
              <p className="text-sm text-muted-foreground">مراقبة وإدارة تحضير دروس المدرسين</p>
            </div>
            <LessonPreparation />
          </div>
        );
      case 'teacher-notifications':
        return (
          <div className="p-6">
            <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h2 className="text-lg font-semibold text-primary mb-2">إدارة إشعارات المدرسين</h2>
              <p className="text-sm text-muted-foreground">مراقبة وإدارة إشعارات جميع المدرسين</p>
            </div>
            <TeacherNotifications />
          </div>
        );
      case 'teacher-account-settings':
        return (
          <div className="p-6">
            <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h2 className="text-lg font-semibold text-primary mb-2">إدارة إعدادات حسابات المدرسين</h2>
              <p className="text-sm text-muted-foreground">مراقبة وإدارة إعدادات حسابات جميع المدرسين</p>
            </div>
            <AccountSettings />
          </div>
        );

      // الوظائف الأصلية للإدارة
      case 'content':
        return <div className="p-6"><h1 className="text-2xl font-bold">مراقبة المحتوى</h1></div>;
      case 'ai-oversight':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">إشراف AI</h1>
            <AIAssistant position="inline" context="admin" />
          </div>
        );
      case 'payments':
        return <div className="p-6"><h1 className="text-2xl font-bold">إدارة المدفوعات</h1></div>;
      case 'analytics':
        return <div className="p-6"><h1 className="text-2xl font-bold">التقارير والتحليلات</h1></div>;
      case 'settings':
        return <div className="p-6"><h1 className="text-2xl font-bold">إعدادات النظام</h1></div>;
      case 'store':
        return <StoreManagement />;
      case 'preschool':
        return <PreschoolSection />;
      case 'courses':
        return <div className="p-6"><h1 className="text-2xl font-bold">الدورات والأنشطة</h1></div>;
      default:
        return <AdminDashboardHome />;
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
            <h1 className="text-xl font-bold text-primary">أكاديمية Mymath - لوحة الإدارة الشاملة</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
              العودة للرئيسية
            </Button>
            <Button variant="outline" size="sm">
              <Activity className="h-4 w-4 ml-2" />
              مراقبة مباشرة
            </Button>
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium">المشرف العام</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile-Responsive Sidebar */}
        <MobileSidebar>
          <AdminNavigation 
            currentPath={`/admin/${currentPage === 'dashboard' ? '' : currentPage}`}
            onNavigate={(page) => setCurrentPage(page)}
          />
        </MobileSidebar>

        {/* Main Content */}
        <main className="flex-1 p-6 md:pr-6 pr-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const AdminDashboardHome = () => (
  <>
    {/* System Status Alert */}
    <div className="mb-6">
      <div className="bg-gradient-to-r from-success/10 to-primary/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-6 w-6 text-success" />
          <div>
            <p className="font-medium text-success">My Math يعمل بشكل مثالي</p>
            <p className="text-sm text-muted-foreground">آخر فحص: منذ دقيقتين - جميع الخدمات متاحة (بما في ذلك نظام المدرسين)</p>
          </div>
          <Button variant="outline" size="sm" className="mr-auto">
            <Eye className="h-4 w-4 ml-2" />
            مراقبة مفصلة
          </Button>
        </div>
      </div>
    </div>

    {/* Key Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="card-educational p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-primary">850</div>
            <div className="text-sm text-muted-foreground">مدرسو رياضيات</div>
            <div className="flex items-center gap-1 text-xs text-success">
              <ArrowUp className="h-3 w-3" />
              +25 هذا الشهر
            </div>
          </div>
          <UserCheck className="h-8 w-8 text-primary" />
        </div>
      </Card>

      <Card className="card-educational p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-educational">12,500</div>
            <div className="text-sm text-muted-foreground">طالب نشط</div>
            <div className="flex items-center gap-1 text-xs text-success">
              <ArrowUp className="h-3 w-3" />
              +180 هذا الشهر
            </div>
          </div>
          <Users className="h-8 w-8 text-educational" />
        </div>
      </Card>

      <Card className="card-educational p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-success">2.8M</div>
            <div className="text-sm text-muted-foreground">الإيرادات (ج.م)</div>
            <div className="flex items-center gap-1 text-xs text-success">
              <ArrowUp className="h-3 w-3" />
              +15% هذا الشهر
            </div>
          </div>
          <DollarSign className="h-8 w-8 text-success" />
        </div>
      </Card>

      <Card className="card-educational p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-warning">245K</div>
            <div className="text-sm text-muted-foreground">أرباح المدرسين (ج.م)</div>
            <div className="flex items-center gap-1 text-xs text-success">
              <ArrowUp className="h-3 w-3" />
              +12% هذا الشهر
            </div>
          </div>
          <Award className="h-8 w-8 text-warning" />
        </div>
      </Card>
    </div>

    {/* Quick Access Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="card-educational p-6 hover:scale-105 transition-transform cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-educational to-success rounded-xl flex items-center justify-center">
            <ShoppingBag className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">متجر الأدوات</h3>
            <p className="text-sm text-muted-foreground">90 منتج • 1,240 طلب</p>
            <Badge variant="outline" className="mt-2">إدارة المتجر</Badge>
          </div>
        </div>
      </Card>

      <Card className="card-educational p-6 hover:scale-105 transition-transform cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
            <Baby className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">ما قبل المدرسة</h3>
            <p className="text-sm text-muted-foreground">450 طفل • 15 نشاط</p>
            <Badge variant="outline" className="mt-2">الأطفال 3-5 سنوات</Badge>
          </div>
        </div>
      </Card>

      <Card className="card-educational p-6 hover:scale-105 transition-transform cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-educational rounded-xl flex items-center justify-center">
            <Award className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">إدارة المدرسين</h3>
            <p className="text-sm text-muted-foreground">850 مدرس • 2,800 كورس</p>
            <Badge variant="outline" className="mt-2">إدارة شاملة</Badge>
          </div>
        </div>
      </Card>
    </div>

    {/* Recent Activity */}
    <Card className="card-educational p-6">
      <h3 className="text-xl font-semibold mb-4">النشاط الأخير</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="font-medium">تم قبول مدرس جديد</p>
              <p className="text-sm text-muted-foreground">د. أحمد محمود - تخصص الجبر</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">منذ 5 دقائق</span>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-educational/20 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-educational" />
            </div>
            <div>
              <p className="font-medium">طلب جديد في المتجر</p>
              <p className="text-sm text-muted-foreground">آلة حاسبة علمية - 85 ج.م</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">منذ 12 دقيقة</span>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">مدرس جديد أنشأ كورس</p>
              <p className="text-sm text-muted-foreground">د. سارة أحمد - كورس الجبر المتقدم</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">منذ 30 دقيقة</span>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="font-medium">دفعة جديدة للمدرس</p>
              <p className="text-sm text-muted-foreground">د. محمد علي - 1,250 ج.م</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">منذ ساعة</span>
        </div>
      </div>
    </Card>
  </>
);

export default AdminDashboard;

