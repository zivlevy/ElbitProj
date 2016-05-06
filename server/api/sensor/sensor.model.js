'use strict';

import mongoose from 'mongoose';

var options = { discriminatorKey: 'kind' };

var SensorSchema = new mongoose.Schema({
    name:           String,
    description:    String,
    createdAt:      { type: Date, default: Date.now },
    updatedAt:      { type: Date, default: Date.now },
    lastOperation:  { type: Date},
    active:         { type: Boolean, default:true }
  },
  options);


export default mongoose.model('Sensor', SensorSchema);
