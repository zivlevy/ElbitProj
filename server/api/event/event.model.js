'use strict';

import mongoose from 'mongoose';

var options = { discriminatorKey: 'kind' };

var EventSchema = new mongoose.Schema({
    name: String,
    info: String,
    active: Boolean
  },
  options);

// ClickedLinkEvent
var clickedEventSchema = new mongoose.Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true }
  },
  options);

export default mongoose.model('Event', EventSchema);
