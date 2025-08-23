
import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Video, Calendar, Clock, Users, ExternalLink, BookOpen } from 'lucide-react';
import { EnrollmentService, StudentCourse } from '../../services/enrollmentService';

const StudentCourses = () => {
  const [courses, setCourses] = useState<StudentCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dummy student ID for now
  const studentId = 'student_demo';

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const fetchedCourses = await EnrollmentService.getStudentCourses(studentId);
        setCourses(fetchedCourses);
      } catch (err) {
        setError('فشل في جلب الكورسات.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [studentId]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-success text-white">نشط</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-educational text-white">مكتمل</Badge>;
      case 'suspended':
        return <Badge variant="destructive">معلق</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return <div className="p-6 text-center">جاري تحميل الكورسات...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">خطأ: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">كورساتي</h2>
        <Badge variant="default" className="bg-educational text-educational-foreground">
          {courses.length} كورس
        </Badge>
      </div>

      {courses.length === 0 ? (
        <Card className="card-educational p-8 text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-2">لا توجد كورسات مسجلة</h3>
          <p className="text-muted-foreground mb-4">
            لم تقم بالتسجيل في أي كورسات بعد. ابدأ بالبحث عن المدرسين ومتابعتهم للاشتراك في حصصهم.
          </p>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
          >
            ابحث عن المدرسين
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="card-educational p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Course Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">{course.subject}</h3>
                      <p className="text-muted-foreground mb-2">مع {course.teacherName}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>تاريخ التسجيل: {course.enrollmentDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Video className="h-4 w-4" />
                          <span>{course.attendedSessions}/{course.totalSessions} جلسة</span>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(course.status)}
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

                  {/* Course Stats */}
                  <div className="bg-primary/5 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">الجلسات المحضورة:</span>
                        <span className="font-medium mr-2">{course.attendedSessions}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">إجمالي الجلسات:</span>
                        <span className="font-medium mr-2">{course.totalSessions}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 lg:w-48">
                  <Button 
                    className="bg-gradient-to-r from-success to-green-600 hover:from-success/90 hover:to-green-600/90"
                    disabled={course.status !== 'active'}
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
      )}
    </div>
  );
};

export default StudentCourses;
