'use strict';

import mongoose from 'mongoose';
import IntelEntity from '../intelEntity/intelEntity.model';
var GeoJSON = require('mongoose-geojson-schema');

var options = {discriminatorKey: 'kind'};
var EntBusinessSchema = new mongoose.Schema({
  imageURL:       String,
  thumbImageURL:  String,
  coordinates: mongoose.Schema.Types.Point,
  address:        String
});



EntBusinessSchema.index({coordinates: '2dsphere'});

export default mongoose.model('EntBusiness', EntBusinessSchema);
