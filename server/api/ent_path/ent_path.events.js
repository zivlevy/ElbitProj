/**
 * EntPath model events
 */

'use strict';

import {EventEmitter} from 'events';
import EntPath from './ent_path.model.js';
var EntPathEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EntPathEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  EntPath.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    EntPathEvents.emit(event + ':' + doc._id, doc);
    EntPathEvents.emit(event, doc);
  }
}

export default EntPathEvents;
