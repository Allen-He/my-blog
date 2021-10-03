/** 当object的属性为字符串时，去掉其首尾空格 */
exports.trimStrOfObj = function (obj) {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if(typeof obj[key] === 'string') {
        obj[key] = obj[key].trim();
      }
    }
  }
}
