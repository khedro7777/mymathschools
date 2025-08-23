import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  Award, 
  Shield, 
  UserCheck 
} from 'lucide-react';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (role: string, userData: any) => void;
}

type UserRole = 'student' | 'teacher' | 'admin' | 'assistant';

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onOpenChange, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    {
      id: 'student' as UserRole,
      name: 'طالب',
      icon: GraduationCap,
      color: 'bg-blue-500',
      description: 'الوصول إلى الدروس والمواد التعليمية'
    },
    {
      id: 'teacher' as UserRole,
      name: 'مدرس',
      icon: Award,
      color: 'bg-orange-500',
      description: 'إدارة الفصول والطلاب'
    },
    {
      id: 'admin' as UserRole,
      name: 'مشرف',
      icon: Shield,
      color: 'bg-red-500',
      description: 'إدارة النظام والمستخدمين'
    },
    {
      id: 'assistant' as UserRole,
      name: 'مساعد مدرس',
      icon: UserCheck,
      color: 'bg-green-500',
      description: 'مساعدة المدرس في إدارة الفصل'
    }
  ];

  const handleLogin = async () => {
    if (!email || !password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // محاكاة عملية تسجيل الدخول
      await new Promise(resolve => setTimeout(resolve, 1000));

      // بيانات وهمية للمستخدم
      const userData = {
        id: `${selectedRole}_demo`,
        email,
        name: getDemoUserName(selectedRole),
        role: selectedRole,
        avatar: null,
        permissions: getRolePermissions(selectedRole)
      };

      onLogin(selectedRole, userData);
      onOpenChange(false);
      
      // إعادة تعيين النموذج
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      setError('فشل في تسجيل الدخول. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const getDemoUserName = (role: UserRole): string => {
    switch (role) {
      case 'student': return 'أحمد محمد';
      case 'teacher': return 'د. سارة أحمد';
      case 'admin': return 'محمد الإداري';
      case 'assistant': return 'نور المساعدة';
      default: return 'مستخدم';
    }
  };

  const getRolePermissions = (role: UserRole): string[] => {
    switch (role) {
      case 'student':
        return ['view_courses', 'enroll_courses', 'view_schedules', 'follow_teachers'];
      case 'teacher':
        return ['manage_courses', 'view_students', 'create_schedules', 'grade_students'];
      case 'admin':
        return ['manage_users', 'approve_enrollments', 'system_settings', 'view_reports'];
      case 'assistant':
        return ['assist_teacher', 'view_students', 'help_grading'];
      default:
        return [];
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-primary">
            تسجيل الدخول
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Role Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">اختر نوع الحساب</Label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <Card
                    key={role.id}
                    className={`p-3 cursor-pointer transition-all duration-200 ${
                      selectedRole === role.id
                        ? 'ring-2 ring-primary border-primary bg-primary/5'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className={`${role.color} w-10 h-10 rounded-full flex items-center justify-center`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{role.name}</p>
                        <p className="text-xs text-muted-foreground">{role.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>
          </div>

          {/* Demo Credentials */}
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm font-medium mb-2">بيانات تجريبية:</p>
            <div className="text-xs space-y-1">
              <p><strong>البريد:</strong> demo@mymath.live</p>
              <p><strong>كلمة المرور:</strong> 123456</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              ليس لديك حساب؟{' '}
              <button className="text-primary hover:underline font-medium">
                انضم الآن
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;

