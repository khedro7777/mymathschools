module.exports = async (policyContext, config, { strapi }) => {
  if (policyContext.state.user && policyContext.state.user.role.type === 'admin') {
    // User is authenticated and has the 'admin' role
    return true;
  }
  return false;
};

