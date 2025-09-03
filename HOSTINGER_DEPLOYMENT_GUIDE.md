# 🚀 دليل النشر على Hostinger VPS - أكاديمية Mymath

## 📋 معلومات VPS:
- **IP**: 31.97.72.105
- **User**: root
- **Password**: SadekKhedr77@@
- **Panel**: https://31.97.72.105:8443

## 🎯 طرق النشر المتاحة:

### 1️⃣ **النشر التلقائي (الموصى به)**
```bash
# تشغيل سكريبت النشر التلقائي
./deploy-hostinger-manual.sh
```

### 2️⃣ **النشر عبر GitHub Actions**
1. إضافة Secrets في GitHub:
   - `VPS_HOST`: 31.97.72.105
   - `VPS_USER`: root
   - `VPS_PASSWORD`: SadekKhedr77@@

2. Push إلى branch `production-ready` سيؤدي للنشر التلقائي

### 3️⃣ **النشر اليدوي**

#### الخطوة 1: الاتصال بـ VPS
```bash
ssh root@31.97.72.105
# كلمة المرور: SadekKhedr77@@
```

#### الخطوة 2: تحديث النظام
```bash
apt update && apt upgrade -y
apt install -y git curl wget unzip software-properties-common
```

#### الخطوة 3: تثبيت Docker
```bash
# إزالة إصدارات Docker القديمة
apt remove -y docker docker-engine docker.io containerd runc

# تثبيت Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# بدء وتفعيل Docker
systemctl start docker
systemctl enable docker

# تثبيت Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# التحقق من التثبيت
docker --version
docker-compose --version
```

#### الخطوة 4: تثبيت Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node --version
npm --version
```

#### الخطوة 5: نسخ المشروع
```bash
# إنشاء مجلد المشروع
mkdir -p /var/www/mymath
cd /var/www/mymath

# نسخ المشروع من GitHub
git clone -b production-ready https://github.com/khedro7777/mymathschools.git .
```

#### الخطوة 6: إعداد متغيرات البيئة
```bash
# نسخ ملف البيئة
cp .env.production .env

# تحديث متغيرات البيئة للإنتاج
sed -i 's/localhost/31.97.72.105/g' .env
```

#### الخطوة 7: بناء الواجهة الأمامية
```bash
npm install
npm run build
```

#### الخطوة 8: إعداد Strapi
```bash
cd strapi-app
npm install

# إنشاء ملف البيئة لـ Strapi
cat > .env << EOF
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt-here
JWT_SECRET=your-jwt-secret-here

DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=mymath_db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=SadekKhedr77@@
DATABASE_SSL=false
EOF

cd ..
```

#### الخطوة 9: تشغيل Docker Compose
```bash
# إيقاف الحاويات الموجودة
docker-compose -f docker-compose.production.yml down

# بناء وتشغيل الحاويات
docker-compose -f docker-compose.production.yml up -d --build

# انتظار بدء الخدمات
sleep 30

# فحص حالة الحاويات
docker-compose -f docker-compose.production.yml ps
```

#### الخطوة 10: إعداد SSL
```bash
# تثبيت Certbot
apt install -y certbot python3-certbot-nginx

# إنشاء شهادات مؤقتة للاختبار
mkdir -p /etc/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/mymath.key \
    -out /etc/nginx/ssl/mymath.crt \
    -subj '/C=EG/ST=Cairo/L=Cairo/O=Mymath Academy/CN=mymath.live'
```

#### الخطوة 11: إعداد Firewall
```bash
# تثبيت وإعداد UFW
apt install -y ufw

# السماح بالمنافذ المطلوبة
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS
ufw allow 1337/tcp # Strapi
ufw allow 5678/tcp # N8N

# تفعيل Firewall
ufw --force enable
ufw status
```

## 🌐 إعداد DNS:

### في لوحة تحكم النطاق:
```
Type    Name    Value           TTL
A       @       31.97.72.105    300
A       www     31.97.72.105    300
A       api     31.97.72.105    300
A       n8n     31.97.72.105    300
```

## 🔒 إعداد SSL الحقيقي (بعد إعداد DNS):
```bash
# بعد توجيه النطاقات إلى VPS
certbot --nginx -d mymath.live -d api.mymath.live -d n8n.mymath.live \
    --non-interactive --agree-tos --email newkhedro2@gmail.com
```

## 📊 مراقبة الخدمات:

### فحص حالة الحاويات:
```bash
cd /var/www/mymath
docker-compose -f docker-compose.production.yml ps
```

### فحص السجلات:
```bash
# جميع الخدمات
docker-compose -f docker-compose.production.yml logs -f

# خدمة معينة
docker-compose -f docker-compose.production.yml logs -f strapi
docker-compose -f docker-compose.production.yml logs -f nginx
```

### إعادة تشغيل خدمة:
```bash
docker-compose -f docker-compose.production.yml restart strapi
docker-compose -f docker-compose.production.yml restart nginx
```

## 🔧 استكشاف الأخطاء:

### مشاكل شائعة:
1. **خطأ في الاتصال بقاعدة البيانات**:
   ```bash
   docker-compose -f docker-compose.production.yml restart postgres
   ```

2. **خطأ في Nginx**:
   ```bash
   docker-compose -f docker-compose.production.yml logs nginx
   ```

3. **خطأ في Strapi**:
   ```bash
   docker-compose -f docker-compose.production.yml logs strapi
   ```

### أوامر مفيدة:
```bash
# دخول حاوية معينة
docker-compose -f docker-compose.production.yml exec strapi bash
docker-compose -f docker-compose.production.yml exec nginx bash

# تنظيف Docker
docker system prune -a

# إعادة بناء حاوية معينة
docker-compose -f docker-compose.production.yml up -d --build strapi
```

## 🎯 الوصول للخدمات:

بعد اكتمال النشر وإعداد DNS:

- **الموقع الرئيسي**: https://mymath.live
- **Strapi Admin**: https://api.mymath.live/admin
- **N8N Workflows**: https://n8n.mymath.live

### بيانات الوصول:
- **Strapi Admin**: newkhedro2@gmail.com / Sadek@Khedr1
- **N8N**: newkhedro2@gmail.com / Sadek@Khedr1

## 📞 الدعم:

في حالة وجود مشاكل:
1. فحص السجلات أولاً
2. التأكد من تشغيل جميع الحاويات
3. فحص إعدادات DNS
4. التأكد من إعدادات Firewall

---

## 🎉 تهانينا! أكاديمية Mymath الآن متاحة على الإنترنت! 🚀

