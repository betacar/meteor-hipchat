'use strict';

HipChatNotify = function(room, token) {
  this.room  = room || process.env.HIPCHAT_ROOM;
  this.token = token || process.env.HIPCHAT_TOKEN;
  this.host  = process.env.HIPCHAT_HOST || 'https://api.hipchat.com/v2';

  if (!this.room || !this.token) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[HIPCHAT-NOTIFY] Without the room name/ID and auth token the package will not send notifications.');
      this.room = null;
      this.token = null;
      return;
    } else {
      throw new Error('[HIPCHAT-NOTIFY] Please provide a HipChat room name/ID and auth token.');
    }
  }

  return this;
};

HipChatNotify.prototype.info = function(message) {
  return this._post(message, 'gray');
};

HipChatNotify.prototype.warning = function(message) {
  return this._post(message, 'yellow');
};

HipChatNotify.prototype.success = function(message) {
  return this._post(message, 'green');
};

HipChatNotify.prototype.error = function(message) {
  return this._post(message, 'red');
};

HipChatNotify.prototype.misc = function(message) {
  return this._post(message, 'purple');
};

HipChatNotify.prototype._post = function(data, color) {
  var body = typeof data === 'string' ? {message: data} : data;

  if ((!this.room || !this.token) && process.env.NODE_ENV !== 'production') {
    console.log('[HIPCHAT-NOTIFY] Without the room name/ID and auth token the package will not send notifications.');
    return;
  }

  var url = this.host + '/room/' + this.room + '/notification';

  body.color = color || 'gray';
  body.message_format = /<[a-z][\s\S]*>/i.test(body.message) ? 'html' : 'text';
  body.notify = 'notify' in body ? body.notify : true;

  return HTTP.post(url, {
    data: body,
    headers: {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + this.token
    }
  });
};
