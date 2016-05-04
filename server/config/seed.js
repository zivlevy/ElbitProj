/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Person from '../api/person/person.model';
import Info from '../api/info/info.model';
var Chance = require ('chance');
var request = require('request');

var chance = new Chance();

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
      'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
      'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
      'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
      'tests alongside code. Automatic injection of scripts and ' +
      'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
      'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
      'payload, minifies your scripts/css/images, and rewrites asset ' +
      'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
      'and openshift subgenerators'
    });
  });

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
