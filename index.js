const gzipme = require('gzipme');
const walk = require('walk');
const chalk = require('chalk');

hexo.extend.console.register('gzip', gzipFn);

function gzipFn (args, callback) {
    const log = this.log;
    const files = [];
    const start = new Date();

    log.info(`[${chalk.cyan('GZIP')}] Compressing files...`);
    const walker = walk.walk('public', { followLinks: false });

    walker.on('file', (root, stat, next) => {
      const file = `${root}/${stat.name}`;
      log.info(`[${chalk.cyan('GZIP')}] Compressing: ${chalk.magenta(file)}`);
      gzipme(file, true, 'best');
      next();
    });

    walker.on('end', () => {
      const end = new Date();
      log.info(`[${chalk.cyan('GZIP')}] Compressing finished after ${chalk.cyan(end - start)} ms`);
    });
}
