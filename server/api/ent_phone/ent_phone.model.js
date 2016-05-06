'use strict';

import mongoose from 'mongoose';

import IntelEntity from '../intelEntity/intelEntity.model.js';
var options = {discriminatorKey: 'kind'};

var EntPhoneSchema = new mongoose.Schema({
    phoneNumber: String

  },
  options);

export default IntelEntity.discriminator('EntPhone',
  EntPhoneSchema);


