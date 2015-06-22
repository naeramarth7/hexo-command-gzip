# hexo-command-gzip

This plugin provides a console command (`hexo gzip`) to precompress all files generated in the `public/` directory.

All files will acutally be overwritten with their compressed version and do not need to be compressed on the server anymore. This comes in handy when hosting your hexo site on Amazon S3 which does not compress on the fly, nor does it use a precompressed version you provide in addition.

## Usage

```
hexo generate
hexo gzip
```
