module.exports = async () => {
  const roles = [
    { name: 'Student', description: 'Default role for students', type: 'student' },
    { name: 'Teacher', description: 'Role for teachers', type: 'teacher' },
    { name: 'Admin', description: 'Administrator role', type: 'admin' },
    { name: 'Teacher Assistant', description: 'Role for teacher assistants', type: 'teacher-assistant' },
  ];

  for (const roleData of roles) {
    const existingRole = await strapi.query('plugin::users-permissions.role').findOne({ where: { type: roleData.type } });

    if (!existingRole) {
      await strapi.query('plugin::users-permissions.role').create({
        data: {
          name: roleData.name,
          description: roleData.description,
          type: roleData.type,
        },
      });
      console.log(`Role ${roleData.name} created.`);
    } else {
      console.log(`Role ${roleData.name} already exists.`);
    }
  }
};

