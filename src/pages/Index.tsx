import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Calculator, 
  Award, 
  Shield, 
  BookOpen,
  Users,
  Brain,
  Calendar,
  Star,
  TrendingUp,
  MessageSquare,
  Play,
  UserPlus,
  ArrowLeft,
  Sparkles,
  Baby,
  ShoppingBag,
  GraduationCap
} from 'lucide-react';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import AdminDashboard from './AdminDashboard';
import InstallAppButton from '../components/InstallAppButton';
import AIAssistant from '../components/AIAssistant';
import AdvancedSearchEngine from '../components/AdvancedSearchEngine';

type UserType = 'guest' | 'student' | 'teacher' | 'admin';

const Index = () => {
  const [currentView, setCurrentView] = useState<UserType>('guest');

  // Demo data for the landing page
  const stats = [
    { label: 'مدرس متخصص', value: '2,850+', icon: Award },
    { label: 'طالب نشط', value: '45,500+', icon: Users },
    { label: 'مادة تعليمية', value: '28,000+', icon: BookOpen },
    { label: 'نسبة نجاح', value: '98%', icon: TrendingUp },
  ];

  const features = [
    {
      icon: Brain,
      title: 'مساعد ذكي متعدد المواد',
      description: 'حلول وشروحات تفاعلية بالذكاء الاصطناعي لجميع المواد الدراسية'
    },
    {
      icon: GraduationCap,
      title: 'مدرسين متخصصين',
      description: 'نخبة من المدرسين المعتمدين في جميع المواد والمراحل التعليمية'
    },
    {
      icon: Calendar,
      title: 'حصص مباشرة تفاعلية',
      description: 'دروس فردية وجماعية مع Google Meet ومتابعة مباشرة'
    },
    {
      icon: Star,
      title: 'تتبع التقدم والنتائج',
      description: 'تحليل شامل للأداء وتقارير تفصيلية للطلاب والأهالي'
    },
    {
      icon: Baby,
      title: 'تعليم ما قبل المدرسة',
      description: 'برامج تعليمية مخصصة للأطفال من سن 3-5 سنوات'
    },
    {
      icon: ShoppingBag,
      title: 'متجر الأدوات التعليمية',
      description: 'أدوات ومستلزمات دراسية ومكتبية عالية الجودة'
    }
  ];

  if (currentView === 'student') {
    return <StudentDashboard />;
  }

  if (currentView === 'teacher') {
    return <TeacherDashboard />;
  }

  if (currentView === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-background rtl">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-educational rounded-xl flex items-center justify-center shadow-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary font-cairo">أكاديمية Mymath</h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <InstallAppButton />
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              تسجيل الدخول
            </Button>
            <Button variant="educational" size="sm">
              <UserPlus className="h-4 w-4 ml-2" />
              انضم الآن
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-educational text-white py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in-up">
              أكاديمية Mymath - منصة التعليم الذكية
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-primary-foreground/90 animate-fade-in-up">
              منصة تعليمية عربية متعددة المدرسين مع AI مخصص لجميع المواد والمراحل الدراسية
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Search Engine */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <AdvancedSearchEngine />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center animate-scale-in">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-primary to-educational rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-primary mb-4">مميزات أكاديمية Mymath</h3>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              منصة تعليمية شاملة متعددة المدرسين مع أحدث التقنيات والذكاء الاصطناعي
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-educational p-6 sm:p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-educational rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-primary mb-3">{feature.title}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-primary mb-4">جرب أكاديمية Mymath</h3>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              استكشف لوحات التحكم المختلفة واكتشف قوة التعلم الذكي
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Student Demo */}
            <Card className="card-educational p-6 sm:p-8 text-center hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => setCurrentView('student')}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary to-educational rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-primary mb-4">لوحة الطالب</h4>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                ادرس، تفاعل مع المساعد الذكي، واشتري الأدوات
              </p>
              <Button variant="educational" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                ابدأ التعلم الآن
              </Button>
            </Card>

            {/* Teacher Demo */}
            <Card className="card-educational p-6 sm:p-8 text-center hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => setCurrentView('teacher')}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-educational to-primary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Award className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-educational mb-4">لوحة المدرس</h4>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                أنشئ الدروس، استخدم AI، وأدر الطلاب بفعالية
              </p>
              <Button variant="educational" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                انضم كمدرس
              </Button>
            </Card>

            {/* Admin Demo */}
            <Card className="card-educational p-6 sm:p-8 text-center hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => setCurrentView('admin')}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary to-destructive rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-primary mb-4">لوحة الإدارة</h4>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                راقب النظام، أدر المتجر، وحلل البيانات
              </p>
              <Button variant="default" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                جرب الآن
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-primary to-educational text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-yellow-300 ml-3" />
            <h3 className="text-3xl sm:text-4xl font-bold">ابدأ رحلتك التعليمية معنا</h3>
            <Sparkles className="h-8 w-8 text-yellow-300 mr-3" />
          </div>
           <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            انضم إلى آلاف الطلاب والمدرسين الذين يحققون التميز الأكاديمي في جميع المواد
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button 
              size="xl" 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => setCurrentView('student')}
            >
              <GraduationCap className="h-5 w-5 ml-2" />
              ابدأ كطالب
            </Button>
            <Button 
              size="xl" 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => setCurrentView('teacher')}
            >
              <Award className="h-5 w-5 ml-2" />
              انضم كمدرس
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-educational rounded-xl flex items-center justify-center">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-primary">أكاديمية Mymath</span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground text-center">
              © 2024 أكاديمية Mymath. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIAssistant position="fixed" context="main" />
    </div>
  );
};

export default Index;
