import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  BookOpen, 
  Award, 
  Clock,
  Heart,
  MessageSquare,
  Video,
  Phone
} from 'lucide-react';

interface TeacherProfileProps {
  teacher: {
    id: string;
    name: string;
    subject: string;
    grade: string;
    education: string;
    rating: number;
    reviewsCount: number;
    image: string;
    experience: string;
    students: number;
    location: string;
    bio: string;
    specializations: string[];
    availability: string[];
    hourlyRate: number;
    languages: string[];
    achievements: string[];
  };
  onFollow?: (teacherId: string) => void;
  onMessage?: (teacherId: string) => void;
  onBookSession?: (teacherId: string) => void;
  isFollowing?: boolean;
}

const TeacherProfile: React.FC<TeacherProfileProps> = ({
  teacher,
  onFollow,
  onMessage,
  onBookSession,
  isFollowing = false
}) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* صورة المدرس */}
          <div className="flex flex-col items-center">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src={teacher.image} alt={teacher.name} />
              <AvatarFallback className="text-2xl">
                {teacher.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            {/* تقييم المدرس */}
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{teacher.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({teacher.reviewsCount} تقييم)
              </span>
            </div>
            
            {/* الموقع */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{teacher.location}</span>
            </div>
          </div>

          {/* معلومات المدرس */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <CardTitle className="text-2xl mb-2">{teacher.name}</CardTitle>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="default">{teacher.subject}</Badge>
                  <Badge variant="secondary">{teacher.grade}</Badge>
                  <Badge variant="outline">{teacher.education}</Badge>
                </div>
              </div>
              
              {/* السعر */}
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {teacher.hourlyRate} ج.م
                </div>
                <div className="text-sm text-muted-foreground">للحصة الواحدة</div>
              </div>
            </div>

            {/* نبذة عن المدرس */}
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {teacher.bio}
            </p>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">{teacher.experience}</span>
                </div>
                <div className="text-xs text-muted-foreground">خبرة</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">{teacher.students}</span>
                </div>
                <div className="text-xs text-muted-foreground">طالب</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">{teacher.specializations.length}</span>
                </div>
                <div className="text-xs text-muted-foreground">تخصص</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">{teacher.achievements.length}</span>
                </div>
                <div className="text-xs text-muted-foreground">إنجاز</div>
              </div>
            </div>

            {/* أزرار الإجراءات */}
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => onBookSession?.(teacher.id)}
                className="flex-1 min-w-[120px]"
              >
                <Video className="w-4 h-4 mr-2" />
                احجز حصة
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => onMessage?.(teacher.id)}
                className="flex-1 min-w-[120px]"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                راسل المدرس
              </Button>
              
              <Button 
                variant={isFollowing ? "secondary" : "outline"}
                onClick={() => onFollow?.(teacher.id)}
                className="min-w-[100px]"
              >
                <Heart className={`w-4 h-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                {isFollowing ? 'متابع' : 'متابعة'}
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* التخصصات */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            التخصصات
          </h4>
          <div className="flex flex-wrap gap-2">
            {teacher.specializations.map((spec, index) => (
              <Badge key={index} variant="secondary">
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        {/* اللغات */}
        <div>
          <h4 className="font-semibold mb-3">اللغات</h4>
          <div className="flex flex-wrap gap-2">
            {teacher.languages.map((lang, index) => (
              <Badge key={index} variant="outline">
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        {/* أوقات التوفر */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            أوقات التوفر
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {teacher.availability.map((time, index) => (
              <div key={index} className="text-sm p-2 bg-muted rounded-lg text-center">
                {time}
              </div>
            ))}
          </div>
        </div>

        {/* الإنجازات */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Award className="w-4 h-4" />
            الإنجازات والشهادات
          </h4>
          <div className="space-y-2">
            {teacher.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherProfile;

