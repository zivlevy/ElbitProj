/**
 * EntCar model events
 */

'use strict';

import {EventEmitter} from 'events';
import EntCar from './ent_car.model';
var EntCarEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EntCarEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  EntCar.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    EntCarEvents.emit(event + ':' + doc._id, doc);
    EntCarEvents.emit(event, doc);
  }
}

export default EntCarEvents;
