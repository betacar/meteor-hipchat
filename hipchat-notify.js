'use strict';

HipChatNotify = function(room, token) {
  this.room  = room || process.env.HIPCHAT_ROOM;
  this.token = token || process.env.HIPCHAT_TOKEN;
  this.host  = process.env.HIPCHAT_HOST || 'https://api.hipchat.com/v2';

  if (!this.room || !this.token) throw 'Please specify a room name or ID and auth token';
  return this;
};

HipChatNotify.prototype.info = function(message, cb) {
  return this._post(message, 'gray', cb);
};

HipChatNotify.prototype.warning = function(message, cb) {
  return this._post(message, 'yellow', cb);
};

HipChatNotify.prototype.success = function(message, cb) {
  return this._post(message, 'green', cb);
};

HipChatNotify.prototype.error = function(message, cb) {
  return this._post(message, 'red', cb);
};

HipChatNotify.prototype.misc = function(message, cb) {
  return this._post(message, 'purple', cb);
};

HipChatNotify.prototype._post = function(data, color, cb) {
  var body = typeof data === 'string' ? {message: data} : data;
  var url = this.host + '/room/' + this.room + '/notification';

  body.color = color || 'gray';
  body.message_format = /<[a-z][\s\S]*>/i.test(body.message) ? 'html' : 'text';
  body.notify = 'notify' in body ? body.notify : true;

  return HTTP.post(url, {
    data: body,
    headers: {
      'content-type': 'application/json'
    },
    auth: {
      bearer: this.token
    }
  }, function(error, response) {
    if (cb) {
      return cb(error, response);
    };
  });
};