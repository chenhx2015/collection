// n个骰子的点数 这个有点难度
// 把n个骰子扔在地上，所有骰子朝上一面的点数之和为s。
// 输入n，打印出s的所有可能的值出现的概率。

// 你需要用一个浮点数数组返回答案，其中第 i 个元素代表这 
// n 个骰子所能掷出的点数集合中第 i 小的那个的概率。

// 示例 1:
// 输入: 1
// 输出: [0.16667,0.16667,0.16667,0.16667,0.16667,0.16667]

// 示例 2:
// 输入: 2
// 输出: [
//   0.02778,0.05556,0.08333,0.11111,0.13889,0.16667,
//   0.13889,0.11111,0.08333,0.05556,0.02778
// ]

// 思路：
// 本题可以通过递归的形式进行解决，也可以采用动态规划
// 核心公式
// n个骰子的所有结果的总数=（这个骰子是1−6）+(n−1)个骰子
// 是（和−（1−6））的所有结果的和n个骰子的所有结果的总数 = （这个骰子是1 - 6） + (n-1)个骰子是（和-（1-6））的所有
// 结果的和n个骰子的所有结果的总数=（这个骰子是1−6）+(n−1)个骰子是（和−（1−6））的所有结果的和

var dicesProbability = function (n) {    
  // n个骰子的点数之和的范围是[n,6n]    
  // 返回的最终结果数组的分母是6的n次方    
  const total = Math.pow(6, n);    
  const result = [];    
  // 创建一个哈希表，用来存储第n个骰子前一个骰子 目标和 的总数    
  const m = new Map();    
  for (let i = n; i <= 6 * n; i++) {        
    // 下面的s指的是        
    const denominator = helper(i, n);        
    // 将每一个结果分别加到最终的结果中        
    result.push(denominator / total);    
  }    
  function helper(count, n) {        
    // 首先判断哈希表中是否有记录 n-1 个骰子目标和的总数        
    let key = `和：${count}-骰子数：${n}`;        
    if (m.has(key)) {            
      return m.get(key);        
    }        
    if (count < n || count > 6*n) {            
      return 0;        
    }        
    if (n === 1) {            
      return 1;        
    }        
    let res = 0;        
    // 递归求解：求目标骰子数指定和的可能值的数量，就是求目标骰子数-1，当前和减去1-6的所有的可能性 然后进行求和        
    for (let i = 1; i <= 6; i++) {            
      res = res + helper(count - i,n-1,m);        
    }        
    m.set(key,res);        
    return res;    
  }    
  return result;
};