export const queries = `#graphql
  type Query {
    getItems: [Item]!
    getOutfits: [Outfit]!
    getClosets: [Closet]!
    getItemById(id: Int!): Item!
    getOutfitById(id: Int!): Outfit!
    getClosetById(id: Int!): Closet!
    getItemsByCategory(category: String!): [Item]!
    getItemsByCloset(closetId: Int!): [Item]!
    getOutfitsByCloset(closetId: Int!): [Outfit]!
  }
`;