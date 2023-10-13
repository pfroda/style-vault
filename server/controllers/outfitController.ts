import { Outfit } from '../models/outfitSchema';
import { Item } from '../models/itemSchema';

async function createOutfit (req, res) {
  try {
    const outfit: Outfit = req.body;

    const newOutfit = await Outfit.create({
      userId: outfit.userId,
      name: outfit.name,
      closets: outfit.closets || null,
      occasion: outfit.occasion,
      season: outfit.season
    });

    // // Busca los Items por sus IDs
    // const items = await Item.findAll({
    //   where: {
    //     id: item.id,
    //   },
    // });

    // // Asocia los Items con el Outfit
    // await newOutfit.set('items', items);

    res.status(201).send(newOutfit);
  } catch (error) {
    console.error('Error creating outfit:', error);
    res.status(400).send({ error: error.message, message: 'Could not create the outfit' });
  }
}

export default {
  createOutfit
};
