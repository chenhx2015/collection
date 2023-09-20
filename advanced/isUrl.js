// 判断是否是一个合法的 url
function isUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    
  }
  return false
}