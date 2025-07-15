import React, { useState } from 'react';
import TeacherNavigation from '../components/TeacherNavigation';
import AIAssistant from '../components/AIAssistant';
import MobileSidebar from '../components/ui/mobile-sidebar';
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
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'profile':
        return <TeacherProfilePage />;
      case 'groups':
        return <GroupsManagementPage />;
      case 'lectures':
        return <LecturesPage />;
      case 'schedule':
        return <TeacherSchedulePage />;
      case 'ai-tests':
        return <AITestsPage />;
      case 'invitations':
        return <InvitationsPage />;
      case 'tickets':
        return <TeacherTicketsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'earnings':
        return <EarningsPage />;
      case 'sub-accounts':
        return <SubAccountsPage />;
      default:
        return <TeacherDashboardHome />;
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
            currentPath={`/teacher/${currentPage === 'dashboard' ? '' : currentPage}`}
            onNavigate={(page) => setCurrentPage(page)}
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

// Teacher Dashboard Home Component
const TeacherDashboardHome = () => (
  <>
    {/* Welcome Section */}
    <div className="mb-8">
      <div className="bg-gradient-to-r from-educational to-primary rounded-xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">أهلاً د. سارة أحمد!</h2>
            <p className="text-educational-foreground/80 mb-4">
              لديك 3 حصص اليوم و 5 استفسارات جديدة من الطلاب
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Video className="h-4 w-4 ml-2" />
                بدء حصة مباشرة
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Brain className="h-4 w-4 ml-2" />
                إنشاء اختبار ذكي
              </Button>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">142</div>
            <div className="text-sm text-educational-foreground/80">إجمالي الطلاب</div>
          </div>
        </div>
      </div>
    </div>

    {/* Quick Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="card-educational p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-primary">142</div>
            <div className="text-sm text-muted-foreground">إجمالي الطلاب</div>
            <div className="text-xs text-success">+12 هذا الشهر</div>
          </div>
          <Users className="h-8 w-8 text-primary" />
        </div>
      </Card>

      <Card className="card-educational p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-success">12,450</div>
            <div className="text-sm text-muted-foreground">الأرباح (ج.م)</div>
            <div className="text-xs text-success">+8% عن الشهر الماضي</div>
          </div>
          <DollarSign className="h-8 w-8 text-success" />
        </div>
      </Card>

      <Card className="card-educational p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-educational">48</div>
            <div className="text-sm text-muted-foreground">حصص مكتملة</div>
            <div className="text-xs text-educational">هذا الشهر</div>
          </div>
          <BookOpen className="h-8 w-8 text-educational" />
        </div>
      </Card>

      <Card className="card-educational p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-warning">5</div>
            <div className="text-sm text-muted-foreground">استفسارات جديدة</div>
            <div className="text-xs text-warning">تحتاج رد</div>
          </div>
          <MessageSquare className="h-8 w-8 text-warning" />
        </div>
      </Card>
    </div>

    {/* AI Suggestions and System Status */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="card-educational p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">اقتراحات ذكية</h3>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <p className="text-sm font-medium text-primary">تحسين التفاعل</p>
            </div>
            <p className="text-xs text-muted-foreground">أضف استطلاعات سريعة أثناء الحصص لزيادة التفاعل</p>
          </div>
          
          <div className="p-3 bg-educational/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-educational rounded-full"></div>
              <p className="text-sm font-medium text-educational">اختبارات تكيفية</p>
            </div>
            <p className="text-xs text-muted-foreground">استخدم الذكاء الاصطناعي لإنشاء اختبارات مخصصة</p>
          </div>
          
          <div className="p-3 bg-success/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <p className="text-sm font-medium text-success">وقت مثالي</p>
            </div>
            <p className="text-xs text-muted-foreground">أفضل وقت لحصصك: 10 ص - 12 م</p>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-4">
          <Brain className="h-4 w-4 ml-2" />
          المزيد من الاقتراحات
        </Button>
      </Card>
    </div>
  </>
);

// Teacher Profile Page Component
const TeacherProfilePage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">ملفي الشخصي</h1>
    
    <Card className="p-6">
      <div className="flex items-center gap-6 mb-6">
        <div className="w-24 h-24 bg-gradient-to-r from-educational to-primary rounded-full flex items-center justify-center">
          <span className="text-2xl text-white font-bold">س</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold">د. سارة أحمد</h2>
          <p className="text-muted-foreground">أستاذة الرياضيات</p>
          <Badge variant="default" className="mt-2">معتمد</Badge>
        </div>
      </div>

      <Tabs defaultValue="basic">
        <TabsList>
          <TabsTrigger value="basic">البيانات الأساسية</TabsTrigger>
          <TabsTrigger value="qualifications">المؤهلات</TabsTrigger>
          <TabsTrigger value="subjects">المواد التدريسية</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">الاسم الكامل</label>
                <Input defaultValue="د. سارة أحمد محمود" />
              </div>
              <div>
                <label className="text-sm font-medium">البريد الإلكتروني</label>
                <Input defaultValue="sara.ahmed@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium">رقم الهاتف</label>
                <Input defaultValue="01234567890" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">التخصص</label>
                <Input defaultValue="الرياضيات" />
              </div>
              <div>
                <label className="text-sm font-medium">سنوات الخبرة</label>
                <Input defaultValue="12 سنة" />
              </div>
              <div>
                <label className="text-sm font-medium">المحافظة</label>
                <Input defaultValue="القاهرة" />
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">نبذة تعريفية</label>
            <Textarea 
              defaultValue="أستاذة الرياضيات بخبرة 12 سنة في التدريس. حاصلة على دكتوراه في الرياضيات التطبيقية من جامعة القاهرة."
              rows={4}
            />
          </div>
        </TabsContent>

        <TabsContent value="qualifications">
          <div className="space-y-4">
            <Button variant="outline">
              إضافة مؤهل جديد
            </Button>
            <div className="space-y-3">
              <Card className="p-4">
                <h3 className="font-semibold">دكتوراه الرياضيات التطبيقية</h3>
                <p className="text-sm text-muted-foreground">جامعة القاهرة - 2015</p>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold">ماجستير الرياضيات</h3>
                <p className="text-sm text-muted-foreground">جامعة القاهرة - 2012</p>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  </div>
);

