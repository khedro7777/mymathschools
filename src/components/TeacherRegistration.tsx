import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { 
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Award,
  Upload,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface TeacherRegistrationData {
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
    cv: File | null;
    degree: File | null;
    nationalIdCopy: File | null;
    photo: File | null;
  };
  agreements: {
    terms: boolean;
    privacy: boolean;
    conduct: boolean;
  };
}

const TeacherRegistration = ({ onClose }: { onClose?: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<TeacherRegistrationData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      nationalId: '',
      dateOfBirth: '',
      address: ''
    },
    academicInfo: {
      degree: '',
      university: '',
      graduationYear: '',
      specialization: '',
      subjects: [],
      experience: ''
    },
    teachingInfo: {
      preferredGrades: [],
      teachingMethod: '',
      availability: [],
      hourlyRate: ''
    },
    documents: {
      cv: null,
      degree: null,
      nationalIdCopy: null,
      photo: null
    },
    agreements: {
      terms: false,
      privacy: false,
      conduct: false
    }
  });

  const subjects = [
    'الرياضيات',
    'الفيزياء',
    'الكيمياء',
    'الأحياء',
    'اللغة العربية',
    'اللغة الإنجليزية',
    'التاريخ',
    'الجغرافيا',
    'الفلسفة والمنطق',
    'علم النفس والاجتماع'
  ];

  const grades = [
    'الصف الأول الابتدائي',
    'الصف الثاني الابتدائي',
    'الصف الثالث الابتدائي',
    'الصف الرابع الابتدائي',
    'الصف الخامس الابتدائي',
    'الصف السادس الابتدائي',
    'الصف الأول الإعدادي',
    'الصف الثاني الإعدادي',
    'الصف الثالث الإعدادي',
    'الصف الأول الثانوي',
    'الصف الثاني الثانوي',
    'الصف الثالث الثانوي'
  ];

  const handleInputChange = (section: keyof TeacherRegistrationData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section: keyof TeacherRegistrationData, field: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = (prev[section] as any)[field] || [];
      const newArray = checked 
        ? [...currentArray, value]
        : currentArray.filter((item: string) => item !== value);
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray
        }
      };
    });
  };

  const handleFileUpload = (field: keyof TeacherRegistrationData['documents'], file: File | null) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // محاكاة إرسال البيانات
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto p-8 text-center">
        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-success mb-4">تم إرسال طلب التسجيل بنجاح!</h2>
        <p className="text-muted-foreground mb-6">
          شكراً لك على التسجيل في أكاديمية Mymath. سيتم مراجعة طلبك من قبل فريق الإدارة وسنتواصل معك خلال 24-48 ساعة.
        </p>
        <div className="bg-primary/10 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-2">الخطوات التالية:</h3>
          <ul className="text-sm text-muted-foreground space-y-1 text-right">
            <li>• مراجعة المستندات المرفقة</li>
            <li>• التحقق من المؤهلات الأكاديمية</li>
            <li>• مقابلة عبر الإنترنت (إذا لزم الأمر)</li>
            <li>• إشعار بالقبول أو الرفض</li>
          </ul>
        </div>
        <Button onClick={onClose} className="w-full">
          العودة للصفحة الرئيسية
        </Button>
      </Card>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">المعلومات الشخصية</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">الاسم الكامل *</Label>
                <Input
                  id="fullName"
                  value={formData.personalInfo.fullName}
                  onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                  placeholder="أدخل الاسم الكامل"
                />
              </div>
              
              <div>
                <Label htmlFor="email">البريد الإلكتروني *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  placeholder="example@email.com"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  placeholder="01xxxxxxxxx"
                />
              </div>
              
              <div>
                <Label htmlFor="nationalId">الرقم القومي *</Label>
                <Input
                  id="nationalId"
                  value={formData.personalInfo.nationalId}
                  onChange={(e) => handleInputChange('personalInfo', 'nationalId', e.target.value)}
                  placeholder="14 رقم"
                />
              </div>
              
              <div>
                <Label htmlFor="dateOfBirth">تاريخ الميلاد *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">العنوان *</Label>
              <Textarea
                id="address"
                value={formData.personalInfo.address}
                onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                placeholder="أدخل العنوان كاملاً"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">المؤهلات الأكاديمية</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="degree">الدرجة العلمية *</Label>
                <Select onValueChange={(value) => handleInputChange('academicInfo', 'degree', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدرجة العلمية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bachelor">بكالوريوس</SelectItem>
                    <SelectItem value="master">ماجستير</SelectItem>
                    <SelectItem value="phd">دكتوراه</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="university">الجامعة *</Label>
                <Input
                  id="university"
                  value={formData.academicInfo.university}
                  onChange={(e) => handleInputChange('academicInfo', 'university', e.target.value)}
                  placeholder="اسم الجامعة"
                />
              </div>
              
              <div>
                <Label htmlFor="graduationYear">سنة التخرج *</Label>
                <Input
                  id="graduationYear"
                  value={formData.academicInfo.graduationYear}
                  onChange={(e) => handleInputChange('academicInfo', 'graduationYear', e.target.value)}
                  placeholder="2020"
                />
              </div>
              
              <div>
                <Label htmlFor="specialization">التخصص *</Label>
                <Input
                  id="specialization"
                  value={formData.academicInfo.specialization}
                  onChange={(e) => handleInputChange('academicInfo', 'specialization', e.target.value)}
                  placeholder="التخصص الأكاديمي"
                />
              </div>
            </div>
            
            <div>
              <Label>المواد التي يمكنك تدريسها *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {subjects.map((subject) => (
                  <div key={subject} className="flex items-center space-x-2">
                    <Checkbox
                      id={subject}
                      checked={formData.academicInfo.subjects.includes(subject)}
                      onCheckedChange={(checked) => 
                        handleArrayChange('academicInfo', 'subjects', subject, checked as boolean)
                      }
                    />
                    <Label htmlFor={subject} className="text-sm">{subject}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="experience">سنوات الخبرة في التدريس</Label>
              <Select onValueChange={(value) => handleInputChange('academicInfo', 'experience', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر سنوات الخبرة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">أقل من سنة</SelectItem>
                  <SelectItem value="1-3">1-3 سنوات</SelectItem>
                  <SelectItem value="3-5">3-5 سنوات</SelectItem>
                  <SelectItem value="5-10">5-10 سنوات</SelectItem>
                  <SelectItem value="10+">أكثر من 10 سنوات</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">معلومات التدريس</h3>
            
            <div>
              <Label>الصفوف المفضلة للتدريس *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 max-h-48 overflow-y-auto">
                {grades.map((grade) => (
                  <div key={grade} className="flex items-center space-x-2">
                    <Checkbox
                      id={grade}
                      checked={formData.teachingInfo.preferredGrades.includes(grade)}
                      onCheckedChange={(checked) => 
                        handleArrayChange('teachingInfo', 'preferredGrades', grade, checked as boolean)
                      }
                    />
                    <Label htmlFor={grade} className="text-sm">{grade}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="teachingMethod">طريقة التدريس المفضلة *</Label>
              <Select onValueChange={(value) => handleInputChange('teachingInfo', 'teachingMethod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر طريقة التدريس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">أونلاين فقط</SelectItem>
                  <SelectItem value="offline">حضوري فقط</SelectItem>
                  <SelectItem value="hybrid">مختلط (أونلاين وحضوري)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>أوقات التوفر *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {['الصباح', 'بعد الظهر', 'المساء', 'الليل'].map((time) => (
                  <div key={time} className="flex items-center space-x-2">
                    <Checkbox
                      id={time}
                      checked={formData.teachingInfo.availability.includes(time)}
                      onCheckedChange={(checked) => 
                        handleArrayChange('teachingInfo', 'availability', time, checked as boolean)
                      }
                    />
                    <Label htmlFor={time} className="text-sm">{time}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="hourlyRate">السعر المطلوب للحصة (ج.م) *</Label>
              <Input
                id="hourlyRate"
                value={formData.teachingInfo.hourlyRate}
                onChange={(e) => handleInputChange('teachingInfo', 'hourlyRate', e.target.value)}
                placeholder="100"
                type="number"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">المستندات المطلوبة</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="cv">السيرة الذاتية (PDF) *</Label>
                <Input
                  id="cv"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload('cv', e.target.files?.[0] || null)}
                  className="mt-1"
                />
                {formData.documents.cv && (
                  <Badge variant="outline" className="mt-2">
                    <CheckCircle className="h-3 w-3 ml-1" />
                    تم الرفع
                  </Badge>
                )}
              </div>
              
              <div>
                <Label htmlFor="degree">صورة من الشهادة الجامعية (PDF/JPG) *</Label>
                <Input
                  id="degree"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('degree', e.target.files?.[0] || null)}
                  className="mt-1"
                />
                {formData.documents.degree && (
                  <Badge variant="outline" className="mt-2">
                    <CheckCircle className="h-3 w-3 ml-1" />
                    تم الرفع
                  </Badge>
                )}
              </div>
              
              <div>
                <Label htmlFor="nationalIdCopy">صورة من البطاقة الشخصية (PDF/JPG) *</Label>
                <Input
                  id="nationalIdCopy"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('nationalIdCopy', e.target.files?.[0] || null)}
                  className="mt-1"
                />
                {formData.documents.nationalIdCopy && (
                  <Badge variant="outline" className="mt-2">
                    <CheckCircle className="h-3 w-3 ml-1" />
                    تم الرفع
                  </Badge>
                )}
              </div>
              
              <div>
                <Label htmlFor="photo">صورة شخصية (JPG/PNG) *</Label>
                <Input
                  id="photo"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('photo', e.target.files?.[0] || null)}
                  className="mt-1"
                />
                {formData.documents.photo && (
                  <Badge variant="outline" className="mt-2">
                    <CheckCircle className="h-3 w-3 ml-1" />
                    تم الرفع
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="bg-primary/10 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">ملاحظات مهمة:</p>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>• يجب أن تكون جميع المستندات واضحة ومقروءة</li>
                    <li>• الحد الأقصى لحجم كل ملف هو 5 ميجابايت</li>
                    <li>• يُفضل رفع المستندات بصيغة PDF</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">الموافقة على الشروط والأحكام</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreements.terms}
                  onCheckedChange={(checked) => 
                    handleInputChange('agreements', 'terms', checked)
                  }
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  أوافق على <span className="text-primary underline cursor-pointer">الشروط والأحكام</span> الخاصة بأكاديمية Mymath
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacy"
                  checked={formData.agreements.privacy}
                  onCheckedChange={(checked) => 
                    handleInputChange('agreements', 'privacy', checked)
                  }
                />
                <Label htmlFor="privacy" className="text-sm leading-relaxed">
                  أوافق على <span className="text-primary underline cursor-pointer">سياسة الخصوصية</span> وأسمح بمعالجة بياناتي الشخصية
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="conduct"
                  checked={formData.agreements.conduct}
                  onCheckedChange={(checked) => 
                    handleInputChange('agreements', 'conduct', checked)
                  }
                />
                <Label htmlFor="conduct" className="text-sm leading-relaxed">
                  أتعهد بالالتزام بـ <span className="text-primary underline cursor-pointer">قواعد السلوك المهني</span> للمدرسين
                </Label>
              </div>
            </div>
            
            <div className="bg-success/10 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">مراجعة البيانات:</p>
                  <div className="mt-2 space-y-1 text-muted-foreground">
                    <p>• الاسم: {formData.personalInfo.fullName}</p>
                    <p>• البريد الإلكتروني: {formData.personalInfo.email}</p>
                    <p>• المواد: {formData.academicInfo.subjects.join(', ')}</p>
                    <p>• الصفوف: {formData.teachingInfo.preferredGrades.slice(0, 3).join(', ')}
                      {formData.teachingInfo.preferredGrades.length > 3 && '...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Card className="max-w-4xl mx-auto">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">انضم كمدرس في أكاديمية Mymath</h1>
            <p className="text-muted-foreground mt-2">
              املأ النموذج التالي للتقديم كمدرس في منصتنا التعليمية
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === currentStep 
                      ? 'bg-primary text-primary-foreground' 
                      : step < currentStep 
                        ? 'bg-success text-success-foreground'
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                  </div>
                  {step < 5 && (
                    <div className={`w-12 h-0.5 ${
                      step < currentStep ? 'bg-success' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep} 
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              السابق
            </Button>

            {currentStep < 5 ? (
              <Button onClick={nextStep}>
                التالي
                <ArrowRight className="h-4 w-4 mr-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={
                  !formData.agreements.terms || 
                  !formData.agreements.privacy || 
                  !formData.agreements.conduct ||
                  isSubmitting
                }
                className="min-w-32"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TeacherRegistration;

