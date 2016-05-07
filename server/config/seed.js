/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

import User from '../api/user/user.model';
import EntPath from '../api/ent_path/ent_path.model';
import EntPerson from '../api/ent_person/ent_person.model';
import Info from '../api/info/info.model';
import IntelEntity from '../api/intelEntity/intelEntity.model';
import shared from '../config/environment/shared.js';
var geoLib= require ('geolib');
var Chance = require('chance');
var request = require('request');

var chance = new Chance();
let noPersons = 100;
let noHouses = 100;
let noWarehoses = 100;
let noCars = 100;
let noPhones = 100;
let noBusiness=100;
let noPath = 100;
let noInfo = 500;

User.find({}).remove()
  .then(() => {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Ziv',
        email: 'zivilevy@gmail.com',
        password: 'zivi1503'
      })
      .then(() => {
        console.log('finished populating users');
      });
  });


//init intel entities
//persons
EntPerson.find({}).remove()
  .then(createPersons)
  .then(createPath)
  .then(createInfo);


// create info data
function createInfo() {
  Info.find({}).remove()
    .then(() => {
      for (var i = 0; i < noInfo; i++) {

        IntelEntity.random().then(function (entity) {
            var randomEntity = [];
            randomEntity.push(entity._id);
            var timeNow = new Date();
            Info.create({
              description: chance.paragraph({sentences: chance.d4()}),
              coordinates: createRandomPoint(30000),
              createdAt: chance.date({
                year: timeNow.getFullYear(),
                month: timeNow.getMonth(),
                day: timeNow.getDate() - 1
              }),
              arrivedAt: chance.date({year: timeNow.getFullYear(), month: timeNow.getMonth(), day: timeNow.getDate()}),
              updatedAt: chance.date({year: timeNow.getFullYear(), month: timeNow.getMonth(), day: timeNow.getDate()}),
              severity: chance.integer({min: 1, max: 10}),
              created: chance.date({year: timeNow.getFullYear(), month: timeNow.getMonth(), day: timeNow.getDate() - 1}),
              status: chance.bool({likelihood: 30}),
              entities: randomEntity
            });
          }
        );
      }
      console.log('finished populating Info');
    });
};

// path creation
function createPath() {
  return new Promise(function (resolve, reject) {

      for (var i = 0; i < noPath; i++) {
        EntPath.create({
          //name: chance.name({ gender: "male" }),
          name: 'path ' + i,
          description: 'path description ' + i,
          tags: 'tag' + i,
          identification: 'enemy',
          active: true,
          //path specific
          coordinates: createRandomPoint(),
          pathCoordinates:{type: 'MultiPoint', coordinates: [[30,34],[30,35],[31,36]]}
        });
      }
      console.log('finished populating Path');
      resolve();
    });


};



//person creation
function createPersons() {
  return new Promise(function (resolve, reject) {
    newGetUser(noPersons).then(arr=> {
      for (var i = 0; i < noPersons; i++) {
        EntPerson.create({
          //name: chance.name({ gender: "male" }),
          name: arr[i].name.first + ' ' + arr[i].name.last,
          description: 'description' + i,
          address: chance.address({country: 'us'}),
          imageURL: arr[i].picture.large,
          thumbImageURL: arr[i].picture.thumbnail,
          tags: 'tag' + i,
          identification: 'enemy',
          active: true
        });
      }
      console.log('finished populating Persons');
      resolve();
    });

  });
};

function newGetUser (number) {
  var promise = new Promise(function (resolve, reject) {
    var propertiesObject = {'results': number, 'seed': 'foobar', 'nat': 'tr'};
    var url = 'http://api.randomuser.me';
    request({url: url, qs: propertiesObject}, function (err, response, body) {
      if (err) {
        reject(err);
      }
      var pa = JSON.parse(body);
      var arr = pa['results'];
      resolve(arr);
    });
  });
  return promise;
}


//helpers
function createRandomPoint (radius = 5000,center = shared.center) {
  var randomRadius = Math.floor(Math.random()*radius);
  var randomBearing = Math.floor(Math.random() * 360);
  var rangomPoint = geoLib.computeDestinationPoint({lat:center[0], lon:center[1]}, randomRadius, randomBearing);
  var point =  {type: 'Point', coordinates: [rangomPoint.longitude, rangomPoint.latitude]};
  return point;
}
