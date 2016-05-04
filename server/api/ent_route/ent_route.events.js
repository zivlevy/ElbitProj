/**
 * EntRoute model events
 */

'use strict';

import {EventEmitter} from 'events';
import EntRoute from './ent_route.model';
var EntRouteEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EntRouteEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  EntRoute.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    EntRouteEvents.emit(event + ':' + doc._id, doc);
    EntRouteEvents.emit(event, doc);
  }
}

export default EntRouteEvents;
