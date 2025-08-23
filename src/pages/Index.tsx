import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Calculator,
  Award,
  Shield,
  ArrowLeft,
  Baby,
  GraduationCap,
  UserCheck
} from 'lucide-react';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import AdminDashboard from './AdminDashboard';
import LoginDialog from '../components/auth/LoginDialog';
import RegisterDialog from '../components/auth/RegisterDialog';

type UserType = 'guest' | 'student' | 'teacher' | 'admin' | 'assistant';

const Index = () => {
  const [currentView, setCurrentView] = useState<UserType>('guest');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);

  const handleLogin = (role: string, userData: any) => {
    setCurrentUser(userData);
    setCurrentView(role as UserType);
  };

  const handleRegister = (role: string, userData: any) => {
    console.log('New user registered:', userData);
    
    if (role === 'teacher') {
      alert('تم إرسال طلب التسجيل بنجاح! سيتم مراجعة طلبك من قبل الإدارة.');
    } else {
      setCurrentUser(userData);
      setCurrentView(role as UserType);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('guest');
  };

  if (currentView === 'student') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                تسجيل الخروج
              </Button>
              <h1 className="text-2xl font-bold text-primary">لوحة تحكم الطالب</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              مرحباً، {currentUser?.name}
            </div>
          </div>
          <StudentDashboard />
        </div>
      </div>
    );
  }

  if (currentView === 'teacher') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                تسجيل الخروج
              </Button>
              <h1 className="text-2xl font-bold text-primary">لوحة تحكم المدرس</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              مرحباً، {currentUser?.name}
            </div>
          </div>
          <TeacherDashboard />
        </div>
      </div>
    );
  }

  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                تسجيل الخروج
              </Button>
              <h1 className="text-2xl font-bold text-primary">لوحة الإدارة</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              مرحباً، {currentUser?.name}
            </div>
          </div>
          <AdminDashboard />
        </div>
      </div>
    );
  }

  if (currentView === 'assistant') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                تسجيل الخروج
              </Button>
              <h1 className="text-2xl font-bold text-primary">لوحة مساعد المدرس</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              مرحباً، {currentUser?.name}
            </div>
          </div>
          <div className="text-center py-20">
            <UserCheck className="h-16 w-16 mx-auto mb-4 text-green-500" />
            <h2 className="text-3xl font-bold text-primary mb-4">مرحباً بك كمساعد مدرس</h2>
            <p className="text-lg text-muted-foreground">
              لوحة التحكم الخاصة بمساعد المدرس قيد التطوير
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                أكاديمية Mymath
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowLoginDialog(true)}
              >
                تسجيل الدخول
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-blue-600 to-purple-600"
                onClick={() => setShowRegisterDialog(true)}
              >
                انضم الآن
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              منصة التعليم الذكية
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              اكتشف عالماً جديداً من التعلم مع أفضل المدرسين والتقنيات التعليمية المتطورة
            </p>
          </div>
        </div>
      </section>

      {/* Try Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">جرب أكاديمية Mymath</h3>
            <p className="text-lg text-gray-600">اختر نوع حسابك للبدء</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Student Card */}
            <Card 
              className="p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100"
              onClick={() => setCurrentView('student')}
            >
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-blue-700 mb-2">لوحة الطالب</h4>
              <p className="text-gray-600 text-sm mb-4">تابع دروسك وتقدمك الأكاديمي</p>
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                دخول كطالب
              </Button>
            </Card>

            {/* Teacher Card */}
            <Card 
              className="p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100"
              onClick={() => setCurrentView('teacher')}
            >
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-orange-700 mb-2">لوحة المدرس</h4>
              <p className="text-gray-600 text-sm mb-4">إدارة الفصول والطلاب</p>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                دخول كمدرس
              </Button>
            </Card>

            {/* Admin Card */}
            <Card 
              className="p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-red-300 bg-gradient-to-br from-red-50 to-red-100"
              onClick={() => setCurrentView('admin')}
            >
              <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-red-700 mb-2">لوحة الإدارة</h4>
              <p className="text-gray-600 text-sm mb-4">إدارة النظام والمستخدمين</p>
              <Button className="w-full bg-red-500 hover:bg-red-600">
                دخول كإداري
              </Button>
            </Card>

            {/* Preschool Card */}
            <Card 
              className="p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-pink-300 bg-gradient-to-br from-pink-50 to-pink-100"
            >
              <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Baby className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-pink-700 mb-2">ما قبل المدرسة</h4>
              <p className="text-gray-600 text-sm mb-4">ألعاب تعليمية للأطفال</p>
              <Button className="w-full bg-pink-500 hover:bg-pink-600">
                ابدأ اللعب
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">أكاديمية Mymath</h3>
            </div>
            <p className="text-gray-400 mb-6">منصة التعليم الذكية - تعلم بلا حدود</p>
            <div className="flex justify-center gap-6">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                عن الأكاديمية
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                اتصل بنا
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                الدعم الفني
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Dialog */}
      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onLogin={handleLogin}
      />

      {/* Register Dialog */}
      <RegisterDialog
        open={showRegisterDialog}
        onOpenChange={setShowRegisterDialog}
        onRegister={handleRegister}
      />
    </div>
  );
};

export default Index;

