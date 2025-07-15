
import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Wallet, 
  Star, 
  Gift, 
  TrendingUp, 
  Award,
  Coins,
  History
} from 'lucide-react';

const StudentWallet = () => {
  const walletData = {
    totalPoints: 180,
    availablePoints: 180,
    usedPoints: 50,
    earnedThisMonth: 75
  };

  const rewardsHistory = [
    {
      id: 1,
      source: 'أ. محمد عبد الله',
      type: 'مكافأة تفوق',
      points: 50,
      date: '2024-01-15',
      reason: 'حل ممتاز في الاختبار الشهري'
    },
    {
      id: 2,
      source: 'د. نهى أحمد',
      type: 'مشاركة فعالة',
      points: 25,
      date: '2024-01-12',
      reason: 'مشاركة نشطة في الحصة المباشرة'
    },
    {
      id: 3,
      source: 'النظام',
      type: 'إنجاز شهري',
      points: 30,
      date: '2024-01-01',
      reason: 'إكمال 90% من الواجبات'
    },
    {
      id: 4,
      source: 'أ. سارة محمود',
      type: 'تقدير خاص',
      points: 20,
      date: '2023-12-28',
      reason: 'تحسن ملحوظ في الأداء'
    }
  ];

  const achievements = [
    {
      title: 'الطالب المثالي',
      description: 'حصل على أعلى النقاط هذا الشهر',
      icon: Star,
      earned: true,
      points: 100
    },
    {
      title: 'المشارك النشط',
      description: 'شارك في أكثر من 20 حصة مباشرة',
      icon: TrendingUp,
      earned: true,
      points: 75
    },
    {
      title: 'سفير الأكاديمية',
      description: 'دعا 5 أصدقاء للانضمام',
      icon: Award,
      earned: false,
      points: 200
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">محفظتي</h2>
        <Badge variant="default" className="bg-educational text-educational-foreground">
          <Coins className="h-4 w-4 ml-1" />
          {walletData.totalPoints} نقطة
        </Badge>
      </div>

      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-educational p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <div className="text-2xl font-bold text-primary mb-1">
            {walletData.availablePoints}
          </div>
          <div className="text-sm text-muted-foreground">النقاط المتاحة</div>
        </Card>

        <Card className="card-educational p-6 text-center">
          <div className="w-12 h-12 bg-educational/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="h-6 w-6 text-educational" />
          </div>
          <div className="text-2xl font-bold text-educational mb-1">
            {walletData.earnedThisMonth}
          </div>
          <div className="text-sm text-muted-foreground">مكتسب هذا الشهر</div>
        </Card>

        <Card className="card-educational p-6 text-center">
          <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Gift className="h-6 w-6 text-success" />
          </div>
          <div className="text-2xl font-bold text-success mb-1">
            {walletData.usedPoints}
          </div>
          <div className="text-sm text-muted-foreground">تم استخدامها</div>
        </Card>

        <Card className="card-educational p-6 text-center">
          <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Award className="h-6 w-6 text-warning" />
          </div>
          <div className="text-2xl font-bold text-warning mb-1">
            3
          </div>
          <div className="text-sm text-muted-foreground">إنجازات مفتوحة</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rewards History */}
        <Card className="card-educational p-6">
          <div className="flex items-center gap-2 mb-6">
            <History className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold text-primary">سجل المكافآت</h3>
          </div>
          
          <div className="space-y-4">
            {rewardsHistory.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{reward.type}</span>
                    <Badge variant="outline" className="text-xs">
                      {reward.source}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {reward.reason}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {reward.date}
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-success">
                    +{reward.points}
                  </div>
                  <div className="text-xs text-muted-foreground">نقطة</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="card-educational p-6">
          <div className="flex items-center gap-2 mb-6">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold text-primary">الإنجازات</h3>
          </div>
          
          <div className="space-y-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div 
                  key={index} 
                  className={`flex items-center gap-4 p-4 border rounded-lg ${
                    achievement.earned ? 'bg-success/5 border-success/20' : 'bg-muted/30'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.earned ? 'bg-success/20' : 'bg-muted/50'
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      achievement.earned ? 'text-success' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-1 ${
                      achievement.earned ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                  <div className="text-left">
                    <div className={`font-bold ${
                      achievement.earned ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {achievement.points}
                    </div>
                    <div className="text-xs text-muted-foreground">نقطة</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentWallet;
