/**
 * EntPhone model events
 */

'use strict';

import {EventEmitter} from 'events';
import EntPhone from './ent_phone.model.js';
var EntPhoneEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EntPhoneEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  EntPhone.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    EntPhoneEvents.emit(event + ':' + doc._id, doc);
    EntPhoneEvents.emit(event, doc);
  }
}

export default EntPhoneEvents;
