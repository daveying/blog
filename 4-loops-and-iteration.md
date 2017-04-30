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

## `while`语句

只要其`condition`语句被判定为`true`，`while`语句会一直对其语句块中的语句循环执行，直到`condition`被判定为`false`，
然后再接着执行`while`语句之后的语句。`while`循环如下所示：
```js
while (condition) {
    statements;
}
```
以一个例子说明：
```js
var n = 0;
var x = 0;
while (n < 3) {
    n++;
    x += n;
}
console.log(x);
/*输出 (x = 1 + 2 + 3)
6
*/
```
使用循环的时候，要注意防止出现死循环，也就是`condition`会一直判定为`true`，循环永远也不能执行完毕。

## Labeled statement

`label`可以使得我们为一条语句设置一个名称，从而可以在程序的其他地方来引用被label的语句。比如你可以用`label`
来标示一个循环语句，然后与`break`语句或者`continue`语句配合来实现对特定循环的中断或者继续执行。`labe`语句的形式
如下：
```js
label:
    statement
```
`label`可以是任何符合JavaScript命名规则的标识符(保留字除外)。你可以用`label`标识任何语句。例如：
```js
markLoop:
while (theMark == true) {
    doSomething();
}
```

## `break`语句

`break`语句可以用来中断一个循环的执行、或者`switch`语句的执行。在JavaScript中，其还可以与`label`语句配合使用。
- 当`break`不与`label`进行配合，`break`将中断包含其自身的最里层的循环或`switch`，然后执行紧接着循环或`switch`的语句。
- 当与`label`配合使用，`break`将中断被`label`标识的语句。

`break`语句的格式如下：
```js
break [label];
```
例如：
```js
for (let i = 0; i < a.length; i++) {
    if (a[i] == theValue) {
        break; //break一旦执行，将中断该for语句的执行
    }
}
```
又例如：
```js
var x = 0;
var z = 0;
labelCancelLoops: while (true) {
    console.log('Outer loops: ' + x);
    x += 1;
    z = 1;
    while (true) {
        console.log('Inner loops: ' + z);
        z += 1;
        if (z === 10 && x === 10) {
            break labelCancelLoops;  //如果此语句执行，将直接中断最外层while循环
        } else if (z === 10) {
            break; //如果此语句执行，将中断内层whil循环
        }
    }
}
```

## `continue`语句










