/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/ent_persons', require('./api/ent_person'));
  app.use('/api/ent_paths', require('./api/ent_path'));
  app.use('/api/ent_phones', require('./api/ent_phone'));
  app.use('/api/ent_businesss', require('./api/ent_business'));
  app.use('/api/ent_wearhouses', require('./api/ent_wearhouse'));
  app.use('/api/ent_cars', require('./api/ent_car'));
  app.use('/api/ent_houses', require('./api/ent_house'));
  app.use('/api/intelEntitys', require('./api/intelEntity'));
  app.use('/api/sen_cameras', require('./api/sen_camera'));
  app.use('/api/infos', require('./api/info'));
  app.use('/api/persons', require('./api/person'));
  app.use('/api/sensors', require('./api/sensor'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
