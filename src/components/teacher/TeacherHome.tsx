import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Bell,
  Receipt,
  HelpCircle,
  Gift,
  CheckCircle
} from 'lucide-react';

const TeacherHome = () => {
  const [stats] = useState({
    totalStudents: 142,
    weekSessions: 18,
    monthlyEarnings: 12450,
    completionRate: 94
  });

  const [notifications] = useState([
    {
      id: '1',
      type: 'receipt',
      title: 'إيصالات جديدة',
      count: 3,
      description: 'يوجد 3 إيصالات جديدة تحتاج للمراجعة',
      icon: Receipt,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      type: 'support',
      title: 'تذاكر دعم',
      count: 2,
      description: 'طلبات دعم من الطلاب تحتاج للرد',
      icon: HelpCircle,
      color: 'bg-orange-500'
    },
    {
      id: '3',
      type: 'envelope',
      title: 'ظرف منتهي',
      count: 1,
      description: 'ظرف أحمر انتهت صلاحيته',
      icon: Gift,
      color: 'bg-red-500'
    },
    {
      id: '4',
      type: 'payment',
      title: 'دفعة تنتظر تأكيد',
      count: 1,
      description: 'دفعة من أحمد محمد تحتاج للتأكيد',
      icon: CheckCircle,
      color: 'bg-green-500'
    }
  ]);

  const [recentActivities] = useState([
    {
      id: '1',
      type: 'student_joined',
      message: 'انضم طالب جديد: فاطمة أحمد',
      time: 'منذ 30 دقيقة',
      course: 'الجبر المتقدم'
    },
    {
      id: '2',
      type: 'payment_received',
      message: 'تم استلام دفعة من محمد سعد',
      time: 'منذ ساعة',
      amount: '200 ج.م'
    },
    {
      id: '3',
      type: 'review_added',
      message: 'تقييم جديد 5 نجوم من نور الدين',
      time: 'منذ ساعتين',
      rating: 5
    },
    {
      id: '4',
      type: 'session_completed',
      message: 'تم إنهاء حصة الهندسة التحليلية',
      time: 'منذ 3 ساعات',
      students: 15
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">مرحباً بك، د. سارة أحمد</h1>
          <p className="text-muted-foreground">إليك ملخص نشاطك اليوم</p>
        </div>
        <div className="text-left">
          <div className="text-2xl font-bold text-primary">
            {new Date().toLocaleDateString('ar-EG')}
          </div>
          <div className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('ar-EG', { weekday: 'long' })}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.totalStudents}</div>
                <div className="text-primary-foreground/80">عدد الطلاب الحاليين</div>
              </div>
              <Users className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-educational to-educational/80 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.weekSessions}</div>
                <div className="text-educational-foreground/80">عدد الحصص هذا الأسبوع</div>
              </div>
              <Calendar className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-success to-success/80 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.monthlyEarnings.toLocaleString()}</div>
                <div className="text-success-foreground/80">الأرباح هذا الشهر (ج.م)</div>
              </div>
              <DollarSign className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-warning to-warning/80 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.completionRate}%</div>
                <div className="text-warning-foreground/80">معدل إكمال الحصص</div>
              </div>
              <TrendingUp className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            الإشعارات المهمة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${notification.color} rounded-full flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        <Badge variant="secondary">{notification.count}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>النشاطات الأخيرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      {activity.course && (
                        <Badge variant="outline" className="text-xs">
                          {activity.course}
                        </Badge>
                      )}
                      {activity.amount && (
                        <span className="text-xs font-medium text-success">
                          {activity.amount}
                        </span>
                      )}
                      {activity.rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(activity.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-500 text-xs">⭐</span>
                          ))}
                        </div>
                      )}
                      {activity.students && (
                        <span className="text-xs text-muted-foreground">
                          {activity.students} طالب
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 ml-2" />
                إضافة طالب جديد
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 ml-2" />
                جدولة حصة جديدة
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Gift className="h-4 w-4 ml-2" />
                إنشاء ظرف أحمر
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Receipt className="h-4 w-4 ml-2" />
                مراجعة المدفوعات
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherHome;

