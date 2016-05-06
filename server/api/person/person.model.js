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


//static that returns a random person
PersonSchema.statics.random = function random (callback) {

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
export default mongoose.model('Person', PersonSchema);
