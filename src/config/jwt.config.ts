import { requireSecret } from './env';

export default {
  accessSecretKey: requireSecret('JWT_ACCESS_SECRET'), // 加密accessToken
  refreshSecretKey: requireSecret('JWT_REFRESH_SECRET'), // 加密refreshToken
};
