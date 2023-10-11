const queries = `#graphql
  type Query {
    getItems: [Item]!
    getOutfits: [Outfit]!
    getItemById(id: Number!): Item!
    getOutfitById(id: Number!): Outfit!
    getWishList: String
  }
`;

export default { queries };
