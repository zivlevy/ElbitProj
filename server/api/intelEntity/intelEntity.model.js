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

//static that returns a random intel entity
IntelEntitySchema.statics.random = function random() {
  var localTHis = this;
  return new Promise(function(resolve,reject) {
  localTHis.count({}, function (err, n) {
    //get random number out of all
    n = Math.floor(Math.random() * n);
    //get the n-th sensor in the collection
    localTHis.find().skip(n).limit(1).exec(function(err, data) {
      //if(err) res.send(502, "ERROR IN DB DATABASE");
      resolve(data[0]);
    });
})})} ;

//
//IntelEntitySchema.statics.random = function random (callback) {
//
//  this.count({}, function (err, n) {
//    //get random number out of all
//    n = Math.floor(Math.random() * n);
//    //get the n-th sensor in the collection
//    this.find().skip(n).limit(1).exec(function(err, data) {
//      //if(err) res.send(502, "ERROR IN DB DATABASE");
//      callback(data[0]);
//    });
//    //return this.where('name', new RegExp(name, 'i')).exec(cb);
//  })};

export default mongoose.model('IntelEntity', IntelEntitySchema);
