module.exports = async (policyContext, config, { strapi }) => {
  if (policyContext.state.user && policyContext.state.user.status === 'approved') {
    // User is authenticated and approved
    return true;
  }
  return false;
};

