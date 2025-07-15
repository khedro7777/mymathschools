
import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Video, Calendar, Clock, Users, ExternalLink } from 'lucide-react';

const StudentCourses = () => {
  const courses = [
    {
      id: 1,
      title: 'كيمياء IGCSE - الثالث الثانوي',
      teacher: 'أ. محمد عبد الله',
      schedule: 'السبت والاثنين 4:00 م',
      nextClass: '2024-01-20 16:00',
      meetLink: 'https://meet.google.com/abc-defg',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      status: 'نشط'
    },
    {
      id: 2,
      title: 'رياضيات متقدمة - الثاني الثانوي',
      teacher: 'د. نهى أحمد',
      schedule: 'الأحد والثلاثاء 2:00 م',
      nextClass: '2024-01-21 14:00',
      meetLink: 'https://meet.google.com/hij-klmn',
      progress: 60,
      totalLessons: 30,
      completedLessons: 18,
      status: 'نشط'
    },
    {
      id: 3,
      title: 'فيزياء American Diploma',
      teacher: 'أ. سارة محمود',
      schedule: 'الاثنين والخميس 6:00 م',
      nextClass: '2024-01-22 18:00',
      meetLink: 'https://meet.google.com/opq-rstu',
      progress: 45,
      totalLessons: 28,
      completedLessons: 12,
      status: 'نشط'
    }
  ];

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">كورساتي</h2>
        <Badge variant="default" className="bg-educational text-educational-foreground">{courses.length} كورس نشط</Badge>
      </div>

      <div className="grid gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="card-educational p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Course Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">{course.title}</h3>
                    <p className="text-muted-foreground mb-2">مع {course.teacher}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{course.schedule}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Video className="h-4 w-4" />
                        <span>{course.completedLessons}/{course.totalLessons} درس</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={course.status === 'نشط' ? 'default' : 'secondary'}>
                    {course.status}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>التقدم في الكورس</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-educational h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Next Class */}
                <div className="bg-primary/5 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium text-primary">الحصة القادمة</span>
                  </div>
                  <p className="text-sm">{formatDateTime(course.nextClass)}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 lg:w-48">
                <Button 
                  className="bg-gradient-to-r from-success to-green-600 hover:from-success/90 hover:to-green-600/90"
                  onClick={() => window.open(course.meetLink, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 ml-2" />
                  احضر الآن
                </Button>
                <Button variant="outline">
                  <Video className="h-4 w-4 ml-2" />
                  الدروس المسجلة
                </Button>
                <Button variant="outline">
                  <Users className="h-4 w-4 ml-2" />
                  مجموعة الطلاب
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
