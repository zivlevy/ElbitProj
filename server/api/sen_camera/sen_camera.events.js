/**
 * SenCamera model events
 */

'use strict';

import {EventEmitter} from 'events';
import SenCamera from './sen_camera.model';
var SenCameraEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SenCameraEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  SenCamera.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SenCameraEvents.emit(event + ':' + doc._id, doc);
    SenCameraEvents.emit(event, doc);
  }
}

export default SenCameraEvents;
