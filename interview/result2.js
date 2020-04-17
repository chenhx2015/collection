// 打印结果
function changeObjProperty(a) {
  a.siteUrl = "http://www.baidu.com";
  a = new Object();
  a.siteUrl = "http://www.google.com";
}
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl); // http://www.baidu.com
