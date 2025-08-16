import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { usePaymentSystem } from '../hooks/usePaymentSystem';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  Star,
  Video,
  Play,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Users,
  GraduationCap,
  Monitor,
  FileVideo,
  Bell
} from 'lucide-react';

interface StudentLecture {
  id: string;
  teacherId: string;
  teacherName: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  type: 'live' | 'recorded';
  status: 'upcoming' | 'live' | 'completed' | 'missed';
  scheduledDate: Date;
  duration: number;
  meetingLink?: string;
  recordingUrl?: string;
  hasAccess: boolean;
  paymentStatus: 'paid' | 'pending' | 'approved';
  enrolledAt: Date;
}

const mockStudentLectures: StudentLecture[] = [
  {
    id: '1',
    teacherId: 'teacher_1',
    teacherName: 'د. سارة أحمد',
    courseId: 'course_1',
    courseName: 'الرياضيات المتقدمة',
    title: 'الجبر الخطي - المحاضرة الأولى',
    description: 'مقدمة في الجبر الخطي والمصفوفات',
    type: 'live',
    status: 'upcoming',
    scheduledDate: new Date('2024-01-25T16:00:00'),
    duration: 90,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    hasAccess: true,
    paymentStatus: 'paid',
    enrolledAt: new Date('2024-01-20T10:00:00')
  },
  {
    id: '2',
    teacherId: 'teacher_2',
    teacherName: 'أ. محمد علي',
    courseId: 'course_2',
    courseName: 'الفيزياء التطبيقية',
    title: 'قوانين نيوتن - المحاضرة الثانية',
    description: 'شرح مفصل لقوانين نيوتن الثلاثة',
    type: 'live',
    status: 'live',
    scheduledDate: new Date('2024-01-22T14:00:00'),
    duration: 60,
    meetingLink: 'https://meet.google.com/xyz-uvw-rst',
    hasAccess: true,
    paymentStatus: 'paid',
    enrolledAt: new Date('2024-01-18T09:30:00')
  },
  {
    id: '3',
    teacherId: 'teacher_1',
    teacherName: 'د. سارة أحمد',
    courseId: 'course_1',
    courseName: 'الرياضيات المتقدمة',
    title: 'التفاضل والتكامل - مراجعة',
    description: 'مراجعة شاملة لموضوع التفاضل والتكامل',
    type: 'recorded',
    status: 'completed',
    scheduledDate: new Date('2024-01-15T16:00:00'),
    duration: 75,
    recordingUrl: 'https://example.com/recording/123',
    hasAccess: true,
    paymentStatus: 'paid',
    enrolledAt: new Date('2024-01-10T11:00:00')
  },
  {
    id: '4',
    teacherId: 'teacher_3',
    teacherName: 'د. فاطمة محمود',
    courseId: 'course_3',
    courseName: 'الكيمياء العضوية',
    title: 'المركبات الهيدروكربونية',
    description: 'دراسة المركبات الهيدروكربونية وخصائصها',
    type: 'live',
    status: 'upcoming',
    scheduledDate: new Date('2024-01-28T15:00:00'),
    duration: 80,
    hasAccess: false,
    paymentStatus: 'pending',
    enrolledAt: new Date('2024-01-21T12:00:00')
  }
];

