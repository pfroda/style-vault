// import { graphql } from '@apollo/server';

import types from './types.schema';
import queries from './query.schema';
import mutations from './mutation.schema';

const typeDefs = `
  ${types}
  ${queries}
  ${mutations}
`;

export default { typeDefs };

// const typeDefs = `#graphql
//   ${types}
//   ${queries}
//   # ${mutations}
// `;

