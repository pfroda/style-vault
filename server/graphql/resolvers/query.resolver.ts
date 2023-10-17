import { Op, Sequelize, Model, DataType } from "sequelize";
import { Item } from "../../models/itemSchema";
import { Outfit } from "../../models/outfitSchema";
import { Closet } from "../../models/closetSchema";
import { User } from "../../models/userSchema";
import { FavoriteItem } from "../../models/favoriteItemSchema";
import { FavoriteOutfit } from "../../models/favoriteOutfitSchema";

interface FilterConditions {
  color?: string[];
  occasion?: string[];
  season?: string[];
  brand?: string[];
  location?: string;
  category?: string;
  userId: string;
}

export const queryResolver = {
  getItems: async (_, { userId, color, occasion, season, brand, location, category }: FilterConditions) => {
    const filter: Record<string, any> = {};
    if (userId) filter.userId = userId;

    if (color) filter.color = { 
      [Op.or]: color.map(c => ({ [Op.contains]: [c] }))
    };

    if (occasion) filter.occasion = { 
      [Op.or]: occasion.map(o => ({ [Op.contains]: [o] }))
    };
  
    if (season) filter.season = { 
      [Op.or]: season.map(s => ({ [Op.contains]: [s] }))
    };

    if (brand) filter.brand = { 
      [Op.or]: brand.map(b => ({ [Op.eq]: b }))
    };
    if (location) filter.location = location;
    
    if (category !== 'All') { filter.category = category;
  };

  console.log('FILTER:', filter)
    const items = await Item.findAll({ where: filter });
    return items;
  },


  getOutfits: async (_, { userId, occasion, season }: FilterConditions) => {
    const filter: Record<string, any> = {};

    if (userId) filter.userId = userId;
    if (occasion) filter.occasion = { [Op.contains]: occasion };
    if (season) filter.season = { [Op.contains]: season };

    return Outfit.findAll({ where: filter as any });
  },

  getClosets: async (_, {userId}: FilterConditions) => {
    const filter: Record<string, any> = {};

    if (userId) filter.userId = userId;

    return Closet.findAll({ where: filter as any });

  },

  getItemById: async (_, { userId, id }) => {
    const item = await Item.findByPk(id);
    if (!item) throw new Error('Item not found');
    
    if (item.userId !== userId) throw new Error('Not authorized to view this item');
    
    return item;
  },

  getOutfitById: async (_, { userId, id }) => {
    const outfit = await Outfit.findByPk(id);
    if (!outfit) throw new Error('Item not found');
    
    if (outfit.userId !== userId) throw new Error('Not authorized to view this item');
    
    return outfit;
  },

  getClosetById: async (_, { userId, id}) => {
    const closet = await Closet.findByPk(id);
    if (!closet) throw new Error('Item not found');
    
    if (closet.userId !== userId) throw new Error('Not authorized to view this item');
    
    return closet;
  },

  getColors: async (_, { userId }) => {
    const items = await Item.findAll({
      attributes: ['color'],
      where: { userId },
      group: ['color'],
      raw: true
    });

    if (!items.length) {
      throw new Error('No items/colors found for this user');
    }
    const allColors = items.map(item => item.color).flat();
    const uniqueColors = Array.from(new Set(allColors));

    return uniqueColors;
  },

  getBrands: async (_, { userId }) => {
    const items = await Item.findAll({
      attributes: ['brand'],
      where: { userId },
      group: ['brand'],
      raw: true
    });

    if (!items.length) {
      throw new Error('No items/brands found for this user');
    }
    return items.map(item => item.brand.charAt(0).toUpperCase()+item.brand.slice(1));
  },

  getOccasions: async (_, { userId }) => {
    const items = await Item.findAll({
      attributes: ['occasion'],
      where: { userId },
      raw: true
    });
  
    if (!items.length) {
      throw new Error('No items/occasions found for this user');
    }

    const allOccasions = items.map(item => item.occasion).flat();
    const uniqueOccasions = Array.from(new Set(allOccasions));
  
    return uniqueOccasions;
  },
  

  getLocations: async (_, { userId }) => {
    const items = await Item.findAll({
      attributes: ['location'],
      where: { userId },
      group: ['location'],
      raw: true
    });

    if (!items.length) {
      throw new Error('No items/locations found for this user');
    }
    return items.map(item => item.location.charAt(0).toUpperCase()+item.location.slice(1));
  },


  getItemsByCategory: async (_, { userId, category }) => {
    const items = await Item.findAll({ 
      where: { 
        userId, 
        category 
      } 
    });
    if (!items.length) throw new Error('No items found for this category');
    return items;
  },

  getItemsByCloset: async (_, { id }) => {
    const closet = await Closet.findByPk(id);
    if (!closet) throw new Error('Closet not found');
    return closet.getItems();
  },

  getOutfitsByCloset: async (_, { id }) => {
    const closet = await Closet.findByPk(id);
    if (!closet) throw new Error('Closet not found');
    return closet.getOutfits();
  },

  getAllUsers: async () => {
    return User.findAll();
  },

  getUserById: async (_, { id }) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return user;
  },

  getFollowers: async (_, { userId }) => {
    const user = await User.findByPk(userId, {
      include: [{ model: User, as: 'followers' }]
    });
    if (!user) throw new Error('User not found');
    return user.followers;
  },

  getFollowing: async (_, { userId }) => {
    const user = await User.findByPk(userId, {
      include: [{ model: User, as: 'following' }]
    });
    if (!user) throw new Error('User not found');
    return user.following;
  },

  getFavoriteItems: async (_, { userId }) => {
    const favoriteItems = await FavoriteItem.findAll({
        where: { userId },
        include: [ Item ] 
    });
    if (!favoriteItems.length) throw new Error('No favorite items found for this user');
    return favoriteItems;
},

  getFavoriteOutfits: async (_, { userId }) => {
    const favoriteOutfits = await FavoriteOutfit.findAll({
        where: { userId },
        include: [ Outfit ]  
    });
    if (!favoriteOutfits.length) throw new Error('No favorite outfits found for this user');
    return favoriteOutfits;
},

};


