
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import PaymentMethods from '../PaymentMethods';
import { 
  ShoppingBag, 
  Star, 
  Image as ImageIcon,
  CheckCircle
} from 'lucide-react';

const StudentStore = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const products = [
    {
      id: 1,
      name: 'كراسة ملاحظات أكاديمية Mymath',
      price: 25,
      originalPrice: 35,
      image: '/placeholder.svg',
      rating: 4.8,
      category: 'قرطاسية',
      inStock: true,
      description: 'كراسة ملاحظات عالية الجودة مع تصميم أكاديمية Mymath'
    },
    {
      id: 2,
      name: 'USB فلاشة هدية المتفوق',
      price: 50,
      originalPrice: 70,
      image: '/placeholder.svg',
      rating: 4.9,
      category: 'هدايا',
      inStock: true,
      description: 'فلاشة USB بتصميم خاص للطلاب المتفوقين'
    },
    {
      id: 3,
      name: 'تيشيرت أكاديمية Mymath',
      price: 120,
      originalPrice: 150,
      image: '/placeholder.svg',
      rating: 4.7,
      category: 'ملابس',
      inStock: false,
      description: 'تيشيرت قطني مريح بلوجو أكاديمية Mymath'
    },
    {
      id: 4,
      name: 'آلة حاسبة علمية',
      price: 85,
      originalPrice: 100,
      image: '/placeholder.svg',
      rating: 4.6,
      category: 'أدوات دراسية',
      inStock: true,
      description: 'آلة حاسبة علمية متقدمة مناسبة لجميع المراحل'
    }
  ];

  const handleBuyNow = (product: any) => {
    setSelectedProduct(product);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setPurchaseComplete(true);
    setShowPayment(false);
    // العودة للمتجر بعد 2 ثانية
    setTimeout(() => {
      setPurchaseComplete(false);
      setSelectedProduct(null);
    }, 2000);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    const remainingStars = 5 - fullStars;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };

  if (purchaseComplete) {
    return (
      <div className="space-y-6 flex items-center justify-center min-h-96">
        <Card className="card-educational p-8 text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">تم الشراء بنجاح!</h2>
          <p className="text-muted-foreground mb-4">
            تم تأكيد طلبك لـ {selectedProduct?.name}
          </p>
          <p className="text-sm text-muted-foreground">
            سيتم التواصل معك قريباً لتأكيد التسليم
          </p>
        </Card>
      </div>
    );
  }

  if (showPayment && selectedProduct) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">إتمام الشراء</h2>
          <Button variant="outline" onClick={() => setShowPayment(false)}>
            العودة للمتجر
          </Button>
        </div>

        <Card className="card-educational p-6 mb-6">
          <h3 className="text-xl font-bold text-primary mb-4">تفاصيل المنتج</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-semibold">{selectedProduct.name}</h4>
              <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-primary">{selectedProduct.price} ج.م</span>
                {selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-sm line-through text-muted-foreground">
                    {selectedProduct.originalPrice} ج.م
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>

        <PaymentMethods 
          onPaymentComplete={handlePaymentComplete}
          totalAmount={selectedProduct.price}
          itemName={selectedProduct.name}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">متجر أكاديمية Mymath</h2>
        <Badge variant="default" className="bg-educational text-educational-foreground">
          <ShoppingBag className="h-4 w-4 ml-1" />
          {products.length} منتج
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="card-educational overflow-hidden">
            <div className="aspect-square bg-muted flex items-center justify-center">
              <ImageIcon className="h-16 w-16 text-muted-foreground" />
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="text-xs text-muted-foreground">
                    ({product.rating})
                  </span>
                </div>
              </div>
              
              <h3 className="font-semibold text-primary mb-2 line-clamp-2">
                {product.name}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold text-primary">
                  {product.price} ج.م
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm line-through text-muted-foreground">
                    {product.originalPrice} ج.م
                  </span>
                )}
              </div>
              
              <Button 
                className="w-full" 
                disabled={!product.inStock}
                variant={product.inStock ? "default" : "secondary"}
                onClick={() => product.inStock && handleBuyNow(product)}
              >
                {product.inStock ? 'اشتري الآن' : 'غير متوفر'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentStore;
