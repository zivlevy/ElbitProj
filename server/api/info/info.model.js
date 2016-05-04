'use strict';

import mongoose from 'mongoose';

var InfoSchema = new mongoose.Schema({
  description: String,
  latitude: Number,
  longitude: Number,
  createdAt:  { type: Date, default: Date.now },
  arrivedAt:  { type: Date, default: Date.now },
  updatedAt:  { type: Date, default: Date.now },
  status:   Boolean,
  severity: Number,
  entities: Array,
  tags:     String
});

export default mongoose.model('Info', InfoSchema);
