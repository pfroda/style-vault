import { Item } from '../models/itemSchema';

async function createItem (req, res) {
  try {
    const item: Item = req.body;

    const newItem = await Item.create({
      userId: item.userId,
      brand: item.brand,
      category: item.category,
      color: item.color,
      itemUrl: item.itemUrl,
      closets: item.closets || null,
      occasion: item.occasion || null,
      season: item.season || null,
    });

    res.status(201).send(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(400).send({ error: error.message, message: 'Could not create the item' });
  }
}

export default {
  createItem
};
