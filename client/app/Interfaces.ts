export type RegisterUser = {
  username: string
  email: string
  password: string
  id: string
};

export type LoginUser = {
  email: string
  password: string
}

export type Item = {
  id?: string
  userId: string
  closet?: string
  category?: string
  itemUrl: string
  occasion?: string
  season?: string
  color: string
  brand: string
  location: string
}

export type Outfit = {
  id: string
  userId: string
  name: string
  occasion: string[] //revisar
  season: string[] // revisar
}

export interface Closet {
  id?: string
  userId: string
  name: string
}