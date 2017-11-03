const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
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
    const gzFile = `${file}.gz`;
    const gzip = zlib.createGzip({
      level: zlib.Z_BEST_COMPRESSION,
      memLevel: zlib.Z_BEST_COMPRESSION
    });

    log.info(`[${chalk.cyan('GZIP')}] Compressing: ${chalk.magenta(file)}`);

    const input = fs.createReadStream(path.resolve(file));
    const output = fs.createWriteStream(path.resolve(gzFile));
    input.pipe(gzip).pipe(output);

    output
      .on('error', () => {
        throw new Error(`Error gzipping file "${filePath}"`);
      })
      .on('close', () => {
        fs.unlinkSync(file);
        fs.renameSync(gzFile, file)
      });
    next();
  });

  walker.on('end', () => {
    const end = new Date();
    log.info(`[${chalk.cyan('GZIP')}] Compressing finished after ${chalk.cyan(end - start)} ms`);
  });
}
