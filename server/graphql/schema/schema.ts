export const typeDefs = `#graphql
  type Pokemon {
      _id: String
      id: ID!
      identifier: String
      species_id: String
      height: String
      types: [String]
    }
    type Query {
      pokemons: [Pokemon!]
      pokemonById(id:String!): Pokemon
      pokemonByType(type:String!): [Pokemon]
    }
  `;