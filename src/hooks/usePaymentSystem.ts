import { useState, useEffect } from 'react';
import { PaymentRequest, LectureAccess, TeacherNotification, AdminNotification, StudentEnrollment } from '../types/payment';

// محاكاة قاعدة البيانات المحلية
const mockPaymentRequests: PaymentRequest[] = [
  {
    id: '1',
    studentId: 'student_1',
    studentName: 'أحمد محمد',
    teacherId: 'teacher_1',
    teacherName: 'د. سارة أحمد',
    courseId: 'course_1',
    courseName: 'الرياضيات المتقدمة',
    amount: 450,
    paymentMethod: 'vodafone_cash',
    receiptImage: '/receipts/receipt_1.jpg',
    status: 'pending',
    submittedAt: new Date('2024-01-15T10:30:00'),
  },
  {
    id: '2',
    studentId: 'student_2',
    studentName: 'فاطمة علي',
    teacherId: 'teacher_2',
    teacherName: 'أ. محمد علي',
    courseId: 'course_2',
    courseName: 'الفيزياء التطبيقية',
    amount: 380,
    paymentMethod: 'instapay',
    receiptImage: '/receipts/receipt_2.jpg',
    status: 'under_review',
    submittedAt: new Date('2024-01-14T14:20:00'),
  },
  {
    id: '3',
    studentId: 'student_3',
    studentName: 'محمود حسن',
    teacherId: 'teacher_1',
    teacherName: 'د. سارة أحمد',
    courseId: 'course_1',
    courseName: 'الرياضيات المتقدمة',
    amount: 450,
    paymentMethod: 'red_envelope',
    redEnvelopeCode: 'RED2024001',
    status: 'approved',
    submittedAt: new Date('2024-01-13T09:15:00'),
    reviewedAt: new Date('2024-01-13T11:30:00'),
    reviewedBy: 'admin_1',
  }
];

const mockAdminNotifications: AdminNotification[] = [
  {
    id: '1',
    type: 'payment_request',
    title: 'طلب دفع جديد',
    message: 'طلب دفع من أحمد محمد لكورس الرياضيات المتقدمة',
    priority: 'high',
    relatedId: '1',
    isRead: false,
    createdAt: new Date('2024-01-15T10:30:00'),
  },
  {
    id: '2',
    type: 'payment_request',
    title: 'طلب دفع قيد المراجعة',
    message: 'طلب دفع من فاطمة علي لكورس الفيزياء التطبيقية',
    priority: 'medium',
    relatedId: '2',
    isRead: false,
    createdAt: new Date('2024-01-14T14:20:00'),
  }
];

const mockTeacherNotifications: TeacherNotification[] = [
  {
    id: '1',
    teacherId: 'teacher_1',
    type: 'student_enrolled',
    title: 'طالب جديد انضم للكورس',
    message: 'محمود حسن انضم إلى كورس الرياضيات المتقدمة',
    studentId: 'student_3',
    studentName: 'محمود حسن',
    courseId: 'course_1',
    courseName: 'الرياضيات المتقدمة',
    isRead: false,
    createdAt: new Date('2024-01-13T11:30:00'),
  }
];

export const usePaymentSystem = () => {
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>(mockPaymentRequests);
  const [adminNotifications, setAdminNotifications] = useState<AdminNotification[]>(mockAdminNotifications);
  const [teacherNotifications, setTeacherNotifications] = useState<TeacherNotification[]>(mockTeacherNotifications);
  const [loading, setLoading] = useState(false);

  // إرسال طلب دفع جديد
  const submitPaymentRequest = async (request: Omit<PaymentRequest, 'id' | 'status' | 'submittedAt'>) => {
    setLoading(true);
    
    const newRequest: PaymentRequest = {
      ...request,
      id: `payment_${Date.now()}`,
      status: 'pending',
      submittedAt: new Date(),
    };

    // إضافة الطلب للقائمة
    setPaymentRequests(prev => [newRequest, ...prev]);

    // إنشاء إشعار للإدارة
    const adminNotification: AdminNotification = {
      id: `notification_${Date.now()}`,
      type: 'payment_request',
      title: 'طلب دفع جديد',
      message: `طلب دفع من ${request.studentName} لكورس ${request.courseName}`,
      priority: 'high',
      relatedId: newRequest.id,
      isRead: false,
      createdAt: new Date(),
    };

    setAdminNotifications(prev => [adminNotification, ...prev]);
    setLoading(false);

    return newRequest;
  };

  // موافقة الإدارة على طلب الدفع
  const approvePaymentRequest = async (requestId: string, adminId: string, notes?: string) => {
    setLoading(true);

    const updatedRequests = paymentRequests.map(request => {
      if (request.id === requestId) {
        const updatedRequest = {
          ...request,
          status: 'approved' as const,
          reviewedAt: new Date(),
          reviewedBy: adminId,
          adminNotes: notes,
        };

        // إنشاء إشعار للمدرس
        const teacherNotification: TeacherNotification = {
          id: `teacher_notification_${Date.now()}`,
          teacherId: request.teacherId,
          type: 'payment_approved',
          title: 'تم تأكيد دفع طالب',
          message: `تم تأكيد دفع ${request.studentName} لكورس ${request.courseName}`,
          studentId: request.studentId,
          studentName: request.studentName,
          courseId: request.courseId,
          courseName: request.courseName,
          isRead: false,
          createdAt: new Date(),
        };

        setTeacherNotifications(prev => [teacherNotification, ...prev]);

        return updatedRequest;
      }
      return request;
    });

    setPaymentRequests(updatedRequests);
    setLoading(false);
  };

  // رفض طلب الدفع
  const rejectPaymentRequest = async (requestId: string, adminId: string, notes: string) => {
    setLoading(true);

    const updatedRequests = paymentRequests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          status: 'rejected' as const,
          reviewedAt: new Date(),
          reviewedBy: adminId,
          adminNotes: notes,
        };
      }
      return request;
    });

    setPaymentRequests(updatedRequests);
    setLoading(false);
  };

  // منح الوصول للمحاضرة
  const grantLectureAccess = async (studentId: string, teacherId: string, courseId: string, lectureId: string) => {
    // هنا سيتم تنفيذ منطق منح الوصول
    console.log('Granting access:', { studentId, teacherId, courseId, lectureId });
  };

  // الحصول على طلبات الدفع المعلقة
  const getPendingPaymentRequests = () => {
    return paymentRequests.filter(request => request.status === 'pending');
  };

  // الحصول على الإشعارات غير المقروءة للإدارة
  const getUnreadAdminNotifications = () => {
    return adminNotifications.filter(notification => !notification.isRead);
  };

  // الحصول على الإشعارات غير المقروءة للمدرس
  const getUnreadTeacherNotifications = (teacherId: string) => {
    return teacherNotifications.filter(notification => 
      notification.teacherId === teacherId && !notification.isRead
    );
  };

  // تحديد الإشعار كمقروء
  const markNotificationAsRead = (notificationId: string, type: 'admin' | 'teacher') => {
    if (type === 'admin') {
      setAdminNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } else {
      setTeacherNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, isRead: true }
            : notification
        )
      );
    }
  };

  return {
    paymentRequests,
    adminNotifications,
    teacherNotifications,
    loading,
    submitPaymentRequest,
    approvePaymentRequest,
    rejectPaymentRequest,
    grantLectureAccess,
    getPendingPaymentRequests,
    getUnreadAdminNotifications,
    getUnreadTeacherNotifications,
    markNotificationAsRead,
  };
};

