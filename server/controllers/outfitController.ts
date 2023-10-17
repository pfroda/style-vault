import { Outfit } from '../models/outfitSchema';
import { Item } from '../models/itemSchema';
import sharp from 'sharp';
import axios from 'axios';
import cloudinaryControllers from './cloudinaryControllers';

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

async function generateOutfitImage(req, res) {
  const urls = req.body;
  // const urls = [
  //   'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697185079/file_har9cf.jpg', // Imagen 1
  //   'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697185079/file_har9cf.jpg', // Imagen 2
  //   'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697185079/file_har9cf.jpg',
  // ];

  try {
    const imageBuffers = await Promise.all(
      urls.map(async (url, index) => {
        let width = 200;
        let height = 200;

        if (index === (urls.length - 1)) {
          width = 200;
          height = 100;
        }

        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        return sharp(imageBuffer)
          .resize(width, height)
          .toBuffer();
      })
    );

    const totalHeight = 200 * (urls.length - 1) + 100;

    const composedImageBuffer = await sharp({
      create: {
        width: 200,
        height: totalHeight,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      },
    })
      .composite(
        imageBuffers.map((buffer, index) => ({
          input: buffer,
          top: index * 200,
          left: 0,
        }))
      )
      .png()
      .toBuffer();

    // await sharp(composedImageBuffer).toFile('output.png');
    const cloudinaryResponse: any = await cloudinaryControllers.uploadOutfitToCloudinary(composedImageBuffer);

    console.log('Cloudinary URL:', cloudinaryResponse.result.url);
    res.json(cloudinaryResponse.result.url);
  } catch (error) {
    console.error(error);
  }
}

// generateOutfitImage();

export default {
  createOutfit, deleteOutfit, editOutfit, generateOutfitImage
}