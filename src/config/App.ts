import express from 'express';
import Routes from '../routes/Routes';

const App = express();

Routes(App);

export = App;
