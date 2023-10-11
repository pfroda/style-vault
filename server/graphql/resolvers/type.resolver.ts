
const itemResolver = {
  closet: ({ closet }, _, db) => {
    return closet.map(closetId => db.closet.find(({id}) => id === closetId));
  },
  category: ( { category }, _, db) => {
    return category.map(categoryId => db.category.find(({id}) => id === categoryId));
  },
  name: ({ identifier }) => identifier.charAt(0).toUpperCase() + identifier.slice(1)
};

const outfitResolver = {
  type: (move, _, db) => db.types.find(({id}) => move.type_id === id)
};

export default { itemResolver, outfitResolver };
