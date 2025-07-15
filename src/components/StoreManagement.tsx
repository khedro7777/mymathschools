import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, ShoppingBag, Package, TrendingUp, Eye, Edit, Trash2, Star, ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  rating: number;
  image: string;
  status: 'نشط' | 'غير نشط' | 'نفد المخزون';
}

const StoreManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'دفتر مدرسي مسطر',
      category: 'دفاتر وكراسات',
      price: 12,
      stock: 150,
      sold: 89,
      rating: 4.5,
      image: '/placeholder.svg',
      status: 'نشط'
    },
    {
      id: '2',
      name: 'قلم جاف أزرق',
      category: 'أدوات كتابة',
      price: 5,
      stock: 200,
      sold: 156,
      rating: 4.2,
      image: '/placeholder.svg',
      status: 'نشط'
    },
    {
      id: '3',
      name: 'حقيبة مدرسية',
      category: 'حقائب مدرسية',
      price: 85,
      stock: 0,
      sold: 45,
      rating: 4.8,
      image: '/placeholder.svg',
      status: 'نفد المخزون'
    },
    {
      id: '4',
      name: 'آلة حاسبة علمية',
      category: 'إلكترونيات',
      price: 125,
      stock: 30,
      sold: 78,
      rating: 4.9,
      image: '/placeholder.svg',
      status: 'نشط'
    }
  ];

  const [products, setProducts] = useState(sampleProducts);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: ''
  });

  const storeStats = [
    { label: 'إجمالي المنتجات', value: '124', icon: Package },
    { label: 'المبيعات هذا الشهر', value: '1,240', icon: TrendingUp },
    { label: 'الإيرادات (ريال)', value: '45,300', icon: ShoppingBag },
    { label: 'الطلبات الجديدة', value: '67', icon: Package }
  ];

  const categories = [
    { name: 'أدوات كتابة', count: 45 },
    { name: 'دفاتر وكراسات', count: 32 },
    { name: 'حقائب مدرسية', count: 18 },
    { name: 'أدوات هندسية', count: 15 },
    { name: 'إلكترونيات', count: 14 }
  ];

  const sampleOrders = [
    { id: '1001', customer: 'أحمد محمد', items: 'دفتر × 3، قلم × 2', total: 45, status: 'تم التسليم', date: '2024-01-15' },
    { id: '1002', customer: 'فاطمة علي', items: 'حقيبة مدرسية، أقلام ملونة', total: 120, status: 'قيد التجهيز', date: '2024-01-14' },
    { id: '1003', customer: 'محمد سعد', items: 'آلة حاسبة علمية', total: 85, status: 'تم الشحن', date: '2024-01-13' },
  ];

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.price) {
      const product: Product = {
        id: String(products.length + 1),
        name: newProduct.name,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock) || 0,
        sold: 0,
        rating: 0,
        image: '/placeholder.svg',
        status: 'نشط'
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', category: '', price: '', stock: '', description: '' });
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Store Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {storeStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="card-educational p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
                <Icon className="h-8 w-8 text-primary" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Categories */}
      <Card className="card-educational p-6">
        <h3 className="text-xl font-semibold mb-4 text-foreground">فئات المنتجات</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="text-center p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium text-sm text-foreground">{category.name}</h4>
              <p className="text-xs text-muted-foreground">{category.count} منتج</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Products */}
      <Card className="card-educational p-6">
        <h3 className="text-xl font-semibold mb-4 text-foreground">المنتجات الأكثر مبيعاً</h3>
        <div className="space-y-4">
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h4 className="font-medium text-foreground">{product.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>تم بيع {product.sold}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold text-primary">{product.price} ريال</div>
                <Badge variant={product.status === 'نشط' ? 'default' : 'destructive'}>
                  {product.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-semibold text-foreground">إدارة المنتجات</h3>
        <Button variant="educational" onClick={() => setActiveTab('add-product')}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة منتج جديد
        </Button>
      </div>
      
      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id} className="card-educational">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <img src={product.image} alt={product.name} className="w-full sm:w-20 h-32 sm:h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <Badge variant={product.status === 'نشط' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">السعر:</span>
                      <span className="font-semibold text-foreground mr-1">{product.price} ريال</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">المخزون:</span>
                      <span className="font-semibold text-foreground mr-1">{product.stock}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">المبيعات:</span>
                      <span className="font-semibold text-foreground mr-1">{product.sold}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-foreground">{product.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 ml-1" />
                      تعديل
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 ml-1" />
                      عرض
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash2 className="h-4 w-4 ml-1" />
                      حذف
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAddProduct = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => setActiveTab('products')}>
          <ArrowRight className="h-4 w-4 ml-2" />
          العودة للمنتجات
        </Button>
        <h3 className="text-xl font-semibold text-foreground">إضافة منتج جديد</h3>
      </div>
      
      <Card className="card-educational">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">اسم المنتج</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="أدخل اسم المنتج"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">الفئة</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                >
                  <option value="">اختر الفئة</option>
                  <option value="أدوات كتابة">أدوات كتابة</option>
                  <option value="دفاتر وكراسات">دفاتر وكراسات</option>
                  <option value="حقائب مدرسية">حقائب مدرسية</option>
                  <option value="أدوات هندسية">أدوات هندسية</option>
                  <option value="إلكترونيات">إلكترونيات</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">السعر (ريال)</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">الكمية</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">الوصف</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent h-24 bg-background text-foreground"
                  placeholder="وصف المنتج..."
                />
              </div>
              <div className="flex gap-3">
                <Button variant="educational" onClick={handleAddProduct} className="flex-1">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة المنتج
                </Button>
                <Button variant="outline" onClick={() => setActiveTab('products')} className="flex-1">
                  إلغاء
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-foreground">الطلبات الحديثة</h3>
      <div className="space-y-4">
        {sampleOrders.map((order) => (
          <Card key={order.id} className="card-educational">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="font-semibold text-foreground">طلب #{order.id}</h4>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                  <p className="text-sm text-muted-foreground">{order.items}</p>
                  <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                </div>
                <div className="text-left">
                  <div className="text-lg font-semibold text-primary">{order.total} ريال</div>
                  <Badge variant="default">{order.status}</Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-primary to-educational rounded-xl flex items-center justify-center">
          <ShoppingBag className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary">متجر الأدوات التعليمية</h2>
          <p className="text-muted-foreground">إدارة المنتجات والمبيعات</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'overview' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          نظرة عامة
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'products' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          المنتجات
        </button>
        <button
          onClick={() => setActiveTab('add-product')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'add-product' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          إضافة منتج
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'orders' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          الطلبات
        </button>
      </div>

      <div className="mt-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'add-product' && renderAddProduct()}
        {activeTab === 'orders' && renderOrders()}
      </div>
    </div>
  );
};

export default StoreManagement;