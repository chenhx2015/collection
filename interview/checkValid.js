// 检查括号是否有效
// 给定一个仅包含字符 '(', ')', '{', '}', '[' 和 ']' 的字符串 s，确定输入字符串是否有效。
// 输入字符串在以下情况下有效：
// 1.括号必须用相同类型的括号闭合
// 2.括号必须以正确的顺序闭合

// 分析： 对于这类问题，我们一般更喜欢使用栈数据结构。为什么可以用堆栈来完成？
// 根据栈的后进先出原则，数据的入栈和出栈顺序是对称的。比如1、2、3、4、5、6依次入栈，对应的出栈顺序为6、5、4、3、2、1

// 我们的想法是：遍历整个字符串：
// 如果找到左括号，则将其添加到堆栈中。
// 如果找到右括号，则弹出堆栈顶部的一个元素，并确定当前的右括号是否匹配它。

// 方法一：
  const leftToRight = {
    "{": "}",
    "[": "]",
    "(": ")"
  }
  const checkIsValid = function(s) {
    if (!s) {
      return true;
    }
  
    // array can be used as a stack
    const stack = [];
  
    const len = s.length;
    console.log('len', len);
  
    for (let i = 0; i < len; i++) {
      // cache
      const ch = s[i];
      console.log('ch', ch)
  
      if (ch === "(" || ch === "{" || ch === "[") {
        stack.push(leftToRight[ch]);
      }
      else {
        // If the stack is not empty and the 
        // openning parenthesis at the top of the stack does not
        // match the current character, it is invalid.
        if (!stack.length || stack.pop() !== ch) {
          return false;
        }
      }
    }
    // If all parentheses can be matched successfully, 
    // then the final stack should be empty
    return !stack.length;
  };

  var checkIsValid0 = function(s){
    //结合题意,空字符串无条件判断为true
    if(!s)return true
    //初始化数组stack
    let stack = []
    //缓存字符串长度
    const len = s.length
    //遍历字符串
    for(let i=0;i<len;i++){
      //缓存单个字符
      const ch = s[i]
      //判断是否是左括号
      if(ch==="("||ch==="["||ch==="{"){
        stack.push(leftToRight[ch])
      }else{
        //若栈不为空，且栈顶的左括号没有和当前字符匹配上，那么判为无效
        if(!stack.length||stack.pop()!==ch){
          return false
        }
      }
    }
    //若所有的括号都能配对成功，那么最后栈应该是空的
    return !stack.length
  }

  console.log(checkIsValid("{[()]}"));

  // 方法二：
  var isValid = function (s) {
    if (s.length % 2) {
        return false;
    }
    let arr = []
    let obj = {
        '(': ')',
        '{': '}',
        '[': ']'
    }
    for(let i=0; i<s.length; i++) {
        if(s[i] in obj) {
            arr.push(s[i]);
        }else {
            let ele = arr.pop();
            if(obj[ele] !== s[i]) {
                return false;
            }
        }
    }
    if(arr.length === 0) {
        return true;
    }
    return false;
  };
