import { Request, Response } from 'express';
import { FavoriteItem } from '../models/favoriteItemSchema';
import { FavoriteOutfit } from '../models/favoriteOutfitSchema';

export const addFavoriteItem = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const itemId = req.body.itemId;

        const favorite = await FavoriteItem.create({
            userId,
            itemId
        });

        res.status(200).json({ success: true, message: 'Item added to favorites.', data: favorite });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding item to favorites.', error: error.message });
    }
}

export const removeFavoriteItem = async (req: Request, res: Response) => {
  try {
      const userId = req.body.userId;
      const itemId = req.body.itemId;

      await FavoriteItem.destroy({
          where: {
              userId,
              itemId
          }
      });

      res.status(200).json({ success: true, message: 'Item removed from favorites.' });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Error removing item from favorites.', error: error.message });
  }
}

export const addFavoriteOutfit = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const outfitId = req.body.outfitId;

        const favorite = await FavoriteOutfit.create({
            userId,
            outfitId
        });

        res.status(200).json({ success: true, message: 'Outfit added to favorites.', data: favorite });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding outfit to favorites.', error: error.message });
    }
}

export const removeFavoriteOutfit = async (req: Request, res: Response) => {
  try {
      const userId = req.body.userId;
      const outfitId = req.body.outfitId;

      await FavoriteOutfit.destroy({
          where: {
              userId,
              outfitId
          }
      });

      res.status(200).json({ success: true, message: 'Outfit removed from favorites.' });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Error removing outfit from favorites.', error: error.message });
  }
}


