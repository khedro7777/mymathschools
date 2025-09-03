
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Search, Star, User, MapPin, Clock, Users, Heart } from 'lucide-react';
import TeacherProfile from './TeacherProfile';
import strapiService from '../services/strapiService';

const EDUCATION_STAGES = [
  'رياض الأطفال',
  'المرحلة الابتدائية',
  'المرحلة الإعدادية',
  'المرحلة الثانوية',
  'الدورات',
  'الأنشطة'
];

const EDUCATION_TYPES = [
  'التعليم المصري - عربي',
  'التعليم المصري - لغات',
  'IGCSE',
  'American Diploma',
  'IB',
  'Abitur',
  'French Baccalauréat',
  'Canadian',
  'German'
];

const GRADES = {
  'رياض الأطفال': ['KG1', 'KG2'],
  'المرحلة الابتدائية': ['الأول الابتدائي', 'الثاني الابتدائي', 'الثالث الابتدائي', 'الرابع الابتدائي', 'الخامس الابتدائي', 'السادس الابتدائي'],
  'المرحلة الإعدادية': ['الأول الإعدادي', 'الثاني الإعدادي', 'الثالث الإعدادي'],
  'المرحلة الثانوية': ['الأول الثانوي', 'الثاني الثانوي', 'الثالث الثانوي']
};

const SUBJECTS = [
  'لغة عربية',
  'لغة إنجليزية',
  'رياضيات',
  'علوم',
  'فيزياء',
  'كيمياء',
  'أحياء',
  'فلسفة',
  'تاريخ',
  'جغرافيا',
  'Math',
  'Physics',
  'Chemistry'
];

const CERTIFICATES = [
  'Cambridge',
  'Edexcel',
  'IB',
  'SAT',
  'ACT',
  'DELF',
  'Abitur'
];

// Dummy teachers data - سيتم استبدالها ببيانات حقيقية من Strapi
const DUMMY_TEACHERS: any[] = [];

interface SearchFilters {
  stage: string;
  educationType: string;
  grade: string;
  subject: string;
  certificate: string;
  teacherName: string;
}

