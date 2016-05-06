'use strict';

import mongoose from 'mongoose';
var GeoJSON = require('mongoose-geojson-schema');

import IntelEntity from '../intelEntity/intelEntity.model.js';
var options = {discriminatorKey: 'kind'};

var EntHouseSchema = new mongoose.Schema({
    imageURL: String,
    thumbImageURL: String,
    coordinates: mongoose.Schema.Types.Point,
    address: String
  },
  options);

EntHouseSchema.index({coordinates: '2dsphere'});

export default IntelEntity.discriminator('EntHouse',
  EntHouseSchema);
