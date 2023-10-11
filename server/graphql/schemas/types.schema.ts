export const types = `#graphql
  type Item {
    id: Int!
    userId: String!
    closet: [String]!
    category: String!
    itemUrl: String!
    occasion: [String]!
    season: [String]!
    color: [String]!
    brand: String!
  }

  type Outfit {
    id: Int!
    userId: String!
    name: String!
    occasion: [String]!
    season: [String]!
  }
`;