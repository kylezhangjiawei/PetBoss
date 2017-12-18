// export default (object,key) =>{
//   return Object.keys(object).sort().map(item => `${item}=${object[item]}`).concat(`key=${key}`).join('&')
// }
//排序a-z，返回新对象
export  default  function objKeySort(obj) {
  var newkey = Object.keys(obj).sort();
  var newObj = {};
  for (var i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = obj[newkey[i]];
  }
  return newObj;
}
