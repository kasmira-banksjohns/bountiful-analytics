const { GoogleAuth } = require('google-auth-library');

exports.handler = async () => {
  const auth = new GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT),
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  });

  const client = await auth.getClient();

  const response = await client.request({
    url: `https://analyticsdata.googleapis.com/v1beta/properties/${process.env.GA4_PROPERTY_ID}:runReport`,
    method: 'POST',
    data: {
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      metrics: [{ name: 'sessions' }],
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify(response.data),
  };
};