import { Router } from 'express';
import { ListAdsController, GetDiscordByAdController, CreateAdsController } from '../controllers/AdsController';

export function AdsRouter (router:Router) {
  router.get(
    '/ads/',
    ListAdsController
  );
  router.post(
    '/ads',
    CreateAdsController
  );
  router.get(
    '/ads/:id/discord',
    GetDiscordByAdController
  );
};
