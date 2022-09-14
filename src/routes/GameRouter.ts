import { Router } from 'express';
import { ListGamesController, ListAdsByGamesController } from '../controllers/GamesController';

export function GamesRouter (router:Router) {
  router.get(
    '/games',
    ListGamesController
  );
  router.get(
    '/games/:id/ads',
    ListAdsByGamesController
  );
};
