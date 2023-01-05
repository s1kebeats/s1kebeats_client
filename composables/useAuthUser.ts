import User from '~~/models/User';

export default () => useState<User | null>('user', () => null);
