import type User from '@/api/models/User';

export default () => useState<User | null>('user', () => null);
