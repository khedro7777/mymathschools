import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Search, 
  Send, 
  Bell, 
  Gift, 
  HelpCircle,
  Eye,
  Filter,
  Users,
  Calendar,
  DollarSign,
  BookOpen
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface Student {
  id: string;
  name: string;
  grade: string;
  subject: string;
  course: string;
  joinDate: string;
  lastSession: string;
  totalSessions: number;
  totalPayments: number;
  envelopesUsed: number;
  status: 'active' | 'inactive' | 'pending';
  phone: string;
  email: string;
  parentPhone: string;
}

interface StudentRecord {
  sessions: Array<{
    id: string;
    date: string;
    topic: string;
    duration: number;
    attendance: 'present' | 'absent' | 'late';
  }>;
  payments: Array<{
    id: string;
    date: string;
    amount: number;
    method: string;
    status: 'confirmed' | 'pending' | 'rejected';
  }>;
  envelopes: Array<{
    id: string;
    type: 'discount' | 'points' | 'gift';
    value: string;
    usedDate: string;
    description: string;
  }>;
}

const StudentGroups = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'أحمد محمد علي',
      grade: 'الثالث الثانوي',
      subject: 'رياضيات',
      course: 'الجبر المتقدم',
      joinDate: '2024-01-15',
      lastSession: '2024-01-20',
      totalSessions: 12,
      totalPayments: 2400,
      envelopesUsed: 2,
      status: 'active',
      phone: '01234567890',
      email: 'ahmed.mohamed@email.com',
      parentPhone: '01098765432'
    },
    {
      id: '2',
      name: 'فاطمة أحمد حسن',
      grade: 'الثاني الثانوي',
      subject: 'رياضيات',
      course: 'الهندسة التحليلية',
      joinDate: '2024-01-10',
      lastSession: '2024-01-19',
      totalSessions: 15,
      totalPayments: 3000,
      envelopesUsed: 1,
      status: 'active',
      phone: '01123456789',
      email: 'fatma.ahmed@email.com',
      parentPhone: '01087654321'
    },
    {
      id: '3',
      name: 'محمد سعد إبراهيم',
      grade: 'Year 11',
      subject: 'Mathematics',
      course: 'حساب المثلثات - IGCSE',
      joinDate: '2024-01-05',
      lastSession: '2024-01-18',
      totalSessions: 8,
      totalPayments: 1600,
      envelopesUsed: 0,
      status: 'active',
      phone: '01012345678',
      email: 'mohamed.saad@email.com',
      parentPhone: '01076543210'
    },
    {
      id: '4',
      name: 'نور الدين أحمد',
      grade: 'الثالث الثانوي',
      subject: 'رياضيات',
      course: 'الجبر المتقدم',
      joinDate: '2024-01-12',
      lastSession: '2024-01-17',
      totalSessions: 6,
      totalPayments: 1200,
      envelopesUsed: 1,
      status: 'pending',
      phone: '01234567891',
      email: 'nour.ahmed@email.com',
      parentPhone: '01098765433'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentRecord, setStudentRecord] = useState<StudentRecord | null>(null);

  // Mock student record data
  const mockStudentRecord: StudentRecord = {
    sessions: [
      {
        id: '1',
        date: '2024-01-20',
        topic: 'المعادلات التربيعية',
        duration: 60,
        attendance: 'present'
      },
      {
        id: '2',
        date: '2024-01-18',
        topic: 'الدوال الخطية',
        duration: 60,
        attendance: 'present'
      },
      {
        id: '3',
        date: '2024-01-15',
        topic: 'المصفوفات',
        duration: 60,
        attendance: 'late'
      }
    ],
    payments: [
      {
        id: '1',
        date: '2024-01-15',
        amount: 1200,
        method: 'فودافون كاش',
        status: 'confirmed'
      },
      {
        id: '2',
        date: '2024-01-01',
        amount: 1200,
        method: 'تحويل بنكي',
        status: 'confirmed'
      }
    ],
    envelopes: [
      {
        id: '1',
        type: 'discount',
        value: '10%',
        usedDate: '2024-01-10',
        description: 'خصم على الشهر الثاني'
      },
      {
        id: '2',
        type: 'points',
        value: '50 نقطة',
        usedDate: '2024-01-05',
        description: 'نقاط إضافية للمتجر'
      }
    ]
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = !filterGrade || student.grade === filterGrade;
    const matchesSubject = !filterSubject || student.subject === filterSubject;
    const matchesStatus = !filterStatus || student.status === filterStatus;
    
    return matchesSearch && matchesGrade && matchesSubject && matchesStatus;
  });

  const handleSendInvitation = (studentId: string) => {
    // Mock sending invitation
    alert(`تم إرسال دعوة للطالب ${students.find(s => s.id === studentId)?.name}`);
  };

  const handleSendReminder = (studentId: string) => {
    // Mock sending reminder
    alert(`تم إرسال تذكير للطالب ${students.find(s => s.id === studentId)?.name}`);
  };

  const handleSendEnvelope = (studentId: string) => {
    // Mock sending envelope
    alert(`تم إرسال ظرف أحمر للطالب ${students.find(s => s.id === studentId)?.name}`);
  };

  const handleSendSupport = (studentId: string) => {
    // Mock sending support ticket
    alert(`تم إرسال تذكرة دعم للطالب ${students.find(s => s.id === studentId)?.name}`);
  };

  const handleViewRecord = (student: Student) => {
    setSelectedStudent(student);
    setStudentRecord(mockStudentRecord);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'pending': return 'في الانتظار';
      default: return 'غير محدد';
    }
  };

  const getAttendanceColor = (attendance: string) => {
    switch (attendance) {
      case 'present': return 'text-green-600';
      case 'absent': return 'text-red-600';
      case 'late': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getAttendanceText = (attendance: string) => {
    switch (attendance) {
      case 'present': return 'حضر';
      case 'absent': return 'غاب';
      case 'late': return 'تأخر';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">مجموعات طلابي</h1>
          <p className="text-muted-foreground">أدر طلابك وتفاعل معهم</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Users className="h-4 w-4" />
            {students.length} طالب
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="البحث بالاسم أو الكورس..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            
            <Select value={filterGrade} onValueChange={setFilterGrade}>
              <SelectTrigger>
                <SelectValue placeholder="جميع الصفوف" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع الصفوف</SelectItem>
                <SelectItem value="الثالث الثانوي">الثالث الثانوي</SelectItem>
                <SelectItem value="الثاني الثانوي">الثاني الثانوي</SelectItem>
                <SelectItem value="Year 11">Year 11</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger>
                <SelectValue placeholder="جميع المواد" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع المواد</SelectItem>
                <SelectItem value="رياضيات">رياضيات</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="جميع الحالات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
                <SelectItem value="pending">في الانتظار</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              تصفية
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>جدول الطلاب</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-3">الاسم</th>
                  <th className="text-right p-3">الصف</th>
                  <th className="text-right p-3">المادة</th>
                  <th className="text-right p-3">الكورس</th>
                  <th className="text-right p-3">الحالة</th>
                  <th className="text-right p-3">الحصص</th>
                  <th className="text-right p-3">المدفوعات</th>
                  <th className="text-right p-3">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">
                          انضم في {new Date(student.joinDate).toLocaleDateString('ar-EG')}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{student.grade}</td>
                    <td className="p-3">{student.subject}</td>
                    <td className="p-3">{student.course}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(student.status)}`}></div>
                        <span className="text-sm">{getStatusText(student.status)}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div>{student.totalSessions} حصة</div>
                        <div className="text-muted-foreground">
                          آخر حصة: {new Date(student.lastSession).toLocaleDateString('ar-EG')}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div className="font-medium">{student.totalPayments.toLocaleString()} ج.م</div>
                        <div className="text-muted-foreground">{student.envelopesUsed} ظرف مستخدم</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSendInvitation(student.id)}
                          title="إرسال دعوة"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSendReminder(student.id)}
                          title="إرسال تذكير"
                        >
                          <Bell className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSendEnvelope(student.id)}
                          title="إرسال ظرف أحمر"
                        >
                          <Gift className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSendSupport(student.id)}
                          title="إرسال تذكرة دعم"
                        >
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewRecord(student)}
                          title="عرض سجل الطالب"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Student Record Dialog */}
      {selectedStudent && studentRecord && (
        <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>سجل الطالب: {selectedStudent.name}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Student Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">معلومات الطالب</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">الهاتف</div>
                      <div>{selectedStudent.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">البريد الإلكتروني</div>
                      <div>{selectedStudent.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">هاتف ولي الأمر</div>
                      <div>{selectedStudent.parentPhone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">تاريخ الانضمام</div>
                      <div>{new Date(selectedStudent.joinDate).toLocaleDateString('ar-EG')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sessions History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    الحصص السابقة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentRecord.sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{session.topic}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(session.date).toLocaleDateString('ar-EG')} - {session.duration} دقيقة
                          </div>
                        </div>
                        <div className={`text-sm font-medium ${getAttendanceColor(session.attendance)}`}>
                          {getAttendanceText(session.attendance)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payments History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    المدفوعات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentRecord.payments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{payment.amount.toLocaleString()} ج.م</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(payment.date).toLocaleDateString('ar-EG')} - {payment.method}
                          </div>
                        </div>
                        <Badge variant={payment.status === 'confirmed' ? 'default' : 'secondary'}>
                          {payment.status === 'confirmed' ? 'مؤكد' : 'في الانتظار'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Envelopes Used */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    الأظرف المستخدمة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentRecord.envelopes.map((envelope) => (
                      <div key={envelope.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{envelope.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(envelope.usedDate).toLocaleDateString('ar-EG')}
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{envelope.value}</div>
                          <Badge variant="outline">
                            {envelope.type === 'discount' ? 'خصم' : 
                             envelope.type === 'points' ? 'نقاط' : 'هدية'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StudentGroups;

