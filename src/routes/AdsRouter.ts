import { Router } from 'express';
import { ListAdsController, GetDiscordByAdController } from '../controllers/AdsController';

export function AdsRouter (router:Router) {
  router.get(
    '/ads/',
    ListAdsController
  );
  router.get(
    '/ads/:id/discord',
    GetDiscordByAdController
  );
};
