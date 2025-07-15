
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Search, Star, User } from 'lucide-react';

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

// Dummy teachers data
const DUMMY_TEACHERS = [
  {
    id: 1,
    name: 'أ. محمد عبد الله',
    subject: 'كيمياء',
    grade: 'الثالث الثانوي',
    education: 'IGCSE',
    rating: 4.8,
    image: '/placeholder.svg',
    experience: '10 سنوات خبرة',
    students: 156
  },
  {
    id: 2,
    name: 'د. نهى أحمد',
    subject: 'رياضيات',
    grade: 'الثاني الثانوي',
    education: 'التعليم المصري - لغات',
    rating: 4.9,
    image: '/placeholder.svg',
    experience: '8 سنوات خبرة',
    students: 203
  },
  {
    id: 3,
    name: 'أ. سارة محمود',
    subject: 'فيزياء',
    grade: 'الأول الثانوي',
    education: 'American Diploma',
    rating: 4.7,
    image: '/placeholder.svg',
    experience: '12 سنة خبرة',
    students: 89
  },
  {
    id: 4,
    name: 'د. أحمد حسن',
    subject: 'لغة إنجليزية',
    grade: 'الثالث الإعدادي',
    education: 'IGCSE',
    rating: 4.6,
    image: '/placeholder.svg',
    experience: '15 سنة خبرة',
    students: 267
  },
  {
    id: 5,
    name: 'أ. فاطمة علي',
    subject: 'لغة عربية',
    grade: 'الثاني الثانوي',
    education: 'التعليم المصري - عربي',
    rating: 4.9,
    image: '/placeholder.svg',
    experience: '12 سنة خبرة',
    students: 189
  },
  {
    id: 6,
    name: 'د. عمر خالد',
    subject: 'أحياء',
    grade: 'الثالث الثانوي',
    education: 'IGCSE',
    rating: 4.7,
    image: '/placeholder.svg',
    experience: '9 سنوات خبرة',
    students: 134
  },
  {
    id: 7,
    name: 'أ. مريم سالم',
    subject: 'تاريخ',
    grade: 'الأول الثانوي',
    education: 'التعليم المصري - لغات',
    rating: 4.5,
    image: '/placeholder.svg',
    experience: '7 سنوات خبرة',
    students: 98
  },
  {
    id: 8,
    name: 'د. يوسف إبراهيم',
    subject: 'جغرافيا',
    grade: 'الثاني الإعدادي',
    education: 'التعليم المصري - عربي',
    rating: 4.6,
    image: '/placeholder.svg',
    experience: '11 سنة خبرة',
    students: 145
  }
];

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
  const [searchResults, setSearchResults] = useState<typeof DUMMY_TEACHERS>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    // Simulate search with dummy data
    const filteredResults = DUMMY_TEACHERS.filter(teacher => {
      return (
        (!filters.subject || teacher.subject.includes(filters.subject)) &&
        (!filters.grade || teacher.grade.includes(filters.grade)) &&
        (!filters.educationType || teacher.education.includes(filters.educationType)) &&
        (!filters.teacherName || teacher.name.includes(filters.teacherName))
      );
    });
    
    setSearchResults(filteredResults);
    setShowResults(true);
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
                  onClick={() => window.location.href = `/teacher-profile/${teacher.id}`}
                >
                  عرض الملف الشخصي
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchEngine;
