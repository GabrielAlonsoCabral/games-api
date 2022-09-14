import { Express } from 'express';
import { AdsRouter, GamesRouter } from '.';

import cors from 'cors';
const Router = require('express').Router();
export default function Routes (app:Express) {
  app.use(Router);
  app.use(cors());
  AdsRouter(Router);
  GamesRouter(Router);
};
