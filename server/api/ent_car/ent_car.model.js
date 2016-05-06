'use strict';

import mongoose from 'mongoose';
var GeoJSON = require('mongoose-geojson-schema');
import IntelEntity from '../intelEntity/intelEntity.model';
var options = {discriminatorKey: 'kind'};

var EntCarSchema = new mongoose.Schema({
    imageURL: String,
    thumbImageURL: String
  },
  options);




export default IntelEntity.discriminator('EntCar',
  EntCarSchema);

