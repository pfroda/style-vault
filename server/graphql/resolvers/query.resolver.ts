import { Op, Sequelize, Model, DataType } from "sequelize";
import { Item } from "../../models/itemSchema";
import { Outfit } from "../../models/outfitSchema";
import { Closet } from "../../models/closetSchema";

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
    console.log('hello')
    const filter: Record<string, any> = {};
    console.log(filter)
    if (userId) filter.userId = userId;
    if (color) filter.color = { [Op.contains]: color };
    if (occasion) filter.occasion = { [Op.contains]: occasion };
    if (season) filter.season = { 
      [Op.or]: season.map(s => ({ [Op.contains]: [s] })) 
    };
    if (brand) filter.brand = { [Op.or]: season.map(b => ({ [Op.contains]: [b] })) };
    if (location) filter.location = location;
    if (category === 'All') {
      // don't filter if user clicks all
  } else {
      filter.category = category;
  }

    const items = await Item.findAll({ where: filter });
    return Item.findAll({ where: filter });
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
    return items.map(item => item.color);
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
    return items.map(item => item.brand);
  },

  getOccasions: async (_, { userId }) => {
    const items = await Item.findAll({
      attributes: ['occasion'],
      where: { userId },
      group: ['occasion'],
      raw: true
    });

    if (!items.length) {
      throw new Error('No items/occasions found for this user');
    }
    return items.map(item => item.occasion);
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
    return items.map(item => item.location);
  }
};