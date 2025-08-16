import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { 
  Video, 
  Upload, 
  Play, 
  Pause,
  Calendar,
  Clock,
  Users,
  Eye,
  Settings,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Monitor,
  FileVideo,
  Link,
  User,
  GraduationCap,
  Search,
  Filter
} from 'lucide-react';

interface LectureData {
  id: string;
  teacherId: string;
  teacherName: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  type: 'live' | 'recorded';
  status: 'pending' | 'approved' | 'rejected' | 'live' | 'completed';
  scheduledDate: Date;
  duration: number; // in minutes
  meetingLink?: string;
  recordingUrl?: string;
  enrolledStudents: number;
  maxStudents: number;
  createdAt: Date;
  approvedBy?: string;
  rejectionReason?: string;
}

const mockLectures: LectureData[] = [
  {
    id: '1',
    teacherId: 'teacher_1',
    teacherName: 'د. سارة أحمد',
    courseId: 'course_1',
    courseName: 'الرياضيات المتقدمة',
    title: 'الجبر الخطي - المحاضرة الأولى',
    description: 'مقدمة في الجبر الخطي والمصفوفات',
    type: 'live',
    status: 'pending',
    scheduledDate: new Date('2024-01-25T16:00:00'),
    duration: 90,
    enrolledStudents: 15,
    maxStudents: 30,
    createdAt: new Date('2024-01-20T10:00:00')
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
    status: 'approved',
    scheduledDate: new Date('2024-01-26T14:00:00'),
    duration: 60,
    meetingLink: 'https://meet.google.com/xyz-uvw-rst',
    enrolledStudents: 22,
    maxStudents: 25,
    createdAt: new Date('2024-01-18T09:30:00'),
    approvedBy: 'admin_1'
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
    enrolledStudents: 28,
    maxStudents: 30,
    createdAt: new Date('2024-01-10T11:00:00'),
    approvedBy: 'admin_1'
  }
];

