var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  getBackend() {
    return this.spawnCommandSync('npm', ['install', '-g', 'loopback-cli'])
  }
};
