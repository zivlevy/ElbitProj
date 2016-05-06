'use strict';

import mongoose from 'mongoose';
import Sensor from '../sensor/sensor.model';
var options = { discriminatorKey: 'kind' };
var GeoJSON = require('mongoose-geojson-schema');

var SenCameraSchema = new mongoose.Schema({

    coordinates: mongoose.Schema.Types.Point,
},
  options);


SenCameraSchema.index({ coordinates: '2dsphere' });

export default Sensor.discriminator('SenCamera',
  SenCameraSchema);
