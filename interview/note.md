1. AMD, CMD, UMD的区别？
  CommonJS 加载模块是同步的，所以只有加载完成才能执行后面的操作。像Node.js主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以CommonJS规范比较适用。但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式。所以就有了 AMD CMD 解决方案。

  AMD - 异步模块定义
  ```js
    require(['math'], function(math) {
    　math.add(2, 3);
    });
  ```

  AMD 和 requireJS

  CMD和SeaJS
  对于依赖的模块AMD是提前执行，CMD是延迟执行
  CMD推崇依赖就近，AMD推崇依赖前置

  ```js
    //AMD
    define(['./a','./b'], function (a, b) {
    
        //依赖一开始就写好
        a.test();
        b.test();
    });
    
    //CMD
    define(function (requie, exports, module) {
        
        //依赖可以就近书写
        var a = require('./a');
        a.test();
        
        ...
        //软依赖
        if (status) {
        
            var b = requie('./b');
            b.test();
        }
    });
  ```

  UMD是AMD和CommonJS的糅合
  UMD先判断是否支持Node.js的模块（exports）是否存在，存在则使用Nod

2. Commonjs 和 ES6 Module的区别?
  CommonJS是服务器端模块的规范，Node.js采用了这个规范。

  根据CommonJS规范，一个单独的文件就是一个模块。加载模块使用require方法，该方法读取一个文件并执行，最后返回文件内部的exports对象。
