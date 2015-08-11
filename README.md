# hipchat-notify
> Room owners are able to create room notification tokens that can be used to send room notification messages, popular with light-weight, notification-only integrations.

This is a meteor package HipChat room notification API (v2). It's has `http` package as dependencie. Heavely inspired by [hipchat-notify.js module](https://github.com/flesch/hipchat-notify.js) node lib.

It goes really well with the [collection hooks package](https://atmospherejs.com/matb33/collection-hooks).

## Installation
```shell
$ meteor add betacar:hipchat-notify
```

### Configuration

If you are using the hosted version of HipChat at hipchat.custom.com and need a custom hostname:

```shell
export HIPCHAT_HOST=https://hipchat.custom.com
```

```javascript
#In JS
var hipchat = new HipChatNotify(561156, 'abcdefghijklmnñopqrstuvwxyz');
```

You can also set the room name or ID and the auth token using ENV variables:
```shell
export HIPCHAT_ROOM=12345
export HIPCHAT_TOKEN=abcdefghijklmnñopqrstuvwxyz
```

```javascript
#In JS
var hipchat = new HipChatNotify();
```

## Usage
The package exports `HipChatNotify` as global variable in the server. It requires a room name or ID and an [auth token](https://www.hipchat.com/account/api). For example,

```javascript
var hipchat = new HipChatNotify(561156, 'abcdefghijklmnñopqrstuvwxyz');
```

By default, all API requests are synchronous. But you can also pass a callback to notification methods.

### Notification methods
[HipChat's room notification API](https://www.hipchat.com/docs/apiv2/method/send_room_notification) allows 6 different notification colors: yellow, green, red, purple, gray, and random.

The library has methods for 5 of them, for each context.

Every method accepts a message parameter. This can be either a string (which would send a plain text notification) or a HTML string.

#### info
It sends a gray notification.

```javascript
var hipchat = new HipChatNotify(561156, 'abcdefghijklmnñopqrstuvwxyz');
hipchat.info('Jamie Lannister arrieved to King's Landing');
```

#### warning
It sends a yellow notification.

```javascript
var hipchat = new HipChatNotify(561156, 'abcdefghijklmnñopqrstuvwxyz');
hipchat.warning('King Robert is drunk');
```

#### success
It sends a green notification.

```javascript
var hipchat = new HipChatNotify(561156, 'abcdefghijklmnñopqrstuvwxyz');
hipchat.success('Arya killed the Hound');
```

#### error
It sends a red notification.

```javascript
var hipchat = new HipChatNotify(561156, 'abcdefghijklmnñopqrstuvwxyz');
hipchat.error('A masacre occured during a wedding');
```

#### misc
It sends a purple notification.

```javascript
var hipchat = new HipChatNotify(561156, 'abcdefghijklmnñopqrstuvwxyz');
hipchat.misc('Hodor said "Hodor"');
```
