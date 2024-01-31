// PretokenGeneration Lambda
const getTenant = (userPoolId) => {
  const tenant = {
    stag: {
      'eu-west-1_oVZHh8lXo': 'talent_garden',
      'eu-west-1_eN2eA156S': 'sphere',
    },
    prod: {
      'eu-west-1_ap88uZeiG': 'talent_garden',
    },
  }
  return tenant[process.env.STAGE][userPoolId];
}

exports.handler = async function (event) {
  console.log(event.request.userAttributes['custom:tenant_id'], event.request.userAttributes['custom:user_id'])
  event.response = {
    claimsAndScopeOverrideDetails: {
      accessTokenGeneration: {
        claimsToAddOrOverride: {
          user_id: event.request.userAttributes['custom:user_id'],
          tenant: getTenant(event.userPoolId)
        },
      },
    }
  };
  return event;
};