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

  const products: any[] = [];

  const handlePurchase = (product: any) => {
    setSelectedProduct(product);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    setPurchaseComplete(true);
    setTimeout(() => setPurchaseComplete(false), 3000);
  };

  if (showPayment && selectedProduct) {
    return (
      <PaymentMethods 
        amount={selectedProduct.price}
        description={`شراء ${selectedProduct.name}`}
        onPaymentComplete={handlePaymentComplete}
        onCancel={() => setShowPayment(false)}
      />
    );
  }

  if (purchaseComplete) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">تم الشراء بنجاح!</h2>
          <p className="text-gray-600">شكراً لك على الشراء من متجر أكاديمية Mymath</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">المتجر غير متاح حالياً</h3>
          <p className="text-gray-600 mb-6">سيتم إضافة المنتجات قريباً</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">متجر أكاديمية Mymath</h1>
        <Badge variant="secondary" className="text-sm">
          {products.length} منتج
        </Badge>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="stationery">قرطاسية</TabsTrigger>
          <TabsTrigger value="gifts">هدايا</TabsTrigger>
          <TabsTrigger value="clothing">ملابس</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-gray-400" />
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                    <Badge 
                      variant={product.inStock ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {product.inStock ? "متوفر" : "نفد"}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <Badge variant="outline" className="text-xs mr-2">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-blue-600">
                        {product.price} ج.م
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.originalPrice} ج.م
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      size="sm"
                      onClick={() => handlePurchase(product)}
                      disabled={!product.inStock}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      شراء
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* باقي التبويبات */}
        <TabsContent value="stationery" className="mt-6">
          <div className="text-center py-8">
            <p className="text-gray-600">لا توجد منتجات قرطاسية متاحة حالياً</p>
          </div>
        </TabsContent>

        <TabsContent value="gifts" className="mt-6">
          <div className="text-center py-8">
            <p className="text-gray-600">لا توجد هدايا متاحة حالياً</p>
          </div>
        </TabsContent>

        <TabsContent value="clothing" className="mt-6">
          <div className="text-center py-8">
            <p className="text-gray-600">لا توجد ملابس متاحة حالياً</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentStore;

