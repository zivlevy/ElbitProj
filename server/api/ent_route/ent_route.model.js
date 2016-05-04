'use strict';

import mongoose from 'mongoose';
import Event from '../event/event.model';
var options = { discriminatorKey: 'kind' };

var EntRouteSchema = new mongoose.Schema({
  routedata: String
}, options);


export default Event.discriminator('ClickedLink',
  EntRouteSchema);
