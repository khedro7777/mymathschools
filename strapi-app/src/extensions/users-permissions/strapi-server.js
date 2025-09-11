module.exports = (plugin) => {
  // Extend the register controller
  plugin.controllers.auth.register = async (ctx) => {
    const { email, username, password, role } = ctx.request.body;

    // Check if the role is 'Admin' or email is admin email
    const isAdmin = role === 'admin' || email === 'khedro7777@gmail.com';

    // Call the original register method
    const originalRegister = await strapi.plugins[
      'users-permissions'
    ].controllers.auth.register(ctx);

    // Set status based on role/email
    const status = isAdmin ? 'approved' : 'pending';
    const confirmed = isAdmin;

    await strapi.entityService.update(
      'plugin::users-permissions.user',
      originalRegister.user.id,
      {
        data: {
          confirmed: confirmed,
          status: status,
        },
      }
    );

    // Update the response to reflect the status
    originalRegister.user.confirmed = confirmed;
    originalRegister.user.status = status;

    return originalRegister;
  };

  // Add a custom route for admin approval
  plugin.routes['content-api'].routes.push({
    method: 'PUT',
    path: '/users/approve/:id',
    handler: 'user.approveUser',
    config: {
      policies: ['global::isAuthenticated', 'global::isAdmin'], // Custom policies needed
    },
  });

  // Extend the user controller to add approveUser method
  plugin.controllers.user.approveUser = async (ctx) => {
    const { id } = ctx.params;

    const user = await strapi.entityService.findOne(
      'plugin::users-permissions.user',
      id
    );

    if (!user) {
      return ctx.notFound('User not found');
    }

    if (user.status === 'approved') {
      return ctx.badRequest('User is already approved');
    }

    const updatedUser = await strapi.entityService.update(
      'plugin::users-permissions.user',
      id,
      {
        data: {
          confirmed: true,
          status: 'approved',
        },
      }
    );

    return updatedUser;
  };

  // Add a custom route for admin rejection
  plugin.routes['content-api'].routes.push({
    method: 'PUT',
    path: '/users/reject/:id',
    handler: 'user.rejectUser',
    config: {
      policies: ['global::isAuthenticated', 'global::isAdmin'],
    },
  });

  // Extend the user controller to add rejectUser method
  plugin.controllers.user.rejectUser = async (ctx) => {
    const { id } = ctx.params;

    const user = await strapi.entityService.findOne(
      'plugin::users-permissions.user',
      id
    );

    if (!user) {
      return ctx.notFound('User not found');
    }

    if (user.status === 'rejected') {
      return ctx.badRequest('User is already rejected');
    }

    const updatedUser = await strapi.entityService.update(
      'plugin::users-permissions.user',
      id,
      {
        data: {
          confirmed: false,
          status: 'rejected',
        },
      }
    );

    return updatedUser;
  };

  return plugin;
};