// Groups Management Page Component
const GroupsManagementPage = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">إدارة المجموعات الدراسية</h1>
      <Button variant="educational">
        <Users className="h-4 w-4 ml-2" />
        إنشاء مجموعة جديدة
      </Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">الصف الثالث الثانوي - أ</h3>
            <p className="text-sm text-muted-foreground">الرياضيات</p>
          </div>
          <Badge variant="default">نشط</Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm">عدد الطلاب</span>
            <span className="font-semibold">23</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">الحصص الأسبوعية</span>
            <span className="font-semibold">3</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">نسبة الحضور</span>
            <span className="font-semibold text-success">95%</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Button className="w-full" variant="outline">
            إدارة الطلاب
          </Button>
          <Button className="w-full" variant="educational">
            بدء حصة مباشرة
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">الصف الثالث الثانوي - ب</h3>
            <p className="text-sm text-muted-foreground">الرياضيات</p>
          </div>
          <Badge variant="default">نشط</Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm">عدد الطلاب</span>
            <span className="font-semibold">31</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">الحصص الأسبوعية</span>
            <span className="font-semibold">3</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">نسبة الحضور</span>
            <span className="font-semibold text-warning">87%</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Button className="w-full" variant="outline">
            إدارة الطلاب
          </Button>
          <Button className="w-full" variant="educational">
            بدء حصة مباشرة
          </Button>
        </div>
      </Card>
    </div>
  </div>
);

// Add more page components here...
const LecturesPage = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">المحاضرات المسجلة</h1>
      <Button variant="educational">
        <Video className="h-4 w-4 ml-2" />
        رفع محاضرة جديدة
      </Button>
    </div>

    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">جميع المحاضرات</TabsTrigger>
        <TabsTrigger value="published">منشورة</TabsTrigger>
        <TabsTrigger value="draft">مسودات</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="aspect-video bg-primary/10 rounded-lg mb-3 flex items-center justify-center">
              <Video className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">الجبر الخطي - المقدمة</h3>
            <p className="text-sm text-muted-foreground mb-3">الصف الثالث الثانوي</p>
            <div className="flex justify-between text-sm mb-3">
              <span>المشاهدات: 245</span>
              <span>45 دقيقة</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">تعديل</Button>
              <Button size="sm" variant="educational">عرض</Button>
            </div>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  </div>
);

