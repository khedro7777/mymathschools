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
    totalPoints: 0,
    availablePoints: 0,
    usedPoints: 0,
    earnedThisMonth: 0
  };

  const rewardsHistory: any[] = [];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'مكافأة تفوق':
        return 'bg-yellow-100 text-yellow-800';
      case 'مشاركة فعالة':
        return 'bg-green-100 text-green-800';
      case 'إنجاز شهري':
        return 'bg-blue-100 text-blue-800';
      case 'حضور منتظم':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">محفظة النقاط</h1>
        <Badge variant="secondary" className="text-sm">
          <Coins className="w-4 h-4 mr-1" />
          {walletData.availablePoints} نقطة
        </Badge>
      </div>

      {/* إحصائيات المحفظة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">إجمالي النقاط</p>
              <p className="text-2xl font-bold">{walletData.totalPoints}</p>
            </div>
            <Wallet className="w-8 h-8 text-blue-200" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">النقاط المتاحة</p>
              <p className="text-2xl font-bold">{walletData.availablePoints}</p>
            </div>
            <Star className="w-8 h-8 text-green-200" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">النقاط المستخدمة</p>
              <p className="text-2xl font-bold">{walletData.usedPoints}</p>
            </div>
            <Gift className="w-8 h-8 text-purple-200" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">هذا الشهر</p>
              <p className="text-2xl font-bold">{walletData.earnedThisMonth}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-200" />
          </div>
        </Card>
      </div>

      {/* تاريخ المكافآت */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">تاريخ المكافآت</h2>
        </div>

        {rewardsHistory.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد مكافآت بعد</h3>
            <p className="text-gray-600">ستظهر مكافآتك هنا عند حصولك عليها</p>
          </div>
        ) : (
          <div className="space-y-4">
            {rewardsHistory.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getTypeColor(reward.type)}>
                      {reward.type}
                    </Badge>
                    <span className="text-sm text-gray-600">من {reward.source}</span>
                  </div>
                  <p className="text-gray-800 font-medium mb-1">{reward.reason}</p>
                  <p className="text-sm text-gray-500">{formatDate(reward.date)}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-600 font-bold">
                    <span>+{reward.points}</span>
                    <Coins className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default StudentWallet;

