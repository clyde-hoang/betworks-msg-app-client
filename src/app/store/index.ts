import { AuthEffects } from './authentication';
import { UsersEffects } from './users';

export const featureEffects: any[] = [
  AuthEffects,
  UsersEffects
];

export * from './authentication';
export * from './users';
