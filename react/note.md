### react hook 注意点：
#### useState:
  - 1. 本身是异步执行
  - 2. 如果在 function 内直接调用，而不是在事件处理函数里面调用，则会由于该组件被刷新重复调用而不断执行，陷入死循环
  - 3. 不要在条件判断里面调用,eg: const [count, setCount] = useState(0); 不能在 if 里面声明
  - 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用 -- 所有的 hook 都是

#### useEffect:
  - 1. 本身是异步执行

#### 总结区别：
- 1. useEffect: 把函数定义好，什么时候执行，由react选择相应的声明周期执行（一般是componentDidMount,,等三个）
- 2. useCallback: 把函数定义好，运行时不要替我执行，我会主动调用
- 3. useMemo: 把函数定义好，告诉运行时立刻替我执行，并把返回值给我，什么时候用这个值，由我决定