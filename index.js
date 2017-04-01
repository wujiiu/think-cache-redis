/*
* @Author: lushijie
* @Date:   2017-03-16 09:23:41
* @Last Modified by:   lushijie
* @Last Modified time: 2017-04-01 17:36:31
*/
const helper = require('think-helper');
const Redis = require('think-redis');

const defaultOptions = {
  port: 6379,
  host: '127.0.0.1',
  password: '',
  timeout: 24 * 3600 * 1000,
};

/**
 * redis cache adapter
 */
class RedisCache {

  constructor(options = {}) {
    options = helper.extend({}, defaultOptions, options);
    this.redis = new Redis(options);
    this.timeout = options.timeout;
  }

  /**
   * get cache content by the cache key
   * @param  {String} key [description]
   * @return {Promise}      [description]
   */
  get(key) {
    return  this.redis.get(key).catch(() => {});
  }

  /**
   * get cache key's content
   * @param {String} key     [description]
   * @param {String} content [description]
   * @param {Number} timeout [millisecond]
   * @return {Promise}      [description]
   */
  set(key, content, timeout = this.timeout) {
    return  this.redis.set(key, content, timeout).catch(() => {});
  }

  /**
   * delete cache key
   * @param  {String} key [description]
   * @return {Promise}     [description]
   */
  delete(key) {
    return this.redis.delete(key).catch(() => {});
  }

}

module.exports = RedisCache;
