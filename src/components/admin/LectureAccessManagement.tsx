import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { usePaymentSystem } from '../../hooks/usePaymentSystem';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Users,
  Video,
  Calendar,
  User,
  GraduationCap,
  Play,
  ExternalLink,
  UserPlus,
  Bell,
  Search,
  Filter
} from 'lucide-react';

interface LectureAccessData {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  courseId: string;
  courseName: string;
  lectureTitle: string;
  lectureDate: Date;
  meetingLink?: string;
  accessGranted: boolean;
  grantedAt?: Date;
  paymentStatus: 'paid' | 'pending' | 'approved';
}

const mockLectureAccess: LectureAccessData[] = [
  {
    id: '1',
    studentId: 'student_1',
    studentName: 'أحمد محمد',
    teacherId: 'teacher_1',
    teacherName: 'د. سارة أحمد',
    courseId: 'course_1',
    courseName: 'الرياضيات المتقدمة',
    lectureTitle: 'الجبر الخطي - المحاضرة الأولى',
    lectureDate: new Date('2024-01-20T16:00:00'),
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    accessGranted: false,
    paymentStatus: 'approved'
  },
  {
    id: '2',
    studentId: 'student_2',
    studentName: 'فاطمة علي',
    teacherId: 'teacher_2',
    teacherName: 'أ. محمد علي',
    courseId: 'course_2',
    courseName: 'الفيزياء التطبيقية',
    lectureTitle: 'قوانين نيوتن - المحاضرة الثانية',
    lectureDate: new Date('2024-01-21T14:00:00'),
    meetingLink: 'https://meet.google.com/xyz-uvw-rst',
    accessGranted: true,
    grantedAt: new Date('2024-01-15T10:30:00'),
    paymentStatus: 'paid'
  },
  {
    id: '3',
    studentId: 'student_3',
    studentName: 'محمود حسن',
    teacherId: 'teacher_1',
    teacherName: 'د. سارة أحمد',
    courseId: 'course_1',
    courseName: 'الرياضيات المتقدمة',
    lectureTitle: 'التفاضل والتكامل - المحاضرة الثالثة',
    lectureDate: new Date('2024-01-22T16:00:00'),
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    accessGranted: true,
    grantedAt: new Date('2024-01-16T11:45:00'),
    paymentStatus: 'paid'
  }
];

