Package.describe({
  name: 'betacar:hipchat-notify',
  version: '1.0.3',
  summary: 'Wrapper for hipchat-notify.js@1.0.3',
  git: 'git://github.com/betacar/meteor-hipchat.git',
  documentation: 'README.md',
  license: 'LICENSE'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.0');
  api.addFiles('hipchat-notify.js/index.js', 'server');
  api.export('HipChatNotify', 'server');
});