const LectureManagement = () => {
  const [lectures, setLectures] = useState<LectureData[]>(mockLectures);
  const [selectedLecture, setSelectedLecture] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'live' | 'completed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'live' | 'recorded'>('all');
  const [adminNotes, setAdminNotes] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredLectures = lectures.filter(lecture => {
    const matchesSearch = lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecture.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecture.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lecture.status === statusFilter;
    const matchesType = typeFilter === 'all' || lecture.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const pendingLectures = lectures.filter(lecture => lecture.status === 'pending');
  const approvedLectures = lectures.filter(lecture => lecture.status === 'approved');
  const liveLectures = lectures.filter(lecture => lecture.status === 'live');

  const handleApproveLecture = async (lectureId: string) => {
    if (!meetingLink.trim() && lectures.find(l => l.id === lectureId)?.type === 'live') {
      alert('يرجى إدخال رابط المحاضرة المباشرة');
      return;
    }
    
    setLoading(true);
    
    const updatedLectures = lectures.map(lecture => {
      if (lecture.id === lectureId) {
        return {
          ...lecture,
          status: 'approved' as const,
          meetingLink: lecture.type === 'live' ? meetingLink : undefined,
          approvedBy: 'admin_1'
        };
      }
      return lecture;
    });

    setLectures(updatedLectures);
    
    // إرسال إشعار للمدرس
    const lectureData = lectures.find(l => l.id === lectureId);
    if (lectureData) {
      console.log('إرسال إشعار موافقة للمدرس:', lectureData.teacherName);
    }
    
    setLoading(false);
    setSelectedLecture(null);
    setMeetingLink('');
  };

  const handleRejectLecture = async (lectureId: string) => {
    if (!adminNotes.trim()) {
      alert('يرجى إدخال سبب رفض المحاضرة');
      return;
    }
    
    setLoading(true);
    
    const updatedLectures = lectures.map(lecture => {
      if (lecture.id === lectureId) {
        return {
          ...lecture,
          status: 'rejected' as const,
          rejectionReason: adminNotes
        };
      }
      return lecture;
    });

    setLectures(updatedLectures);
    
    setLoading(false);
    setSelectedLecture(null);
    setAdminNotes('');
  };

  const handleStartLiveLecture = async (lectureId: string) => {
    setLoading(true);
    
    const updatedLectures = lectures.map(lecture => {
      if (lecture.id === lectureId) {
        return {
          ...lecture,
          status: 'live' as const
        };
      }
      return lecture;
    });

    setLectures(updatedLectures);
    
    // إرسال إشعارات للطلاب المسجلين
    const lectureData = lectures.find(l => l.id === lectureId);
    if (lectureData) {
      console.log('إرسال إشعارات بدء المحاضرة للطلاب المسجلين:', lectureData.enrolledStudents);
    }
    
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 ml-1" />في الانتظار</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 ml-1" />معتمدة</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 ml-1" />مرفوضة</Badge>;
      case 'live':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Play className="h-3 w-3 ml-1" />مباشرة</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800"><CheckCircle className="h-3 w-3 ml-1" />مكتملة</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    return type === 'live' ? 
      <Badge variant="outline" className="text-red-600 border-red-200"><Monitor className="h-3 w-3 ml-1" />مباشرة</Badge> :
      <Badge variant="outline" className="text-blue-600 border-blue-200"><FileVideo className="h-3 w-3 ml-1" />مسجلة</Badge>;
  };

  const selectedLectureData = lectures.find(lecture => lecture.id === selectedLecture);

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
              <div className="text-2xl font-bold text-yellow-600">{pendingLectures.length}</div>
              <div className="text-sm text-muted-foreground">في الانتظار</div>
            </div>
          </div>
        </Card>

        <Card className="card-educational p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{approvedLectures.length}</div>
              <div className="text-sm text-muted-foreground">معتمدة</div>
            </div>
          </div>
        </Card>

        <Card className="card-educational p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Play className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{liveLectures.length}</div>
              <div className="text-sm text-muted-foreground">مباشرة الآن</div>
            </div>
          </div>
        </Card>

        <Card className="card-educational p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {lectures.reduce((sum, lecture) => sum + lecture.enrolledStudents, 0)}
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
                placeholder="البحث بالمحاضرة، المدرس، أو الكورس..."
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
              <option value="pending">في الانتظار</option>
              <option value="approved">معتمدة</option>
              <option value="rejected">مرفوضة</option>
              <option value="live">مباشرة</option>
              <option value="completed">مكتملة</option>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lectures List */}
        <div className="lg:col-span-2">
          <Card className="card-educational">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-primary">المحاضرات</h2>
            </div>
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {filteredLectures.map((lecture) => (
                <div
                  key={lecture.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedLecture === lecture.id ? 'bg-primary/5 border-r-4 border-primary' : ''
                  }`}
                  onClick={() => setSelectedLecture(lecture.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{lecture.title}</span>
                    </div>
                    <div className="flex gap-2">
                      {getStatusBadge(lecture.status)}
                      {getTypeBadge(lecture.type)}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
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
                        <span className="text-sm">{lecture.duration} دقيقة</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{lecture.enrolledStudents}/{lecture.maxStudents}</span>
                      </div>
                    </div>
                    
                    {lecture.status === 'live' && (
                      <div className="flex items-center gap-1 text-red-600">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium">مباشرة</span>
                      </div>
                    )}
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

        {/* Lecture Details */}
        <div>
          <Card className="card-educational">
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold text-primary">تفاصيل المحاضرة</h3>
            </div>
            
            {selectedLectureData ? (
              <div className="p-6 space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">عنوان المحاضرة</Label>
                  <p className="font-medium">{selectedLectureData.title}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">الوصف</Label>
                  <p className="text-sm">{selectedLectureData.description}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">المدرس</Label>
                  <p className="font-medium">{selectedLectureData.teacherName}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">الكورس</Label>
                  <p className="font-medium">{selectedLectureData.courseName}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">النوع</Label>
                    <div className="mt-1">{getTypeBadge(selectedLectureData.type)}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">الحالة</Label>
                    <div className="mt-1">{getStatusBadge(selectedLectureData.status)}</div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">موعد المحاضرة</Label>
                  <p className="font-medium">
                    {selectedLectureData.scheduledDate.toLocaleDateString('ar-EG')} - {' '}
                    {selectedLectureData.scheduledDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">المدة</Label>
                  <p className="font-medium">{selectedLectureData.duration} دقيقة</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">الطلاب المسجلين</Label>
                  <p className="font-medium">{selectedLectureData.enrolledStudents} من {selectedLectureData.maxStudents}</p>
                </div>
                
                {selectedLectureData.meetingLink && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">رابط المحاضرة</Label>
                    <div className="mt-2 p-3 border rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono">{selectedLectureData.meetingLink}</span>
                        <Button variant="outline" size="sm" onClick={() => window.open(selectedLectureData.meetingLink, '_blank')}>
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedLectureData.recordingUrl && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">رابط التسجيل</Label>
                    <div className="mt-2 p-3 border rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono">{selectedLectureData.recordingUrl}</span>
                        <Button variant="outline" size="sm" onClick={() => window.open(selectedLectureData.recordingUrl, '_blank')}>
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedLectureData.status === 'pending' && (
                  <>
                    {selectedLectureData.type === 'live' && (
                      <div>
                        <Label htmlFor="meeting-link">رابط المحاضرة المباشرة</Label>
                        <Input
                          id="meeting-link"
                          value={meetingLink}
                          onChange={(e) => setMeetingLink(e.target.value)}
                          placeholder="https://meet.google.com/..."
                          className="mt-1"
                        />
                      </div>
                    )}
                    
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
                        onClick={() => handleApproveLecture(selectedLectureData.id)}
                        disabled={loading}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 ml-2" />
                        اعتماد المحاضرة
                      </Button>
                      <Button
                        onClick={() => handleRejectLecture(selectedLectureData.id)}
                        disabled={loading}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 ml-2" />
                        رفض المحاضرة
                      </Button>
                    </div>
                  </>
                )}
                
                {selectedLectureData.status === 'approved' && selectedLectureData.type === 'live' && (
                  <Button
                    onClick={() => handleStartLiveLecture(selectedLectureData.id)}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="h-4 w-4 ml-2" />
                    بدء المحاضرة المباشرة
                  </Button>
                )}
                
                {selectedLectureData.status === 'rejected' && selectedLectureData.rejectionReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-red-800">تم رفض المحاضرة</span>
                    </div>
                    <p className="text-sm text-red-700">
                      السبب: {selectedLectureData.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>اختر محاضرة لعرض التفاصيل</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LectureManagement;

