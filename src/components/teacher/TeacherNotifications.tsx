import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Bell, 
  Search, 
  Filter,
  CheckCircle,
  Circle,
  Trash2,
  Archive,
  Mail,
  CreditCard,
  Star,
  MessageSquare,
  Gift,
  HelpCircle,
  Calendar
} from 'lucide-react';

const TeacherNotifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // بيانات وهمية للإشعارات
  const [notifications, setNotifications] = useState([
    {
      id: 'NOTIF001',
      type: 'payment',
      title: 'إيصال دفع جديد',
      message: 'تم استلام دفعة من أحمد محمد بقيمة 200 ج.م لكورس الجبر المتقدم',
      timestamp: '2024-01-20T10:30:00Z',
      isRead: false,
      isImportant: true,
      studentName: 'أحمد محمد',
      amount: 200,
      courseName: 'الجبر المتقدم'
    },
    {
      id: 'NOTIF002',
      type: 'review',
      title: 'تقييم جديد',
      message: 'قامت فاطمة أحمد بتقييم كورس حساب المثلثات بـ 5 نجوم',
      timestamp: '2024-01-20T09:15:00Z',
      isRead: false,
      isImportant: false,
      studentName: 'فاطمة أحمد',
      rating: 5,
      courseName: 'حساب المثلثات'
    },
    {
      id: 'NOTIF003',
      type: 'support',
      title: 'طلب دعم جديد',
      message: 'محمد سعد يحتاج مساعدة في موضوع المصفوفات',
      timestamp: '2024-01-19T16:45:00Z',
      isRead: true,
      isImportant: true,
      studentName: 'محمد سعد',
      subject: 'المصفوفات'
    },
    {
      id: 'NOTIF004',
      type: 'envelope',
      title: 'ظرف أحمر منتهي الصلاحية',
      message: 'انتهت صلاحية الظرف الأحمر "خصم 20%" ولم يتم استخدامه',
      timestamp: '2024-01-19T14:20:00Z',
      isRead: true,
      isImportant: false,
      envelopeName: 'خصم 20%',
      discount: 20
    },
    {
      id: 'NOTIF005',
      type: 'student',
      title: 'طالب جديد',
      message: 'انضم نور الدين أحمد إلى كورس الهندسة التحليلية',
      timestamp: '2024-01-18T11:30:00Z',
      isRead: true,
      isImportant: false,
      studentName: 'نور الدين أحمد',
      courseName: 'الهندسة التحليلية'
    },
    {
      id: 'NOTIF006',
      type: 'lesson',
      title: 'تذكير بالحصة',
      message: 'لديك حصة حساب المثلثات غداً في الساعة 2:00 مساءً',
      timestamp: '2024-01-17T18:00:00Z',
      isRead: true,
      isImportant: true,
      courseName: 'حساب المثلثات',
      lessonTime: '2024-01-21T14:00:00Z'
    },
    {
      id: 'NOTIF007',
      type: 'message',
      title: 'رسالة من طالب',
      message: 'سارة محمود أرسلت رسالة: "شكراً لك على الشرح الرائع"',
      timestamp: '2024-01-17T15:20:00Z',
      isRead: false,
      isImportant: false,
      studentName: 'سارة محمود'
    },
    {
      id: 'NOTIF008',
      type: 'admin',
      title: 'إشعار من الإدارة',
      message: 'تم تحديث سياسة المنصة، يرجى مراجعة الشروط الجديدة',
      timestamp: '2024-01-16T12:00:00Z',
      isRead: true,
      isImportant: true
    }
  ]);

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notif => notif.id !== notificationId));
  };

  const archiveNotification = (notificationId: string) => {
    console.log('أرشفة الإشعار:', notificationId);
    // هنا سيتم نقل الإشعار للأرشيف
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment': return <CreditCard className="h-5 w-5 text-success" />;
      case 'review': return <Star className="h-5 w-5 text-warning" />;
      case 'support': return <HelpCircle className="h-5 w-5 text-primary" />;
      case 'envelope': return <Gift className="h-5 w-5 text-destructive" />;
      case 'student': return <Circle className="h-5 w-5 text-educational" />;
      case 'lesson': return <Calendar className="h-5 w-5 text-primary" />;
      case 'message': return <MessageSquare className="h-5 w-5 text-muted-foreground" />;
      case 'admin': return <Bell className="h-5 w-5 text-warning" />;
      default: return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case 'payment': return 'دفعة';
      case 'review': return 'تقييم';
      case 'support': return 'دعم';
      case 'envelope': return 'ظرف أحمر';
      case 'student': return 'طالب';
      case 'lesson': return 'حصة';
      case 'message': return 'رسالة';
      case 'admin': return 'إدارة';
      default: return 'عام';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'منذ قليل';
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    if (diffInHours < 48) return 'أمس';
    return date.toLocaleDateString('ar-EG');
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (notification.studentName && notification.studentName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesTab = true;
    if (activeTab === 'unread') matchesTab = !notification.isRead;
    else if (activeTab === 'important') matchesTab = notification.isImportant;
    else if (activeTab === 'payments') matchesTab = notification.type === 'payment';
    else if (activeTab === 'support') matchesTab = notification.type === 'support';
    
    return matchesSearch && matchesTab;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const importantCount = notifications.filter(n => n.isImportant).length;
  const paymentsCount = notifications.filter(n => n.type === 'payment').length;
  const supportCount = notifications.filter(n => n.type === 'support').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">الإشعارات</h1>
          <p className="text-muted-foreground">تابع جميع الأحداث والتحديثات</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="h-4 w-4 ml-2" />
            تحديد الكل كمقروء
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 ml-2" />
            فلترة
          </Button>
        </div>
      </div>

      {/* إحصائيات الإشعارات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary">{notifications.length}</div>
              <div className="text-sm text-muted-foreground">إجمالي الإشعارات</div>
            </div>
            <Bell className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-warning">{unreadCount}</div>
              <div className="text-sm text-muted-foreground">غير مقروءة</div>
            </div>
            <Circle className="h-8 w-8 text-warning" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-destructive">{importantCount}</div>
              <div className="text-sm text-muted-foreground">مهمة</div>
            </div>
            <Bell className="h-8 w-8 text-destructive" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-success">{paymentsCount}</div>
              <div className="text-sm text-muted-foreground">دفعات جديدة</div>
            </div>
            <CreditCard className="h-8 w-8 text-success" />
          </div>
        </Card>
      </div>

      {/* شريط البحث */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في الإشعارات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* تبويبات الإشعارات */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">الكل ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">غير مقروءة ({unreadCount})</TabsTrigger>
          <TabsTrigger value="important">مهمة ({importantCount})</TabsTrigger>
          <TabsTrigger value="payments">دفعات ({paymentsCount})</TabsTrigger>
          <TabsTrigger value="support">دعم ({supportCount})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card className="p-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">لا توجد إشعارات</h3>
              <p className="text-muted-foreground">لا توجد إشعارات تطابق البحث الحالي</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`p-4 transition-colors ${
                    !notification.isRead ? 'border-primary/50 bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-medium ${!notification.isRead ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {getNotificationTypeLabel(notification.type)}
                          </Badge>
                          {notification.isImportant && (
                            <Badge variant="destructive" className="text-xs">مهم</Badge>
                          )}
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatTimestamp(notification.timestamp)}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-3">
                        {notification.message}
                      </p>
                      
                      {/* معلومات إضافية حسب نوع الإشعار */}
                      {notification.type === 'payment' && notification.amount && (
                        <div className="flex items-center gap-2 text-sm">
                          <Badge className="bg-success">+{notification.amount.toLocaleString()} ج.م</Badge>
                          {notification.courseName && (
                            <span className="text-muted-foreground">• {notification.courseName}</span>
                          )}
                        </div>
                      )}
                      
                      {notification.type === 'review' && notification.rating && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex">
                            {Array.from({ length: notification.rating }, (_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          {notification.courseName && (
                            <span className="text-muted-foreground">• {notification.courseName}</span>
                          )}
                        </div>
                      )}
                      
                      {notification.type === 'lesson' && notification.lessonTime && (
                        <div className="text-sm text-muted-foreground">
                          موعد الحصة: {new Date(notification.lessonTime).toLocaleString('ar-EG')}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mt-3">
                        {!notification.isRead && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Mail className="h-4 w-4 ml-2" />
                            تحديد كمقروء
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => archiveNotification(notification.id)}
                        >
                          <Archive className="h-4 w-4 ml-2" />
                          أرشفة
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4 ml-2" />
                          حذف
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherNotifications;

