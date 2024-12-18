import { IAccessTokenPayload } from './payload';
import { TenantClsStore } from '@aiofc/persistence-api';

export interface UserClsStore<T extends IAccessTokenPayload>
  extends TenantClsStore {
  jwtPayload: T;
  reqId: string;
  userId: string;
  authHeader: string;
}
