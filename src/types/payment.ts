// تعريف أنواع البيانات للمدفوعات والوصول للمحاضرات

export interface PaymentRequest {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  courseId: string;
  courseName: string;
  amount: number;
  paymentMethod: 'vodafone_cash' | 'instapay' | 'points' | 'red_envelope';
  receiptImage?: string;
  redEnvelopeCode?: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  adminNotes?: string;
}

export interface LectureAccess {
  id: string;
  studentId: string;
  teacherId: string;
  courseId: string;
  lectureId: string;
  accessGranted: boolean;
  grantedAt?: Date;
  grantedBy?: string;
  expiresAt?: Date;
}

export interface TeacherNotification {
  id: string;
  teacherId: string;
  type: 'student_enrolled' | 'payment_approved' | 'new_student';
  title: string;
  message: string;
  studentId?: string;
  studentName?: string;
  courseId?: string;
  courseName?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface AdminNotification {
  id: string;
  type: 'payment_request' | 'teacher_registration' | 'system_alert';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  relatedId?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface StudentEnrollment {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  courseId: string;
  courseName: string;
  enrollmentDate: Date;
  status: 'active' | 'suspended' | 'completed';
  paymentStatus: 'paid' | 'pending' | 'overdue';
  lastPaymentDate?: Date;
  nextPaymentDue?: Date;
}

export interface Lecture {
  id: string;
  teacherId: string;
  courseId: string;
  title: string;
  description: string;
  scheduledAt: Date;
  duration: number; // in minutes
  type: 'live' | 'recorded';
  meetingLink?: string;
  recordingUrl?: string;
  isPublic: boolean;
  maxStudents?: number;
  enrolledStudents: string[];
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  teacherId: string;
  teacherName: string;
  title: string;
  description: string;
  subject: string;
  level: string;
  monthlyPrice: number;
  totalLectures: number;
  duration: string;
  schedule: {
    day: string;
    time: string;
  }[];
  isActive: boolean;
  maxStudents?: number;
  enrolledStudents: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMethodData {
  vodafone_cash: {
    phoneNumber: string;
    receiptImage: string;
  };
  instapay: {
    phoneNumber: string;
    receiptImage: string;
  };
  points: {
    pointsUsed: number;
  };
  red_envelope: {
    envelopeCode: string;
    envelopeImage: string;
  };
}

