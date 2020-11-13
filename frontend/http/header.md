### http 请求头里面几个 content 相关的内容

#### 这几个都是实体首部字段
1.Content-type: 表示具体请求中的媒体类型信息（都是表单数据发送时的编码类型）
  数据发送出去后，需要接收的服务端解析成功，一般服务端会根据content-type字段来获取参数是怎么编码的，然后对应去解码。
  最常见的四种取值：(也是四种常见的 POST 提交数据方式 🌿)
  🙋 application/x-www-form-urlencoded:
  浏览器 Headers 对应 Form Data，键值对：key-value
  最常见 POST 提交数据的方式。浏览器的原生 form 表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。
  ```js
    POST http://192.168.2.12/index HTTP/1.1 
    Content-Type: application/x-www-form-urlencoded;charset=utf-8 
    title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3 
  ```
  首先，Cntent-Type 被指定为application/x-www-form-urlencoded。其次，提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。大部分服务端语言都对这种方式有很好的支持。

  🙋 multipart/form-data:
  这是另一种非常常见的 POST 数据提交的方式。我们在使用表单上传文件时，必须让 form 的 enctyped 等于这个值
  boundary 用于分割不同的字段

  🙋 application/json:
     浏览器 Headers 对应 Request Payload

  🙋 text/xml:

  ✅ axios 默认使用的是 application/json 格式

2.Content-Encoding: web服务器支持的返回内容压缩编码类型
  Accept-Encoding 和 Content-Encoding 是 HTTP 中用来对采用哪种编码格式传输正文进行协定的一对头部字段。
  工作原理：
  首先浏览器（也就是客户端）发送请求时，通过 Accept-Encoding 带上自己支持的内容编码格式列表
  服务端在接收到请求后，从中挑选出一种用来对响应信息进行编码，并通过 Content-Encoding 来说明服务端选定的编码信息
  浏览器在拿到响应正文后，依据 Content-Encoding 进行解压
  （服务端也可以返回未压缩的正文，但这种情况不允许返回 Content-Encoding ）
  目的：压缩内容大小。
  压缩过的文本，只有原始大小的 1/4
  但是JPG/PNG这类本身已经高度压缩过的二进制文件，不推介开启内容压缩，效果几乎微乎其微，还浪费cpu
  联想到 http/2 头部压缩...

  几种取值：
  🙋：gzip (是指 GZIP 格式)
  🙋：deflate （是指 ZLIB 格式）
  🙋：compress
  🙋：identity （未经过压缩的修改）
  🙋：br （表示采用 Brotli 算法的编码方式）

3.Content-Language: 响应体的语言（实体消息首部）
  用来说明访问者希望采用的语言或语言组合，这样的话用户就可以根据自己偏好的语言来定制不同的内容
  Content-Language: en,zh
  🌿：不要使用这个meta元素去声明文档语言
  ```js
    <meta http-equiv="content-language" content="de">
  ```

4.Content-Length: 10905
  Content-Length 是一个实体消息首部，用来指明发送给接收方的消息主体的大小
  消息的长度，用十进制数字表示的八位字节的数目

5.Content-Range: 在整个返回体中本部分的字节位置
  区别：
  Content-Range：响应首部
  range: 请求首部，告知服务器返回文件的哪一部分
  在一个  Range 首部中，可以一次性请求多个部分，服务器会以 multipart 文件的形式将其返回
  如果服务器返回的是范围响应，需要使用 206 Partial Content 状态码
  假如所请求的范围不合法，那么服务器会返回  416 Range Not Satisfiable 状态码，表示客户端错误
  服务器允许忽略  Range  首部，从而返回整个文件，状态码用 200 

6.Content-MD5: 返回资源的 MD5 校验值
  https://www.ituring.com.cn/article/74167
  目的：检查报文在传输过程中是否保持完整，以及确认传输到达。
  值：对报文主体执行 MD5 算法获得的128位二进制数，再用 base64 编码（因为HTTP首部不能记录二进制，但是HTTP/2可以）

7.Content-Location: 请求资源可替代的备用的另一地址
  区别：
  Location 表明重定向的目标（302）
  而 Content-Location 表明无需进行进一步的内容协商就可以直接访问的资源的URL （是内容协商后的结果）

### 请求首部字段
(host, Accept...)
Accept: application/json

1.Accept-Charset：用来告知（服务器）客户端可以处理的字符集类型
  并使用Content-Type 应答头通知客户端它的选择，如：
  ```js
    <head>
      <meta http-equiv="Content-Type" content="text/html;charset=utf-8"> 
      <meta http-equiv="Content-Language" content="zh-CN">
    </head>
  ```
  区别：
  Content-Language：表示当前页面的语言
  charset：表示编码字符集
2.Accept-Encoding: gzip, deflate, br
3.Accept-Language: en,zh;q=0.9,zh-CN;q=0.8



