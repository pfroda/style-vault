import { types } from './types.schema';
import { queries } from './query.schema';
import { mutations } from './mutation.schema';

export const typeDefs = `
  ${types}
  ${queries}
  ${mutations}
`;