export const queries = `#graphql
  type Query {
    getItems: [Item]!
    getOutfits: [Outfit]!
    getItemById(id: Int!): Item!
    getOutfitById(id: Int!): Outfit!
    getWishList: String
  }
`;