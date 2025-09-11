module.exports = async (policyContext, config, { strapi }) => {
  if (policyContext.state.user) {
    // User is authenticated
    return true;
  }
  return false;
};

