/**
 * Socket.io configuration
 */
'use strict';

import config from './environment';

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', data => {
    socket.log(JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/ent_person/ent_person.socket').register(socket);
  require('../api/ent_path/ent_path.socket').register(socket);
  require('../api/ent_phone/ent_phone.socket').register(socket);
  require('../api/ent_business/ent_business.socket').register(socket);
  require('../api/ent_wearhouse/ent_wearhouse.socket').register(socket);
  require('../api/ent_car/ent_car.socket').register(socket);
  require('../api/ent_house/ent_house.socket').register(socket);
  require('../api/intelEntity/intelEntity.socket').register(socket);
  require('../api/sen_camera/sen_camera.socket').register(socket);
  require('../api/info/info.socket').register(socket);
  require('../api/sensor/sensor.socket').register(socket);

}

export default function(socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function(socket) {
    socket.setMaxListeners(0);
    socket.address = socket.request.connection.remoteAddress +
      ':' + socket.request.connection.remotePort;

    socket.connectedAt = new Date();

    socket.log = function(...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED');
  });
}
