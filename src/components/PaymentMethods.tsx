
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { usePaymentSystem } from '../hooks/usePaymentSystem';
import { 
  Upload, 
  Wallet, 
  Gift,
  CreditCard,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface PaymentMethodsProps {
  onPaymentComplete: () => void;
  totalAmount: number;
  itemName: string;
  teacherId: string;
  teacherName: string;
  courseId: string;
  courseName: string;
  studentId?: string;
  studentName?: string;
}

const PaymentMethods = ({ 
  onPaymentComplete, 
  totalAmount, 
  itemName, 
  teacherId, 
  teacherName, 
  courseId, 
  courseName,
  studentId = 'student_demo',
  studentName = 'طالب تجريبي'
}: PaymentMethodsProps) => {
  const [uploadedReceipt, setUploadedReceipt] = useState<File | null>(null);
  const [redEnvelopeCode, setRedEnvelopeCode] = useState<File | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'vodafone_cash' | 'instapay' | 'points' | 'red_envelope' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { submitPaymentRequest, loading } = usePaymentSystem();

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

  const handlePaymentConfirm = async () => {
    if (!selectedPaymentMethod) {
      alert('يرجى اختيار طريقة الدفع');
      return;
    }

    if ((selectedPaymentMethod === 'vodafone_cash' || selectedPaymentMethod === 'instapay') && !uploadedReceipt) {
      alert('يرجى رفع صورة الإيصال');
      return;
    }

    if (selectedPaymentMethod === 'red_envelope' && !redEnvelopeCode) {
      alert('يرجى رفع صورة كود الظرف الأحمر');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitPaymentRequest({
        studentId,
        studentName,
        teacherId,
        teacherName,
        courseId,
        courseName,
        amount: totalAmount,
        paymentMethod: selectedPaymentMethod,
        receiptImage: uploadedReceipt ? URL.createObjectURL(uploadedReceipt) : undefined,
        redEnvelopeCode: redEnvelopeCode ? URL.createObjectURL(redEnvelopeCode) : undefined,
      });

      setSubmitSuccess(true);
      
      // إظهار رسالة النجاح لمدة 3 ثوان ثم استدعاء onPaymentComplete
      setTimeout(() => {
        onPaymentComplete();
      }, 3000);

    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('حدث خطأ أثناء إرسال طلب الدفع');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="card-educational p-8 text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">تم إرسال طلب الدفع!</h2>
          <p className="text-muted-foreground mb-4">
            تم إرسال طلب الدفع إلى الإدارة للمراجعة
          </p>
          <p className="text-sm text-muted-foreground">
            سيتم إشعارك عند الموافقة على الطلب...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Payment Methods */}
      <Card className="card-educational p-6">
        <h3 className="text-xl font-bold text-primary mb-6">طرق الدفع المتاحة</h3>
        
        <div className="space-y-4">
          {/* Vodafone Cash */}
          <div 
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedPaymentMethod === 'vodafone_cash' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
            }`}
            onClick={() => setSelectedPaymentMethod('vodafone_cash')}
          >
            <div className="flex items-center gap-3 mb-3">
              <input 
                type="radio" 
                checked={selectedPaymentMethod === 'vodafone_cash'}
                onChange={() => setSelectedPaymentMethod('vodafone_cash')}
                className="text-primary"
              />
              <CreditCard className="h-5 w-5 text-red-600" />
              <span className="font-medium">فودافون كاش</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              ادفع عبر فودافون كاش وارفع صورة الإيصال
            </p>
            {selectedPaymentMethod === 'vodafone_cash' && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="vodafone-receipt">رفع صورة الإيصال</Label>
                  <Input
                    id="vodafone-receipt"
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
            )}
          </div>

          {/* InstaPay */}
          <div 
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedPaymentMethod === 'instapay' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
            }`}
            onClick={() => setSelectedPaymentMethod('instapay')}
          >
            <div className="flex items-center gap-3 mb-3">
              <input 
                type="radio" 
                checked={selectedPaymentMethod === 'instapay'}
                onChange={() => setSelectedPaymentMethod('instapay')}
                className="text-primary"
              />
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span className="font-medium">InstaPay</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              ادفع عبر InstaPay وارفع صورة الإيصال
            </p>
            {selectedPaymentMethod === 'instapay' && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="instapay-receipt">رفع صورة الإيصال</Label>
                  <Input
                    id="instapay-receipt"
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
            )}
          </div>

          {/* Points */}
          <div 
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedPaymentMethod === 'points' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
            }`}
            onClick={() => setSelectedPaymentMethod('points')}
          >
            <div className="flex items-center gap-3 mb-3">
              <input 
                type="radio" 
                checked={selectedPaymentMethod === 'points'}
                onChange={() => setSelectedPaymentMethod('points')}
                className="text-primary"
              />
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
          <div 
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedPaymentMethod === 'red_envelope' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
            }`}
            onClick={() => setSelectedPaymentMethod('red_envelope')}
          >
            <div className="flex items-center gap-3 mb-3">
              <input 
                type="radio" 
                checked={selectedPaymentMethod === 'red_envelope'}
                onChange={() => setSelectedPaymentMethod('red_envelope')}
                className="text-primary"
              />
              <Gift className="h-5 w-5 text-red-600" />
              <span className="font-medium">كود الظرف الأحمر</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              ارفع صورة كود الظرف الأحمر للحصول على الخصم
            </p>
            {selectedPaymentMethod === 'red_envelope' && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="red-envelope">رفع صورة الظرف الأحمر</Label>
                  <Input
                    id="red-envelope"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'envelope')}
                    className="mt-1"
                  />
                </div>
                {redEnvelopeCode && (
                  <div className="flex items-center gap-2 text-sm text-success">
                    <Upload className="h-4 w-4" />
                    <span>تم رفع الملف: {redEnvelopeCode.name}</span>
                  </div>
                )}
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
          {selectedPaymentMethod === 'red_envelope' && (
            <div className="flex justify-between text-success">
              <span>خصم الظرف الأحمر</span>
              <span>-{Math.round(totalAmount * 0.2)} ج.م</span>
            </div>
          )}
          {selectedPaymentMethod === 'points' && (
            <div className="flex justify-between text-educational">
              <span>خصم النقاط</span>
              <span>-{Math.min(180, Math.round(totalAmount * 0.1))} ج.م</span>
            </div>
          )}
          <hr />
          <div className="flex justify-between text-lg font-bold text-primary">
            <span>الإجمالي</span>
            <span>
              {selectedPaymentMethod === 'red_envelope' 
                ? Math.round(totalAmount * 0.8)
                : selectedPaymentMethod === 'points'
                ? totalAmount - Math.min(180, Math.round(totalAmount * 0.1))
                : totalAmount
              } ج.م
            </span>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <Button 
            className="w-full bg-gradient-to-r from-primary to-educational"
            onClick={handlePaymentConfirm}
            disabled={!selectedPaymentMethod || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <AlertCircle className="h-4 w-4 ml-2 animate-spin" />
                جاري الإرسال...
              </>
            ) : (
              'إرسال طلب الدفع'
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            سيتم مراجعة طلبك من قبل الإدارة خلال 24 ساعة
          </p>
          <div className="bg-primary/10 rounded-lg p-3">
            <h4 className="font-medium text-primary mb-2">ملاحظة هامة:</h4>
            <p className="text-sm text-muted-foreground">
              بعد موافقة الإدارة على طلب الدفع، ستحصل على إشعار وسيتم منحك الوصول للمحاضرات المطلوبة.
              كما سيتم إشعار المدرس بانضمامك للكورس.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentMethods;
