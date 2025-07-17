import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Star, 
  MessageSquare, 
  TrendingUp,
  Filter,
  Search,
  ThumbsUp,
  Reply,
  Flag
} from 'lucide-react';

const Reviews = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // بيانات وهمية للتقييمات
  const [reviews] = useState([
    {
      id: 'REV001',
      studentName: 'أحمد محمد علي',
      studentAvatar: '/avatars/student1.jpg',
      courseName: 'الجبر المتقدم - الصف الثالث الثانوي',
      rating: 5,
      comment: 'أستاذة ممتازة جداً، شرحها واضح ومفهوم. استفدت كثيراً من الكورس وأصبحت أفهم الجبر بشكل أفضل.',
      createdAt: '2024-01-20T10:30:00Z',
      isPublic: true,
      helpful: 12,
      replied: false
    },
    {
      id: 'REV002',
      studentName: 'فاطمة أحمد حسن',
      studentAvatar: '/avatars/student2.jpg',
      courseName: 'حساب المثلثات - الصف الثالث الثانوي',
      rating: 4,
      comment: 'كورس جيد جداً، لكن أتمنى لو كان هناك المزيد من التمارين العملية.',
      createdAt: '2024-01-19T16:45:00Z',
      isPublic: true,
      helpful: 8,
      replied: true,
      reply: 'شكراً لك فاطمة، سأضيف المزيد من التمارين في الحصص القادمة.'
    },
    {
      id: 'REV003',
      studentName: 'محمد سعد إبراهيم',
      studentAvatar: '/avatars/student3.jpg',
      courseName: 'الهندسة التحليلية - الصف الثالث الثانوي',
      rating: 5,
      comment: 'أفضل مدرسة رياضيات تعاملت معها! الشرح مبسط والأمثلة واضحة.',
      createdAt: '2024-01-18T14:20:00Z',
      isPublic: true,
      helpful: 15,
      replied: true,
      reply: 'أشكرك محمد، سعيدة بتقدمك في المادة.'
    },
    {
      id: 'REV004',
      studentName: 'نور الدين أحمد',
      studentAvatar: '/avatars/student4.jpg',
      courseName: 'الجبر الخطي - الصف الثالث الثانوي',
      rating: 3,
      comment: 'الكورس جيد لكن أحياناً السرعة في الشرح تكون عالية قليلاً.',
      createdAt: '2024-01-17T11:15:00Z',
      isPublic: false,
      helpful: 3,
      replied: false
    },
    {
      id: 'REV005',
      studentName: 'سارة محمود',
      studentAvatar: '/avatars/student5.jpg',
      courseName: 'الجبر المتقدم - الصف الثالث الثانوي',
      rating: 5,
      comment: 'ممتازة! درجاتي تحسنت كثيراً بعد انضمامي للكورس.',
      createdAt: '2024-01-16T09:30:00Z',
      isPublic: true,
      helpful: 20,
      replied: true,
      reply: 'مبروك سارة! أنا فخورة بتقدمك.'
    }
  ]);

  const handleReplyToReview = (reviewId: string, reply: string) => {
    console.log(`الرد على التقييم ${reviewId}: ${reply}`);
    // هنا سيتم إرسال إشعار للطالب
  };

  const handleTogglePublic = (reviewId: string) => {
    console.log(`تغيير حالة العرض العام للتقييم: ${reviewId}`);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'اليوم';
    if (diffInDays === 1) return 'أمس';
    if (diffInDays < 7) return `منذ ${diffInDays} أيام`;
    return date.toLocaleDateString('ar-EG');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesTab = true;
    if (activeTab === 'high') matchesTab = review.rating >= 4;
    else if (activeTab === 'low') matchesTab = review.rating <= 3;
    else if (activeTab === 'unreplied') matchesTab = !review.replied;
    
    return matchesSearch && matchesTab;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const highRatings = reviews.filter(r => r.rating >= 4).length;
  const unrepliedCount = reviews.filter(r => !r.replied).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">التقييمات</h1>
          <p className="text-muted-foreground">إدارة تقييمات الطلاب والرد عليها</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 ml-2" />
            فلترة
          </Button>
        </div>
      </div>

      {/* إحصائيات التقييمات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary">{averageRating.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">متوسط التقييم</div>
              <div className="flex mt-1">
                {renderStars(Math.round(averageRating))}
              </div>
            </div>
            <Star className="h-8 w-8 text-yellow-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-success">{totalReviews}</div>
              <div className="text-sm text-muted-foreground">إجمالي التقييمات</div>
            </div>
            <MessageSquare className="h-8 w-8 text-success" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-educational">{highRatings}</div>
              <div className="text-sm text-muted-foreground">تقييمات عالية (4-5)</div>
            </div>
            <TrendingUp className="h-8 w-8 text-educational" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-warning">{unrepliedCount}</div>
              <div className="text-sm text-muted-foreground">بحاجة للرد</div>
            </div>
            <Reply className="h-8 w-8 text-warning" />
          </div>
        </Card>
      </div>

      {/* شريط البحث */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في التقييمات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* تبويبات التقييمات */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">الكل ({totalReviews})</TabsTrigger>
          <TabsTrigger value="high">عالية ({highRatings})</TabsTrigger>
          <TabsTrigger value="low">منخفضة ({totalReviews - highRatings})</TabsTrigger>
          <TabsTrigger value="unreplied">بحاجة للرد ({unrepliedCount})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredReviews.length === 0 ? (
            <Card className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">لا توجد تقييمات</h3>
              <p className="text-muted-foreground">لا توجد تقييمات تطابق البحث الحالي</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold">
                        {review.studentName.charAt(0)}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{review.studentName}</h3>
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <Badge variant={review.isPublic ? "default" : "secondary"}>
                            {review.isPublic ? 'عام' : 'خاص'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatTimestamp(review.createdAt)}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{review.courseName}</p>
                      <p className="text-foreground mb-4">{review.comment}</p>
                      
                      {review.replied && review.reply && (
                        <div className="bg-muted/50 p-3 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Reply className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">ردك:</span>
                          </div>
                          <p className="text-sm">{review.reply}</p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{review.helpful} مفيد</span>
                          </div>
                          
                          <div className="flex gap-2">
                            {!review.replied && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleReplyToReview(review.id, 'رد تجريبي')}
                              >
                                <Reply className="h-4 w-4 ml-2" />
                                رد
                              </Button>
                            )}
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleTogglePublic(review.id)}
                            >
                              {review.isPublic ? 'إخفاء' : 'إظهار'}
                            </Button>
                            
                            <Button variant="outline" size="sm">
                              <Flag className="h-4 w-4 ml-2" />
                              إبلاغ
                            </Button>
                          </div>
                        </div>
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

export default Reviews;

