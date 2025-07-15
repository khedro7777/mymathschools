
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import PaymentMethods from '../components/PaymentMethods';
import { 
  User, 
  Star, 
  Calendar, 
  Video, 
  MessageSquare, 
  Award, 
  Clock,
  Users,
  BookOpen,
  ArrowLeft,
  Play,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

const TeacherProfile = () => {
  const { id } = useParams();
  const [showPayment, setShowPayment] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Dummy teacher data
  const teacherData = {
    id: 1,
    name: 'أ. محمد عبد الله',
    title: 'مدرس الكيمياء الدولية',
    image: '/placeholder.svg',
    rating: 4.8,
    totalStudents: 156,
    totalHours: 320,
    experience: '10 سنوات خبرة',
    bio: 'مدرس معتمد في الكيمياء الدولية بخبرة 10 سنوات في تدريس منهج IGCSE و Cambridge. حاصل على شهادة الماجستير في الكيمياء التطبيقية من جامعة القاهرة. أساعد الطلاب على فهم المفاهيم الكيميائية المعقدة بطريقة سهلة ومبسطة.',
    subjects: ['كيمياء IGCSE', 'كيمياء Cambridge', 'كيمياء AS Level', 'كيمياء A Level'],
    monthlyPrice: 450,
    achievements: [
      'شهادة Cambridge المعتمدة',
      'شهادة Zoom Certified Educator',
      'جائزة أفضل مدرس كيمياء 2023',
      '98% معدل نجاح الطلاب'
    ],
    schedule: [
      { day: 'السبت', time: '16:00 - 18:00', subject: 'كيمياء - الثالث الثانوي', link: 'https://meet.google.com/abc-defg' },
      { day: 'الاثنين', time: '14:00 - 16:00', subject: 'كيمياء - AS Level', link: 'https://meet.google.com/hij-klmn' },
      { day: 'الأربعاء', time: '16:00 - 18:00', subject: 'كيمياء - IGCSE', link: 'https://meet.google.com/opq-rstu' },
      { day: 'الجمعة', time: '10:00 - 12:00', subject: 'مراجعة شاملة', link: 'https://meet.google.com/vwx-yz12' }
    ],
    videos: [
      { title: 'الروابط الكيميائية - الجزء الأول', duration: '45 دقيقة', views: 1250, thumbnail: '/placeholder.svg' },
      { title: 'التفاعلات الكيميائية المتقدمة', duration: '38 دقيقة', views: 980, thumbnail: '/placeholder.svg' },
      { title: 'الكيمياء العضوية المبسطة', duration: '52 دقيقة', views: 1450, thumbnail: '/placeholder.svg' },
      { title: 'تجارب الكيمياء العملية', duration: '35 دقيقة', views: 760, thumbnail: '/placeholder.svg' }
    ],
    reviews: [
      { student: 'أحمد محمد', rating: 5, comment: 'أفضل مدرس كيمياء! شرحه واضح ومفهوم', date: '2024-01-15' },
      { student: 'نور الهدى', rating: 5, comment: 'استطعت فهم الكيمياء لأول مرة بفضل شرح الأستاذ', date: '2024-01-10' },
      { student: 'محمود علي', rating: 4, comment: 'مدرس ممتاز ومتفاني في عمله', date: '2024-01-08' },
      { student: 'مريم سالم', rating: 5, comment: 'أسلوب تدريس رائع وتفاعل مميز مع الطلاب', date: '2024-01-05' }
    ]
  };

  const handleSubscribeClick = () => {
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setIsSubscribed(true);
    setShowPayment(false);
    // التنقل لجدول المحاضرات
    setTimeout(() => {
      window.location.href = '/student/lectures';
    }, 1500);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };

  if (showPayment) {
    return (
      <div className="min-h-screen bg-background rtl">
        {/* Header */}
        <header className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" onClick={() => setShowPayment(false)} className="mb-4">
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة لملف المدرس
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">الاشتراك في حصص {teacherData.name}</h1>
            <p className="text-muted-foreground">اختر طريقة الدفع المناسبة لك</p>
          </div>

          <PaymentMethods 
            onPaymentComplete={handlePaymentComplete}
            totalAmount={teacherData.monthlyPrice}
            itemName={`الاشتراك الشهري - ${teacherData.name}`}
          />
        </div>
      </div>
    );
  }

  if (isSubscribed) {
    return (
      <div className="min-h-screen bg-background rtl flex items-center justify-center">
        <Card className="card-educational p-8 text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">تم الاشتراك بنجاح!</h2>
          <p className="text-muted-foreground mb-4">
            تم تأكيد اشتراكك في حصص {teacherData.name}
          </p>
          <p className="text-sm text-muted-foreground">
            جاري التحويل إلى صفحة الحصص المسجلة...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background rtl">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة للبحث
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="card-educational p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 bg-gradient-to-r from-primary to-educational rounded-full flex items-center justify-center">
              <User className="h-16 w-16 text-white" />
            </div>
            
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl font-bold text-primary mb-2">{teacherData.name}</h1>
              <p className="text-xl text-educational mb-4">{teacherData.title}</p>
              <p className="text-muted-foreground mb-4">{teacherData.bio}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center gap-2">
                  {renderStars(teacherData.rating)}
                  <span className="font-medium">({teacherData.rating})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{teacherData.totalStudents} طالب</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{teacherData.totalHours} ساعة تدريس</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {teacherData.subjects.map((subject, index) => (
                  <Badge key={index} variant="default" className="bg-educational text-educational-foreground">{subject}</Badge>
                ))}
              </div>

              <div className="bg-primary/10 rounded-lg p-4 mb-4">
                <div className="text-2xl font-bold text-primary">{teacherData.monthlyPrice} ج.م</div>
                <div className="text-sm text-muted-foreground">الاشتراك الشهري</div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-educational"
                onClick={handleSubscribeClick}
              >
                اشترك بالحصة
              </Button>
              <Button variant="outline" size="lg">
                <MessageSquare className="h-4 w-4 ml-2" />
                راسل المدرس
              </Button>
            </div>
          </div>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schedule">جدول المحاضرات</TabsTrigger>
            <TabsTrigger value="videos">مكتبة الفيديوهات</TabsTrigger>
            <TabsTrigger value="achievements">الإنجازات</TabsTrigger>
            <TabsTrigger value="reviews">التقييمات</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="mt-6">
            <Card className="card-educational p-6">
              <h3 className="text-xl font-bold text-primary mb-6">جدول المحاضرات المباشرة</h3>
              <div className="grid gap-4">
                {teacherData.schedule.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{session.subject}</h4>
                        <p className="text-sm text-muted-foreground">{session.day} - {session.time}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 ml-2" />
                      انضم للحصة
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <Card className="card-educational p-6">
              <h3 className="text-xl font-bold text-primary mb-6">مكتبة الفيديوهات التعليمية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teacherData.videos.map((video, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <Play className="h-12 w-12 text-primary" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold mb-2">{video.title}</h4>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{video.duration}</span>
                        <span>{video.views} مشاهدة</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <Card className="card-educational p-6">
              <h3 className="text-xl font-bold text-primary mb-6">الإنجازات والشهادات</h3>
              <div className="grid gap-4">
                {teacherData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-educational/10 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-educational" />
                    </div>
                    <span className="font-medium">{achievement}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="card-educational p-6">
              <h3 className="text-xl font-bold text-primary mb-6">تقييمات الطلاب</h3>
              <div className="space-y-4">
                {teacherData.reviews.map((review, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.student}</span>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-2">{review.comment}</p>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherProfile;
