'use strict';

class NavbarController {

  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'mapMain'
  },
  //  {
  //  'title': 'Main Map',
  //  'state': 'mapMain'
  //},
    {
      'title': 'Person',
      'state': 'person'
    },
    {
      'title': 'About',
      'state': 'about'
    }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('elbitApp')
  .controller('NavbarController', NavbarController);
