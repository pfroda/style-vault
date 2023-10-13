import { Closet } from '../models/closetSchema';

async function createCloset (req, res) {
  try {
    const closet: Closet = req.body;
    console.log(closet);

    const newCloset = await Closet.create({
      userId: closet.userId,
      name: closet.name,
    });

    res.status(201).send(newCloset);
  } catch (error) {
    console.error('Error creating closet:', error);
    res.status(400).send({ error: error.message, message: 'Could not create the closet' });
  }
}

async function deleteCloset (req, res) {
  try {
    const closetId = req.params.closetId;

    const existingCloset = await Closet.findByPk(closetId);
    if (!existingCloset) {
      return res.status(404).send({ message: 'Closet not found' });
    }

    await Closet.destroy({
      where: {
        id: closetId
      }
    });

    res.status(200).send({ message: 'Closet deleted successfully' });
  } catch (error) {
    console.error('Error deleting closet:', error);
    res.status(500).send({ error: error.message, message: 'Could not delete the closet' });
  }
};

async function editCloset(req, res) {
  try {
    const closetId = req.params.closetId;
    const updatedClosetData = req.body;

    const existingCloset = await Closet.findByPk(closetId);
    if (!existingCloset) {
      return res.status(404).send({ message: 'Closet not found' });
    }

    await Closet.update(updatedClosetData, {
      where: {
        id: closetId
      }
    });

    const updatedCloset = await Closet.findByPk(closetId);

    res.status(200).send(updatedCloset);
  } catch (error) {
    console.error('Error updating closet:', error);
    res.status(500).send({ error: error.message, message: 'Could not update the closet' });
  }
}

export default {
  createCloset, deleteCloset, editCloset
};

// async function createCloset(req, res) {
//   try {
//     const { userId, items, outfits } = req.body;

//     const newCloset = (await Closet.create({
//       userId: userId
//     })) as Closet;
    
//     if (items) {
//       await newCloset.addItems(items);
//     }
//     if (outfits) {
//       await newCloset.addOutfits(outfits);
//     }

//     res.status(201).send(newCloset);
//   } catch (error) {
//     console.error('Error creating closet:', error);
//     res.status(400).send({ error: error.message, message: 'Could not create the closet' });
//   }
// }
