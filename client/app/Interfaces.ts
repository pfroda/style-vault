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
  closets?: Closet[];
  occasion: string[]; 
  season: string[];
  outfitUrl: string;
}

export interface Closet {
  id?: string;
  userId: string;
  name: string;
  items?: Item[];
  outfits?: Outfit[];
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