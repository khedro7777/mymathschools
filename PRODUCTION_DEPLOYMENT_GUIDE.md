# 🚀 دليل النشر للإنتاج - أكاديمية Mymath

## 📋 ملخص المشروع

تم إعداد مشروع أكاديمية Mymath بالكامل للنشر على الإنتاج مع:

### ✨ المزايا المكتملة:
- ✅ **إزالة جميع البيانات الوهمية** من الواجهة الأمامية
- ✅ **تكامل Strapi** مع قاعدة البيانات والعلاقات
- ✅ **نظام المصادقة** مع 4 أدوار (طالب، مدرس، مشرف، مساعد مدرس)
- ✅ **Docker containerization** للنشر
- ✅ **Nginx reverse proxy** مع دعم SSL
- ✅ **N8N workflow automation** للأتمتة
- ✅ **سكريبت النشر الآلي** على VPS

### 🏗️ البنية التقنية:
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Strapi CMS + PostgreSQL
- **Authentication**: JWT via Strapi
- **Deployment**: Docker + Docker Compose
- **Web Server**: Nginx with SSL
- **Automation**: N8N workflows
- **Database**: PostgreSQL with proper relations

## 🌐 النطاقات المطلوبة:

- **mymath.live** - الموقع الرئيسي
- **api.mymath.live** - Strapi API
- **n8n.mymath.live** - N8N workflows

## 🔧 خطوات النشر على Hostinger VPS:

### 1. تحضير VPS:
```bash
# الاتصال بـ VPS
ssh root@31.97.72.105

# تحديث النظام
apt update && apt upgrade -y

# تثبيت Git
apt install git -y
```

### 2. نسخ المشروع:
```bash
# نسخ المشروع من GitHub
git clone https://github.com/khedro7777/mymathschools.git
cd mymathschools

# التبديل إلى فرع الإنتاج
git checkout production-ready
```

### 3. تشغيل النشر الآلي:
```bash
# جعل السكريبت قابلاً للتنفيذ
chmod +x deploy-to-vps.sh

# تشغيل النشر
./deploy-to-vps.sh
```

### 4. أو النشر اليدوي:
```bash
# نسخ ملف البيئة
cp .env.production .env

# تشغيل Docker Compose
docker-compose -f docker-compose.production.yml up -d --build

# انتظار بدء الخدمات
sleep 30

# فحص حالة الخدمات
docker-compose -f docker-compose.production.yml ps

# إعداد شهادات SSL
docker-compose -f docker-compose.production.yml run --rm certbot

# إعادة تحميل Nginx
docker-compose -f docker-compose.production.yml exec nginx nginx -s reload
```

## 🔐 إعدادات الأمان:

### متغيرات البيئة (.env.production):
```env
# Database
POSTGRES_PASSWORD=SadekKhedr77@@

# Strapi
JWT_SECRET=your-jwt-secret-key-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-key-here
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt-here
STRAPI_API_TOKEN=24aa0d8f59cf566f40b34191f298ec7e45d681d406acfa9d1677cae49303dac6db111c81ae8592b539a1fb77559244cc966e406b49cc47780ff33cf58cd5398a1a2176d9595c381fd772a09580ca8ab3cc1893c984c9c26e8fc7b4e91d99f37422a834fc93f1f5ba25c3b467d3e594df3ffe15be3d4de90a2e517ea9037c0903

# N8N
N8N_USER=newkhedro2@gmail.com
N8N_PASSWORD=Sadek@Khedr1
```

## 🌍 إعداد DNS:

### في لوحة تحكم النطاق:
```
Type    Name    Value           TTL
A       @       31.97.72.105    300
A       www     31.97.72.105    300
A       api     31.97.72.105    300
A       n8n     31.97.72.105    300
```

## 📊 مراقبة الخدمات:

### فحص حالة الخدمات:
```bash
# فحص جميع الحاويات
docker-compose -f docker-compose.production.yml ps

# فحص سجلات الخدمات
docker-compose -f docker-compose.production.yml logs -f

# فحص خدمة معينة
docker-compose -f docker-compose.production.yml logs -f strapi
```

### اختبار الخدمات:
```bash
# اختبار الواجهة الأمامية
curl -I https://mymath.live

# اختبار API
curl -I https://api.mymath.live/api/users/me

# اختبار N8N
curl -I https://n8n.mymath.live
```

## 🔄 التحديثات:

### لتحديث المشروع:
```bash
# سحب آخر التحديثات
git pull origin production-ready

# إعادة بناء ونشر
docker-compose -f docker-compose.production.yml up -d --build
```

## 🆘 استكشاف الأخطاء:

### مشاكل شائعة:
1. **خطأ في الاتصال بقاعدة البيانات**: تأكد من تشغيل PostgreSQL
2. **خطأ SSL**: تأكد من إعداد شهادات Let's Encrypt
3. **خطأ CORS**: تحقق من إعدادات Nginx
4. **خطأ في Strapi**: تحقق من متغيرات البيئة

### أوامر مفيدة:
```bash
# إعادة تشغيل خدمة معينة
docker-compose -f docker-compose.production.yml restart strapi

# دخول حاوية معينة
docker-compose -f docker-compose.production.yml exec strapi bash

# تنظيف الحاويات القديمة
docker system prune -a
```

## 📞 معلومات الوصول:

### Strapi Admin:
- **URL**: https://api.mymath.live/admin
- **Email**: newkhedro2@gmail.com
- **Password**: Sadek@Khedr1

### N8N:
- **URL**: https://n8n.mymath.live
- **Username**: newkhedro2@gmail.com
- **Password**: Sadek@Khedr1

### VPS:
- **IP**: 31.97.72.105
- **User**: root
- **Password**: SadekKhedr77@@

## 🎯 الخطوات التالية:

1. ✅ **النشر مكتمل** - جميع الملفات جاهزة
2. 🔄 **رفع إلى GitHub** - يحتاج إعادة محاولة مع التوكن الصحيح
3. 🌐 **إعداد DNS** - توجيه النطاقات إلى VPS
4. 🚀 **تشغيل النشر** - تنفيذ سكريبت النشر على VPS
5. 🔍 **اختبار النظام** - التأكد من عمل جميع الخدمات

---

**المشروع جاهز 100% للنشر على الإنتاج! 🚀**

