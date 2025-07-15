
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Upload, 
  Wallet, 
  Gift,
  CreditCard
} from 'lucide-react';

interface PaymentMethodsProps {
  onPaymentComplete: () => void;
  totalAmount: number;
  itemName: string;
}

const PaymentMethods = ({ onPaymentComplete, totalAmount, itemName }: PaymentMethodsProps) => {
  const [uploadedReceipt, setUploadedReceipt] = useState<File | null>(null);
  const [redEnvelopeCode, setRedEnvelopeCode] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'receipt' | 'envelope') => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === 'receipt') {
        setUploadedReceipt(file);
      } else {
        setRedEnvelopeCode(file);
      }
    }
  };

  const handlePaymentConfirm = () => {
    // في التطبيق الحقيقي، هنا سيكون التحقق من الدفع
    onPaymentComplete();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Payment Methods */}
      <Card className="card-educational p-6">
        <h3 className="text-xl font-bold text-primary mb-6">طرق الدفع المتاحة</h3>
        
        <div className="space-y-4">
          {/* Vodafone Cash */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className="h-5 w-5 text-red-600" />
              <span className="font-medium">فودافون كاش</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              ادفع عبر فودافون كاش وارفع صورة الإيصال
            </p>
            <div className="space-y-3">
              <div>
                <Label htmlFor="receipt">رفع صورة الإيصال</Label>
                <Input
                  id="receipt"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'receipt')}
                  className="mt-1"
                />
              </div>
              {uploadedReceipt && (
                <div className="flex items-center gap-2 text-sm text-success">
                  <Upload className="h-4 w-4" />
                  <span>تم رفع الملف: {uploadedReceipt.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Points */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Wallet className="h-5 w-5 text-educational" />
              <span className="font-medium">النقاط المتاحة</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              استخدم نقاطك المكتسبة للحصول على خصومات
            </p>
            <div className="bg-educational/10 rounded-lg p-3">
              <span className="text-2xl font-bold text-educational">180</span>
              <span className="text-sm text-muted-foreground mr-2">نقطة متاحة</span>
            </div>
          </div>

          {/* Red Envelope */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Gift className="h-5 w-5 text-red-600" />
              <span className="font-medium">كود الظرف الأحمر</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              ارفع صورة كود الظرف الأحمر للحصول على الخصم
            </p>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'envelope')}
              placeholder="رفع صورة الظرف الأحمر"
            />
            {redEnvelopeCode && (
              <div className="flex items-center gap-2 text-sm text-success mt-2">
                <Upload className="h-4 w-4" />
                <span>تم رفع الملف: {redEnvelopeCode.name}</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Order Summary */}
      <Card className="card-educational p-6">
        <h3 className="text-xl font-bold text-primary mb-6">ملخص الطلب</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>{itemName}</span>
            <span>{totalAmount} ج.م</span>
          </div>
          <div className="flex justify-between text-success">
            <span>خصم الظرف الأحمر</span>
            <span>-{Math.round(totalAmount * 0.2)} ج.م</span>
          </div>
          <hr />
          <div className="flex justify-between text-lg font-bold text-primary">
            <span>الإجمالي</span>
            <span>{Math.round(totalAmount * 0.8)} ج.م</span>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <Button 
            className="w-full bg-gradient-to-r from-primary to-educational"
            onClick={handlePaymentConfirm}
          >
            تأكيد الدفع
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            سيتم مراجعة طلبك خلال 24 ساعة
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PaymentMethods;
