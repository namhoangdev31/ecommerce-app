import './pre-start'; // Must be the first import
import 'module-alias/register';
import logger from 'jet-logger';

import EnvVars from '@src/common/EnvVars';
import server from './server';


// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: >http://localhost:' +
  EnvVars.Port.toString());

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
