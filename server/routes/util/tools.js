/**
 * 判读请求是否正常从浏览器发出
 * @param {*} req request对象
 * @returns 
 */
exports.isBrowser = (req) => {
    return req.headers['user-agent'].indexOf('Mozilla/5.0') === 0;
}
