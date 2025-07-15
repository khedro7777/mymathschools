
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Baby, 
  Sparkles, 
  Heart, 
  Star, 
  Circle, 
  Square, 
  Triangle,
  Music,
  Gamepad2,
  Palette,
  Building,
  Car,
  Apple,
  Sun,
  Moon,
  Smile
} from 'lucide-react';

const PreschoolSection = () => {
  const [activeCategory, setActiveCategory] = useState('numbers');

  const categories = [
    { id: 'numbers', name: 'الأرقام', icon: Circle, color: 'text-primary' },
    { id: 'shapes', name: 'الأشكال', icon: Square, color: 'text-educational' },
    { id: 'colors', name: 'الألوان', icon: Palette, color: 'text-success' },
    { id: 'games', name: 'ألعاب تفاعلية', icon: Gamepad2, color: 'text-warning' }
  ];

  const activities = {
    numbers: [
      {
        id: '1',
        title: 'تعلم العد من 1 إلى 10',
        description: 'ألعاب ممتعة لتعلم الأرقام',
        difficulty: 'سهل',
        duration: '10 دقائق',
        icon: '🔢',
        color: 'bg-primary/10'
      },
      {
        id: '2',
        title: 'عد التفاحات 🍎',
        description: 'عد الفواكه واتعلم الأرقام',
        difficulty: 'سهل',
        duration: '8 دقائق',
        icon: '🍎',
        color: 'bg-success/10'
      },
      {
        id: '3',
        title: 'لعبة الرقم المخفي',
        description: 'اكتشف الرقم المخفي وحل اللغز',
        difficulty: 'متوسط',
        duration: '15 دقيقة',
        icon: '🎲',
        color: 'bg-educational/10'
      }
    ],
    shapes: [
      {
        id: '4',
        title: 'تعرف على الأشكال',
        description: 'دائرة، مربع، مثلث وأكثر',
        difficulty: 'سهل',
        duration: '12 دقيقة',
        icon: '⭕',
        color: 'bg-primary/10'
      },
      {
        id: '5',
        title: 'رحلة الأشكال المغامرة',
        description: 'استكشف عالم الأشكال الممتع',
        difficulty: 'متوسط',
        duration: '20 دقيقة',
        icon: '🔷',
        color: 'bg-educational/10'
      }
    ],
    colors: [
      {
        id: '6',
        title: 'قوس قزح الألوان',
        description: 'تعلم الألوان الأساسية',
        difficulty: 'سهل',
        duration: '10 دقائق',
        icon: '🌈',
        color: 'bg-success/10'
      },
      {
        id: '7',
        title: 'مزج الألوان السحري',
        description: 'اكتشف ألوان جديدة بالمزج',
        difficulty: 'متوسط',
        duration: '18 دقيقة',
        icon: '🎨',
        color: 'bg-warning/10'
      }
    ],
    games: [
      {
        id: '8',
        title: 'لعبة الذاكرة الرقمية',
        description: 'اختبر ذاكرتك مع الأرقام',
        difficulty: 'متوسط',
        duration: '15 دقيقة',
        icon: '🧠',
        color: 'bg-primary/10'
      },
      {
        id: '9',
        title: 'سباق الحساب السريع',
        description: 'سباق ممتع في حل المسائل',
        difficulty: 'متقدم',
        duration: '25 دقيقة',
        icon: '🏁',
        color: 'bg-educational/10'
      }
    ]
  };

  const achievements = [
    { title: 'خبير الأرقام', icon: '🏆', earned: true },
    { title: 'مكتشف الأشكال', icon: '⭐', earned: true },
    { title: 'فنان الألوان', icon: '🎨', earned: false },
    { title: 'بطل الألعاب', icon: '🎮', earned: false }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
            <Baby className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary">رياضيات الأطفال</h2>
            <p className="text-muted-foreground">للأعمار من 3-5 سنوات</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          <p className="text-lg text-muted-foreground">تعلم ممتع وآمن للصغار</p>
          <Sparkles className="h-5 w-5 text-yellow-500" />
        </div>
      </div>

      {/* Progress Card */}
      <Card className="card-educational p-6 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">تقدم طفلك</h3>
              <p className="text-sm text-muted-foreground">أكمل 8 من أصل 15 نشاط</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">53%</div>
            <div className="text-sm text-muted-foreground">مكتمل</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 h-3 rounded-full" style={{width: '53%'}}></div>
        </div>

        {/* Achievements */}
        <div className="flex gap-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                achievement.earned 
                  ? 'bg-yellow-100 border border-yellow-300' 
                  : 'bg-gray-100 border border-gray-300'
              }`}
            >
              <span className="text-lg">{achievement.icon}</span>
              <span className={achievement.earned ? 'text-yellow-800' : 'text-gray-500'}>
                {achievement.title}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category.id)}
              className="flex items-center gap-2"
            >
              <Icon className={`h-4 w-4 ${category.color}`} />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities[activeCategory].map((activity) => (
          <Card
            key={activity.id}
            className={`card-educational p-6 hover:scale-105 transition-transform cursor-pointer ${activity.color}`}
          >
            <div className="text-center mb-4">
              <div className="text-6xl mb-3">{activity.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{activity.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  activity.difficulty === 'سهل' ? 'border-green-400 text-green-700' :
                  activity.difficulty === 'متوسط' ? 'border-yellow-400 text-yellow-700' :
                  'border-red-400 text-red-700'
                }`}
              >
                {activity.difficulty}
              </Badge>
              <span className="text-xs text-muted-foreground">{activity.duration}</span>
            </div>

            <Button className="w-full btn-educational">
              <Smile className="h-4 w-4 ml-2" />
              ابدأ اللعب
            </Button>
          </Card>
        ))}
      </div>

      {/* Parent Tips */}
      <Card className="card-educational p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold">نصائح للآباء</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-primary">⏰ وقت اللعب المثالي</h4>
            <p className="text-sm text-muted-foreground">10-15 دقيقة يومياً كافية للأطفال في هذا العمر</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-primary">🎯 التشجيع المستمر</h4>
            <p className="text-sm text-muted-foreground">احتفل بكل إنجاز صغير واجعل التعلم ممتعاً</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-primary">👥 التعلم معاً</h4>
            <p className="text-sm text-muted-foreground">شارك طفلك في الأنشطة واجعل التعلم تجربة مشتركة</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-primary">🌟 الصبر والمرونة</h4>
            <p className="text-sm text-muted-foreground">كل طفل يتعلم بطريقته وسرعته الخاصة</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PreschoolSection;
