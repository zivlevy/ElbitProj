/**
 * Info model events
 */

'use strict';

import {EventEmitter} from 'events';
import Info from './info.model';
var InfoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
InfoEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Info.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    InfoEvents.emit(event + ':' + doc._id, doc);
    InfoEvents.emit(event, doc);
  }
}

export default InfoEvents;
