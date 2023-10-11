export const types = `#graphql
  type Item {
    id: String!
    userId: String!
    closet: [String]
    category: String!
    itemUrl: String!
    occasion: [String]
    season: [String]
    color: [String]!
    brand: String!
  }

  type Outfit {
    id: String!
    userId: String!
    name: String!
    occasion: [String]!
    season: [String]!
  }
`;