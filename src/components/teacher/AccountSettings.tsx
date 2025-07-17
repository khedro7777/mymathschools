import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Shield, 
  Eye, 
  EyeOff,
  Key,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Settings,
  Lock,
  Mail,
  Smartphone,
  Globe
} from 'lucide-react';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('security');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // بيانات إعدادات الحساب
  const [accountSettings, setAccountSettings] = useState({
    // إعدادات الأمان
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    loginNotifications: true,
    
    // إعدادات الخصوصية
    profileVisible: true,
    showInSearch: true,
    allowMessages: true,
    showOnlineStatus: false,
    dataSharing: false,
    
    // إعدادات الإشعارات
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    
    // معلومات الحساب
    email: 'sara.ahmed@example.com',
    phone: '+201234567890',
    lastLogin: '2024-01-20T10:30:00Z',
    accountCreated: '2023-06-15T09:00:00Z'
  });

  const handlePasswordChange = () => {
    if (accountSettings.newPassword !== accountSettings.confirmPassword) {
      alert('كلمات المرور غير متطابقة');
      return;
    }
    
    console.log('تغيير كلمة المرور');
    // هنا سيتم تغيير كلمة المرور
    setAccountSettings({
      ...accountSettings,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleToggleProfileVisibility = () => {
    const newVisibility = !accountSettings.profileVisible;
    setAccountSettings({
      ...accountSettings,
      profileVisible: newVisibility,
      showInSearch: newVisibility ? accountSettings.showInSearch : false
    });
    
    console.log('تغيير حالة ظهور البروفايل:', newVisibility);
    // هنا سيتم تحديث حالة البروفايل في قاعدة البيانات
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'هل أنت متأكد من رغبتك في حذف الحساب؟ هذا الإجراء لا يمكن التراجع عنه ويتطلب موافقة الإدارة.'
    );
    
    if (confirmed) {
      console.log('طلب حذف الحساب');
      // هنا سيتم إرسال طلب حذف الحساب للإدارة
    }
  };

  const handleEnable2FA = () => {
    console.log('تفعيل المصادقة الثنائية');
    // هنا سيتم تفعيل المصادقة الثنائية
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">إعدادات الحساب</h1>
          <p className="text-muted-foreground">إدارة حسابك وإعدادات الأمان</p>
        </div>
      </div>

      {/* معلومات الحساب السريعة */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">س</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">د. سارة أحمد محمد</h3>
              <p className="text-muted-foreground">{accountSettings.email}</p>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span>آخر دخول: {formatDate(accountSettings.lastLogin)}</span>
                <span>•</span>
                <span>عضو منذ: {formatDate(accountSettings.accountCreated)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {accountSettings.profileVisible ? (
              <Badge className="bg-success">البروفايل مرئي</Badge>
            ) : (
              <Badge variant="secondary">البروفايل مخفي</Badge>
            )}
            {accountSettings.twoFactorEnabled && (
              <Badge className="bg-primary">2FA مفعل</Badge>
            )}
          </div>
        </div>
      </Card>

      {/* تبويبات الإعدادات */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="privacy">الخصوصية</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="account">الحساب</TabsTrigger>
        </TabsList>

        {/* تبويب الأمان */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              إعدادات الأمان
            </h3>
            
            <div className="space-y-6">
              {/* تغيير كلمة المرور */}
              <div className="space-y-4">
                <h4 className="font-medium">تغيير كلمة المرور</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">كلمة المرور الحالية</label>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={accountSettings.currentPassword}
                        onChange={(e) => setAccountSettings({
                          ...accountSettings,
                          currentPassword: e.target.value
                        })}
                        placeholder="كلمة المرور الحالية"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">كلمة المرور الجديدة</label>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        value={accountSettings.newPassword}
                        onChange={(e) => setAccountSettings({
                          ...accountSettings,
                          newPassword: e.target.value
                        })}
                        placeholder="كلمة المرور الجديدة"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">تأكيد كلمة المرور</label>
                    <Input
                      type="password"
                      value={accountSettings.confirmPassword}
                      onChange={(e) => setAccountSettings({
                        ...accountSettings,
                        confirmPassword: e.target.value
                      })}
                      placeholder="تأكيد كلمة المرور"
                    />
                  </div>
                </div>
                
                <Button onClick={handlePasswordChange}>
                  <Key className="h-4 w-4 ml-2" />
                  تغيير كلمة المرور
                </Button>
              </div>

              {/* المصادقة الثنائية */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">المصادقة الثنائية (2FA)</h4>
                    <p className="text-sm text-muted-foreground">
                      طبقة حماية إضافية لحسابك
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {accountSettings.twoFactorEnabled ? (
                    <Badge className="bg-success">مفعل</Badge>
                  ) : (
                    <Badge variant="secondary">غير مفعل</Badge>
                  )}
                  <Switch
                    checked={accountSettings.twoFactorEnabled}
                    onCheckedChange={(checked) => {
                      setAccountSettings({...accountSettings, twoFactorEnabled: checked});
                      if (checked) handleEnable2FA();
                    }}
                  />
                </div>
              </div>

              {/* إشعارات تسجيل الدخول */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">إشعارات تسجيل الدخول</h4>
                    <p className="text-sm text-muted-foreground">
                      احصل على إشعار عند تسجيل الدخول من جهاز جديد
                    </p>
                  </div>
                </div>
                <Switch
                  checked={accountSettings.loginNotifications}
                  onCheckedChange={(checked) => 
                    setAccountSettings({...accountSettings, loginNotifications: checked})
                  }
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* تبويب الخصوصية */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              إعدادات الخصوصية
            </h3>
            
            <div className="space-y-4">
              {/* ظهور البروفايل */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">ظهور البروفايل</h4>
                    <p className="text-sm text-muted-foreground">
                      السماح للطلاب برؤية بروفايلك
                    </p>
                  </div>
                </div>
                <Switch
                  checked={accountSettings.profileVisible}
                  onCheckedChange={handleToggleProfileVisibility}
                />
              </div>

              {/* الظهور في البحث */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">الظهور في نتائج البحث</h4>
                    <p className="text-sm text-muted-foreground">
                      السماح بظهور بروفايلك في نتائج البحث
                    </p>
                  </div>
                </div>
                <Switch
                  checked={accountSettings.showInSearch}
                  disabled={!accountSettings.profileVisible}
                  onCheckedChange={(checked) => 
                    setAccountSettings({...accountSettings, showInSearch: checked})
                  }
                />
              </div>

              {/* السماح بالرسائل */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">السماح بالرسائل</h4>
                    <p className="text-sm text-muted-foreground">
                      السماح للطلاب بإرسال رسائل مباشرة
                    </p>
                  </div>
                </div>
                <Switch
                  checked={accountSettings.allowMessages}
                  onCheckedChange={(checked) => 
                    setAccountSettings({...accountSettings, allowMessages: checked})
                  }
                />
              </div>

              {/* إظهار حالة الاتصال */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">إظهار حالة الاتصال</h4>
                    <p className="text-sm text-muted-foreground">
                      إظهار ما إذا كنت متصلاً أم لا
                    </p>
                  </div>
                </div>
                <Switch
                  checked={accountSettings.showOnlineStatus}
                  onCheckedChange={(checked) => 
                    setAccountSettings({...accountSettings, showOnlineStatus: checked})
                  }
                />
              </div>

              {/* مشاركة البيانات */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">مشاركة البيانات للتحليل</h4>
                    <p className="text-sm text-muted-foreground">
                      السماح باستخدام بياناتك لتحسين الخدمة
                    </p>
                  </div>
                </div>
                <Switch
                  checked={accountSettings.dataSharing}
                  onCheckedChange={(checked) => 
                    setAccountSettings({...accountSettings, dataSharing: checked})
                  }
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* تبويب الإشعارات */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              إعدادات الإشعارات
            </h3>
            
            <div className="space-y-4">
              {/* إشعارات البريد الإلكتروني */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">إشعارات البريد الإلكتروني</h4>
                    <p className="text-sm text-muted-foreground">
                      تلقي إشعارات مهمة عبر البريد الإلكتروني
                    </p>
                  </div>
                </div>
                <Switch
                  checked={accountSettings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setAccountSettings({...accountSettings, emailNotifications: checked})
                  }
                />
              </div>

              {/* إشعارات الرسائل النصية */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">إشعارات الرسائل النصية</h4>
                    <p className="text-sm text-muted-foreground">
                      تلقي إشعارات عاجلة عبر الرسائل النصية
                    </p>
                  </div>
                </div>
                <Switch
                  checked={accountSettings.smsNotifications}
                  onCheckedChange={(checked) => 
                    setAccountSettings({...accountSettings, smsNotifications: checked})
                  }
                />
              </div>

              {/* الإشعارات المنبثقة */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">الإشعارات المنبثقة</h4>
                    <p className="text-sm text-muted-foreground">
                      إشعارات فورية في المتصفح
                    </p>
                  </div>
                </div>
                <Switch
                  checked={accountSettings.pushNotifications}
                  onCheckedChange={(checked) => 
                    setAccountSettings({...accountSettings, pushNotifications: checked})
                  }
                />
              </div>

              {/* رسائل التسويق */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">رسائل التسويق</h4>
                    <p className="text-sm text-muted-foreground">
                      تلقي عروض وأخبار المنصة
                    </p>
                  </div>
                </div>
                <Switch
                  checked={accountSettings.marketingEmails}
                  onCheckedChange={(checked) => 
                    setAccountSettings({...accountSettings, marketingEmails: checked})
                  }
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* تبويب الحساب */}
        <TabsContent value="account" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5" />
              إدارة الحساب
            </h3>
            
            <div className="space-y-6">
              {/* معلومات الاتصال */}
              <div className="space-y-4">
                <h4 className="font-medium">معلومات الاتصال</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">البريد الإلكتروني</label>
                    <Input
                      type="email"
                      value={accountSettings.email}
                      onChange={(e) => setAccountSettings({
                        ...accountSettings,
                        email: e.target.value
                      })}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">رقم الهاتف</label>
                    <Input
                      type="tel"
                      value={accountSettings.phone}
                      onChange={(e) => setAccountSettings({
                        ...accountSettings,
                        phone: e.target.value
                      })}
                    />
                  </div>
                </div>
                
                <Button variant="outline">
                  حفظ التغييرات
                </Button>
              </div>

              {/* تصدير البيانات */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">تصدير البيانات</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  احصل على نسخة من جميع بياناتك المحفوظة في المنصة
                </p>
                <Button variant="outline">
                  طلب تصدير البيانات
                </Button>
              </div>

              {/* حذف الحساب */}
              <div className="p-4 border border-destructive rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-destructive mb-2">حذف الحساب</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      حذف حسابك نهائياً من المنصة. هذا الإجراء لا يمكن التراجع عنه ويتطلب موافقة الإدارة.
                      سيتم حذف جميع بياناتك بما في ذلك الكورسات والطلاب والمحادثات.
                    </p>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAccount}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      <Trash2 className="h-4 w-4 ml-2" />
                      طلب حذف الحساب
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountSettings;

