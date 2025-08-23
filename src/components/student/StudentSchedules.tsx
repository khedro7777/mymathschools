import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, ExternalLink, CheckCircle } from 'lucide-react';
import { FollowingService, Schedule } from '../../services/followingService';
import { EnrollmentService } from '../../services/enrollmentService';

const StudentSchedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dummy student ID for now
  const studentId = 'student_demo';

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const fetchedSchedules = await FollowingService.getFollowedTeachersSchedules(studentId);
        setSchedules(fetchedSchedules);
      } catch (err) {
        setError('فشل في جلب جداول الحصص.');
        console.error('Error fetching schedules:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [studentId]);

  const handleEnroll = async (schedule: Schedule) => {
    try {
      const result = await EnrollmentService.requestEnrollment(
        studentId,
        'أحمد محمد', // اسم الطالب الوهمي
        schedule.teacherId,
        schedule.teacherName,
        schedule.id,
        schedule.subject,
        schedule.day,
        schedule.time
      );

      if (result.success) {
        alert(result.message);
      } else {
        alert(`خطأ: ${result.message}`);
      }
    } catch (error) {
      alert('حدث خطأ أثناء إرسال طلب الاشتراك');
      console.error('Error enrolling in schedule:', error);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">جاري تحميل جداول الحصص...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">خطأ: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">جداول حصص المدرسين المتابعين</h1>

      {schedules.length === 0 ? (
        <Card className="card-educational p-6 text-center">
          <p className="text-muted-foreground">لا توجد جداول حصص متاحة حالياً. ابدأ بمتابعة المدرسين لعرض جداولهم هنا.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {schedules.map((schedule) => (
            <Card key={schedule.id} className="card-educational p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{schedule.subject} - {schedule.teacherName}</h3>
                  <p className="text-sm text-muted-foreground">{schedule.day} - {schedule.time}</p>
                  <p className="text-xs text-muted-foreground">الطلاب: {schedule.currentStudents}/{schedule.maxStudents}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => window.open(schedule.link, '_blank')}>
                  <ExternalLink className="h-4 w-4 ml-2" />
                  انضم للحصة
                </Button>
                <Button variant="default" size="sm" onClick={() => handleEnroll(schedule)}>
                  <CheckCircle className="h-4 w-4 ml-2" />
                  اشترك
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentSchedules;


