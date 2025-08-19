// خدمة متابعة المدرسين
export interface Teacher {
  id: string;
  name: string;
  subject: string;
  grade: string;
  education: string;
  rating: number;
  image: string;
  experience: string;
  students: number;
}

export interface Schedule {
  id: string;
  teacherId: string;
  teacherName: string;
  day: string;
  time: string;
  subject: string;
  link: string;
  duration: number;
  maxStudents: number;
  currentStudents: number;
}

export interface FollowingData {
  studentId: string;
  followedTeachers: Teacher[];
  teacherSchedules: { [teacherId: string]: Schedule[] };
}

// محاكاة قاعدة البيانات المحلية
let followingDatabase: { [studentId: string]: FollowingData } = {};

// بيانات وهمية للمدرسين
const DUMMY_TEACHERS: Teacher[] = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
    name: 'أ. سارة محمود',
    subject: 'فيزياء',
    grade: 'الأول الثانوي',
    education: 'American Diploma',
    rating: 4.7,
    image: '/placeholder.svg',
    experience: '12 سنة خبرة',
    students: 89
  }
];

// بيانات وهمية لجداول الحصص
const DUMMY_SCHEDULES: { [teacherId: string]: Schedule[] } = {
  '1': [
    {
      id: 'sch_1_1',
      teacherId: '1',
      teacherName: 'أ. محمد عبد الله',
      day: 'السبت',
      time: '16:00 - 18:00',
      subject: 'كيمياء - الثالث الثانوي',
      link: 'https://meet.google.com/abc-defg',
      duration: 120,
      maxStudents: 25,
      currentStudents: 18
    },
    {
      id: 'sch_1_2',
      teacherId: '1',
      teacherName: 'أ. محمد عبد الله',
      day: 'الاثنين',
      time: '14:00 - 16:00',
      subject: 'كيمياء - AS Level',
      link: 'https://meet.google.com/hij-klmn',
      duration: 120,
      maxStudents: 20,
      currentStudents: 15
    },
    {
      id: 'sch_1_3',
      teacherId: '1',
      teacherName: 'أ. محمد عبد الله',
      day: 'الأربعاء',
      time: '16:00 - 18:00',
      subject: 'كيمياء - IGCSE',
      link: 'https://meet.google.com/opq-rstu',
      duration: 120,
      maxStudents: 30,
      currentStudents: 22
    }
  ],
  '2': [
    {
      id: 'sch_2_1',
      teacherId: '2',
      teacherName: 'د. نهى أحمد',
      day: 'الأحد',
      time: '10:00 - 12:00',
      subject: 'رياضيات - الثاني الثانوي',
      link: 'https://meet.google.com/math-123',
      duration: 120,
      maxStudents: 25,
      currentStudents: 20
    },
    {
      id: 'sch_2_2',
      teacherId: '2',
      teacherName: 'د. نهى أحمد',
      day: 'الثلاثاء',
      time: '15:00 - 17:00',
      subject: 'رياضيات متقدمة',
      link: 'https://meet.google.com/math-456',
      duration: 120,
      maxStudents: 20,
      currentStudents: 16
    }
  ],
  '3': [
    {
      id: 'sch_3_1',
      teacherId: '3',
      teacherName: 'أ. سارة محمود',
      day: 'الخميس',
      time: '14:00 - 16:00',
      subject: 'فيزياء - الأول الثانوي',
      link: 'https://meet.google.com/physics-789',
      duration: 120,
      maxStudents: 22,
      currentStudents: 14
    }
  ]
};

