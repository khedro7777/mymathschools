import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  User, 
  MapPin, 
  BookOpen, 
  GraduationCap,
  Upload,
  Video,
  Calendar,
  Award,
  AlertTriangle,
  CheckCircle,
  Save,
  Eye
} from 'lucide-react';

const ProfileSetup = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [showWarning, setShowWarning] = useState(true);

  // بيانات البروفايل
  const [profileData, setProfileData] = useState({
    // المعلومات الأساسية
    profileImage: '',
    fullName: 'د. سارة أحمد محمد',
    city: 'القاهرة',
    phone: '01234567890',
    email: 'sara.ahmed@example.com',
    bio: 'مدرسة رياضيات متخصصة في المرحلة الثانوية مع خبرة 10 سنوات',
    
    // التخصصات والمواد
    subjects: ['رياضيات', 'جبر', 'هندسة', 'حساب مثلثات'],
    grades: ['الصف الأول الثانوي', 'الصف الثاني الثانوي', 'الصف الثالث الثانوي'],
    educationTypes: ['مصري', 'IGCSE', 'أمريكي'],
    
    // الشهادات والمؤهلات
    certificates: [
      { id: '1', name: 'بكالوريوس رياضيات', file: 'bachelor-math.pdf', verified: true },
      { id: '2', name: 'ماجستير تربية رياضيات', file: 'master-education.pdf', verified: false }
    ],
    
    // الفيديوهات التعريفية
    videos: [
      { id: '1', title: 'مقدمة عني', url: 'https://youtube.com/watch?v=example1', duration: '3:45' },
      { id: '2', title: 'طريقة تدريسي', url: 'https://youtube.com/watch?v=example2', duration: '5:20' }
    ],
    
    // رابط Google Meet
    meetLink: 'https://meet.google.com/abc-defg-hij',
    
    // جدول المواعيد
    schedule: {
      saturday: { available: true, slots: ['10:00-12:00', '14:00-16:00', '18:00-20:00'] },
      sunday: { available: true, slots: ['10:00-12:00', '14:00-16:00'] },
      monday: { available: true, slots: ['16:00-18:00', '18:00-20:00'] },
      tuesday: { available: true, slots: ['10:00-12:00', '14:00-16:00'] },
      wednesday: { available: true, slots: ['18:00-20:00'] },
      thursday: { available: false, slots: [] },
      friday: { available: false, slots: [] }
    },
    
    // الإنجازات
    achievements: [
      'أفضل مدرس رياضيات 2023',
      'شهادة تقدير من وزارة التربية والتعليم',
      'مدرب معتمد في التعلم الرقمي'
    ],
    
    // إعدادات الظهور
    isPublic: true,
    showInSearch: true
  });

  // حساب نسبة الإكمال
  useEffect(() => {
    const calculateCompletion = () => {
      let completed = 0;
      const total = 12; // إجمالي العناصر المطلوبة

      if (profileData.profileImage) completed++;
      if (profileData.fullName) completed++;
      if (profileData.city) completed++;
      if (profileData.bio) completed++;
      if (profileData.subjects.length > 0) completed++;
      if (profileData.grades.length > 0) completed++;
      if (profileData.educationTypes.length > 0) completed++;
      if (profileData.certificates.length > 0) completed++;
      if (profileData.videos.length > 0) completed++;
      if (profileData.meetLink) completed++;
      if (Object.values(profileData.schedule).some(day => day.available)) completed++;
      if (profileData.achievements.length > 0) completed++;

      const percentage = Math.round((completed / total) * 100);
      setCompletionPercentage(percentage);
      setShowWarning(percentage < 70);
    };

    calculateCompletion();
  }, [profileData]);

  const handleSaveProfile = () => {
    console.log('حفظ البروفايل:', profileData);
    // هنا سيتم حفظ البيانات وتحديث كارت المدرس
  };

  const handlePublishProfile = () => {
    if (completionPercentage >= 70) {
      console.log('نشر البروفايل:', profileData);
      // هنا سيتم نشر البروفايل ليظهر في البحث
    }
  };

  const addSubject = (subject: string) => {
    if (subject && !profileData.subjects.includes(subject)) {
      setProfileData({
        ...profileData,
        subjects: [...profileData.subjects, subject]
      });
    }
  };

  const removeSubject = (subject: string) => {
    setProfileData({
      ...profileData,
      subjects: profileData.subjects.filter(s => s !== subject)
    });
  };

  const addVideo = (title: string, url: string) => {
    const newVideo = {
      id: Date.now().toString(),
      title,
      url,
      duration: '0:00'
    };
    setProfileData({
      ...profileData,
      videos: [...profileData.videos, newVideo]
    });
  };

  const removeVideo = (id: string) => {
    setProfileData({
      ...profileData,
      videos: profileData.videos.filter(v => v.id !== id)
    });
  };

  const updateSchedule = (day: string, available: boolean, slots: string[]) => {
    setProfileData({
      ...profileData,
      schedule: {
        ...profileData.schedule,
        [day]: { available, slots }
      }
    });
  };

  const getDayName = (day: string) => {
    const days = {
      saturday: 'السبت',
      sunday: 'الأحد',
      monday: 'الاثنين',
      tuesday: 'الثلاثاء',
      wednesday: 'الأربعاء',
      thursday: 'الخميس',
      friday: 'الجمعة'
    };
    return days[day as keyof typeof days] || day;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">إعداد البروفايل</h1>
          <p className="text-muted-foreground">أكمل بياناتك لتظهر في محرك البحث</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSaveProfile}>
            <Save className="h-4 w-4 ml-2" />
            حفظ
          </Button>
          <Button 
            onClick={handlePublishProfile}
            disabled={completionPercentage < 70}
            className="bg-success hover:bg-success/90"
          >
            <Eye className="h-4 w-4 ml-2" />
            نشر البروفايل
          </Button>
        </div>
      </div>

      {/* شريط التقدم والتحذير */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">نسبة إكمال البروفايل</h3>
            <p className="text-sm text-muted-foreground">
              يجب إكمال 70% على الأقل للظهور في محرك البحث
            </p>
          </div>
          <div className="text-2xl font-bold text-primary">{completionPercentage}%</div>
        </div>
        
        <Progress value={completionPercentage} className="mb-4" />
        
        {showWarning && (
          <div className="flex items-center gap-2 p-3 bg-warning/10 text-warning rounded-lg">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm">
              بروفايلك غير مكتمل. أكمل البيانات المطلوبة للظهور في نتائج البحث.
            </span>
          </div>
        )}
        
        {completionPercentage >= 70 && (
          <div className="flex items-center gap-2 p-3 bg-success/10 text-success rounded-lg">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm">
              ممتاز! بروفايلك مكتمل ويظهر في نتائج البحث.
            </span>
          </div>
        )}
      </Card>

      {/* تبويبات إعداد البروفايل */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">المعلومات الأساسية</TabsTrigger>
          <TabsTrigger value="subjects">التخصصات</TabsTrigger>
          <TabsTrigger value="credentials">الشهادات</TabsTrigger>
          <TabsTrigger value="media">الوسائط</TabsTrigger>
          <TabsTrigger value="schedule">المواعيد</TabsTrigger>
        </TabsList>

        {/* المعلومات الأساسية */}
        <TabsContent value="basic" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">المعلومات الشخصية</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">الصورة الشخصية</label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      {profileData.profileImage ? (
                        <img src={profileData.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User className="h-8 w-8 text-primary" />
                      )}
                    </div>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 ml-2" />
                      رفع صورة
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">الاسم الكامل *</label>
                  <Input
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                    placeholder="الاسم الكامل"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">المدينة *</label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      value={profileData.city}
                      onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                      placeholder="المدينة"
                      className="pr-10"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">رقم الهاتف</label>
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    placeholder="رقم الهاتف"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">البريد الإلكتروني</label>
                  <Input
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    placeholder="البريد الإلكتروني"
                    type="email"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">نبذة تعريفية *</label>
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    placeholder="اكتب نبذة تعريفية عنك وخبراتك..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* التخصصات */}
        <TabsContent value="subjects" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">المواد والتخصصات</h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium">المواد التي تدرسها *</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profileData.subjects.map(subject => (
                    <Badge key={subject} variant="secondary" className="cursor-pointer" onClick={() => removeSubject(subject)}>
                      {subject} ×
                    </Badge>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <Input placeholder="أضف مادة جديدة" onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSubject((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }} />
                  <Button variant="outline">إضافة</Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">الصفوف الدراسية *</label>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['الصف الأول الثانوي', 'الصف الثاني الثانوي', 'الصف الثالث الثانوي', 'الصف الأول الإعدادي', 'الصف الثاني الإعدادي', 'الصف الثالث الإعدادي'].map(grade => (
                    <label key={grade} className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        checked={profileData.grades.includes(grade)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProfileData({...profileData, grades: [...profileData.grades, grade]});
                          } else {
                            setProfileData({...profileData, grades: profileData.grades.filter(g => g !== grade)});
                          }
                        }}
                      />
                      <span className="text-sm">{grade}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">أنواع التعليم *</label>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['مصري', 'IGCSE', 'أمريكي', 'بريطاني', 'فرنسي', 'ألماني'].map(type => (
                    <label key={type} className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        checked={profileData.educationTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProfileData({...profileData, educationTypes: [...profileData.educationTypes, type]});
                          } else {
                            setProfileData({...profileData, educationTypes: profileData.educationTypes.filter(t => t !== type)});
                          }
                        }}
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* الشهادات */}
        <TabsContent value="credentials" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">الشهادات والمؤهلات</h3>
            
            <div className="space-y-4">
              {profileData.certificates.map(cert => (
                <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-sm text-muted-foreground">{cert.file}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {cert.verified ? (
                      <Badge className="bg-success">موثق</Badge>
                    ) : (
                      <Badge variant="secondary">في الانتظار</Badge>
                    )}
                    <Button variant="outline" size="sm">حذف</Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 ml-2" />
                رفع شهادة جديدة
              </Button>
            </div>
            
            <div className="mt-6">
              <label className="text-sm font-medium">الإنجازات والجوائز</label>
              <div className="mt-2 space-y-2">
                {profileData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                    <Award className="h-4 w-4 text-warning" />
                    <span className="text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-2">
                إضافة إنجاز
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* الوسائط */}
        <TabsContent value="media" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">الفيديوهات التعريفية</h3>
            
            <div className="space-y-4">
              {profileData.videos.map(video => (
                <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{video.title}</div>
                      <div className="text-sm text-muted-foreground">{video.url} • {video.duration}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => removeVideo(video.id)}>
                    حذف
                  </Button>
                </div>
              ))}
              
              <Button variant="outline" className="w-full" onClick={() => addVideo('فيديو جديد', 'https://youtube.com/watch?v=example')}>
                <Video className="h-4 w-4 ml-2" />
                إضافة فيديو
              </Button>
            </div>
            
            <div className="mt-6">
              <label className="text-sm font-medium">رابط Google Meet *</label>
              <Input
                value={profileData.meetLink}
                onChange={(e) => setProfileData({...profileData, meetLink: e.target.value})}
                placeholder="https://meet.google.com/..."
                className="mt-2"
              />
            </div>
          </Card>
        </TabsContent>

        {/* المواعيد */}
        <TabsContent value="schedule" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">جدول المواعيد المتاحة</h3>
            
            <div className="space-y-4">
              {Object.entries(profileData.schedule).map(([day, dayData]) => (
                <div key={day} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="font-medium">{getDayName(day)}</span>
                    </div>
                    <label className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        checked={dayData.available}
                        onChange={(e) => updateSchedule(day, e.target.checked, dayData.slots)}
                      />
                      <span className="text-sm">متاح</span>
                    </label>
                  </div>
                  
                  {dayData.available && (
                    <div className="flex flex-wrap gap-2">
                      {dayData.slots.map(slot => (
                        <Badge key={slot} variant="outline">
                          {slot}
                        </Badge>
                      ))}
                      <Button variant="outline" size="sm">
                        إضافة موعد
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSetup;

