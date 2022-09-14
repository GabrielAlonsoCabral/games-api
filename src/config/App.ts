import express, { json } from 'express';
import Routes from '../routes/Routes';
import cors from 'cors';

const App = express();

App.use(json());
App.use(cors());
Routes(App);

export = App;
