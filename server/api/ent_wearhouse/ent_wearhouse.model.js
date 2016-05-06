'use strict';

import mongoose from 'mongoose';
var GeoJSON = require('mongoose-geojson-schema');

import IntelEntity from '../intelEntity/intelEntity.model';
var options = {discriminatorKey: 'kind'};

var EntWearhouseSchema = new mongoose.Schema({
    imageURL: String,
    thumbImageURL: String,
    coordinates: mongoose.Schema.Types.Point,
    address: String
  },
  options);

EntWearhouseSchema.index({coordinates: '2dsphere'});

export default IntelEntity.discriminator('EntWearhouse',
  EntWearhouseSchema);

