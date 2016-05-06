'use strict';

import mongoose from 'mongoose';

import IntelEntity from '../intelEntity/intelEntity.model.js';
var options = {discriminatorKey: 'kind'};

var EntPersonSchema = new mongoose.Schema({
    imageURL:       String,
    thumbImageURL:  String,
    address:        String
  },
  options);

//static that returns a random person
EntPersonSchema.statics.random = function random (callback) {

  this.count({}, function (err, n) {
    //get random number out of all
    n = Math.floor(Math.random() * n);
    //get the n-th sensor in the collection
    this.find().skip(n).limit(1).exec(function(err, data) {
      //if(err) res.send(502, "ERROR IN DB DATABASE");
      callback(data);
    });
    //return this.where('name', new RegExp(name, 'i')).exec(cb);
  })};

export default IntelEntity.discriminator('EntPerson',
  EntPersonSchema);



