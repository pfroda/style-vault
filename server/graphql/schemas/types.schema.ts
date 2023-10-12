export const types = `#graphql

  type Closet {
    id: String!
    userId: String!
    name: String!
    items: [Item]!
    outfits: [Outfit]!
  }

  type Item {
    id: String!
    userId: String!
    closets: [Closet]
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
    closets: [Closet]
    occasion: [String]!
    season: [String]!
  }

`;
