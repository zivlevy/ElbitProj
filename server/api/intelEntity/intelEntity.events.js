/**
 * IntelEntity model events
 */

'use strict';

import {EventEmitter} from 'events';
import IntelEntity from './intelEntity.model';
var IntelEntityEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
IntelEntityEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  IntelEntity.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    IntelEntityEvents.emit(event + ':' + doc._id, doc);
    IntelEntityEvents.emit(event, doc);
  }
}

export default IntelEntityEvents;
