
import express from 'express';
const router = express.Router();

import { addFavoriteOutfit, removeFavoriteOutfit, addFavoriteItem, removeFavoriteItem } from '../controllers/favoritesController';

router.post('/favorites/outfit/:outfitId', addFavoriteOutfit );

router.delete('/favorites/outfit/:outfitId', removeFavoriteOutfit);

router.post('/favorites/item/:itemId', addFavoriteItem);

router.delete ('/favorites/item/:itemId', removeFavoriteItem );