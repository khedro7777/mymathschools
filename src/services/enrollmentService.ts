// خدمة الاشتراك في الحصص وموافقة الإدارة
export interface EnrollmentRequest {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  scheduleId: string;
  subject: string;
  day: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  approvalDate?: string;
  adminNotes?: string;
}

export interface StudentCourse {
  id: string;
  studentId: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  scheduleId: string;
  enrollmentDate: string;
  status: 'active' | 'completed' | 'suspended';
  progress: number;
  totalSessions: number;
  attendedSessions: number;
}

// محاكاة قاعدة البيانات المحلية
let enrollmentDatabase: { [requestId: string]: EnrollmentRequest } = {};
let studentCoursesDatabase: { [studentId: string]: StudentCourse[] } = {};

// بيانات وهمية للطلبات المعلقة
const DUMMY_PENDING_REQUESTS: EnrollmentRequest[] = [
  {
    id: 'req_001',
    studentId: 'student_demo',
    studentName: 'أحمد محمد',
    teacherId: '1',
    teacherName: 'أ. محمد عبد الله',
    scheduleId: 'sch_1_1',
    subject: 'كيمياء - الثالث الثانوي',
    day: 'السبت',
    time: '16:00 - 18:00',
    status: 'pending',
    requestDate: '2024-01-20'
  },
  {
    id: 'req_002',
    studentId: 'student_demo2',
    studentName: 'نور الهدى',
    teacherId: '2',
    teacherName: 'د. نهى أحمد',
    scheduleId: 'sch_2_1',
    subject: 'رياضيات - الثاني الثانوي',
    day: 'الأحد',
    time: '10:00 - 12:00',
    status: 'pending',
    requestDate: '2024-01-19'
  }
];

// تهيئة البيانات الوهمية
DUMMY_PENDING_REQUESTS.forEach(request => {
  enrollmentDatabase[request.id] = request;
});

