import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { usePaymentSystem } from '../../hooks/usePaymentSystem';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  CreditCard,
  Wallet,
  Gift,
  AlertTriangle,
  User,
  GraduationCap,
  Calendar,
  DollarSign,
  FileText,
  Search
} from 'lucide-react';

const PaymentApproval = () => {
  const { 
    paymentRequests, 
    approvePaymentRequest, 
    rejectPaymentRequest, 
    loading,
    getPendingPaymentRequests 
  } = usePaymentSystem();

  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'under_review' | 'approved' | 'rejected'>('all');

  const filteredRequests = paymentRequests.filter(request => {
    const matchesSearch = request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const pendingRequests = getPendingPaymentRequests();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 ml-1" />في الانتظار</Badge>;
      case 'under_review':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Eye className="h-3 w-3 ml-1" />قيد المراجعة</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 ml-1" />مقبول</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 ml-1" />مرفوض</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'vodafone_cash':
        return <CreditCard className="h-4 w-4 text-red-600" />;
      case 'instapay':
        return <CreditCard className="h-4 w-4 text-blue-600" />;
      case 'points':
        return <Wallet className="h-4 w-4 text-educational" />;
      case 'red_envelope':
        return <Gift className="h-4 w-4 text-red-600" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'vodafone_cash':
        return 'فودافون كاش';
      case 'instapay':
        return 'InstaPay';
      case 'points':
        return 'النقاط';
      case 'red_envelope':
        return 'الظرف الأحمر';
      default:
        return method;
    }
  };

  const handleApprove = async (requestId: string) => {
    await approvePaymentRequest(requestId, 'admin_1', adminNotes);
    setSelectedRequest(null);
    setAdminNotes('');
  };

  const handleReject = async (requestId: string) => {
    if (!adminNotes.trim()) {
      alert('يرجى إدخال سبب الرفض');
      return;
    }
    await rejectPaymentRequest(requestId, 'admin_1', adminNotes);
    setSelectedRequest(null);
    setAdminNotes('');
  };

  const selectedRequestData = paymentRequests.find(req => req.id === selectedRequest);

  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-educational p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{pendingRequests.length}</div>
              <div className="text-sm text-muted-foreground">طلبات معلقة</div>
            </div>
          </div>
        </Card>

        <Card className="card-educational p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {paymentRequests.filter(req => req.status === 'approved').length}
              </div>
              <div className="text-sm text-muted-foreground">طلبات مقبولة</div>
            </div>
          </div>
        </Card>

        <Card className="card-educational p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {paymentRequests.filter(req => req.status === 'rejected').length}
              </div>
              <div className="text-sm text-muted-foreground">طلبات مرفوضة</div>
            </div>
          </div>
        </Card>

        <Card className="card-educational p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {paymentRequests.reduce((sum, req) => sum + req.amount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">إجمالي المبالغ</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="card-educational p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="البحث بالطالب، المدرس، أو الكورس..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">جميع الحالات</option>
              <option value="pending">في الانتظار</option>
              <option value="under_review">قيد المراجعة</option>
              <option value="approved">مقبول</option>
              <option value="rejected">مرفوض</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Requests List */}
        <div className="lg:col-span-2">
          <Card className="card-educational">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-primary">طلبات الدفع</h2>
            </div>
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedRequest === request.id ? 'bg-primary/5 border-r-4 border-primary' : ''
                  }`}
                  onClick={() => setSelectedRequest(request.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{request.studentName}</span>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {request.teacherName} - {request.courseName}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getPaymentMethodIcon(request.paymentMethod)}
                      <span className="text-sm">{getPaymentMethodName(request.paymentMethod)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-primary">{request.amount} ج.م</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(request.submittedAt).toLocaleDateString('ar-EG')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredRequests.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>لا توجد طلبات دفع تطابق البحث</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Request Details */}
        <div>
          <Card className="card-educational">
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold text-primary">تفاصيل الطلب</h3>
            </div>
            
            {selectedRequestData ? (
              <div className="p-6 space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">الطالب</Label>
                  <p className="font-medium">{selectedRequestData.studentName}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">المدرس</Label>
                  <p className="font-medium">{selectedRequestData.teacherName}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">الكورس</Label>
                  <p className="font-medium">{selectedRequestData.courseName}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">المبلغ</Label>
                  <p className="font-bold text-primary text-lg">{selectedRequestData.amount} ج.م</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">طريقة الدفع</Label>
                  <div className="flex items-center gap-2">
                    {getPaymentMethodIcon(selectedRequestData.paymentMethod)}
                    <span>{getPaymentMethodName(selectedRequestData.paymentMethod)}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">تاريخ الإرسال</Label>
                  <p>{new Date(selectedRequestData.submittedAt).toLocaleString('ar-EG')}</p>
                </div>
                
                {selectedRequestData.receiptImage && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">صورة الإيصال</Label>
                    <div className="mt-2 p-3 border rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">إيصال الدفع</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedRequestData.status === 'pending' && (
                  <>
                    <div>
                      <Label htmlFor="admin-notes">ملاحظات الإدارة</Label>
                      <Textarea
                        id="admin-notes"
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        placeholder="أضف ملاحظات حول القرار..."
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(selectedRequestData.id)}
                        disabled={loading}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 ml-2" />
                        موافقة
                      </Button>
                      <Button
                        onClick={() => handleReject(selectedRequestData.id)}
                        disabled={loading}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 ml-2" />
                        رفض
                      </Button>
                    </div>
                  </>
                )}
                
                {selectedRequestData.adminNotes && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">ملاحظات الإدارة</Label>
                    <p className="text-sm bg-muted p-3 rounded-lg">{selectedRequestData.adminNotes}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>اختر طلب دفع لعرض التفاصيل</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentApproval;

