export const queryResolver = {
  getItems: (_, __, { types }) => types,
  getOutfits: (_, __, { types }) => types,
  getItemById: (_, { id }, { item }) => item.find(i => i.id == id),
  getOutfitById: (_, { id }, { outfit }) => outfit.find(out => out.id == id),
  // getItemByType: (_, { id }, { item }) => item.filter(i => i.types.includes(id)),
  getWishList: async (_, __, { getWishlist }) => JSON.stringify(await getWishlist())
};