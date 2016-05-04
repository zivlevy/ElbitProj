'use strict';

import mongoose from 'mongoose';

var PersonSchema = new mongoose.Schema({
  name: {type:String , required: true},
  description: String,

  createdAt:  { type: Date, default: Date.now },
  updatedAt:  { type: Date, default: Date.now },
  iff:        String,
  imageURL:   String,
  thumbImageURL:   String,
  imageName:  String,
  address:    String,
  tags:       String
  //sensors:  ObjectId
});

export default mongoose.model('Person', PersonSchema);
