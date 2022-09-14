import 'dotenv/config';
import App from './config/App';
import { Environments } from './config/Environments';

const { PORT = 3306 } = Environments;
App.listen(PORT, () => console.log(`Listening at http://[::]:${PORT}`));
