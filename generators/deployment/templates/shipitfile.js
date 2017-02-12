module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/<%= appName %>',
      deployTo: '~/<%= appName %>',
      repositoryUrl: '<%= repositoryUrl %>',
      ignores: ['.git', 'node_modules', 'client/node_modules', 'tests', '.gitignore', 'devops'],
      rsync: ['--del'],
      keepReleases: 2,
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
    switch(shipit.config.branch) {
      case 'master':
        return shipit.remote('cd ~/<%= appName %>/current && NODE_ENV=production npm start');
      default:
        return shipit.remote('cd ~/<%= appName %>/current && npm start');
    }
  });
};
