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
    location: String
  }

  type Outfit {
    id: String!
    userId: String!
    name: String!
    closets: [Closet]
    occasion: [String]
    season: [String]
    outfitUrl: String
  }

  type User {
    id: String!
    username: String!
    profilePicture: String
    name: String
    items: [Item]!
    outfits: [Outfit]!
    closets: [Closet]!
    followers: [User]!
    following: [User]!
    followersCount: Int!
    followingCount: Int!
    favoriteItems: [FavoriteItem!]!
    favoriteOutfits: [FavoriteOutfit!]!
  }

  type FavoriteItem {
    id: String!
    userId: String!
    itemId: String!
    item: Item!
  }

  type FavoriteOutfit {
    id: String!
    userId: String!
    outfitId: String!
    outfit: Outfit!
  }

  type UserActivity {
    id: String!
    type: String!
    userId: String!
    timestamp: String!
    itemId: String
    outfitId: String
    closetId: String
  }


  type ActivityFeed {
  message: String!
  timestamp: String!
  user: User!
  item: Item
  outfit: Outfit
}
`;