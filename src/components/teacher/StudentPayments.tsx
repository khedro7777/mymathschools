import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Filter,
  Download,
  Eye,
  AlertCircle
} from 'lucide-react';

const StudentPayments = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');

  // بيانات وهمية للمدفوعات
  const [payments] = useState([
    {
      id: 'PAY001',
      studentName: 'أحمد محمد علي',
      courseName: 'الجبر المتقدم - الصف الثالث الثانوي',
      amount: 200,
      paymentMethod: 'فودافون كاش',
      receiptImage: '/receipts/receipt001.jpg',
      submittedAt: '2024-01-20T10:30:00Z',
      status: 'pending',
      phoneNumber: '01234567890',
      notes: 'دفعة شهر يناير 2024'
    },
    {
      id: 'PAY002',
      studentName: 'فاطمة أحمد حسن',
      courseName: 'حساب المثلثات - الصف الثالث الثانوي',
      amount: 180,
      paymentMethod: 'أورانج موني',
      receiptImage: '/receipts/receipt002.jpg',
      submittedAt: '2024-01-20T09:15:00Z',
      status: 'approved',
      phoneNumber: '01987654321',
      notes: 'دفعة شهر يناير 2024',
      approvedAt: '2024-01-20T11:00:00Z'
    },
    {
      id: 'PAY003',
      studentName: 'محمد سعد إبراهيم',
      courseName: 'الهندسة التحليلية - الصف الثالث الثانوي',
      amount: 220,
      paymentMethod: 'إتصالات كاش',
      receiptImage: '/receipts/receipt003.jpg',
      submittedAt: '2024-01-19T16:45:00Z',
      status: 'rejected',
      phoneNumber: '01555666777',
      notes: 'دفعة شهر يناير 2024',
      rejectedAt: '2024-01-19T18:00:00Z',
      rejectionReason: 'الإيصال غير واضح'
    },
    {
      id: 'PAY004',
      studentName: 'نور الدين أحمد',
      courseName: 'الجبر الخطي - الصف الثالث الثانوي',
      amount: 190,
      paymentMethod: 'فيزا',
      receiptImage: '/receipts/receipt004.jpg',
      submittedAt: '2024-01-19T14:20:00Z',
      status: 'pending',
      phoneNumber: '01888999000',
      notes: 'دفعة شهر يناير 2024'
    }
  ]);

  const handleApprovePayment = (paymentId: string) => {
    console.log(`تم تأكيد الدفعة: ${paymentId}`);
    // هنا سيتم إرسال إشعار للطالب والإدارة
  };

  const handleRejectPayment = (paymentId: string, reason: string) => {
    console.log(`تم رفض الدفعة: ${paymentId} - السبب: ${reason}`);
    // هنا سيتم إرسال إشعار للطالب والإدارة
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/10 text-warning">في الانتظار</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-success/10 text-success">مؤكد</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive">مرفوض</Badge>;
      default:
        return <Badge variant="secondary">غير محدد</Badge>;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || payment.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const approvedCount = payments.filter(p => p.status === 'approved').length;
  const rejectedCount = payments.filter(p => p.status === 'rejected').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">مدفوعات الطلبة</h1>
          <p className="text-muted-foreground">إدارة وتأكيد مدفوعات الطلاب</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 ml-2" />
            تصدير التقرير
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 ml-2" />
            فلترة
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-warning">{pendingCount}</div>
              <div className="text-sm text-muted-foreground">في الانتظار</div>
            </div>
            <Clock className="h-8 w-8 text-warning" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-success">{approvedCount}</div>
              <div className="text-sm text-muted-foreground">مؤكدة</div>
            </div>
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-destructive">{rejectedCount}</div>
              <div className="text-sm text-muted-foreground">مرفوضة</div>
            </div>
            <XCircle className="h-8 w-8 text-destructive" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary">
                {payments.filter(p => p.status === 'approved').reduce((sum, p) => sum + p.amount, 0).toLocaleString()} ج.م
              </div>
              <div className="text-sm text-muted-foreground">إجمالي المؤكد</div>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* شريط البحث */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث بالاسم أو الكورس أو رقم الدفعة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* تبويبات المدفوعات */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">الكل ({payments.length})</TabsTrigger>
          <TabsTrigger value="pending">في الانتظار ({pendingCount})</TabsTrigger>
          <TabsTrigger value="approved">مؤكدة ({approvedCount})</TabsTrigger>
          <TabsTrigger value="rejected">مرفوضة ({rejectedCount})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredPayments.length === 0 ? (
            <Card className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">لا توجد مدفوعات</h3>
              <p className="text-muted-foreground">لا توجد مدفوعات تطابق البحث الحالي</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredPayments.map((payment) => (
                <Card key={payment.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{payment.studentName}</h3>
                        {getStatusBadge(payment.status)}
                      </div>
                      <p className="text-muted-foreground mb-1">{payment.courseName}</p>
                      <p className="text-sm text-muted-foreground">رقم الدفعة: {payment.id}</p>
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-primary">{payment.amount.toLocaleString()} ج.م</div>
                      <div className="text-sm text-muted-foreground">{payment.paymentMethod}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">رقم الهاتف</div>
                      <div className="font-medium">{payment.phoneNumber}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">تاريخ الإرسال</div>
                      <div className="font-medium">{formatTimestamp(payment.submittedAt)}</div>
                    </div>
                    {payment.status === 'approved' && payment.approvedAt && (
                      <div>
                        <div className="text-sm text-muted-foreground">تاريخ التأكيد</div>
                        <div className="font-medium text-success">{formatTimestamp(payment.approvedAt)}</div>
                      </div>
                    )}
                    {payment.status === 'rejected' && payment.rejectedAt && (
                      <div>
                        <div className="text-sm text-muted-foreground">تاريخ الرفض</div>
                        <div className="font-medium text-destructive">{formatTimestamp(payment.rejectedAt)}</div>
                      </div>
                    )}
                  </div>

                  {payment.notes && (
                    <div className="mb-4">
                      <div className="text-sm text-muted-foreground">ملاحظات</div>
                      <div className="font-medium">{payment.notes}</div>
                    </div>
                  )}

                  {payment.status === 'rejected' && payment.rejectionReason && (
                    <div className="mb-4 p-3 bg-destructive/10 rounded-lg">
                      <div className="text-sm text-muted-foreground">سبب الرفض</div>
                      <div className="font-medium text-destructive">{payment.rejectionReason}</div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 ml-2" />
                        عرض الإيصال
                      </Button>
                      {payment.status === 'pending' && (
                        <>
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleApprovePayment(payment.id)}
                            className="bg-success hover:bg-success/90"
                          >
                            <CheckCircle className="h-4 w-4 ml-2" />
                            تأكيد
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRejectPayment(payment.id, 'سبب الرفض')}
                          >
                            <XCircle className="h-4 w-4 ml-2" />
                            رفض
                          </Button>
                        </>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      آخر تحديث: {formatTimestamp(payment.submittedAt)}
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

export default StudentPayments;

