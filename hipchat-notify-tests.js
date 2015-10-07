'use strict';

Tinytest.add('HipChatNotify is defined', function(test) {
  test.isNotUndefined(HipChatNotify);
});

Tinytest.add('Is instance of HipChatNotify', function(test) {
  var hipchat = new HipChatNotify(12345, 'abcdefghijklmnñopqrstuvwxyz');

  test.instanceOf(hipchat, HipChatNotify);
  test.equal(hipchat.room, 12345);
  test.equal(hipchat.token, 'abcdefghijklmnñopqrstuvwxyz');
  test.equal(hipchat.host, 'https://api.hipchat.com/v2');
});

Tinytest.add('Takes the HipChat room from the ENV', function(test) {
  process.env.HIPCHAT_ROOM = 12345;
  var hipchat = new HipChatNotify(undefined, 'abcdefghijklmnñopqrstuvwxyz');

  test.equal(hipchat.room, '12345');
  delete process.env.HIPCHAT_ROOM;
});

Tinytest.add('Takes the HipChat token from the ENV', function(test) {
  process.env.HIPCHAT_TOKEN = 'abcdefghijklmnñopqrstuvwxyz';
  var hipchat = new HipChatNotify(12345);

  test.equal(hipchat.token, 'abcdefghijklmnñopqrstuvwxyz');
  delete process.env.HIPCHAT_TOKEN;
});

Tinytest.add('Takes the HipChat host from the ENV', function(test) {
  process.env.HIPCHAT_HOST = 'https://hipchat.betacar.net';
  var hipchat = new HipChatNotify(12345, 'abcdefghijklmnñopqrstuvwxyz');

  test.equal(hipchat.host, 'https://hipchat.betacar.net');
  delete process.env.HIPCHAT_HOST;
});

// FIXME
Tinytest.add("HipChatNotify sets the room and token values as null when they're not defined in the constructor", function (test) {
  var hipChat = new HipChatNotify();
  test.equal(hipChat.room, null);
  test.equal(hipChat.token, null);
});

Tinytest.add('Sends gray a notification color using #info method', function(test) {
  HTTP.post = function(url, options) {
    test.equal(url, 'https://api.hipchat.com/v2/room/561156/notification');
    test.equal(options.data.color, 'gray');

    test.equal(options.headers.authorization, 'Bearer IamthewatcheronthewallsIamtheshieldthatguardstherealmsofmen')
  };
  var hipchat = new HipChatNotify(561156, 'IamthewatcheronthewallsIamtheshieldthatguardstherealmsofmen');
  hipchat.info('Tyrion demads trial by combat!');
});

Tinytest.add('Sends yellow a notification color using #warning method', function(test) {
  HTTP.post = function(url, options) {
    test.equal(url, 'https://api.hipchat.com/v2/room/561156/notification');
    test.equal(options.data.color, 'yellow');
    test.isTrue(options.data.notify);

    test.equal(options.headers.authorization, 'Bearer IamthewatcheronthewallsIamtheshieldthatguardstherealmsofmen')
  };
  var hipchat = new HipChatNotify(561156, 'IamthewatcheronthewallsIamtheshieldthatguardstherealmsofmen');
  hipchat.warning('Tyrion demads trial by combat!');
});

Tinytest.add('Sends green a notification color using #success method', function(test) {
  HTTP.post = function(url, options) {
    test.equal(url, 'https://api.hipchat.com/v2/room/561156/notification');
    test.equal(options.data.color, 'green');
    test.isTrue(options.data.notify);

    test.equal(options.headers.authorization, 'Bearer IamthewatcheronthewallsIamtheshieldthatguardstherealmsofmen')
  };
  var hipchat = new HipChatNotify(561156, 'IamthewatcheronthewallsIamtheshieldthatguardstherealmsofmen');
  hipchat.success('Tyrion demads trial by combat!');
});

Tinytest.add('Sends red a notification color using #error method', function(test) {
  HTTP.post = function(url, options) {
    test.equal(url, 'https://api.hipchat.com/v2/room/561156/notification');
    test.equal(options.data.color, 'red');
    test.isTrue(options.data.notify);

    test.equal(options.headers.authorization, 'Bearer IamthewatcheronthewallsIamtheshieldthatguardstherealmsofmen')
  };
  var hipchat = new HipChatNotify(561156, 'IamthewatcheronthewallsIamtheshieldthatguardstherealmsofmen');
  hipchat.error('Tyrion demads trial by combat!');
});

Tinytest.add('Sends purple a notification color using #misc method', function(test) {
  HTTP.post = function(url, options) {
    test.equal(url, 'https://api.hipchat.com/v2/room/561156/notification');
    test.equal(options.data.color, 'purple');
    test.isTrue(options.data.notify);

    test.equal(options.headers.authorization, 'Bearer IamthewatcheronthewallsIamtheshieldthatguardstherealmsofmen')
  };
  var hipchat = new HipChatNotify(561156, 'IamthewatcheronthewallsIamtheshieldthatguardstherealmsofmen');
  hipchat.misc('Tyrion demads trial by combat!');
});

Tinytest.add('Sends the payload attributes, with a plain text message', function(test) {
  HTTP.post = function(url, options) {
    test.equal(url, 'https://api.hipchat.com/v2/room/561156/notification');
    test.equal(options.data.message, 'Tyrion demads trial by combat!');
    test.equal(options.data.message_format, 'text');

    test.equal(options.headers.authorization, 'Bearer IamthewatcheronthewallsIamtheshieldthatguardstherealmsofmen')
  };
  var hipchat = new HipChatNotify(561156, 'IamthewatcheronthewallsIamtheshieldthatguardstherealmsofmen');
  hipchat.info('Tyrion demads trial by combat!');
});

Tinytest.add('Sends the payload attributes, with a HTML message', function(test) {
  HTTP.post = function(url, options) {
    test.equal(url, 'https://api.hipchat.com/v2/room/561156/notification');
    test.equal(options.data.message, '<strong>Tyrion</strong> demads trial by combat!');
    test.equal(options.data.message_format, 'html');

    test.equal(options.headers.authorization, 'Bearer IamthewatcheronthewallsIamtheshieldthatguardstherealmsofmen')
  };
  var hipchat = new HipChatNotify(561156, 'IamthewatcheronthewallsIamtheshieldthatguardstherealmsofmen');
  hipchat.info('<strong>Tyrion</strong> demads trial by combat!');
});

Tinytest.add('Sends the payload attributes, with a object message', function(test) {
  HTTP.post = function(url, options) {
    test.equal(url, 'https://api.hipchat.com/v2/room/561156/notification');
    test.equal(options.data.message, 'Tyrion demads trial by combat!');
    test.isFalse(options.data.notify);

    test.equal(options.headers.authorization, 'Bearer IamthewatcheronthewallsIamtheshieldthatguardstherealmsofmen')
  };
  var hipchat = new HipChatNotify(561156, 'IamthewatcheronthewallsIamtheshieldthatguardstherealmsofmen');
  hipchat.info({
    message: 'Tyrion demads trial by combat!',
    notify: false
  });
});
