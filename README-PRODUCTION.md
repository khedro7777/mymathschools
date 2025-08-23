# 🎓 أكاديمية Mymath - دليل الإنتاج

منصة تعليمية متكاملة للرياضيات مع نظام إدارة محتوى متقدم وذكاء اصطناعي.

## 🏗️ البنية التقنية

### المكونات الأساسية:
- **Frontend**: React + Vite + Tailwind CSS + Radix UI
- **Backend**: Strapi CMS + PostgreSQL
- **AI Service**: Node.js MCP Service
- **Reverse Proxy**: Nginx + SSL
- **Containerization**: Docker + Docker Compose

### النطاقات:
- **الموقع الرئيسي**: https://mymath.live
- **API**: https://api.mymath.live
- **خدمة الذكاء الاصطناعي**: https://mcp.mymath.live

## 🚀 التشغيل السريع

### 1. إعداد البيئة
```bash
# نسخ المتغيرات البيئية
cp .env.production .env

# تحديث المتغيرات حسب الحاجة
nano .env
```

### 2. إعداد Strapi
```bash
# تشغيل سكريبت الإعداد
./setup-strapi.sh
```

### 3. بناء ونشر التطبيق
```bash
# بناء Frontend
npm run build

# تشغيل جميع الخدمات
docker-compose up -d
```

### 4. إعداد SSL (اختياري)
```bash
# تثبيت Certbot
sudo apt install certbot python3-certbot-nginx

# الحصول على شهادة SSL
sudo certbot --nginx -d mymath.live -d www.mymath.live -d api.mymath.live -d mcp.mymath.live
```

## 📋 الأدوار والصلاحيات

### 🎓 الطالب (Student)
- عرض الدروس والكورسات
- الاشتراك في الحصص
- متابعة المدرسين
- عرض جدول الحصص الشخصي
- الوصول للذكاء الاصطناعي التعليمي

### 👨‍🏫 المدرس (Teacher)
- إنشاء وإدارة الكورسات
- إدارة جدول الحصص
- متابعة تقدم الطلاب
- الموافقة على طلبات الاشتراك
- إدارة المحتوى التعليمي

### 🛡️ المشرف (Admin)
- إدارة جميع المستخدمين
- الموافقة على طلبات التسجيل
- إدارة النظام والإعدادات
- عرض التقارير والإحصائيات
- إدارة المحتوى العام

### 🤝 مساعد المدرس (Assistant)
- مساعدة المدرس في إدارة الفصل
- الرد على استفسارات الطلاب
- متابعة الواجبات
- إدارة جزئية للمحتوى

## 🔧 إعدادات التطوير

### تشغيل Frontend محلياً
```bash
npm install
npm run dev
```

### تشغيل Strapi محلياً
```bash
cd strapi-app
npm run develop
```

### تشغيل MCP Service محلياً
```bash
cd mcp
npm install
npm run dev
```

## 🐳 Docker Commands

### بناء الصور
```bash
docker-compose build
```

### تشغيل الخدمات
```bash
docker-compose up -d
```

### عرض السجلات
```bash
docker-compose logs -f
```

### إيقاف الخدمات
```bash
docker-compose down
```

### إعادة تشغيل خدمة معينة
```bash
docker-compose restart nginx
docker-compose restart strapi
docker-compose restart mcp
```

## 📊 مراقبة النظام

### فحص حالة الخدمات
```bash
# فحص حالة Docker
docker-compose ps

# فحص استخدام الموارد
docker stats

# فحص السجلات
docker-compose logs --tail=100 -f
```

### نقاط الفحص الصحي
- **Frontend**: https://mymath.live
- **Strapi**: https://api.mymath.live/admin
- **MCP**: https://mcp.mymath.live/health
- **Database**: داخلي (PostgreSQL)

## 🔒 الأمان

### إعدادات SSL
- شهادات Let's Encrypt تلقائية التجديد
- إعادة توجيه HTTP إلى HTTPS
- رؤوس الأمان المتقدمة

### حماية قاعدة البيانات
- كلمات مرور قوية
- شبكة داخلية معزولة
- نسخ احتياطية منتظمة

### متغيرات البيئة الحساسة
```bash
# تأكد من تحديث هذه المتغيرات في الإنتاج
ADMIN_JWT_SECRET=your_secure_secret_here
JWT_SECRET=your_jwt_secret_here
API_TOKEN_SALT=your_api_token_salt_here
DATABASE_PASSWORD=your_secure_db_password_here
```

## 📱 الميزات المتقدمة

### PWA (Progressive Web App)
- إمكانية التثبيت على الأجهزة المحمولة
- العمل بدون اتصال إنترنت (محدود)
- إشعارات الدفع

### الذكاء الاصطناعي
- مساعد تعليمي ذكي
- حل المسائل الرياضية
- اقتراحات شخصية للتعلم

### نظام المتابعة
- متابعة المدرسين المفضلين
- جدول حصص موحد
- إشعارات الحصص الجديدة

## 🔄 النسخ الاحتياطي

### نسخ احتياطي لقاعدة البيانات
```bash
# إنشاء نسخة احتياطية
docker-compose exec db pg_dump -U strapi strapi > backup_$(date +%Y%m%d_%H%M%S).sql

# استعادة نسخة احتياطية
docker-compose exec -T db psql -U strapi strapi < backup_file.sql
```

### نسخ احتياطي للملفات
```bash
# نسخ احتياطي لملفات Strapi
tar -czf strapi_backup_$(date +%Y%m%d_%H%M%S).tar.gz strapi-app/

# نسخ احتياطي للشهادات
tar -czf certs_backup_$(date +%Y%m%d_%H%M%S).tar.gz certs/
```

## 📞 الدعم والصيانة

### معلومات الاتصال
- **البريد الإلكتروني**: khedrodo@gmail.com
- **المطور**: فريق MyMath

### سجل التحديثات
- **v1.0.0**: الإصدار الأولي مع جميع الميزات الأساسية
- **v1.1.0**: إضافة نظام المتابعة وجداول الحصص
- **v1.2.0**: تكامل الذكاء الاصطناعي وخدمة MCP

---

🎯 **المشروع جاهز للإنتاج!** 🚀

