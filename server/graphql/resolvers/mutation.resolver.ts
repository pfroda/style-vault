const mutationResolver = {
  toggleWishListItem: async (_, { id }, { toggleWishlist }) => toggleWishlist(id)
};

export default { mutationResolver };