const AdvancedSearchEngine = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    stage: '',
    educationType: '',
    grade: '',
    subject: '',
    certificate: '',
    teacherName: ''
  });
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // البحث في Strapi عن المدرسين
      // const teachers = await strapiService.getTeachers(filters);
      // setSearchResults(teachers);
      
      // مؤقتاً: عرض رسالة عدم وجود نتائج
      setSearchResults([]);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherClick = (teacher: any) => {
    // تحويل بيانات المدرس إلى تنسيق TeacherProfile
    const teacherProfile = {
      ...teacher,
      bio: teacher.bio || 'مدرس متخصص ومتميز في مجاله',
      specializations: teacher.specializations || [teacher.subject],
      availability: teacher.availability || ['السبت 2:00 م', 'الأحد 4:00 م', 'الثلاثاء 6:00 م'],
      hourlyRate: teacher.hourlyRate || 150,
      languages: teacher.languages || ['العربية', 'الإنجليزية'],
      achievements: teacher.achievements || ['شهادة التميز في التدريس', 'خبرة أكثر من 10 سنوات'],
      location: teacher.location || 'القاهرة، مصر',
      reviewsCount: teacher.reviewsCount || 50
    };
    
    setSelectedTeacher(teacherProfile);
    setShowProfile(true);
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

  return (
    <div className="w-full py-8">
      {/* Search Form */}
      <Card className="card-educational p-6 mb-8">
        <h3 className="text-xl font-bold text-primary mb-6 text-center">
          ابحث عن أفضل المدرسين في أكاديمية Mymath
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Teacher Name Search */}
          <div>
            <label className="block text-sm font-medium mb-2">اسم المدرس</label>
            <Select value={filters.teacherName} onValueChange={(value) => setFilters({...filters, teacherName: value})}>
              <SelectTrigger>
                <SelectValue placeholder="اختر المدرس" />
              </SelectTrigger>
              <SelectContent>
                {DUMMY_TEACHERS.map(teacher => (
                  <SelectItem key={teacher.id} value={teacher.name}>{teacher.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Education Stage */}
          <div>
            <label className="block text-sm font-medium mb-2">المرحلة الدراسية</label>
            <Select value={filters.stage} onValueChange={(value) => setFilters({...filters, stage: value, grade: ''})}>
              <SelectTrigger>
                <SelectValue placeholder="اختر المرحلة" />
              </SelectTrigger>
              <SelectContent>
                {EDUCATION_STAGES.map(stage => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Education Type */}
          <div>
            <label className="block text-sm font-medium mb-2">نوع التعليم</label>
            <Select value={filters.educationType} onValueChange={(value) => setFilters({...filters, educationType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع التعليم" />
              </SelectTrigger>
              <SelectContent>
                {EDUCATION_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Grade */}
          <div>
            <label className="block text-sm font-medium mb-2">الصف الدراسي</label>
            <Select 
              value={filters.grade} 
              onValueChange={(value) => setFilters({...filters, grade: value})}
              disabled={!filters.stage || !GRADES[filters.stage as keyof typeof GRADES]}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الصف" />
              </SelectTrigger>
              <SelectContent>
                {filters.stage && GRADES[filters.stage as keyof typeof GRADES]?.map(grade => (
                  <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-2">المادة الدراسية</label>
            <Select value={filters.subject} onValueChange={(value) => setFilters({...filters, subject: value})}>
              <SelectTrigger>
                <SelectValue placeholder="اختر المادة" />
              </SelectTrigger>
              <SelectContent>
                {SUBJECTS.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Certificate */}
          <div>
            <label className="block text-sm font-medium mb-2">نوع الشهادة</label>
            <Select value={filters.certificate} onValueChange={(value) => setFilters({...filters, certificate: value})}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الشهادة" />
              </SelectTrigger>
              <SelectContent>
                {CERTIFICATES.map(cert => (
                  <SelectItem key={cert} value={cert}>{cert}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-center">
          <Button onClick={handleSearch} size="lg" className="bg-gradient-to-r from-primary to-educational">
            <Search className="h-5 w-5 ml-2" />
            بحث عن المدرسين
          </Button>
        </div>
      </Card>

      {/* Search Results */}
      {showResults && (
        <div>
          <h4 className="text-xl font-bold text-primary mb-6">
            نتائج البحث ({searchResults.length} مدرس)
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map(teacher => (
              <Card key={teacher.id} className="card-educational p-6 hover:scale-105 transition-transform">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-educational rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h5 className="text-lg font-bold text-primary">{teacher.name}</h5>
                  <p className="text-sm text-muted-foreground">{teacher.experience}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm">المادة:</span>
                    <Badge variant="default" className="bg-educational text-educational-foreground">{teacher.subject}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">الصف:</span>
                    <span className="text-sm font-medium">{teacher.grade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">التعليم:</span>
                    <span className="text-sm font-medium">{teacher.education}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">الطلاب:</span>
                    <span className="text-sm font-medium">{teacher.students} طالب</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 mb-4">
                  {renderStars(teacher.rating)}
                  <span className="text-sm text-muted-foreground mr-2">({teacher.rating})</span>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleTeacherClick(teacher)}
                >
                  عرض الملف الشخصي
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* نافذة عرض بروفايل المدرس */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>ملف المدرس الشخصي</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            {selectedTeacher && (
              <TeacherProfile
                teacher={selectedTeacher}
                onFollow={(teacherId) => {
                  console.log('Follow teacher:', teacherId);
                  // إضافة منطق المتابعة هنا
                }}
                onMessage={(teacherId) => {
                  console.log('Message teacher:', teacherId);
                  // إضافة منطق المراسلة هنا
                }}
                onBookSession={(teacherId) => {
                  console.log('Book session with teacher:', teacherId);
                  // إضافة منطق حجز الحصة هنا
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdvancedSearchEngine;
