import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { X, User, BookOpen, Shield, UserCheck } from 'lucide-react';
import strapiService from '../../services/strapiService';

interface RegisterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (user: any) => void;
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({ isOpen, onClose, onRegisterSuccess }) => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    {
      id: 'student',
      name: 'طالب',
      description: 'للطلاب الراغبين في التعلم',
      icon: User,
      color: 'bg-blue-500'
    },
    {
      id: 'teacher',
      name: 'مدرس',
      description: 'للمدرسين المتخصصين',
      icon: BookOpen,
      color: 'bg-orange-500'
    },
    {
      id: 'teacher-assistant',
      name: 'مساعد مدرس',
      description: 'لمساعدي المدرسين',
      icon: UserCheck,
      color: 'bg-green-500'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // التحقق من تطابق كلمات المرور
    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      setLoading(false);
      return;
    }

    try {
      const response = await strapiService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: selectedRole
      });

      onRegisterSuccess(response.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'حدث خطأ في التسجيل');
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
            إنشاء حساب جديد
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* اختيار نوع الحساب */}
          <div>
            <Label className="text-sm font-medium mb-3 block">اختر نوع الحساب</Label>
            <div className="grid grid-cols-1 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full ${role.color} flex items-center justify-center`}>
                    <role.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right flex-1">
                    <div className="font-medium">{role.name}</div>
                    <div className="text-sm text-gray-500">{role.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* نموذج التسجيل */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">الاسم الكامل *</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="أدخل اسمك الكامل"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">البريد الإلكتروني *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="أدخل رقم هاتفك"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="birthDate">تاريخ الميلاد</Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">كلمة المرور *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="أدخل كلمة المرور"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="أعد إدخال كلمة المرور"
                value={formData.confirmPassword}
                onChange={handleInputChange}
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
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
            </Button>
          </form>

          {/* رابط تسجيل الدخول */}
          <div className="text-center">
            <span className="text-sm text-gray-600">لديك حساب بالفعل؟ </span>
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={() => {
                onClose();
                // يمكن إضافة منطق فتح نموذج تسجيل الدخول هنا
              }}
            >
              تسجيل الدخول
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterDialog;

