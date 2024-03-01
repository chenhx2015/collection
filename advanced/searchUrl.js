// 查询地址栏里面的某个参数
let url = 'https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33';
let result = new URLSearchParams(url).get('elective')
console.log('result', result); // 800, 700

// 扩展问题：
// 如果地址栏里面的参数过长 会有什么问题？
// 如何携带参数分享给别人在别的页面打开使用？
