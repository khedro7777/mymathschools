import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  Plus,
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle,
  AlertCircle,
  Save,
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

interface Teacher {
  id: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    nationalId: string;
    dateOfBirth: string;
    address: string;
  };
  academicInfo: {
    degree: string;
    university: string;
    graduationYear: string;
    specialization: string;
    subjects: string[];
    experience: string;
  };
  teachingInfo: {
    preferredGrades: string[];
    teachingMethod: string;
    availability: string[];
    hourlyRate: string;
  };
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  addedBy: string;
}

const AddTeacherDirectly = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: '1',
      personalInfo: {
        fullName: 'د. سارة أحمد محمد',
        email: 'sara.ahmed@mymath.com',
        phone: '01234567890',
        nationalId: '12345678901234',
        dateOfBirth: '1985-03-15',
        address: 'القاهرة، مصر الجديدة'
      },
      academicInfo: {
        degree: 'دكتوراه',
        university: 'جامعة القاهرة',
        graduationYear: '2015',
        specialization: 'الرياضيات التطبيقية',
        subjects: ['الرياضيات', 'الفيزياء'],
        experience: '5-10'
      },
      teachingInfo: {
        preferredGrades: ['الصف الثالث الثانوي', 'الصف الثاني الثانوي'],
        teachingMethod: 'مختلط',
        availability: ['المساء', 'الليل'],
        hourlyRate: '150'
      },
      status: 'active',
      joinDate: '2024-01-15',
      addedBy: 'المشرف العام'
    }
  ]);

  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      nationalId: '',
      dateOfBirth: '',
      address: ''
    },
    academicInfo: {
      degree: '',
      university: '',
      graduationYear: '',
      specialization: '',
      subjects: [] as string[],
      experience: ''
    },
    teachingInfo: {
      preferredGrades: [] as string[],
      teachingMethod: '',
      availability: [] as string[],
      hourlyRate: ''
    }
  });

  const subjects = [
    'الرياضيات',
    'الفيزياء',
    'الكيمياء',
    'الأحياء',
    'اللغة العربية',
    'اللغة الإنجليزية',
    'التاريخ',
    'الجغرافيا',
    'الفلسفة والمنطق',
    'علم النفس والاجتماع'
  ];

  const grades = [
    'الصف الأول الابتدائي',
    'الصف الثاني الابتدائي',
    'الصف الثالث الابتدائي',
    'الصف الرابع الابتدائي',
    'الصف الخامس الابتدائي',
    'الصف السادس الابتدائي',
    'الصف الأول الإعدادي',
    'الصف الثاني الإعدادي',
    'الصف الثالث الإعدادي',
    'الصف الأول الثانوي',
    'الصف الثاني الثانوي',
    'الصف الثالث الثانوي'
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section: string, field: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = (prev[section as keyof typeof prev] as any)[field] || [];
      const newArray = checked 
        ? [...currentArray, value]
        : currentArray.filter((item: string) => item !== value);
      
      return {
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: newArray
        }
      };
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // محاكاة إضافة المدرس
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newTeacher: Teacher = {
      id: Date.now().toString(),
      personalInfo: formData.personalInfo,
      academicInfo: formData.academicInfo,
      teachingInfo: formData.teachingInfo,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      addedBy: 'المشرف العام'
    };

    setTeachers(prev => [...prev, newTeacher]);
    
    // إعادة تعيين النموذج
    setFormData({
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        nationalId: '',
        dateOfBirth: '',
        address: ''
      },
      academicInfo: {
        degree: '',
        university: '',
        graduationYear: '',
        specialization: '',
        subjects: [],
        experience: ''
      },
      teachingInfo: {
        preferredGrades: [],
        teachingMethod: '',
        availability: [],
        hourlyRate: ''
      }
    });
    
    setIsSubmitting(false);
    setIsDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-success-foreground">نشط</Badge>;
      case 'inactive':
        return <Badge className="bg-muted text-muted-foreground">غير نشط</Badge>;
      case 'suspended':
        return <Badge className="bg-destructive text-destructive-foreground">معلق</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.personalInfo.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const AddTeacherForm = () => (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto">
      {/* المعلومات الشخصية */}
      <div>
        <h3 className="text-lg font-semibold mb-4">المعلومات الشخصية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">الاسم الكامل *</Label>
            <Input
              id="fullName"
              value={formData.personalInfo.fullName}
              onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
              placeholder="أدخل الاسم الكامل"
            />
          </div>
          
          <div>
            <Label htmlFor="email">البريد الإلكتروني *</Label>
            <Input
              id="email"
              type="email"
              value={formData.personalInfo.email}
              onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
              placeholder="example@email.com"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">رقم الهاتف *</Label>
            <Input
              id="phone"
              value={formData.personalInfo.phone}
              onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
              placeholder="01xxxxxxxxx"
            />
          </div>
          
          <div>
            <Label htmlFor="nationalId">الرقم القومي *</Label>
            <Input
              id="nationalId"
              value={formData.personalInfo.nationalId}
              onChange={(e) => handleInputChange('personalInfo', 'nationalId', e.target.value)}
              placeholder="14 رقم"
            />
          </div>
          
          <div>
            <Label htmlFor="dateOfBirth">تاريخ الميلاد *</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.personalInfo.dateOfBirth}
              onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
            />
          </div>
        </div>
        
        <div className="mt-4">
          <Label htmlFor="address">العنوان *</Label>
          <Textarea
            id="address"
            value={formData.personalInfo.address}
            onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
            placeholder="أدخل العنوان كاملاً"
          />
        </div>
      </div>

      {/* المؤهلات الأكاديمية */}
      <div>
        <h3 className="text-lg font-semibold mb-4">المؤهلات الأكاديمية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="degree">الدرجة العلمية *</Label>
            <Select onValueChange={(value) => handleInputChange('academicInfo', 'degree', value)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الدرجة العلمية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bachelor">بكالوريوس</SelectItem>
                <SelectItem value="master">ماجستير</SelectItem>
                <SelectItem value="phd">دكتوراه</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="university">الجامعة *</Label>
            <Input
              id="university"
              value={formData.academicInfo.university}
              onChange={(e) => handleInputChange('academicInfo', 'university', e.target.value)}
              placeholder="اسم الجامعة"
            />
          </div>
          
          <div>
            <Label htmlFor="graduationYear">سنة التخرج *</Label>
            <Input
              id="graduationYear"
              value={formData.academicInfo.graduationYear}
              onChange={(e) => handleInputChange('academicInfo', 'graduationYear', e.target.value)}
              placeholder="2020"
            />
          </div>
          
          <div>
            <Label htmlFor="specialization">التخصص *</Label>
            <Input
              id="specialization"
              value={formData.academicInfo.specialization}
              onChange={(e) => handleInputChange('academicInfo', 'specialization', e.target.value)}
              placeholder="التخصص الأكاديمي"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <Label>المواد التي يمكن تدريسها *</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {subjects.map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox
                  id={subject}
                  checked={formData.academicInfo.subjects.includes(subject)}
                  onCheckedChange={(checked) => 
                    handleArrayChange('academicInfo', 'subjects', subject, checked as boolean)
                  }
                />
                <Label htmlFor={subject} className="text-sm">{subject}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <Label htmlFor="experience">سنوات الخبرة في التدريس</Label>
          <Select onValueChange={(value) => handleInputChange('academicInfo', 'experience', value)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر سنوات الخبرة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1">أقل من سنة</SelectItem>
              <SelectItem value="1-3">1-3 سنوات</SelectItem>
              <SelectItem value="3-5">3-5 سنوات</SelectItem>
              <SelectItem value="5-10">5-10 سنوات</SelectItem>
              <SelectItem value="10+">أكثر من 10 سنوات</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* معلومات التدريس */}
      <div>
        <h3 className="text-lg font-semibold mb-4">معلومات التدريس</h3>
        
        <div className="mb-4">
          <Label>الصفوف المفضلة للتدريس *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 max-h-32 overflow-y-auto">
            {grades.map((grade) => (
              <div key={grade} className="flex items-center space-x-2">
                <Checkbox
                  id={grade}
                  checked={formData.teachingInfo.preferredGrades.includes(grade)}
                  onCheckedChange={(checked) => 
                    handleArrayChange('teachingInfo', 'preferredGrades', grade, checked as boolean)
                  }
                />
                <Label htmlFor={grade} className="text-sm">{grade}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="teachingMethod">طريقة التدريس المفضلة *</Label>
            <Select onValueChange={(value) => handleInputChange('teachingInfo', 'teachingMethod', value)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر طريقة التدريس" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">أونلاين فقط</SelectItem>
                <SelectItem value="offline">حضوري فقط</SelectItem>
                <SelectItem value="hybrid">مختلط (أونلاين وحضوري)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="hourlyRate">السعر للحصة (ج.م) *</Label>
            <Input
              id="hourlyRate"
              value={formData.teachingInfo.hourlyRate}
              onChange={(e) => handleInputChange('teachingInfo', 'hourlyRate', e.target.value)}
              placeholder="100"
              type="number"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <Label>أوقات التوفر *</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
            {['الصباح', 'بعد الظهر', 'المساء', 'الليل'].map((time) => (
              <div key={time} className="flex items-center space-x-2">
                <Checkbox
                  id={time}
                  checked={formData.teachingInfo.availability.includes(time)}
                  onCheckedChange={(checked) => 
                    handleArrayChange('teachingInfo', 'availability', time, checked as boolean)
                  }
                />
                <Label htmlFor={time} className="text-sm">{time}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t">
        <Button 
          variant="outline" 
          onClick={() => setIsDialogOpen(false)}
          disabled={isSubmitting}
        >
          إلغاء
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="min-w-32"
        >
          {isSubmitting ? 'جاري الحفظ...' : (
            <>
              <Save className="h-4 w-4 ml-2" />
              حفظ المدرس
            </>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة المدرسين</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 ml-2" />
              إضافة مدرس جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>إضافة مدرس جديد</DialogTitle>
            </DialogHeader>
            <AddTeacherForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* شريط البحث والفلاتر */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث عن المدرسين..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 ml-2" />
          فلترة
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary">{teachers.length}</div>
              <div className="text-sm text-muted-foreground">إجمالي المدرسين</div>
            </div>
            <User className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-success">
                {teachers.filter(t => t.status === 'active').length}
              </div>
              <div className="text-sm text-muted-foreground">نشط</div>
            </div>
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-muted-foreground">
                {teachers.filter(t => t.status === 'inactive').length}
              </div>
              <div className="text-sm text-muted-foreground">غير نشط</div>
            </div>
            <AlertCircle className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-destructive">
                {teachers.filter(t => t.status === 'suspended').length}
              </div>
              <div className="text-sm text-muted-foreground">معلق</div>
            </div>
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
        </Card>
      </div>

      {/* قائمة المدرسين */}
      <Card className="p-6">
        <div className="space-y-4">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher) => (
              <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{teacher.personalInfo.fullName}</h4>
                    <p className="text-sm text-muted-foreground">{teacher.academicInfo.specialization}</p>
                    <p className="text-xs text-muted-foreground">{teacher.personalInfo.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">
                      {teacher.academicInfo.subjects.join(', ')}
                    </div>
                    <div className="text-xs text-muted-foreground">المواد</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{teacher.teachingInfo.hourlyRate} ج.م</div>
                    <div className="text-xs text-muted-foreground">سعر الحصة</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{teacher.joinDate}</div>
                    <div className="text-xs text-muted-foreground">تاريخ الانضمام</div>
                  </div>
                  {getStatusBadge(teacher.status)}
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">لا توجد مدرسين</h3>
              <p className="text-muted-foreground mb-4">لم يتم العثور على مدرسين يطابقون معايير البحث</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 ml-2" />
                إضافة مدرس جديد
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AddTeacherDirectly;

