'use strict';

var GeoJSON = require('mongoose-geojson-schema');
import mongoose from 'mongoose';


import IntelEntity from '../intelEntity/intelEntity.model.js';
var options = {discriminatorKey: 'kind'};

var EntPathSchema = new mongoose.Schema({
    coordinates: mongoose.Schema.Types.Point,
    pathCoordinates: mongoose.Schema.Types.MultiPoint
  },
  options);

EntPathSchema.index({coordinates: '2dsphere'});



export default IntelEntity.discriminator('EntPath',
  EntPathSchema);

