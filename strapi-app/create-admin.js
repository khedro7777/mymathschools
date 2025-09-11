const strapi = require("@strapi/strapi");

async function createAdmin() {
  const app = strapi();
  await app.load();
  
  try {
    // Create Strapi admin user
    const adminUser = await strapi.admin.services.user.create({
      email: "khedro7777@gmail.com",
      password: "Omar165",
      firstname: "Admin",
      lastname: "User",
      isActive: true,
      roles: [1] // Super Admin role
    });
    
    console.log("Strapi admin user created:", adminUser.email);
    
    // Also create a users-permissions user for API access
    const adminRole = await strapi.entityService.findMany(
      'plugin::users-permissions.role',
      {
        filters: { type: 'admin' },
      }
    );

    if (adminRole && adminRole.length > 0) {
      const apiUser = await strapi.entityService.create(
        'plugin::users-permissions.user',
        {
          data: {
            username: 'admin',
            email: 'khedro7777@gmail.com',
            password: 'Omar165',
            confirmed: true,
            status: 'approved',
            role: adminRole[0].id,
          },
        }
      );
      
      console.log("API admin user created:", apiUser.email);
    }
    
  } catch (error) {
    console.error("Error creating admin users:", error);
  }
  
  process.exit(0);
}

createAdmin().catch(console.error);
