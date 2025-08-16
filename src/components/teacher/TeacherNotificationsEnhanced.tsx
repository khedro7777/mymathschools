import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { usePaymentSystem } from '../../hooks/usePaymentSystem';
import { 
  Bell, 
  CheckCircle, 
  User, 
  Calendar, 
  DollarSign,
  UserPlus,
  BookOpen,
  Eye,
  EyeOff,
  Trash2,
  Filter,
  Search
} from 'lucide-react';

const TeacherNotificationsEnhanced = () => {
  const { 
    teacherNotifications, 
    getUnreadTeacherNotifications, 
    markNotificationAsRead 
  } = usePaymentSystem();

  const [filter, setFilter] = useState<'all' | 'unread' | 'student_enrolled' | 'payment_approved'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // محاكاة معرف المدرس الحالي
  const currentTeacherId = 'teacher_1';

  const teacherSpecificNotifications = teacherNotifications.filter(
    notification => notification.teacherId === currentTeacherId
  );

  const filteredNotifications = teacherSpecificNotifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (notification.studentName && notification.studentName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notification.isRead) ||
                         (filter === notification.type);
    
    return matchesSearch && matchesFilter;
  });

  const unreadCount = getUnreadTeacherNotifications(currentTeacherId).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'student_enrolled':
        return <UserPlus className="h-5 w-5 text-success" />;
      case 'payment_approved':
        return <DollarSign className="h-5 w-5 text-primary" />;
      case 'new_student':
        return <User className="h-5 w-5 text-educational" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case 'student_enrolled':
        return 'انضمام طالب';
      case 'payment_approved':
        return 'تأكيد دفع';
      case 'new_student':
        return 'طالب جديد';
      default:
        return 'إشعار';
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId, 'teacher');
  };

  const handleMarkAllAsRead = () => {
    teacherSpecificNotifications
      .filter(notification => !notification.isRead)
      .forEach(notification => {
        markNotificationAsRead(notification.id, 'teacher');
      });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">إشعارات المدرس</h1>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} إشعار غير مقروء` : 'جميع الإشعارات مقروءة'}
            </p>
          </div>
        </div>
        
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllAsRead} variant="outline">
            <CheckCircle className="h-4 w-4 ml-2" />
            تحديد الكل كمقروء
          </Button>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-educational p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{teacherSpecificNotifications.length}</div>
              <div className="text-sm text-muted-foreground">إجمالي الإشعارات</div>
            </div>
          </div>
        </Card>

        <Card className="card-educational p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <EyeOff className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{unreadCount}</div>
              <div className="text-sm text-muted-foreground">غير مقروء</div>
            </div>
          </div>
        </Card>

        <Card className="card-educational p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold text-success">
                {teacherSpecificNotifications.filter(n => n.type === 'student_enrolled').length}
              </div>
              <div className="text-sm text-muted-foreground">طلاب جدد</div>
            </div>
          </div>
        </Card>

        <Card className="card-educational p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-educational/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-educational" />
            </div>
            <div>
              <div className="text-2xl font-bold text-educational">
                {teacherSpecificNotifications.filter(n => n.type === 'payment_approved').length}
              </div>
              <div className="text-sm text-muted-foreground">مدفوعات مؤكدة</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="card-educational p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="البحث في الإشعارات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-3 py-2 border border-input rounded-md bg-background"
              />
            </div>
          </div>
          <div className="md:w-48">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">جميع الإشعارات</option>
              <option value="unread">غير مقروء</option>
              <option value="student_enrolled">انضمام طلاب</option>
              <option value="payment_approved">تأكيد مدفوعات</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Notifications List */}
      <Card className="card-educational">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-primary">الإشعارات</h2>
        </div>
        
        <div className="divide-y max-h-[600px] overflow-y-auto">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-muted/50 transition-colors ${
                !notification.isRead ? 'bg-primary/5 border-r-4 border-primary' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground">{notification.title}</h3>
                      <Badge variant="outline" className="mt-1">
                        {getNotificationTypeLabel(notification.type)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(notification.createdAt).toLocaleDateString('ar-EG')}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {notification.message}
                  </p>
                  
                  {notification.studentName && (
                    <div className="flex items-center gap-2 mb-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{notification.studentName}</span>
                      {notification.courseName && (
                        <>
                          <span className="text-sm text-muted-foreground">-</span>
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{notification.courseName}</span>
                        </>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    {!notification.isRead && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <Eye className="h-3 w-3 ml-1" />
                        تحديد كمقروء
                      </Button>
                    )}
                    
                    {notification.type === 'student_enrolled' && notification.studentId && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          // التنقل إلى صفحة الطالب أو إرسال رسالة
                          console.log('عرض تفاصيل الطالب:', notification.studentId);
                        }}
                      >
                        <User className="h-3 w-3 ml-1" />
                        عرض الطالب
                      </Button>
                    )}
                    
                    {notification.courseId && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          // التنقل إلى صفحة الكورس
                          console.log('عرض تفاصيل الكورس:', notification.courseId);
                        }}
                      >
                        <BookOpen className="h-3 w-3 ml-1" />
                        عرض الكورس
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredNotifications.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>لا توجد إشعارات تطابق البحث</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TeacherNotificationsEnhanced;

