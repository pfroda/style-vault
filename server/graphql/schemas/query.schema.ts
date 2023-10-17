export const queries = `#graphql
  type Query {
    getItems(userId: String!, color: [String], occasion: [String], season: [String], location: String, category: String, brand:[String]): [Item]!
    getOutfits(userId: String!): [Outfit]!
    getClosets(userId: String!): [Closet]!
    getItemById(userId: String!, id: String!): Item!
    getOutfitById(userId: String!, id: String!): Outfit!
    getClosetById(userId: String!, id: String!): Closet!
    getItemsByCategory(userId: String!, category: String!): [Item]!
    getItemsByCloset(id: String!): [Item]!
    getOutfitsByCloset(id: String!): [Outfit]!
    getColors(userId: String!): [String]!
    getBrands(userId: String!): [String]!
    getOccasions(userId: String!): [String]!
    getLocations(userId: String!): [String]!
    getAllUsers: [User!]!
    getUserById(id: String!): User
    getFollowers(userId: String!): [User!]!
    getFollowing(userId: String!): [User!]!
    getFavoriteItems(userId: String!): [FavoriteItem!]!
    getFavoriteOutfits(userId: String!): [FavoriteOutfit!]!
  }
`;
