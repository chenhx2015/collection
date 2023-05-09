// 考虑到性能问题，如何快速从一个巨大的数组中随机获取部分元素
// 这个就是洗牌算法
// 洗牌算法是将原来的数组进行打散，使原数组的某个数在打散后的数组中的每个位置上等概率的出现。
/* 洗牌算法：
    1.生成一个0 - arr.length 的随机数
    2.交换该随机数位置元素和数组的最后一个元素，并把该随机位置的元素放入结果数组
    3.生成一个0 - arr.length - 1 的随机数
    4.交换该随机数位置元素和数组的倒数第二个元素，并把该随机位置的元素放入结果数组
    依次类推，直至取完所需的10k个元素
*/

function shuffle(arr, size) {
  let result = [];
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * (arr.length - i));
    const item = arr[randomIndex];
    result.push(item);
    // 开始交换位置
    arr[randomIndex] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = item;
  }
  return result;
}

// 1、抽牌法，随机从原数组抽取一个数到新数组中，原数组则删除抽中的数。
function shuffle_pick(arr){
  var len = arr.length;
  var arr2 = new Array();
  for(var i=len; i>0; i--){
    var rand = Math.floor(Math.random()*i);
    arr2.push(arr[rand]);
    arr.splice(rand,1);
  }
  return arr2;
}

// 2、 上一种方法的优化，不删除原数组的数，而是将最后一张未抽取的数放到被抽中的那个空位置。
function shuffle_pick2(arr){
  var len = arr.length;
  var arr2 = new Array();
  for(var i=len; i>0; ){
    var rand = Math.floor(Math.random() * i);
    arr2.push(arr[rand]);
    arr[rand] = arr[--i];
  }
  return arr2;
}

// 3、换牌法，将第i张与随机位置进行交换，换完一轮即可。
function shuffle_swap(arr){
  var len = arr.length;
  for(var i=0; i<len; i++){
    var rand = Math.floor(Math.random() * (i+1));
    [arr[i],arr[rand]] = [arr[rand],arr[i]];
  }
  return arr;
}


