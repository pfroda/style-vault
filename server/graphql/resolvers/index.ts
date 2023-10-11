const queryResolver = require('./query.resolver');
const mutationResolver = require('./mutation.resolver');
const { pokemonResolver, moveResolver } = require('./type.resolver');

const resolvers = { 
  Query: queryResolver,
  Pokemon: pokemonResolver,
  Move: moveResolver,
  Mutation: mutationResolver
};

module.exports = resolvers;
