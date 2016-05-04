'use strict';

import mongoose from 'mongoose';
import Sensor from '../sensor/sensor.model';
var options = { discriminatorKey: 'kind' };
var GeoJSON = require('mongoose-geojson-schema');

var SenCameraSchema = new mongoose.Schema({

    geometry: GeoJSON.Point
},
  options);

export default Sensor.discriminator('SenCamera',
  SenCameraSchema);
