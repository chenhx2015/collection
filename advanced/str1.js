// 字符串大小写转换
// 例如 ’AbC' 变成 'aBc' 

function strVerse(str) {
  return str.replace(/[a-zA-Z]/g, (a) => {
    // 注意正则表达式怎么写
    return /[a-z]/.test(a) ? a.toUpperCase() : a.toLowerCase();
  })
}
console.log('strVerse', strVerse('AbcdEFG')) // aBCDefg
