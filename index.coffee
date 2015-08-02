module.exports = (hexo) ->
  gzipme = require 'gzipme'
  walk = require 'walk'
  chalk = require 'chalk'

  hexo.extend.console.register 'gzip', (args, callback) ->
    log = this.log
    files = []

    fileHandler = (root, stat, next) ->
      if stat.name.match /\.(ico|html|js|css|json|xml|ttf|eot|ott|woff|svg)$/
        files.push "#{root}/#{stat.name}"
      next()

    endHandler = ->
      start = new Date
      for file in files
        log.info "[#{chalk.cyan('GZIP')}] Compressing: #{chalk.magenta(file)}"
        gzipme file, true, 'best'
      end = new Date
      log.info "[#{chalk.cyan('GZIP')}] Compressing finished after #{chalk.cyan(end - start)} ms"

    log.info "[#{chalk.cyan('GZIP')}] Compressing files..."
    walker = walk.walk 'public', followLinks: false
    walker.on 'file', fileHandler
    walker.on 'end', endHandler
