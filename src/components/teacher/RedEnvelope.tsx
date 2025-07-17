import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Gift, 
  Download, 
  Copy,
  Calendar,
  Users,
  Percent,
  Star,
  Package,
  Eye,
  Trash2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface Envelope {
  id: string;
  type: 'discount' | 'points' | 'gift';
  title: string;
  description: string;
  value: string;
  quantity: number;
  usedCount: number;
  expiryDate: string;
  code: string;
  status: 'active' | 'expired' | 'used_up';
  createdAt: string;
  imageUrl: string;
}

const RedEnvelope = () => {
  const [envelopes, setEnvelopes] = useState<Envelope[]>([
    {
      id: '1',
      type: 'discount',
      title: 'خصم 20% على الشهر القادم',
      description: 'خصم خاص للطلاب المتميزين',
      value: '20%',
      quantity: 50,
      usedCount: 12,
      expiryDate: '2024-02-15',
      code: 'DISC20-2024',
      status: 'active',
      createdAt: '2024-01-15',
      imageUrl: '/envelopes/discount-20.jpg'
    },
    {
      id: '2',
      type: 'points',
      title: '100 نقطة إضافية',
      description: 'نقاط للاستخدام في المتجر',
      value: '100',
      quantity: 30,
      usedCount: 8,
      expiryDate: '2024-02-28',
      code: 'POINTS100-2024',
      status: 'active',
      createdAt: '2024-01-10',
      imageUrl: '/envelopes/points-100.jpg'
    },
    {
      id: '3',
      type: 'gift',
      title: 'كتاب مجاني من المتجر',
      description: 'اختر أي كتاب من مكتبة الرياضيات',
      value: 'كتاب مجاني',
      quantity: 20,
      usedCount: 20,
      expiryDate: '2024-01-31',
      code: 'FREEBOOK-2024',
      status: 'used_up',
      createdAt: '2024-01-05',
      imageUrl: '/envelopes/free-book.jpg'
    },
    {
      id: '4',
      type: 'discount',
      title: 'خصم 15% على الحصص الإضافية',
      description: 'خصم على الحصص الفردية',
      value: '15%',
      quantity: 25,
      usedCount: 5,
      expiryDate: '2024-01-25',
      code: 'EXTRA15-2024',
      status: 'expired',
      createdAt: '2024-01-01',
      imageUrl: '/envelopes/extra-discount.jpg'
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    value: '',
    quantity: '',
    expiryDate: ''
  });

  const handleCreateEnvelope = () => {
    const newEnvelope: Envelope = {
      id: Date.now().toString(),
      type: formData.type as 'discount' | 'points' | 'gift',
      title: formData.title,
      description: formData.description,
      value: formData.value,
      quantity: parseInt(formData.quantity),
      usedCount: 0,
      expiryDate: formData.expiryDate,
      code: generateCode(formData.type),
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      imageUrl: `/envelopes/${formData.type}-${Date.now()}.jpg`
    };

    setEnvelopes([newEnvelope, ...envelopes]);
    resetForm();
    setIsCreateDialogOpen(false);
    
    // Mock image generation
    alert(`تم إنشاء الظرف بنجاح!\nالكود: ${newEnvelope.code}\nسيتم توليد صورة JPG للظرف تلقائياً.`);
  };

  const generateCode = (type: string) => {
    const prefix = type === 'discount' ? 'DISC' : 
                  type === 'points' ? 'PTS' : 'GIFT';
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}${random}-2024`;
  };

  const resetForm = () => {
    setFormData({
      type: '',
      title: '',
      description: '',
      value: '',
      quantity: '',
      expiryDate: ''
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`تم نسخ الكود: ${code}`);
  };

  const handleDownloadImage = (envelope: Envelope) => {
    // Mock download
    alert(`تم تحميل صورة الظرف: ${envelope.title}`);
  };

  const handleDeleteEnvelope = (envelopeId: string) => {
    setEnvelopes(envelopes.filter(env => env.id !== envelopeId));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'discount': return <Percent className="h-4 w-4" />;
      case 'points': return <Star className="h-4 w-4" />;
      case 'gift': return <Package className="h-4 w-4" />;
      default: return <Gift className="h-4 w-4" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'discount': return 'خصم';
      case 'points': return 'نقاط';
      case 'gift': return 'هدية';
      default: return 'غير محدد';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'expired': return 'bg-red-500';
      case 'used_up': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'expired': return 'منتهي الصلاحية';
      case 'used_up': return 'نفد العدد';
      default: return 'غير محدد';
    }
  };

  const isExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">الظرف الأحمر</h1>
          <p className="text-muted-foreground">أنشئ وأدر الأظرف الحمراء للطلاب</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              إنشاء ظرف جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>إنشاء ظرف أحمر جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="type">نوع الظرف</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الظرف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">خصم</SelectItem>
                    <SelectItem value="points">نقاط</SelectItem>
                    <SelectItem value="gift">هدية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">عنوان الظرف</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="مثال: خصم 20% على الشهر القادم"
                />
              </div>

              <div>
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="وصف تفصيلي للظرف"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="value">القيمة</Label>
                <Input
                  id="value"
                  value={formData.value}
                  onChange={(e) => setFormData({...formData, value: e.target.value})}
                  placeholder={
                    formData.type === 'discount' ? 'مثال: 20%' :
                    formData.type === 'points' ? 'مثال: 100' :
                    'مثال: كتاب مجاني'
                  }
                />
              </div>

              <div>
                <Label htmlFor="quantity">عدد الأظرف</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  placeholder="مثال: 50"
                  min="1"
                />
              </div>

              <div>
                <Label htmlFor="expiryDate">تاريخ انتهاء الصلاحية</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateEnvelope} className="flex-1">
                  إنشاء الظرف
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Gift className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{envelopes.length}</div>
                <div className="text-sm text-muted-foreground">إجمالي الأظرف</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {envelopes.reduce((sum, env) => sum + env.usedCount, 0)}
                </div>
                <div className="text-sm text-muted-foreground">مستخدم</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {envelopes.filter(env => env.status === 'active').length}
                </div>
                <div className="text-sm text-muted-foreground">نشط</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {envelopes.filter(env => isExpiringSoon(env.expiryDate)).length}
                </div>
                <div className="text-sm text-muted-foreground">ينتهي قريباً</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Envelopes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {envelopes.map((envelope) => (
          <Card key={envelope.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {getTypeIcon(envelope.type)}
                  <Badge variant="secondary">{getTypeText(envelope.type)}</Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownloadImage(envelope)}
                    title="تحميل الصورة"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteEnvelope(envelope.id)}
                    title="حذف الظرف"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg">{envelope.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {envelope.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    {envelope.value}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(envelope.status)}`}></div>
                    <span className="text-sm">{getStatusText(envelope.status)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>المستخدم:</span>
                    <span>{envelope.usedCount} / {envelope.quantity}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(envelope.usedCount / envelope.quantity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-sm">
                  <div className="flex justify-between">
                    <span>تاريخ الانتهاء:</span>
                    <span className={isExpiringSoon(envelope.expiryDate) ? 'text-red-600 font-medium' : ''}>
                      {new Date(envelope.expiryDate).toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                  {isExpiringSoon(envelope.expiryDate) && (
                    <div className="text-red-600 text-xs mt-1">
                      ⚠️ ينتهي خلال أسبوع
                    </div>
                  )}
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">الكود:</span>
                    <div className="flex items-center gap-2">
                      <code className="bg-muted px-2 py-1 rounded text-xs">
                        {envelope.code}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyCode(envelope.code)}
                        title="نسخ الكود"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  تم الإنشاء: {new Date(envelope.createdAt).toLocaleDateString('ar-EG')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {envelopes.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد أظرف حمراء</h3>
            <p className="text-muted-foreground mb-4">
              ابدأ بإنشاء أول ظرف أحمر للطلاب
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              إنشاء ظرف جديد
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RedEnvelope;

