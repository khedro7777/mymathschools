import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Video, Calendar, Clock, Users, ExternalLink } from 'lucide-react';

const StudentCourses = () => {
  const courses: any[] = [];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط':
        return 'bg-green-100 text-green-800';
      case 'مكتمل':
        return 'bg-blue-100 text-blue-800';
      case 'متوقف':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (courses.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Video className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد كورسات مسجلة</h3>
          <p className="text-gray-600 mb-6">لم تقم بالتسجيل في أي كورس بعد</p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            تصفح الكورسات المتاحة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">كورساتي</h1>
        <Badge variant="secondary" className="text-sm">
          {courses.length} كورس
        </Badge>
      </div>

      <div className="grid gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-2">المدرس: {course.teacher}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>الحصة القادمة: {formatDateTime(course.nextClass)}</span>
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(course.status)}>
                {course.status}
              </Badge>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">التقدم</span>
                <span className="text-sm font-medium">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>{course.completedLessons} من {course.totalLessons} درس</span>
                <span>{course.totalLessons - course.completedLessons} درس متبقي</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => window.open(course.meetLink, '_blank')}
              >
                <Video className="w-4 h-4 mr-2" />
                دخول الحصة
              </Button>
              <Button variant="outline" className="flex-1">
                <ExternalLink className="w-4 h-4 mr-2" />
                عرض التفاصيل
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;

