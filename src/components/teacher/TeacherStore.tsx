import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ShoppingCart, 
  Search, 
  Filter,
  Star,
  Package,
  CreditCard,
  Download,
  BookOpen,
  Video,
  FileText,
  Headphones
} from 'lucide-react';

const TeacherStore = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<string[]>([]);

  // بيانات وهمية للمنتجات (تأتي من لوحة الإدارة)
  const [products] = useState([
    {
      id: 'PROD001',
      title: 'مجموعة كتب الرياضيات المتقدمة',
      description: 'مجموعة شاملة من الكتب التعليمية للرياضيات المتقدمة للمرحلة الثانوية',
      price: 150,
      originalPrice: 200,
      category: 'books',
      image: '/products/math-books.jpg',
      rating: 4.8,
      reviewsCount: 45,
      isDigital: true,
      tags: ['رياضيات', 'ثانوي', 'كتب'],
      seller: 'إدارة المنصة',
      inStock: true,
      downloadCount: 234
    },
    {
      id: 'PROD002',
      title: 'دورة تدريبية: طرق التدريس الحديثة',
      description: 'دورة شاملة لتطوير مهارات التدريس باستخدام أحدث الطرق والتقنيات',
      price: 300,
      originalPrice: 400,
      category: 'courses',
      image: '/products/teaching-course.jpg',
      rating: 4.9,
      reviewsCount: 78,
      isDigital: true,
      tags: ['تدريس', 'تطوير', 'مهارات'],
      seller: 'إدارة المنصة',
      inStock: true,
      duration: '12 ساعة'
    },
    {
      id: 'PROD003',
      title: 'قوالب عروض تقديمية للرياضيات',
      description: 'مجموعة من القوالب الجاهزة للعروض التقديمية في مادة الرياضيات',
      price: 75,
      originalPrice: 100,
      category: 'templates',
      image: '/products/presentation-templates.jpg',
      rating: 4.6,
      reviewsCount: 32,
      isDigital: true,
      tags: ['عروض', 'قوالب', 'رياضيات'],
      seller: 'إدارة المنصة',
      inStock: true,
      filesCount: 25
    },
    {
      id: 'PROD004',
      title: 'مكتبة الصوتيات التعليمية',
      description: 'مجموعة من الملفات الصوتية والموسيقى التعليمية لتحسين بيئة التعلم',
      price: 120,
      originalPrice: 150,
      category: 'audio',
      image: '/products/audio-library.jpg',
      rating: 4.7,
      reviewsCount: 28,
      isDigital: true,
      tags: ['صوتيات', 'موسيقى', 'تعليم'],
      seller: 'إدارة المنصة',
      inStock: true,
      tracksCount: 50
    },
    {
      id: 'PROD005',
      title: 'برنامج إدارة الحصص والطلاب',
      description: 'برنامج متكامل لإدارة الحصص والطلاب وتتبع التقدم الأكاديمي',
      price: 250,
      originalPrice: 350,
      category: 'software',
      image: '/products/management-software.jpg',
      rating: 4.5,
      reviewsCount: 67,
      isDigital: true,
      tags: ['برامج', 'إدارة', 'تنظيم'],
      seller: 'إدارة المنصة',
      inStock: true,
      license: 'سنة واحدة'
    },
    {
      id: 'PROD006',
      title: 'مجموعة فيديوهات تعليمية متقدمة',
      description: 'مجموعة شاملة من الفيديوهات التعليمية عالية الجودة للرياضيات',
      price: 180,
      originalPrice: 220,
      category: 'videos',
      image: '/products/educational-videos.jpg',
      rating: 4.8,
      reviewsCount: 89,
      isDigital: true,
      tags: ['فيديو', 'تعليم', 'رياضيات'],
      seller: 'إدارة المنصة',
      inStock: true,
      videosCount: 35,
      totalDuration: '15 ساعة'
    }
  ]);

  const addToCart = (productId: string) => {
    if (!cart.includes(productId)) {
      setCart([...cart, productId]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(id => id !== productId));
  };

  const handlePurchase = () => {
    console.log('شراء المنتجات:', cart);
    // هنا سيتم توجيه المدرس لصفحة الدفع
    // وإرسال إشعار للإدارة
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'books': return <BookOpen className="h-5 w-5" />;
      case 'courses': return <Video className="h-5 w-5" />;
      case 'templates': return <FileText className="h-5 w-5" />;
      case 'audio': return <Headphones className="h-5 w-5" />;
      case 'software': return <Package className="h-5 w-5" />;
      case 'videos': return <Video className="h-5 w-5" />;
      default: return <Package className="h-5 w-5" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'books': return 'كتب';
      case 'courses': return 'دورات';
      case 'templates': return 'قوالب';
      case 'audio': return 'صوتيات';
      case 'software': return 'برامج';
      case 'videos': return 'فيديوهات';
      default: return 'أخرى';
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTab = activeTab === 'all' || product.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const categories = [...new Set(products.map(p => p.category))];
  const cartTotal = cart.reduce((total, productId) => {
    const product = products.find(p => p.id === productId);
    return total + (product?.price || 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">المتجر</h1>
          <p className="text-muted-foreground">تسوق الأدوات والموارد التعليمية</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="relative">
            <ShoppingCart className="h-4 w-4 ml-2" />
            السلة ({cart.length})
            {cart.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {cart.length}
              </Badge>
            )}
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 ml-2" />
            فلترة
          </Button>
        </div>
      </div>

      {/* إحصائيات المتجر */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary">{products.length}</div>
              <div className="text-sm text-muted-foreground">منتجات متاحة</div>
            </div>
            <Package className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-success">{categories.length}</div>
              <div className="text-sm text-muted-foreground">فئات المنتجات</div>
            </div>
            <Filter className="h-8 w-8 text-success" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-educational">{cart.length}</div>
              <div className="text-sm text-muted-foreground">في السلة</div>
            </div>
            <ShoppingCart className="h-8 w-8 text-educational" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-warning">{cartTotal.toLocaleString()} ج.م</div>
              <div className="text-sm text-muted-foreground">إجمالي السلة</div>
            </div>
            <CreditCard className="h-8 w-8 text-warning" />
          </div>
        </Card>
      </div>

      {/* شريط البحث */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في المنتجات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* تبويبات الفئات */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">الكل</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>
              <div className="flex items-center gap-2">
                {getCategoryIcon(category)}
                {getCategoryName(category)}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredProducts.length === 0 ? (
            <Card className="p-8 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">لا توجد منتجات</h3>
              <p className="text-muted-foreground">لا توجد منتجات تطابق البحث الحالي</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-educational/10 flex items-center justify-center">
                    {getCategoryIcon(product.category)}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg leading-tight">{product.title}</h3>
                      <Badge variant="secondary">{getCategoryName(product.category)}</Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviewsCount} تقييم)
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      {product.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* معلومات إضافية حسب نوع المنتج */}
                    <div className="text-sm text-muted-foreground mb-4">
                      {product.downloadCount && (
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          <span>{product.downloadCount} تحميل</span>
                        </div>
                      )}
                      {product.duration && (
                        <div className="flex items-center gap-1">
                          <Video className="h-4 w-4" />
                          <span>{product.duration}</span>
                        </div>
                      )}
                      {product.filesCount && (
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>{product.filesCount} ملف</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">
                          {product.price.toLocaleString()} ج.م
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice.toLocaleString()} ج.م
                          </span>
                        )}
                      </div>
                      
                      {cart.includes(product.id) ? (
                        <Button 
                          variant="outline" 
                          onClick={() => removeFromCart(product.id)}
                          className="text-destructive border-destructive"
                        >
                          إزالة من السلة
                        </Button>
                      ) : (
                        <Button onClick={() => addToCart(product.id)}>
                          <ShoppingCart className="h-4 w-4 ml-2" />
                          أضف للسلة
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* سلة التسوق */}
      {cart.length > 0 && (
        <Card className="p-6 border-primary">
          <h3 className="text-lg font-semibold mb-4">سلة التسوق</h3>
          <div className="space-y-3 mb-4">
            {cart.map(productId => {
              const product = products.find(p => p.id === productId);
              if (!product) return null;
              
              return (
                <div key={productId} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(product.category)}
                    <div>
                      <div className="font-medium">{product.title}</div>
                      <div className="text-sm text-muted-foreground">{product.price.toLocaleString()} ج.م</div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeFromCart(productId)}
                    className="text-destructive"
                  >
                    إزالة
                  </Button>
                </div>
              );
            })}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-lg font-semibold">
              الإجمالي: {cartTotal.toLocaleString()} ج.م
            </div>
            <Button onClick={handlePurchase} className="bg-success hover:bg-success/90">
              <CreditCard className="h-4 w-4 ml-2" />
              إتمام الشراء
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TeacherStore;

