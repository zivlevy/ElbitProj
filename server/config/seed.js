/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

import User from '../api/user/user.model';
import Person from '../api/person/person.model';
import entPerson from '../api/ent_person/ent_person.model';
import Info from '../api/info/info.model';
var Chance = require ('chance');
var request = require('request');

var chance = new Chance();

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
      },{
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


Person.find({}).remove()
  .then(() => {
    var numberOfPersons = 200;
    getUser(numberOfPersons,function(arr){
      for (var i = 0; i < numberOfPersons; i++) {
        Person.create({
          //name: chance.name({ gender: "male" }),
          name: arr[i].name.first + ' ' + arr[i].name.last,
          description: 'description' + i,
          address: chance.address({country:'us'}),
          imageURL: arr[i].picture.large,
          thumbImageURL: arr[i].picture.thumbnail,
          tags: 'tag' + i,
          iff: 'enemy',
          active: true
        });
      }
    });
  });

//init intel entities

//persons
entPerson.find({}).remove()
  .then(() => {
    var numberOfPersons = 200;
    getUser(numberOfPersons,function(arr){
      for (var i = 0; i < numberOfPersons; i++) {
        entPerson.create({
          //name: chance.name({ gender: "male" }),
          name: arr[i].name.first + ' ' + arr[i].name.last,
          description: 'description' + i,
          address: chance.address({country:'us'}),
          imageURL: arr[i].picture.large,
          thumbImageURL: arr[i].picture.thumbnail,
          tags: 'tag' + i,
          iff: 'enemy',
          active: true
        });
      }
    });
  });
Info.find({}).remove()
  .then(() => {
    for (var i = 0; i < 1000; i++) {
      var timeNow = new Date();
      Info.create({
        description:  chance.paragraph({sentences: chance.d4()}),
        latitude:     chance.floating({min: 32.031, max: 32.09, fixed: 8}),
        longitude:    chance.floating({min: 34.77, max: 34.82, fixed: 8}),
        createdAt:    chance.date({year:timeNow.getFullYear(), month:timeNow.getMonth(), day:timeNow.getDate() -1}),
        arrivedAt:    chance.date({year:timeNow.getFullYear(), month:timeNow.getMonth(), day:timeNow.getDate()}),
        updatedAt:    chance.date({year:timeNow.getFullYear(), month:timeNow.getMonth(), day:timeNow.getDate()}),
        severity:     chance.integer({min:1,max:10}),
        created:      chance.date({year:timeNow.getFullYear(), month:timeNow.getMonth(), day:timeNow.getDate() -1}),
        status:       chance.bool({likelihood: 30})
      });
    }
  });

var getUser = function(number,callback){
  var propertiesObject = { 'results':number ,'seed':'foobar','nat':'tr'};
  var url = 'http://api.randomuser.me';
  request({url:url, qs:propertiesObject}, function(err, response, body) {
    if(err) { console.log('error' + err); return; }
    var pa = JSON.parse(body);
    var arr = pa['results'];
    callback(arr);
  });
}