export class EnrollmentService {
  // طلب الاشتراك في حصة
  static requestEnrollment(
    studentId: string,
    studentName: string,
    teacherId: string,
    teacherName: string,
    scheduleId: string,
    subject: string,
    day: string,
    time: string
  ): Promise<{ success: boolean; message: string; requestId?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // التحقق من عدم وجود طلب مسبق لنفس الحصة
        const existingRequest = Object.values(enrollmentDatabase).find(
          req => req.studentId === studentId && 
                 req.scheduleId === scheduleId && 
                 req.status === 'pending'
        );

        if (existingRequest) {
          resolve({ 
            success: false, 
            message: 'يوجد طلب اشتراك معلق لهذه الحصة بالفعل' 
          });
          return;
        }

        // إنشاء طلب جديد
        const requestId = `req_${Date.now()}`;
        const newRequest: EnrollmentRequest = {
          id: requestId,
          studentId,
          studentName,
          teacherId,
          teacherName,
          scheduleId,
          subject,
          day,
          time,
          status: 'pending',
          requestDate: new Date().toISOString().split('T')[0]
        };

        enrollmentDatabase[requestId] = newRequest;

        resolve({ 
          success: true, 
          message: 'تم إرسال طلب الاشتراك بنجاح. بانتظار موافقة الإدارة.',
          requestId 
        });
      }, 500);
    });
  }

  // الحصول على طلبات الاشتراك المعلقة (للإدارة)
  static getPendingEnrollmentRequests(): Promise<EnrollmentRequest[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pendingRequests = Object.values(enrollmentDatabase)
          .filter(req => req.status === 'pending')
          .sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
        
        resolve(pendingRequests);
      }, 300);
    });
  }

  // موافقة الإدارة على طلب الاشتراك
  static approveEnrollmentRequest(
    requestId: string,
    adminNotes?: string
  ): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const request = enrollmentDatabase[requestId];
        if (!request) {
          resolve({ success: false, message: 'طلب الاشتراك غير موجود' });
          return;
        }

        if (request.status !== 'pending') {
          resolve({ success: false, message: 'تم التعامل مع هذا الطلب مسبقاً' });
          return;
        }

        // تحديث حالة الطلب
        request.status = 'approved';
        request.approvalDate = new Date().toISOString().split('T')[0];
        request.adminNotes = adminNotes;

        // إضافة الكورس إلى قائمة كورسات الطالب
        const newCourse: StudentCourse = {
          id: `course_${Date.now()}`,
          studentId: request.studentId,
          teacherId: request.teacherId,
          teacherName: request.teacherName,
          subject: request.subject,
          scheduleId: request.scheduleId,
          enrollmentDate: request.approvalDate!,
          status: 'active',
          progress: 0,
          totalSessions: 16, // افتراضي
          attendedSessions: 0
        };

        if (!studentCoursesDatabase[request.studentId]) {
          studentCoursesDatabase[request.studentId] = [];
        }
        studentCoursesDatabase[request.studentId].push(newCourse);

        resolve({ 
          success: true, 
          message: `تم قبول طلب اشتراك ${request.studentName} في ${request.subject}` 
        });
      }, 500);
    });
  }

  // رفض طلب الاشتراك
  static rejectEnrollmentRequest(
    requestId: string,
    adminNotes?: string
  ): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const request = enrollmentDatabase[requestId];
        if (!request) {
          resolve({ success: false, message: 'طلب الاشتراك غير موجود' });
          return;
        }

        if (request.status !== 'pending') {
          resolve({ success: false, message: 'تم التعامل مع هذا الطلب مسبقاً' });
          return;
        }

        // تحديث حالة الطلب
        request.status = 'rejected';
        request.approvalDate = new Date().toISOString().split('T')[0];
        request.adminNotes = adminNotes;

        resolve({ 
          success: true, 
          message: `تم رفض طلب اشتراك ${request.studentName} في ${request.subject}` 
        });
      }, 500);
    });
  }

  // الحصول على كورسات الطالب
  static getStudentCourses(studentId: string): Promise<StudentCourse[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const courses = studentCoursesDatabase[studentId] || [];
        resolve(courses);
      }, 300);
    });
  }

  // الحصول على طلبات الاشتراك للطالب
  static getStudentEnrollmentRequests(studentId: string): Promise<EnrollmentRequest[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const requests = Object.values(enrollmentDatabase)
          .filter(req => req.studentId === studentId)
          .sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
        
        resolve(requests);
      }, 300);
    });
  }

  // تحديث تقدم الطالب في الكورس
  static updateCourseProgress(
    courseId: string,
    attendedSessions: number
  ): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // البحث عن الكورس في جميع بيانات الطلاب
        let courseFound = false;
        
        Object.values(studentCoursesDatabase).forEach(studentCourses => {
          const course = studentCourses.find(c => c.id === courseId);
          if (course) {
            course.attendedSessions = attendedSessions;
            course.progress = Math.round((attendedSessions / course.totalSessions) * 100);
            
            // تحديث حالة الكورس إذا اكتمل
            if (course.progress >= 100) {
              course.status = 'completed';
            }
            
            courseFound = true;
          }
        });

        if (courseFound) {
          resolve({ success: true, message: 'تم تحديث تقدم الطالب بنجاح' });
        } else {
          resolve({ success: false, message: 'الكورس غير موجود' });
        }
      }, 300);
    });
  }

  // إحصائيات الاشتراكات (للإدارة)
  static getEnrollmentStats(): Promise<{
    totalRequests: number;
    pendingRequests: number;
    approvedRequests: number;
    rejectedRequests: number;
    activeCourses: number;
  }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allRequests = Object.values(enrollmentDatabase);
        const totalRequests = allRequests.length;
        const pendingRequests = allRequests.filter(req => req.status === 'pending').length;
        const approvedRequests = allRequests.filter(req => req.status === 'approved').length;
        const rejectedRequests = allRequests.filter(req => req.status === 'rejected').length;
        
        let activeCourses = 0;
        Object.values(studentCoursesDatabase).forEach(studentCourses => {
          activeCourses += studentCourses.filter(course => course.status === 'active').length;
        });

        resolve({
          totalRequests,
          pendingRequests,
          approvedRequests,
          rejectedRequests,
          activeCourses
        });
      }, 300);
    });
  }
}

