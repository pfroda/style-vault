import { Outfit } from '../models/outfitSchema';

async function createOutfit (req, res) {
  try {
    const outfit: Outfit = req.body;

    const newOutfit = await Outfit.create({
      userId: outfit.userId,
      name: outfit.name,
      occasion: outfit.occasion,
      season: outfit.season,
    });

    res.status(201).send(newOutfit);
  } catch (error) {
    console.error('Error creating outfit:', error);
    res.status(400).send({ error: error.message, message: 'Could not create the outfit' });
  }
}

export default {
  createOutfit
};
