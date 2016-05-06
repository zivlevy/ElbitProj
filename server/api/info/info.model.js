'use strict';

import mongoose from 'mongoose';
import IntelEntity from '../intelEntity/intelEntity.model';

var InfoSchema = new mongoose.Schema({
  description: String,
  latitude: Number,
  longitude: Number,
  createdAt:  { type: Date, default: Date.now },
  arrivedAt:  { type: Date, default: Date.now },
  updatedAt:  { type: Date, default: Date.now },
  status:   Boolean,
  severity: Number,
  entities: [{type: mongoose.Schema.Types.ObjectId, ref:'IntelEntity' }],
  tags:     [String]
});

export default mongoose.model('Info', InfoSchema);
