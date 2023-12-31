import { Item } from '../models/itemSchema';
import { UserActivity } from '../models/userActivitySchema';
import { Closet } from '../models/closetSchema';

async function createItem (req, res) {
  try {
    const item: Item = req.body.item;
    const closetId: string = req.body.closetId;

    const closetFound = await Closet.findByPk(closetId);

    if (!closetFound) {
      throw new Error('Closet not found!');
    }

    const newItem = await Item.create({
      userId: item.userId,
      brand: item.brand,
      category: item.category,
      color: item.color,
      itemUrl: item.itemUrl,
      occasion: item.occasion || null,
      season: item.season || null,
      location: item.location || null
    });

    // add outfit to closet using closet.addOutfits
    await closetFound.addItems([newItem.id]);
    await UserActivity.create({
        type: 'NewItemToCloset', 
        userId: item.userId,
        itemId: newItem.id,
        timestamp: new Date()  
      });

    // res.status(201).send(newItem);
    res.status(201).send(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(400).send({ error: error.message, message: 'Could not create the item' });
  }
}

async function deleteItem (req, res) {
  try {
    const itemId = req.params.itemId;

    const existingItem = await Item.findByPk(itemId);
    if (!existingItem) {
      return res.status(404).send({ message: 'Item not found' });
    }

    await Item.destroy({
      where: {
        id: itemId
      }
    });

    res.status(200).send({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).send({ error: error.message, message: 'Could not delete the item' });
  }
};

async function editItem(req, res) {
  try {
    const itemId = req.params.itemId;
    const updatedItemData = req.body;

    const existingItem = await Item.findByPk(itemId);
    if (!existingItem) {
      return res.status(404).send({ message: 'Item not found' });
    }

    await Item.update(updatedItemData, {
      where: {
        id: itemId
      }
    });

    const updatedItem = await Item.findByPk(itemId);

    res.status(200).send(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).send({ error: error.message, message: 'Could not update the item' });
  }
}

export default {
  createItem, deleteItem, editItem
};
