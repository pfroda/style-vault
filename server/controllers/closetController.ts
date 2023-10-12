import { Closet } from '../models/closetSchema';

async function createCloset(req, res) {
  try {
    const { userId, items, outfits } = req.body;

    const newCloset = (await Closet.create({
      userId: userId
    })) as Closet;
    
    if (items) {
      await newCloset.addItems(items);
    }
    if (outfits) {
      await newCloset.addOutfits(outfits);
    }

    res.status(201).send(newCloset);
  } catch (error) {
    console.error('Error creating closet:', error);
    res.status(400).send({ error: error.message, message: 'Could not create the closet' });
  }
}



export default {
  createCloset
};
