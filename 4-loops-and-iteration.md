# 循环与迭代

**Reference**
> [1] JavaScript Guide: [Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)

循环语句使得我们可以很方便地重复执行一段代码一定次数。JavaScript提供了非常多的循环机制，
不同的循环机制提供了进入或退出循环的不同的方式，不同的循环机制往往在某些场景下用起来比
其他方式更加高效。

JavaScript中与循环有关的语句有：
- `for`语句
- `do...while`语句
- `while`语句
- 标签语句(labeled statement)
- `break`语句
- `continue`语句
- `for...in`语句
- `for...of`语句

## `for`语句

JavaScript中的`for`语句与Java以及C/C++的`for`语句非常类似。如下所示是`for`语句的语法：
```js
for ([initialExpression]; [condition]; [incrementExpression]) {
    statements;
}
```
其中方括号表面语句可以缺省。`for`语句退出的条件是`condition`判定为`false`时退出，否则
一直循环执行`for`语句体中的`statements`。以下是一个简单的例子：
```js
for (let i = 0; i < 3; i++) {
    console.log(i);
}
/* 输出
0
1
2
*/
```
执行`for`语句时，首先会初始化变量`i`，然后执行语句体`console.log(i)`，因此首次执行时
输出的值为`0`，然后会执行`incrementExpression`，`i`自增，其值变为`1`，然后进行判定`i`
是否小于`3`，若小于`3`，则继续执行语句体中的语句，若不小于`3`，则循环退出。

## `do...while`语句

`do...while`语句会一直循环，直到特定的条件语句判定为`false`。`do...while`语句如下所示：
```js
do {
    statements;
} while (condition);
```
进入`do...while`循环时，先执行`statements`，然后进行`condition`判定，若判定为`true`，
则继续执行`statements`，若为`false`，则跳出循环，接着执行`do...while`语句之后的语句。
以下是一个例子：
```js
var i = 0;
do {
    i++;
    console.log(i);
} while (i < 3);
/*输出
1
2
3
*/
```
