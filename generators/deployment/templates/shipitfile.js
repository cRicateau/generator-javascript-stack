module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/<%= appName %>',
      deployTo: '~/<%= appName %>',
      repositoryUrl: '<%= repositoryUrl %>',
      ignores: ['.git', 'tests', '.gitignore', 'devops'],
      rsync: ['--del'],
      keepReleases: 3,
      key: '~/.ssh/id_rsa',
      shallowClone: true,
    },
    staging: {
      branch: 'staging',
      servers: 'www-data@<%= stagingUrl %>',
    },
    prod: {
      branch: 'master',
      servers: 'www-data@<%= prodUrl %>',
    },
  });

  shipit.task('deploy:finish', () => {
    return shipit.remote('cd ~/<%= appName %>/current & pm2 kill && NODE_ENV=production ./node_modules/.bin/pm2 startOrRestart pm2.yml');
  });
};
