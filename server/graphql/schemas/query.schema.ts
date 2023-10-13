export const queries = `#graphql
  type Query {
    getItems(userId: String!): [Item]!
    getOutfits(userId: String!): [Outfit]!
    getClosets(userId: String!): [Closet]!
    getItemById(userId: String!, itemId: Int!): Item!
    getOutfitById(id: Int!): Outfit!
    getClosetById(id: Int!): Closet!
    getItemsByCategory(category: String!): [Item]!
    getItemsByCloset(closetId: Int!): [Item]!
    getOutfitsByCloset(closetId: Int!): [Outfit]!
  }
`;