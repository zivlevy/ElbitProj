'use strict';

import mongoose from 'mongoose';

var options = {discriminatorKey: 'kind'};
var IntelEntitySchema = new mongoose.Schema({
    name: String,
    description: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    identification: String,
    tags: Array,
    active: Boolean
  },
  options);

export default mongoose.model('IntelEntity', IntelEntitySchema);
