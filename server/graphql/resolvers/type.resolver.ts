export const itemResolver = {
  closets: async (item: any) => {
    return item.getClosets();
  },
};

export const outfitResolver = {
  closets: async (outfit: any) => {
    return outfit.getClosets();
  }
};

export const closetResolver = {
  items: async (closet: any) => {
    return closet.getItems();
  },
  outfits: async (closet: any) => {
    return closet.getOutfits();
  }
};

