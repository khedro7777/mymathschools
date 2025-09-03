const strapi = require("@strapi/strapi");

async function createAdmin() {
  const app = strapi();
  await app.load();
  
  const adminUser = await strapi.admin.services.user.create({
    email: "khedrodo@gmail.com",
    password: "group@one07",
    firstname: "Admin",
    lastname: "User",
    isActive: true,
    roles: [1] // Super Admin role
  });
  
  console.log("Admin user created:", adminUser.email);
  process.exit(0);
}

createAdmin().catch(console.error);