const TeacherSchedulePage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">جدول الحصص المباشرة</h1>
    
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">حصص اليوم</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-educational/10 rounded-lg border border-educational/20">
          <div className="w-12 h-12 bg-educational rounded-lg flex items-center justify-center">
            <Video className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">الرياضيات - الجبر الخطي</h4>
            <p className="text-sm text-muted-foreground">الصف الثالث الثانوي - المجموعة أ</p>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="h-3 w-3" />
              <span className="text-xs">10:00 ص - 11:30 ص</span>
              <Badge variant="default" className="text-xs">23 طالب</Badge>
            </div>
          </div>
          <div className="text-center">
            <Button size="sm" variant="educational">
              بدء الحصة
            </Button>
            <p className="text-xs text-muted-foreground mt-1">بعد 15 دقيقة</p>
          </div>
        </div>
      </div>
    </Card>
  </div>
);

const AITestsPage = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">الاختبارات الذكية (AI)</h1>
      <Button variant="educational">
        <Brain className="h-4 w-4 ml-2" />
        إنشاء اختبار ذكي
      </Button>
    </div>

    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">إنشاء اختبار جديد</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">عنوان الدرس</label>
          <Input placeholder="مثال: الجبر الخطي - المصفوفات" />
        </div>
        <div>
          <label className="text-sm font-medium">عدد الأسئلة المطلوبة</label>
          <Input type="number" placeholder="20" />
        </div>
        <div>
          <label className="text-sm font-medium">مستوى الصعوبة</label>
          <Input placeholder="متوسط" />
        </div>
        <Button variant="educational" className="w-full">
          <Brain className="h-4 w-4 ml-2" />
          توليد الاختبار بالذكاء الاصطناعي
        </Button>
      </div>
    </Card>
  </div>
);

const InvitationsPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">دعوة الطلاب</h1>
    
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">إرسال دعوات</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">أرقام الهواتف أو البريد الإلكتروني</label>
          <Textarea 
            placeholder="01234567890, student@email.com, 01987654321"
            rows={4}
          />
        </div>
        <div>
          <label className="text-sm font-medium">المجموعة</label>
          <Input placeholder="الصف الثالث الثانوي - أ" />
        </div>
        <Button variant="educational" className="w-full">
          <UserPlus className="h-4 w-4 ml-2" />
          إرسال الدعوات
        </Button>
      </div>
    </Card>
  </div>
);

const TeacherTicketsPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">استفسارات الطلاب</h1>
    
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-warning rounded-full flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">أحمد محمد - استفسار حول التفاضل</h3>
              <Badge variant="secondary">جديد</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              لم أفهم الجزء الخاص بالقواعد الأساسية للتفاضل الجزئي، هل يمكن توضيح أكثر؟
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="educational">رد</Button>
              <Button size="sm" variant="outline">حفظ للمراجعة</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const ReportsPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">تقارير الأداء</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 text-center">
        <div className="text-3xl font-bold text-primary mb-2">92%</div>
        <div className="text-muted-foreground">نسبة الحضور العامة</div>
      </Card>
      <Card className="p-6 text-center">
        <div className="text-3xl font-bold text-success mb-2">4.8</div>
        <div className="text-muted-foreground">تقييم الطلاب</div>
      </Card>
      <Card className="p-6 text-center">
        <div className="text-3xl font-bold text-educational mb-2">88%</div>
        <div className="text-muted-foreground">معدل النجاح</div>
      </Card>
    </div>
  </div>
);

const EarningsPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">الأرباح والمدفوعات</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">الأرباح هذا الشهر</h3>
        <div className="text-3xl font-bold text-success mb-2">12,450 ج.م</div>
        <div className="text-sm text-muted-foreground">+8% عن الشهر الماضي</div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">الرصيد المتاح</h3>
        <div className="text-3xl font-bold text-primary mb-2">8,250 ج.م</div>
        <Button variant="educational" className="mt-2">
          طلب سحب
        </Button>
      </Card>
    </div>
  </div>
);

const SubAccountsPage = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">الحسابات الفرعية</h1>
      <Button variant="educational">
        <UserPlus className="h-4 w-4 ml-2" />
        إضافة مساعد جديد
      </Button>
    </div>

    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">المساعدين</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">م</span>
            </div>
            <div>
              <div className="font-medium">محمد أحمد - مساعد</div>
              <div className="text-sm text-muted-foreground">الصلاحيات: مشاهدة + إدارة الطلاب</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">تعديل</Button>
            <Button size="sm" variant="destructive">حذف</Button>
          </div>
        </div>
      </div>
    </Card>
  </div>
);

export default TeacherDashboard;
