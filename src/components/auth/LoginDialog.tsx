import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { X, User, BookOpen, Shield, UserCheck } from 'lucide-react';
import strapiService from '../../services/strapiService';

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    {
      id: 'student',
      name: 'طالب',
      description: 'الوصول إلى المحتوى والدروس التعليمية',
      icon: User,
      color: 'bg-blue-500'
    },
    {
      id: 'teacher',
      name: 'مدرس',
      description: 'إدارة المحتوى والطلاب',
      icon: BookOpen,
      color: 'bg-orange-500'
    },
    {
      id: 'teacher-assistant',
      name: 'مساعد مدرس',
      description: 'مساعدة المدرسين في إدارة المحتوى',
      icon: UserCheck,
      color: 'bg-green-500'
    },
    {
      id: 'admin',
      name: 'مشرف',
      description: 'إدارة النظام والمستخدمين',
      icon: Shield,
      color: 'bg-red-500'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await strapiService.login({
        identifier: email,
        password: password
      });

      // Check if user is approved
      if (response.user.status === 'pending') {
        setError('حسابك في انتظار موافقة الإدارة. سيتم إشعارك عند الموافقة على حسابك.');
        return;
      }

      if (response.user.status === 'rejected') {
        setError('تم رفض حسابك من قبل الإدارة. يرجى التواصل مع الدعم الفني.');
        return;
      }

      onLoginSuccess(response.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'حدث خطأ في تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-center text-xl font-bold text-blue-600">
            تسجيل الدخول
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* اختيار نوع الحساب */}
          <div>
            <Label className="text-sm font-medium mb-3 block">اختر نوع الحساب</Label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${role.color} flex items-center justify-center mx-auto mb-2`}>
                    <role.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm">{role.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{role.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* نموذج تسجيل الدخول */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>
          </form>

          {/* بيانات تجريبية */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2">بيانات تجريبية:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>البريد: demo@mymath.live</div>
              <div>كلمة المرور: 123456</div>
            </div>
          </div>

          {/* رابط التسجيل */}
          <div className="text-center">
            <span className="text-sm text-gray-600">ليس لديك حساب؟ </span>
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={() => {
                onClose();
                // يمكن إضافة منطق فتح نموذج التسجيل هنا
              }}
            >
              انضم الآن
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginDialog;

