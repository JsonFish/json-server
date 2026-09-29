import { optionalSecret } from './env';

export default {
  client_id: optionalSecret('GITHUB_CLIENT_ID'),
  client_secret: optionalSecret('GITHUB_CLIENT_SECRET'),
};
