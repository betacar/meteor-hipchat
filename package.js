Package.describe({
  name: 'betacar:hipchat-notify',
  version: '1.1.0',
  summary: 'HipChat notifications for Meteor apps',
  git: 'git://github.com/betacar/meteor-hipchat.git',
  documentation: 'README.md',
  license: 'LICENSE'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');
  api.use(['http'], 'server');

  api.addFiles(['hipchat-notify.js'], 'server');
  api.export('HipChatNotify', 'server');
});

Package.onTest(function(api) {
  api.use(['tinytest','betacar:hipchat-notify','http'], 'server');
  api.addFiles('hipchat-notify-tests.js', 'server');
});
