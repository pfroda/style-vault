export const types = `#graphql
  type Item {
    id: Number!
    userId: Number!
    closet: String[]!
    category: String!
    itemUrl: String!
    occasion: String[]!
    season: String[]!
    color: String[]!
    brand: String!
  }

  type Outfit {
    id: Number!
    userId: Number!
    name: String!
    occasion: String[]!
    season: String[]!
  }
`;