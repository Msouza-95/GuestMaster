export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '2d',
    secret_refresh_token: process.env.APP_SECRET_REFRESH_TOKEN || 'default',
    expires_in_refresh_token: '3d',
    expires_refresh_token_days: 3,
  },
};
