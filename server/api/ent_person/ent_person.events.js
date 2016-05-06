/**
 * EntPerson model events
 */

'use strict';

import {EventEmitter} from 'events';
import EntPerson from './ent_person.model';
var EntPersonEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EntPersonEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  EntPerson.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    EntPersonEvents.emit(event + ':' + doc._id, doc);
    EntPersonEvents.emit(event, doc);
  }
}

export default EntPersonEvents;
