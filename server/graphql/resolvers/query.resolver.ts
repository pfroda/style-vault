import { Op } from "sequelize";
import { Item } from "../../models/itemSchema";
import { Outfit } from "../../models/outfitSchema";
import { Closet } from "../../models/closetSchema";

interface FilterConditions {
  color?: string[];
  occasion?: string[];
  season?: string[];
  location?: string;
  category?: string;
}

export const queryResolver = {
  getItems: (_, { color, occasion, season, location, category }: FilterConditions) => {
    const filter: Record<string, any> = {};
    
    if (color) filter.color = { [Op.contains]: occasion };
    if (occasion) filter.occasion = { [Op.contains]: occasion };
    if (season) filter.season = { [Op.contains]: season };
    if (location) filter.location = location;
    if (category) filter.category = category;
    
    return Item.findAll({ where: filter });
  },

  getOutfits: (_, { occasion, season }: FilterConditions) => {
    const filter: Record<string, any> = {};
    
    if (occasion) filter.occasion = { [Op.contains]: occasion };
    if (season) filter.season = { [Op.contains]: season };
    
    return Outfit.findAll({ where: filter as any });
  },

  getClosets: (_) => Closet.findAll(),

  getItemById: (_, { id }) => Item.findByPk(id),

  getOutfitById: (_, { id }) => Outfit.findByPk(id),

  getClosetById: (_, { id }) => Item.findByPk(id),

  getItemsByCategory: async (_, { category }) => {
    const items = await Item.findAll({ where: { category } });
    if (!items.length) throw new Error('No items found for this category');
    return items; 
  },

  getItemsByCloset: async (_, { closetId }) => {
    const closet = await Closet.findByPk(closetId);
    if (!closet) throw new Error('Closet not found');
    return closet.getItems();
  },

  getOutfitsByCloset: async (_, { closetId }) => {
    const closet = await Closet.findByPk(closetId);
    if (!closet) throw new Error('Closet not found');
    return closet.getOutfits();
  } 
};

