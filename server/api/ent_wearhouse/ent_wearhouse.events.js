/**
 * EntWearhouse model events
 */

'use strict';

import {EventEmitter} from 'events';
import EntWearhouse from './ent_wearhouse.model.js';
var EntWearhouseEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EntWearhouseEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  EntWearhouse.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    EntWearhouseEvents.emit(event + ':' + doc._id, doc);
    EntWearhouseEvents.emit(event, doc);
  }
}

export default EntWearhouseEvents;
