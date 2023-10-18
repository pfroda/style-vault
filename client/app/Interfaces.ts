export type RegisterUser = {
  username: string;
  email: string;
  password: string;
  id: string;
};

export type User = {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  profilePicture: string;
  id: string;
  items: Item[]
  outfits: Outfit[]
  closets: Closet[]
  followers: [User]
  following: [User]
  followersCount: number;
  followingCount: number;
  favoriteItems: FavoriteItem[];
  favoriteOutfits: FavoriteOutfit[];
};


export type LoginUser = {
  email: string;
  password: string;
}

export type Item = {
  id?: string;
  userId: string;
  closets?: string;
  category?: string;
  itemUrl: string;
  occasion?: string[];
  season?: string[];
  color: string[];
  brand: string;
  location: string;
}

export type Outfit = {
  id: string;
  userId: string;
  name: string;
  closets?: string;
  occasion?: string[]; 
  season?: string[];
  outfitUrl: string;
}

export interface Closet {
  id?: string;
  userId: string;
  name: string;
  items?: Item[];
  outfits?: Outfit[];
}

export interface FavoriteItem {
  id: string;
  userId: string;
  itemId: string;
  item: Item
}

export interface FavoriteOutfit {
  id: string;
  userId: string;
  outfitId: string;
  outfit: Outfit
}

export interface ActivityFeed {
  message: string
  timestamp: string
}

// export interface Item {
//   id: string;
//   userId: string;
//   closets?: Closet[];
//   category: string;
//   itemUrl: string;
//   occasion?: string[];
//   season?: string[];
//   color: string[];
//   brand: string;
// }
// export interface Outfit {
//   id: string;
//   userId: string;
//   name: string;
//   closets?: Closet[];
//   occasion: string[];
//   season: string[];
// }
// export interface Closet {
//   id: string;
//   userId: string;
//   name: string;
//   items?: Item[];
//   outfits?: Outfit[];
// }