export class FollowingService {
  // متابعة مدرس
  static followTeacher(studentId: string, teacherId: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // البحث عن المدرس
        const teacher = DUMMY_TEACHERS.find(t => t.id === teacherId);
        if (!teacher) {
          resolve({ success: false, message: 'المدرس غير موجود' });
          return;
        }

        // إنشاء بيانات الطالب إذا لم تكن موجودة
        if (!followingDatabase[studentId]) {
          followingDatabase[studentId] = {
            studentId,
            followedTeachers: [],
            teacherSchedules: {}
          };
        }

        const studentData = followingDatabase[studentId];

        // التحقق من عدم متابعة المدرس مسبقاً
        const isAlreadyFollowing = studentData.followedTeachers.some(t => t.id === teacherId);
        if (isAlreadyFollowing) {
          resolve({ success: false, message: 'تتم متابعة هذا المدرس بالفعل' });
          return;
        }

        // إضافة المدرس إلى قائمة المتابعة
        studentData.followedTeachers.push(teacher);
        
        // إضافة جدول حصص المدرس
        if (DUMMY_SCHEDULES[teacherId]) {
          studentData.teacherSchedules[teacherId] = DUMMY_SCHEDULES[teacherId];
        }

        resolve({ success: true, message: `تم متابعة ${teacher.name} بنجاح` });
      }, 500);
    });
  }

  // إلغاء متابعة مدرس
  static unfollowTeacher(studentId: string, teacherId: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!followingDatabase[studentId]) {
          resolve({ success: false, message: 'بيانات الطالب غير موجودة' });
          return;
        }

        const studentData = followingDatabase[studentId];
        const teacherIndex = studentData.followedTeachers.findIndex(t => t.id === teacherId);
        
        if (teacherIndex === -1) {
          resolve({ success: false, message: 'لا تتم متابعة هذا المدرس' });
          return;
        }

        // إزالة المدرس من قائمة المتابعة
        const teacher = studentData.followedTeachers[teacherIndex];
        studentData.followedTeachers.splice(teacherIndex, 1);
        
        // إزالة جدول حصص المدرس
        delete studentData.teacherSchedules[teacherId];

        resolve({ success: true, message: `تم إلغاء متابعة ${teacher.name} بنجاح` });
      }, 500);
    });
  }

  // الحصول على قائمة المدرسين المتابعين
  static getFollowedTeachers(studentId: string): Promise<Teacher[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!followingDatabase[studentId]) {
          resolve([]);
          return;
        }

        resolve(followingDatabase[studentId].followedTeachers);
      }, 300);
    });
  }

  // الحصول على جداول حصص المدرسين المتابعين
  static getFollowedTeachersSchedules(studentId: string): Promise<Schedule[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!followingDatabase[studentId]) {
          resolve([]);
          return;
        }

        const allSchedules: Schedule[] = [];
        const studentData = followingDatabase[studentId];

        // جمع جميع جداول الحصص من المدرسين المتابعين
        Object.values(studentData.teacherSchedules).forEach(schedules => {
          allSchedules.push(...schedules);
        });

        // ترتيب الجداول حسب اليوم والوقت
        const dayOrder = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
        allSchedules.sort((a, b) => {
          const dayA = dayOrder.indexOf(a.day);
          const dayB = dayOrder.indexOf(b.day);
          if (dayA !== dayB) return dayA - dayB;
          return a.time.localeCompare(b.time);
        });

        resolve(allSchedules);
      }, 300);
    });
  }

  // التحقق من متابعة مدرس
  static isFollowingTeacher(studentId: string, teacherId: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!followingDatabase[studentId]) {
          resolve(false);
          return;
        }

        const isFollowing = followingDatabase[studentId].followedTeachers.some(t => t.id === teacherId);
        resolve(isFollowing);
      }, 200);
    });
  }

  // الحصول على إحصائيات المتابعة
  static getFollowingStats(studentId: string): Promise<{ totalTeachers: number; totalSchedules: number }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!followingDatabase[studentId]) {
          resolve({ totalTeachers: 0, totalSchedules: 0 });
          return;
        }

        const studentData = followingDatabase[studentId];
        const totalTeachers = studentData.followedTeachers.length;
        let totalSchedules = 0;

        Object.values(studentData.teacherSchedules).forEach(schedules => {
          totalSchedules += schedules.length;
        });

        resolve({ totalTeachers, totalSchedules });
      }, 200);
    });
  }
}