const StudentDashboardEnhanced = () => {
  const [lectures, setLectures] = useState<StudentLecture[]>(mockStudentLectures);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'live' | 'completed' | 'missed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'live' | 'recorded'>('all');

  // محاكاة معرف الطالب الحالي
  const currentStudentId = 'student_1';

  const filteredLectures = lectures.filter(lecture => {
    const matchesSearch = lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecture.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecture.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lecture.status === statusFilter;
    const matchesType = typeFilter === 'all' || lecture.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const upcomingLectures = lectures.filter(lecture => lecture.status === 'upcoming' && lecture.hasAccess);
  const liveLectures = lectures.filter(lecture => lecture.status === 'live' && lecture.hasAccess);
  const completedLectures = lectures.filter(lecture => lecture.status === 'completed' && lecture.hasAccess);
  const pendingPayments = lectures.filter(lecture => !lecture.hasAccess && lecture.paymentStatus === 'pending');

  const getStatusBadge = (lecture: StudentLecture) => {
    if (!lecture.hasAccess) {
      return <Badge variant="secondary" className="bg-red-100 text-red-800"><AlertCircle className="h-3 w-3 ml-1" />في انتظار الدفع</Badge>;
    }
    
    switch (lecture.status) {
      case 'upcoming':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Calendar className="h-3 w-3 ml-1" />قادمة</Badge>;
      case 'live':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><Play className="h-3 w-3 ml-1" />مباشرة الآن</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800"><CheckCircle className="h-3 w-3 ml-1" />مكتملة</Badge>;
      case 'missed':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 ml-1" />فائتة</Badge>;
      default:
        return <Badge variant="outline">{lecture.status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    return type === 'live' ? 
      <Badge variant="outline" className="text-red-600 border-red-200"><Monitor className="h-3 w-3 ml-1" />مباشرة</Badge> :
      <Badge variant="outline" className="text-blue-600 border-blue-200"><FileVideo className="h-3 w-3 ml-1" />مسجلة</Badge>;
  };

  const handleJoinLecture = (lecture: StudentLecture) => {
    if (lecture.meetingLink) {
      window.open(lecture.meetingLink, '_blank');
    }
  };

  const handleWatchRecording = (lecture: StudentLecture) => {
    if (lecture.recordingUrl) {
      window.open(lecture.recordingUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background rtl">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-educational rounded-xl flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-primary">لوحة تحكم الطالب - محاضراتي</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
              العودة للرئيسية
            </Button>
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium">أحمد محمد</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card-educational p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{upcomingLectures.length}</div>
                <div className="text-sm text-muted-foreground">محاضرات قادمة</div>
              </div>
            </div>
          </Card>

          <Card className="card-educational p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Play className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{liveLectures.length}</div>
                <div className="text-sm text-muted-foreground">مباشرة الآن</div>
              </div>
            </div>
          </Card>

          <Card className="card-educational p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">{completedLectures.length}</div>
                <div className="text-sm text-muted-foreground">مكتملة</div>
              </div>
            </div>
          </Card>

          <Card className="card-educational p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{pendingPayments.length}</div>
                <div className="text-sm text-muted-foreground">في انتظار الدفع</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Lectures Alert */}
        {liveLectures.length > 0 && (
          <Card className="card-educational border-green-200 bg-green-50">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                <h3 className="text-lg font-bold text-green-800">محاضرات مباشرة الآن!</h3>
              </div>
              <div className="space-y-2">
                {liveLectures.map(lecture => (
                  <div key={lecture.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div>
                      <p className="font-medium text-green-800">{lecture.title}</p>
                      <p className="text-sm text-green-600">{lecture.teacherName} - {lecture.courseName}</p>
                    </div>
                    <Button 
                      onClick={() => handleJoinLecture(lecture)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Play className="h-4 w-4 ml-2" />
                      انضم الآن
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Search and Filter */}
        <Card className="card-educational p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="البحث في المحاضرات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <div className="md:w-40">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="all">جميع الحالات</option>
                <option value="upcoming">قادمة</option>
                <option value="live">مباشرة</option>
                <option value="completed">مكتملة</option>
                <option value="missed">فائتة</option>
              </select>
            </div>
            <div className="md:w-32">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="all">جميع الأنواع</option>
                <option value="live">مباشرة</option>
                <option value="recorded">مسجلة</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Lectures List */}
        <Card className="card-educational">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-primary">محاضراتي</h2>
          </div>
          
          <div className="divide-y">
            {filteredLectures.map((lecture) => (
              <div key={lecture.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium text-lg">{lecture.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(lecture)}
                    {getTypeBadge(lecture.type)}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{lecture.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {lecture.teacherName} - {lecture.courseName}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{lecture.scheduledDate.toLocaleDateString('ar-EG')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {lecture.scheduledDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{lecture.duration} دقيقة</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {!lecture.hasAccess ? (
                      <Button variant="outline" disabled>
                        <AlertCircle className="h-4 w-4 ml-2" />
                        في انتظار الدفع
                      </Button>
                    ) : lecture.status === 'live' && lecture.meetingLink ? (
                      <Button 
                        onClick={() => handleJoinLecture(lecture)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Play className="h-4 w-4 ml-2" />
                        انضم الآن
                      </Button>
                    ) : lecture.status === 'upcoming' && lecture.meetingLink ? (
                      <Button variant="outline">
                        <Calendar className="h-4 w-4 ml-2" />
                        محجوزة
                      </Button>
                    ) : lecture.status === 'completed' && lecture.recordingUrl ? (
                      <Button 
                        onClick={() => handleWatchRecording(lecture)}
                        variant="outline"
                      >
                        <Play className="h-4 w-4 ml-2" />
                        مشاهدة التسجيل
                      </Button>
                    ) : null}
                    
                    {lecture.meetingLink && lecture.hasAccess && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(lecture.meetingLink, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredLectures.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد محاضرات تطابق البحث</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboardEnhanced;

