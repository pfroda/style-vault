import { queryResolver } from './query.resolver';
// import mutationResolver from './mutation.resolver';
import { itemResolver, outfitResolver } from './type.resolver';

export const resolvers = { 
  Query: queryResolver,
  Item: itemResolver,
  Outfit: outfitResolver,
};

// Mutation: mutationResolver