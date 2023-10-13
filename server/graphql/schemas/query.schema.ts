export const queries = `#graphql
  type Query {
    getItems(userId: String!): [Item]!
    getOutfits(userId: String!): [Outfit]!
    getClosets(userId: String!): [Closet]!
    getItemById(userId: String!, id: String!): Item!
    getOutfitById(userId: String!, id: String!): Outfit!
    getClosetById(userId: String!, id: String!): Closet!
    getItemsByCategory(userId: String!, category: String!): [Item]!
    getItemsByCloset(id: String!): [Item]!
    getOutfitsByCloset(id: String!): [Outfit]!
  }
`;