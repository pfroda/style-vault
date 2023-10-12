import { queryResolver } from './query.resolver';
// import mutationResolver from './mutation.resolver';
import { itemResolver, outfitResolver, closetResolver } from './type.resolver';

export const resolvers = { 
  Query: queryResolver,
  Item: itemResolver,
  Outfit: outfitResolver,
  Closet: closetResolver,
};

// Mutation: mutationResolver