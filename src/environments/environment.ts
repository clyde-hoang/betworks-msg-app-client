import { environmentCommon } from './environment-common';

// URL paths are added inside 'environment-common.ts'
// unless you need to add a special URL just for this particular environment and NOT to others
export const environment = {
  ...environmentCommon,
  production: false,
  SOCKET_ENDPOINT: 'http://localhost:4000',
  REST_URL: 'http://localhost:4000/api',
  REST_VERSION: 'v1'
};