const LectureAccessManagement = () => {
  const [lectureAccess, setLectureAccess] = useState<LectureAccessData[]>(mockLectureAccess);
  const [selectedAccess, setSelectedAccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'granted' | 'denied'>('all');
  const [adminNotes, setAdminNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredAccess = lectureAccess.filter(access => {
    const matchesSearch = access.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         access.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         access.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         access.lectureTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'pending' && !access.accessGranted && access.paymentStatus === 'approved') ||
                         (statusFilter === 'granted' && access.accessGranted) ||
                         (statusFilter === 'denied' && !access.accessGranted && access.paymentStatus !== 'approved');
    
    return matchesSearch && matchesStatus;
  });

  const pendingAccess = lectureAccess.filter(access => !access.accessGranted && access.paymentStatus === 'approved');
  const grantedAccess = lectureAccess.filter(access => access.accessGranted);

  const handleGrantAccess = async (accessId: string) => {
    setLoading(true);
    
    // محاكاة منح الوصول
    const updatedAccess = lectureAccess.map(access => {
      if (access.id === accessId) {
        return {
          ...access,
          accessGranted: true,
          grantedAt: new Date()
        };
      }
      return access;
    });

    setLectureAccess(updatedAccess);
    
    // إرسال إشعار للطالب والمدرس
    const accessData = lectureAccess.find(a => a.id === accessId);
    if (accessData) {
      console.log('إرسال إشعار للطالب:', accessData.studentName);
      console.log('إرسال إشعار للمدرس:', accessData.teacherName);
    }
    
    setLoading(false);
    setSelectedAccess(null);
  };

  const handleDenyAccess = async (accessId: string) => {
    if (!adminNotes.trim()) {
      alert('يرجى إدخال سبب رفض الوصول');
      return;
    }
    
    setLoading(true);
    
    // محاكاة رفض الوصول
    const updatedAccess = lectureAccess.filter(access => access.id !== accessId);
    setLectureAccess(updatedAccess);
    
    setLoading(false);
    setSelectedAccess(null);
    setAdminNotes('');
  };

  const getStatusBadge = (access: LectureAccessData) => {
    if (access.accessGranted) {
      return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 ml-1" />مُمنوح</Badge>;
    } else if (access.paymentStatus === 'approved') {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 ml-1" />في الانتظار</Badge>;
    } else {
      return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 ml-1" />غير مؤهل</Badge>;
    }
  };

  const selectedAccessData = lectureAccess.find(access => access.id === selectedAccess);

  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-educational p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{pendingAccess.length}</div>
              <div className="text-sm text-muted-foreground">طلبات معلقة</div>
            </div>
          </div>
        </Card>

        <Card className="card-educational p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{grantedAccess.length}</div>
              <div className="text-sm text-muted-foreground">وصول مُمنوح</div>
            </div>
          </div>
        </Card>

        <Card className="card-educational p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Video className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {lectureAccess.filter(a => a.lectureDate > new Date()).length}
              </div>
              <div className="text-sm text-muted-foreground">محاضرات قادمة</div>
            </div>
          </div>
        </Card>

        <Card className="card-educational p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-educational/10 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-educational" />
            </div>
            <div>
              <div className="text-2xl font-bold text-educational">
                {new Set(lectureAccess.map(a => a.studentId)).size}
              </div>
              <div className="text-sm text-muted-foreground">طلاب مسجلين</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="card-educational p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="البحث بالطالب، المدرس، الكورس، أو المحاضرة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">جميع الحالات</option>
              <option value="pending">في الانتظار</option>
              <option value="granted">وصول مُمنوح</option>
              <option value="denied">غير مؤهل</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Access Requests List */}
        <div className="lg:col-span-2">
          <Card className="card-educational">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-primary">طلبات الوصول للمحاضرات</h2>
            </div>
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {filteredAccess.map((access) => (
                <div
                  key={access.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedAccess === access.id ? 'bg-primary/5 border-r-4 border-primary' : ''
                  }`}
                  onClick={() => setSelectedAccess(access.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{access.studentName}</span>
                    </div>
                    {getStatusBadge(access)}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {access.teacherName} - {access.courseName}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{access.lectureTitle}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{access.lectureDate.toLocaleDateString('ar-EG')}</span>
                      <span className="text-sm text-muted-foreground">
                        {access.lectureDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {access.accessGranted && access.meetingLink && (
                      <Button variant="outline" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        window.open(access.meetingLink, '_blank');
                      }}>
                        <ExternalLink className="h-3 w-3 ml-1" />
                        رابط المحاضرة
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredAccess.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>لا توجد طلبات وصول تطابق البحث</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Access Details */}
        <div>
          <Card className="card-educational">
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold text-primary">تفاصيل طلب الوصول</h3>
            </div>
            
            {selectedAccessData ? (
              <div className="p-6 space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">الطالب</Label>
                  <p className="font-medium">{selectedAccessData.studentName}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">المدرس</Label>
                  <p className="font-medium">{selectedAccessData.teacherName}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">الكورس</Label>
                  <p className="font-medium">{selectedAccessData.courseName}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">المحاضرة</Label>
                  <p className="font-medium">{selectedAccessData.lectureTitle}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">موعد المحاضرة</Label>
                  <p className="font-medium">
                    {selectedAccessData.lectureDate.toLocaleDateString('ar-EG')} - {' '}
                    {selectedAccessData.lectureDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">حالة الدفع</Label>
                  <Badge variant={selectedAccessData.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                    {selectedAccessData.paymentStatus === 'paid' ? 'مدفوع' : 
                     selectedAccessData.paymentStatus === 'approved' ? 'معتمد' : 'في الانتظار'}
                  </Badge>
                </div>
                
                {selectedAccessData.meetingLink && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">رابط المحاضرة</Label>
                    <div className="mt-2 p-3 border rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono">{selectedAccessData.meetingLink}</span>
                        <Button variant="outline" size="sm" onClick={() => window.open(selectedAccessData.meetingLink, '_blank')}>
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {!selectedAccessData.accessGranted && selectedAccessData.paymentStatus === 'approved' && (
                  <>
                    <div>
                      <Label htmlFor="admin-notes">ملاحظات الإدارة</Label>
                      <Textarea
                        id="admin-notes"
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        placeholder="أضف ملاحظات حول القرار..."
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleGrantAccess(selectedAccessData.id)}
                        disabled={loading}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 ml-2" />
                        منح الوصول
                      </Button>
                      <Button
                        onClick={() => handleDenyAccess(selectedAccessData.id)}
                        disabled={loading}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 ml-2" />
                        رفض الوصول
                      </Button>
                    </div>
                  </>
                )}
                
                {selectedAccessData.accessGranted && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">تم منح الوصول</span>
                    </div>
                    <p className="text-sm text-green-700">
                      تم منح الوصول في: {selectedAccessData.grantedAt?.toLocaleString('ar-EG')}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline">
                        <Bell className="h-3 w-3 ml-1" />
                        إشعار الطالب
                      </Button>
                      <Button size="sm" variant="outline">
                        <UserPlus className="h-3 w-3 ml-1" />
                        إشعار المدرس
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>اختر طلب وصول لعرض التفاصيل</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LectureAccessManagement;

