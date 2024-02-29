// 二叉查找树（也叫二叉搜索树 binary sort tree / 二叉排序树） 
// 树：由于其存储的所有元素之间具有明显的层次特性，因此常被用来存储具有层级关系的数据，比如文件系统中的文件；也会被用来存储有序列表等
// 二叉树常被用作二叉查找树和二叉堆或是二叉排序树（BST）

// 判断一个数组，是否为某二叉查找树的前序遍历结果，二叉查找树特点是所有的左节点比父节点的值小，所有的右节点比父节点的值大
// 所有左子树和右子树自身必须也是二叉搜索树
// 输入： [5, 3, 2, 1, 4, 6, 7, 8, 9]
// 输出： true

// function preOrderOfBST() {
  
// }

// 1.以下是二叉查找树的实现

let BinaryTree = function() {
  // 1.节点定义 Node 对象既保存了数据，也保存了它的左节点和右节点的链接
  let Node = function(key) {
    this.key = key; // 节点值
    this.left = null; // 左节点
    this.right = null; // 右节点
  };

  let rootNode = null; // 根节点

  // 2.二叉查找树（BST）的实现
  // 因为添加节点会涉及到插入位置的问题，必须将其放到正确的位置上，才能保证树的正确性，整个过程较为复杂，我们一起来梳理一下：
  // 首先要添加新的节点，首先需要创建一个Node对象，将数据传入该对象。

  // 其次要检查当前的BST树是否有根节点，如果没有，那么表示是一棵新数，该节点就为该树的根节点，那么插入这个过程就结束了；否则，就要继续进行下一步了。

  // 如果待插入节点不是根节点，那么就必须对BST进行遍历，找到合适的位置。该过程类似遍历链表，用一个变量存储当前节点，一层一层遍历BST，

  // 算法如下
  // 1.设置当前节点为根节点
  // 2.如果待插入节点保存的数据小于当前节点，则新节点为原节点的左节点，反之，执行第4步
  // 3.如果当前节点的左节点为null，就将新节点放到这个位置，退出循环；反之，继续执行下一次循环
  // 4.设置新节点为原节点的右节点
  // 5.如果当前节点的右节点为null，就将新节点放到这个位置，退出循环；反之，继续执行下一次循环

  // 这样，就能保证每次添加的新节点能够放到正确的位置上，具体实现如下；
  // 插入新节点

  let insertNode = function(node, newNode) {
    if(newNode.key < node.key) {
      if(node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if(node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  }
  // insert：向树中添加新节点
  this.insert = function(key) {
    let newNode = new Node(key);
    if(rootNode === null) {
      rootNode = newNode;
    } else {
      insertNode(rootNode, newNode);
    }
  }
  // 2. 二叉树的遍历
  // 中序遍历
  let inOrderTraverseNode = function(node, callback) {
    if(node !== null) {
      inOrderTraverseNode(node.left, callback);
      callback(node.key);
      inOrderTraverseNode(node.right, callback);
    }
  }
  this.inOrderTraverse = function(callback) {
    inOrderTraverseNode(rootNode, callback);
  }
  // 前序遍历
  let preOrderTraverseNode = function(node, callback) {
    if(node !== null) {
      callback(node.key);
      preOrderTraverseNode(node.left, callback);
      preOrderTraverseNode(node.right, callback);
    }
  }
  this.preOrderTraverse = function(callback) {
    preOrderTraverseNode(rootNode, callback);
  }
  // 后序遍历
  let nextOrderTraverseNode = function(node, callback) {
    if(node !== null) {
      nextOrderTraverseNode(node.left, callback);
      nextOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }
  this.nextOrderTraverse = function(callback) {
    nextOrderTraverseNode(rootNode, callback);
  }

  // 3. 二叉查找树的查找运算 一般查找最大值，最小值, 给定值
  // 最小值
  let minNode = function(node) {
    if(node) {
      while(node && node.left !== null) {
        node = node.left;
      }
      return node.key;
    }
    return null;
  }
  this.min = function() {
    return minNode(rootNode);
  }
  // 最大值
  let maxNode = function(node) {
    if(node) {
      while(node && node.right !== null) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  }
  this.max = function() {
    return maxNode(rootNode);
  }
  // 查找某个值
  let searchNode = function(num, node) {
    if(node === null) {
      return false;
    }
    if(node.key < num) {
      return searchNode(num, node.right);
    } else if(node.key > num) {
      return searchNode(num, node.left);
    } else {
      return true;
    }
  }
  this.search = function(num) {
    return searchNode(num, rootNode);
  }
}

// 测试一下
let nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13];
let binaryTree = new BinaryTree();
nodes.forEach(key => binaryTree.insert(key));

let cb = function(key) {
}
// 测试中序遍历
binaryTree.inOrderTraverse(cb); // 1, 3, 4, 6, 7, 8, 10, 13, 14
// 测试前序遍历
binaryTree.preOrderTraverse(cb); // 8, 3, 1, 6, 4, 7, 10, 14, 13
// 测试后序遍历
binaryTree.nextOrderTraverse(cb); // 1, 4, 7, 6, 3, 13, 14, 10, 8

// 查找最小值
console.log('查找最小值', binaryTree.min()); // 1
// 查找最大值
console.log('查找最大值', binaryTree.max()); // 14
// 查找某个值
let num = 7;
console.log('查找某个值', binaryTree.search(num)); // true
