import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Users, 
  UserCheck, 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Award,
  GraduationCap,
  BookOpen,
  Calendar,
  DollarSign,
  Star,
  MessageSquare
} from 'lucide-react';

// نموذج بيانات المدرس
interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
  studentsCount: number;
  coursesCount: number;
  rating: number;
  earnings: number;
  status: 'active' | 'pending' | 'suspended';
  joinDate: string;
}

// نموذج بيانات الطالب
interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  enrollmentDate: string;
  status: 'active' | 'inactive';
  progress: number;
}

const TeacherStudentManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // بيانات تجريبية للمدرسين
  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'د. سارة أحمد',
      subject: 'الرياضيات',
      email: 'sara.ahmed@mymath.com',
      phone: '01234567890',
      studentsCount: 45,
      coursesCount: 8,
      rating: 4.8,
      earnings: 12500,
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'أ. محمد علي',
      subject: 'الفيزياء',
      email: 'mohamed.ali@mymath.com',
      phone: '01234567891',
      studentsCount: 32,
      coursesCount: 5,
      rating: 4.6,
      earnings: 9800,
      status: 'active',
      joinDate: '2024-02-20'
    },
    {
      id: '3',
      name: 'د. فاطمة محمود',
      subject: 'الكيمياء',
      email: 'fatma.mahmoud@mymath.com',
      phone: '01234567892',
      studentsCount: 28,
      coursesCount: 6,
      rating: 4.9,
      earnings: 11200,
      status: 'pending',
      joinDate: '2024-03-10'
    }
  ];

  // بيانات تجريبية للطلاب
  const students: Student[] = [
    {
      id: '1',
      name: 'أحمد محمد',
      email: 'ahmed.mohamed@student.com',
      grade: 'الصف الثالث الثانوي',
      teacherId: '1',
      teacherName: 'د. سارة أحمد',
      subject: 'الرياضيات',
      enrollmentDate: '2024-01-20',
      status: 'active',
      progress: 85
    },
    {
      id: '2',
      name: 'مريم أحمد',
      email: 'mariam.ahmed@student.com',
      grade: 'الصف الثاني الثانوي',
      teacherId: '1',
      teacherName: 'د. سارة أحمد',
      subject: 'الرياضيات',
      enrollmentDate: '2024-02-15',
      status: 'active',
      progress: 92
    },
    {
      id: '3',
      name: 'عمر سالم',
      email: 'omar.salem@student.com',
      grade: 'الصف الثالث الثانوي',
      teacherId: '2',
      teacherName: 'أ. محمد علي',
      subject: 'الفيزياء',
      enrollmentDate: '2024-02-25',
      status: 'active',
      progress: 78
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-success-foreground">نشط</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-warning-foreground">في الانتظار</Badge>;
      case 'suspended':
        return <Badge className="bg-destructive text-destructive-foreground">معلق</Badge>;
      case 'inactive':
        return <Badge className="bg-muted text-muted-foreground">غير نشط</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* إحصائيات عامة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary">{teachers.length}</div>
              <div className="text-sm text-muted-foreground">إجمالي المدرسين</div>
            </div>
            <UserCheck className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-educational">{students.length}</div>
              <div className="text-sm text-muted-foreground">إجمالي الطلاب</div>
            </div>
            <Users className="h-8 w-8 text-educational" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-success">
                {teachers.reduce((sum, t) => sum + t.coursesCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">إجمالي الكورسات</div>
            </div>
            <BookOpen className="h-8 w-8 text-success" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-warning">
                {teachers.reduce((sum, t) => sum + t.earnings, 0).toLocaleString()} ج.م
              </div>
              <div className="text-sm text-muted-foreground">إجمالي الأرباح</div>
            </div>
            <DollarSign className="h-8 w-8 text-warning" />
          </div>
        </Card>
      </div>

      {/* مجموعات المدرسين والطلاب */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">مجموعات المدرسين والطلاب</h3>
        <div className="space-y-4">
          {teachers.map((teacher) => {
            const teacherStudents = students.filter(s => s.teacherId === teacher.id);
            return (
              <div key={teacher.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{teacher.name}</h4>
                      <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(teacher.status)}
                    <Badge variant="outline">{teacherStudents.length} طالب</Badge>
                  </div>
                </div>
                
                {teacherStudents.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <h5 className="text-sm font-medium mb-2">الطلاب المسجلين:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {teacherStudents.map((student) => (
                        <div key={student.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                          <GraduationCap className="h-4 w-4 text-educational" />
                          <span className="text-sm">{student.name}</span>
                          <Badge variant="outline" className="text-xs">{student.progress}%</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );

  const TeachersTab = () => (
    <div className="space-y-6">
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
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          إضافة مدرس
        </Button>
      </div>

      {/* جدول المدرسين */}
      <Card className="p-6">
        <div className="space-y-4">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{teacher.name}</h4>
                  <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                  <p className="text-xs text-muted-foreground">{teacher.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-sm font-medium">{teacher.studentsCount}</div>
                  <div className="text-xs text-muted-foreground">طالب</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">{teacher.coursesCount}</div>
                  <div className="text-xs text-muted-foreground">كورس</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    {teacher.rating}
                  </div>
                  <div className="text-xs text-muted-foreground">تقييم</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">{teacher.earnings.toLocaleString()} ج.م</div>
                  <div className="text-xs text-muted-foreground">الأرباح</div>
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
          ))}
        </div>
      </Card>
    </div>
  );

  const StudentsTab = () => (
    <div className="space-y-6">
      {/* شريط البحث والفلاتر */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث عن الطلاب..."
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

      {/* جدول الطلاب */}
      <Card className="p-6">
        <div className="space-y-4">
          {students.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-educational/20 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-educational" />
                </div>
                <div>
                  <h4 className="font-semibold">{student.name}</h4>
                  <p className="text-sm text-muted-foreground">{student.grade}</p>
                  <p className="text-xs text-muted-foreground">{student.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-sm font-medium">{student.teacherName}</div>
                  <div className="text-xs text-muted-foreground">{student.subject}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">{student.progress}%</div>
                  <div className="text-xs text-muted-foreground">التقدم</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">{new Date(student.enrollmentDate).toLocaleDateString('ar-EG')}</div>
                  <div className="text-xs text-muted-foreground">تاريخ التسجيل</div>
                </div>
                {getStatusBadge(student.status)}
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة المدرسين والطلاب</h2>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          إضافة جديد
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="teachers">المدرسين</TabsTrigger>
          <TabsTrigger value="students">الطلاب</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <OverviewTab />
        </TabsContent>
        
        <TabsContent value="teachers" className="mt-6">
          <TeachersTab />
        </TabsContent>
        
        <TabsContent value="students" className="mt-6">
          <StudentsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherStudentManagement;

