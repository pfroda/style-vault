import { Outfit } from '../models/outfitSchema';
import { Item } from '../models/itemSchema';
import { UserActivity } from '../models/userActivitySchema';

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

    const activity = await UserActivity.create({
      type: 'NewOutfitToCloset', 
      userId: outfit.userId,
      outfitId: newOutfit.id,
      timestamp: new Date()  
    });

    res.status(201).send(newOutfit, activity);
  } catch (error) {
    console.error('Error creating outfit:', error);
    res.status(400).send({ error: error.message, message: 'Could not create the outfit' });
  }
}

async function deleteOutfit (req, res) {
  try {
    const outfitId = req.params.outfitId;

    const existingOutfit = await Item.findByPk(outfitId);
    if (!existingOutfit) {
      return res.status(404).send({ message: 'Item not found' });
    }

    await Item.destroy({
      where: {
        id: outfitId
      }
    });

    res.status(200).send({ message: 'Outfit deleted successfully' });
  } catch (error) {
    console.error('Error deleting outfit:', error);
    res.status(500).send({ error: error.message, message: 'Could not delete the outfit' });
  }
};

async function editOutfit(req, res) {
  try {
    const outfitId = req.params.outfitId;
    const updatedOutfitData = req.body;

    const existingOutfit = await Outfit.findByPk(outfitId);
    if (!existingOutfit) {
      return res.status(404).send({ message: 'Outfit not found' });
    }

    await Outfit.update(updatedOutfitData, {
      where: {
        id: outfitId
      }
    });

    const updatedOutfit = await Outfit.findByPk(outfitId);

    res.status(200).send(updatedOutfit);
  } catch (error) {
    console.error('Error updating outfit:', error);
    res.status(500).send({ error: error.message, message: 'Could not update the outfit' });
  }
}

export default {
  createOutfit, deleteOutfit, editOutfit
};
