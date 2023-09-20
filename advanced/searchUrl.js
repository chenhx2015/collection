// 查询地址栏里面的某个参数
let url = 'https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33';
let result = new URLSearchParams(url).get('elective')
console.log('result', result); // 800, 700