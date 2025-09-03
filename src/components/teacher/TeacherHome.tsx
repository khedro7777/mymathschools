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
    totalStudents: 0,
    weekSessions: 0,
    monthlyEarnings: 0,
    completionRate: 0
  });

  const [notifications] = useState([]);

  const [quickActions] = useState([
    {
      id: 'add-student',
      title: 'إضافة طالب جديد',
      description: 'إضافة طالب جديد للمجموعة',
      icon: Users,
      color: 'bg-blue-500',
      action: () => console.log('Add student')
    },
    {
      id: 'schedule-session',
      title: 'جدولة حصة جديدة',
      description: 'إنشاء حصة جديدة في الجدول',
      icon: Calendar,
      color: 'bg-green-500',
      action: () => console.log('Schedule session')
    },
    {
      id: 'create-envelope',
      title: 'إنشاء ظرف أحمر',
      description: 'إنشاء ظرف أحمر جديد للطلاب',
      icon: Gift,
      color: 'bg-red-500',
      action: () => console.log('Create envelope')
    },
    {
      id: 'review-payments',
      title: 'مراجعة المدفوعات',
      description: 'مراجعة المدفوعات والإيصالات',
      icon: Receipt,
      color: 'bg-purple-500',
      action: () => console.log('Review payments')
    }
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">عدد الطلاب</p>
                <p className="text-2xl font-bold">{stats.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">حصص هذا الأسبوع</p>
                <p className="text-2xl font-bold">{stats.weekSessions}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الأرباح هذا الشهر</p>
                <p className="text-2xl font-bold">{stats.monthlyEarnings.toLocaleString()} ج.م</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل الإكمال</p>
                <p className="text-2xl font-bold">{stats.completionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* الإشعارات */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            الإشعارات المهمة
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600">لا توجد إشعارات جديدة</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${notification.color}`}>
                      <notification.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-600">{notification.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{notification.count}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* الإجراءات السريعة */}
      <Card>
        <CardHeader>
          <CardTitle>الإجراءات السريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-gray-50"
                onClick={action.action}
              >
                <div className={`p-3 rounded-full ${action.color}`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-sm">{action.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherHome;

