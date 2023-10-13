import { Item } from "../../models/itemSchema";
import { Outfit } from "../../models/outfitSchema";
import { Closet } from "../../models/closetSchema";

export const queryResolver = {
  getItems: (_) => Item.findAll(),
  getOutfits: (_) => Outfit.findAll(),
  getClosets: (_) => Closet.findAll(),
  getItemById: (_, { id }) => Item.findByPk(id),
  getOutfitById: (_, { id }) => Outfit.findByPk(id),
  getClosetById: (_, { id }) => Item.findByPk(id),
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