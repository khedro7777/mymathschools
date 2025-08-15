import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Award,
  Eye,
  Download,
  MessageSquare,
  Calendar,
  Star,
  AlertTriangle,
  FileText,
  Filter,
  Search
} from 'lucide-react';

interface TeacherApplication {
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
  documents: {
    cv: string;
    degree: string;
    nationalIdCopy: string;
    photo: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  applicationDate: string;
  reviewNotes?: string;
  reviewedBy?: string;
  reviewDate?: string;
}

const TeacherApproval = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedApplication, setSelectedApplication] = useState<TeacherApplication | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // بيانات تجريبية لطلبات التسجيل
  const applications: TeacherApplication[] = [
    {
      id: '1',
      personalInfo: {
        fullName: 'د. أحمد محمود سالم',
        email: 'ahmed.mahmoud@email.com',
        phone: '01234567890',
        nationalId: '12345678901234',
        dateOfBirth: '1985-05-15',
        address: 'القاهرة، مصر الجديدة، شارع الحجاز 25'
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
      documents: {
        cv: 'cv_ahmed_mahmoud.pdf',
        degree: 'degree_ahmed_mahmoud.pdf',
        nationalIdCopy: 'id_ahmed_mahmoud.pdf',
        photo: 'photo_ahmed_mahmoud.jpg'
      },
      status: 'pending',
      applicationDate: '2024-03-15T10:30:00Z'
    },
    {
      id: '2',
      personalInfo: {
        fullName: 'أ. سارة أحمد علي',
        email: 'sara.ahmed@email.com',
        phone: '01234567891',
        nationalId: '12345678901235',
        dateOfBirth: '1990-08-22',
        address: 'الجيزة، المهندسين، شارع جامعة الدول العربية 10'
      },
      academicInfo: {
        degree: 'ماجستير',
        university: 'جامعة عين شمس',
        graduationYear: '2018',
        specialization: 'الكيمياء العضوية',
        subjects: ['الكيمياء', 'الأحياء'],
        experience: '3-5'
      },
      teachingInfo: {
        preferredGrades: ['الصف الأول الثانوي', 'الصف الثاني الثانوي', 'الصف الثالث الثانوي'],
        teachingMethod: 'أونلاين',
        availability: ['بعد الظهر', 'المساء'],
        hourlyRate: '120'
      },
      documents: {
        cv: 'cv_sara_ahmed.pdf',
        degree: 'degree_sara_ahmed.pdf',
        nationalIdCopy: 'id_sara_ahmed.pdf',
        photo: 'photo_sara_ahmed.jpg'
      },
      status: 'under_review',
      applicationDate: '2024-03-14T14:20:00Z'
    },
    {
      id: '3',
      personalInfo: {
        fullName: 'د. محمد عبد الرحمن',
        email: 'mohamed.abdelrahman@email.com',
        phone: '01234567892',
        nationalId: '12345678901236',
        dateOfBirth: '1982-12-10',
        address: 'الإسكندرية، سموحة، شارع فؤاد 15'
      },
      academicInfo: {
        degree: 'دكتوراه',
        university: 'جامعة الإسكندرية',
        graduationYear: '2012',
        specialization: 'الفيزياء النظرية',
        subjects: ['الفيزياء', 'الرياضيات'],
        experience: '10+'
      },
      teachingInfo: {
        preferredGrades: ['الصف الثالث الثانوي'],
        teachingMethod: 'مختلط',
        availability: ['الصباح', 'بعد الظهر'],
        hourlyRate: '200'
      },
      documents: {
        cv: 'cv_mohamed_abdelrahman.pdf',
        degree: 'degree_mohamed_abdelrahman.pdf',
        nationalIdCopy: 'id_mohamed_abdelrahman.pdf',
        photo: 'photo_mohamed_abdelrahman.jpg'
      },
      status: 'approved',
      applicationDate: '2024-03-10T09:15:00Z',
      reviewNotes: 'مؤهلات ممتازة وخبرة واسعة في التدريس',
      reviewedBy: 'المشرف العام',
      reviewDate: '2024-03-12T11:30:00Z'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-warning text-warning-foreground"><Clock className="h-3 w-3 ml-1" />في الانتظار</Badge>;
      case 'under_review':
        return <Badge className="bg-blue-500 text-white"><Eye className="h-3 w-3 ml-1" />قيد المراجعة</Badge>;
      case 'approved':
        return <Badge className="bg-success text-success-foreground"><CheckCircle className="h-3 w-3 ml-1" />مقبول</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive text-destructive-foreground"><XCircle className="h-3 w-3 ml-1" />مرفوض</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleApprove = (applicationId: string) => {
    // منطق الموافقة
    console.log('Approving application:', applicationId);
    // يمكن إضافة API call هنا
  };

  const handleReject = (applicationId: string, notes: string) => {
    // منطق الرفض
    console.log('Rejecting application:', applicationId, 'Notes:', notes);
    // يمكن إضافة API call هنا
  };

  const handleSetUnderReview = (applicationId: string) => {
    // منطق وضع تحت المراجعة
    console.log('Setting under review:', applicationId);
    // يمكن إضافة API call هنا
  };

  const filteredApplications = applications.filter(app => {
    const matchesTab = activeTab === 'all' || app.status === activeTab;
    const matchesSearch = app.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.personalInfo.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const ApplicationCard = ({ application }: { application: TeacherApplication }) => (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{application.personalInfo.fullName}</h3>
            <p className="text-sm text-muted-foreground">{application.personalInfo.email}</p>
            <p className="text-sm text-muted-foreground">{application.personalInfo.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(application.status)}
          <span className="text-xs text-muted-foreground">
            {new Date(application.applicationDate).toLocaleDateString('ar-EG')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">التخصص</h4>
          <p className="text-sm">{application.academicInfo.specialization}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">المواد</h4>
          <p className="text-sm">{application.academicInfo.subjects.join(', ')}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">السعر المطلوب</h4>
          <p className="text-sm">{application.teachingInfo.hourlyRate} ج.م/حصة</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{application.academicInfo.degree}</Badge>
          <Badge variant="outline">{application.academicInfo.university}</Badge>
          <Badge variant="outline">{application.academicInfo.experience} سنوات خبرة</Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                <Eye className="h-4 w-4 ml-2" />
                عرض التفاصيل
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>تفاصيل طلب التسجيل</DialogTitle>
              </DialogHeader>
              {selectedApplication && <ApplicationDetails application={selectedApplication} />}
            </DialogContent>
          </Dialog>

          {application.status === 'pending' && (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSetUnderReview(application.id)}
              >
                <Clock className="h-4 w-4 ml-2" />
                قيد المراجعة
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => handleApprove(application.id)}
              >
                <CheckCircle className="h-4 w-4 ml-2" />
                موافقة
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleReject(application.id, reviewNotes)}
              >
                <XCircle className="h-4 w-4 ml-2" />
                رفض
              </Button>
            </>
          )}

          {application.status === 'under_review' && (
            <>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => handleApprove(application.id)}
              >
                <CheckCircle className="h-4 w-4 ml-2" />
                موافقة
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleReject(application.id, reviewNotes)}
              >
                <XCircle className="h-4 w-4 ml-2" />
                رفض
              </Button>
            </>
          )}
        </div>
      </div>

      {application.reviewNotes && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>ملاحظات المراجعة:</strong> {application.reviewNotes}
          </p>
          {application.reviewedBy && application.reviewDate && (
            <p className="text-xs text-muted-foreground mt-1">
              تمت المراجعة بواسطة {application.reviewedBy} في {new Date(application.reviewDate).toLocaleDateString('ar-EG')}
            </p>
          )}
        </div>
      )}
    </Card>
  );

  const ApplicationDetails = ({ application }: { application: TeacherApplication }) => (
    <div className="space-y-6">
      {/* المعلومات الشخصية */}
      <div>
        <h3 className="text-lg font-semibold mb-3">المعلومات الشخصية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>الاسم الكامل</Label>
            <p className="text-sm">{application.personalInfo.fullName}</p>
          </div>
          <div>
            <Label>البريد الإلكتروني</Label>
            <p className="text-sm">{application.personalInfo.email}</p>
          </div>
          <div>
            <Label>رقم الهاتف</Label>
            <p className="text-sm">{application.personalInfo.phone}</p>
          </div>
          <div>
            <Label>الرقم القومي</Label>
            <p className="text-sm">{application.personalInfo.nationalId}</p>
          </div>
          <div>
            <Label>تاريخ الميلاد</Label>
            <p className="text-sm">{new Date(application.personalInfo.dateOfBirth).toLocaleDateString('ar-EG')}</p>
          </div>
          <div className="md:col-span-2">
            <Label>العنوان</Label>
            <p className="text-sm">{application.personalInfo.address}</p>
          </div>
        </div>
      </div>

      {/* المؤهلات الأكاديمية */}
      <div>
        <h3 className="text-lg font-semibold mb-3">المؤهلات الأكاديمية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>الدرجة العلمية</Label>
            <p className="text-sm">{application.academicInfo.degree}</p>
          </div>
          <div>
            <Label>الجامعة</Label>
            <p className="text-sm">{application.academicInfo.university}</p>
          </div>
          <div>
            <Label>سنة التخرج</Label>
            <p className="text-sm">{application.academicInfo.graduationYear}</p>
          </div>
          <div>
            <Label>التخصص</Label>
            <p className="text-sm">{application.academicInfo.specialization}</p>
          </div>
          <div>
            <Label>سنوات الخبرة</Label>
            <p className="text-sm">{application.academicInfo.experience} سنوات</p>
          </div>
          <div>
            <Label>المواد</Label>
            <div className="flex flex-wrap gap-1 mt-1">
              {application.academicInfo.subjects.map((subject) => (
                <Badge key={subject} variant="outline">{subject}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* معلومات التدريس */}
      <div>
        <h3 className="text-lg font-semibold mb-3">معلومات التدريس</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>طريقة التدريس</Label>
            <p className="text-sm">{application.teachingInfo.teachingMethod}</p>
          </div>
          <div>
            <Label>السعر المطلوب</Label>
            <p className="text-sm">{application.teachingInfo.hourlyRate} ج.م/حصة</p>
          </div>
          <div>
            <Label>الصفوف المفضلة</Label>
            <div className="flex flex-wrap gap-1 mt-1">
              {application.teachingInfo.preferredGrades.map((grade) => (
                <Badge key={grade} variant="outline" className="text-xs">{grade}</Badge>
              ))}
            </div>
          </div>
          <div>
            <Label>أوقات التوفر</Label>
            <div className="flex flex-wrap gap-1 mt-1">
              {application.teachingInfo.availability.map((time) => (
                <Badge key={time} variant="outline">{time}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* المستندات */}
      <div>
        <h3 className="text-lg font-semibold mb-3">المستندات</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(application.documents).map(([key, filename]) => (
            <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{getDocumentLabel(key)}</span>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 ml-2" />
                تحميل
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* إجراءات المراجعة */}
      <div>
        <h3 className="text-lg font-semibold mb-3">إجراءات المراجعة</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="reviewNotes">ملاحظات المراجعة</Label>
            <Textarea
              id="reviewNotes"
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              placeholder="أضف ملاحظاتك حول الطلب..."
              className="mt-1"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="default"
              onClick={() => handleApprove(application.id)}
            >
              <CheckCircle className="h-4 w-4 ml-2" />
              موافقة على الطلب
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => handleSetUnderReview(application.id)}
            >
              <Clock className="h-4 w-4 ml-2" />
              وضع قيد المراجعة
            </Button>
            
            <Button 
              variant="destructive"
              onClick={() => handleReject(application.id, reviewNotes)}
            >
              <XCircle className="h-4 w-4 ml-2" />
              رفض الطلب
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const getDocumentLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      cv: 'السيرة الذاتية',
      degree: 'الشهادة الجامعية',
      nationalIdCopy: 'صورة البطاقة الشخصية',
      photo: 'الصورة الشخصية'
    };
    return labels[key] || key;
  };

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="text-sm font-medium text-muted-foreground">{children}</label>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">موافقة طلبات المدرسين</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="البحث في الطلبات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 w-64"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 ml-2" />
            فلترة
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-warning">
                {applications.filter(app => app.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground">في الانتظار</div>
            </div>
            <Clock className="h-8 w-8 text-warning" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-500">
                {applications.filter(app => app.status === 'under_review').length}
              </div>
              <div className="text-sm text-muted-foreground">قيد المراجعة</div>
            </div>
            <Eye className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-success">
                {applications.filter(app => app.status === 'approved').length}
              </div>
              <div className="text-sm text-muted-foreground">مقبول</div>
            </div>
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-destructive">
                {applications.filter(app => app.status === 'rejected').length}
              </div>
              <div className="text-sm text-muted-foreground">مرفوض</div>
            </div>
            <XCircle className="h-8 w-8 text-destructive" />
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="pending">في الانتظار</TabsTrigger>
          <TabsTrigger value="under_review">قيد المراجعة</TabsTrigger>
          <TabsTrigger value="approved">مقبول</TabsTrigger>
          <TabsTrigger value="rejected">مرفوض</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))
            ) : (
              <Card className="p-8 text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">لا توجد طلبات</h3>
                <p className="text-muted-foreground">لا توجد طلبات تسجيل في هذه الفئة حالياً</p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherApproval;

