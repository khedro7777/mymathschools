#!/bin/bash

echo "🚀 Setting up Strapi for MyMath Platform..."

# Create strapi-app directory
mkdir -p strapi-app

# Navigate to strapi-app directory
cd strapi-app

# Initialize Strapi project
echo "📦 Creating Strapi project..."
npx create-strapi-app@latest . --quickstart --no-run

# Wait for Strapi to be ready
echo "⏳ Waiting for Strapi to initialize..."
sleep 10

# Create admin user
echo "👤 Creating admin user..."
cat > create-admin.js << 'EOF'
const strapi = require('@strapi/strapi');

async function createAdmin() {
  const app = strapi();
  await app.load();
  
  const adminUser = await strapi.admin.services.user.create({
    email: 'khedrodo@gmail.com',
    password: 'group@one07',
    firstname: 'Admin',
    lastname: 'User',
    isActive: true,
    roles: [1] // Super Admin role
  });
  
  console.log('Admin user created:', adminUser.email);
  process.exit(0);
}

createAdmin().catch(console.error);
EOF

# Create content types
echo "📋 Creating content types..."
mkdir -p src/api

# Course content type
mkdir -p src/api/course/content-types/course
cat > src/api/course/content-types/course/schema.json << 'EOF'
{
  "kind": "collectionType",
  "collectionName": "courses",
  "info": {
    "singularName": "course",
    "pluralName": "courses",
    "displayName": "Course",
    "description": ""
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "teacher": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "plugin::users-permissions.user"
    },
    "price": {
      "type": "decimal"
    },
    "duration": {
      "type": "integer"
    },
    "level": {
      "type": "enumeration",
      "enum": ["beginner", "intermediate", "advanced"]
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    }
  }
}
EOF

# Lesson content type
mkdir -p src/api/lesson/content-types/lesson
cat > src/api/lesson/content-types/lesson/schema.json << 'EOF'
{
  "kind": "collectionType",
  "collectionName": "lessons",
  "info": {
    "singularName": "lesson",
    "pluralName": "lessons",
    "displayName": "Lesson",
    "description": ""
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "content": {
      "type": "richtext"
    },
    "video_url": {
      "type": "string"
    },
    "course": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::course.course"
    },
    "order": {
      "type": "integer"
    },
    "duration": {
      "type": "integer"
    }
  }
}
EOF

# Enrollment content type
mkdir -p src/api/enrollment/content-types/enrollment
cat > src/api/enrollment/content-types/enrollment/schema.json << 'EOF'
{
  "kind": "collectionType",
  "collectionName": "enrollments",
  "info": {
    "singularName": "enrollment",
    "pluralName": "enrollments",
    "displayName": "Enrollment",
    "description": ""
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {},
  "attributes": {
    "student": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "plugin::users-permissions.user"
    },
    "course": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::course.course"
    },
    "status": {
      "type": "enumeration",
      "enum": ["pending", "active", "completed", "cancelled"],
      "default": "pending"
    },
    "enrolled_at": {
      "type": "datetime",
      "default": "now"
    },
    "progress": {
      "type": "integer",
      "default": 0
    }
  }
}
EOF

echo "✅ Strapi setup completed!"
echo "🌐 Admin panel will be available at: http://localhost:1337/admin"
echo "📧 Admin email: khedrodo@gmail.com"
echo "🔑 Admin password: group@one07"

