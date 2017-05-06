# 函数

**Reference**
> [1] JavaScript Guide: [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)  
> [2] JavaScript Reference: [Standard build-in objects / Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)  
> [3] JavaScript Reference: [Functions / Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)  
> [4] JavaScript Reference: [Functions / Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)  
>

## 定义函数

定义函数的方式有三种，一种称为声明式定义（Function declaration），一种为表达式式定义（Function
 expression），还有一种是通过`Function`构造器在运行时从字符串创建函数。

### 函数声明(Function declaration)

函数声明包含`function`关键字，然后紧跟着的是函数名，用`()`括起来的参数列表以及用`{}`括起来的函数体。
函数声明可以看做为一条语句。

例如：
```js
function square(number) {
    return number * number;
}
```
该例子中，函数名为`square`，并且接受一个参数`number`，函数体中包含一条`return`语句，
`return`语句之后表达式的值就是函数的返回值。

在函数进行参数传递时，原型数据类型（[Primitives](2-data-structures-and-types.md)）是按值传递的，
而如果是对象（非Primitives）为参数的话，则是按照引用传递（JavaScript中没有引用，
但是在这里借用C++的概念来说明问题，道理是一样的）。
下例中函数`foo`的参数`val`为`Number`（Primitives的一种），因此是按值传递，
则在函数体中改变了`val`的值并不会影响到实参`number`的值。而函数`bar`的参数`obj`为一个`Object`，
若在函数体中改变了`obj`的属性值，会影响到实参`me`的属性值。所以看到最后输出的结果`me.name`的值被修改了。

```js
// 值传递
function foo(val) {
    val++;
    return val;
}

var number = 10;
var number_result = foo(number);
console.log('number: ' + number + '; number_result ' + number_result);
// => number: 10; number_result 11

// 引用传递
function bar(obj) {
    obj.name = 'Dave';
    return obj.name;
}

var me = {name: 'David'};
console.log('me.name: ' + me.name);
// => me.name: David
var me_result = bar(me);
console.log('me.name: ' + me.name + '; me_result ' + me_result);
// => me.name: Dave; me_result Dave
```

### 函数表达式(Function expressions)

上一种定义方式可以将其视为一条语句，函数还可以通过函数表达式的方式进行定义，这种方式可以定义匿名函数。

看几个例子, 第一个函数相当于将一个匿名函数赋给变量`square`，从而变量成为可调用的：`square()`。
第二个函数定义时将`fac`函数赋给`factorial`，从而`fac()`和`factorial()`是等价的。
```js
var square = function (number) {
    return number * number;
};
var x = square(4); // x = 16

var factorial = function fac(n) {
    return n < 2 ? 1 : n * fac(n - 1);
};
```
在JavaScript中，还可以根据指定的条件来决定是否定义函数：
```js
var myFunc;
if (num === 0) {
    myFunc = function (theObject) {
        theObject.make = 'Toyota';
    }
}
```
上例中，只有在`num`等于`0`的时候才会定义函数`myFunc`，否则`myFunc`为`undefined`。

### 通过`Function`构造器创建函数

在JavaScript中，每一个函数其实是一个对象，我们可以通过`Function`构造器来构造一个新的函数对象。语句形式：
```js
new Function([arg1[, arg2[, ...argN]]], functionBody)
```
其中
- `arg1`, `arg2`, ... `argN`为将要创建的函数的形参列表名，为相应的字符串。
- `functionBody`为包含了JavaScript语句的字符串，其为将要创建的函数的函数体。

通过这种方式创建函数要比通过function expression或者function statement创建的效率要低。

例子：
```js
// 'a', 'b'为要创建函数的形参列表，对应adder(a, b)
// 'return a + b;'为函数体
var adder = new Function('a', 'b', 'return a + b;');

adder(2, 6);
```
#### `Function`构造与其余两种方式的区别

通过`Function`构造的函数不会创建闭包，这些函数都是在全局作用域下创建的，因此创建的函数只能访问
其自身的局部变量以及全局变量，与该函数的创建语句`new Function()`调用时所在的作用域**无关**。
```js
var x = 10;

function createFunction1() {
    var x = 20;
    return new Function('return x;'); //这里面的x指全局的x
}

function createFunction2() {
    var x = 20;
    function f() {
        return x;  //这里的x指局部变量x
    }
    return f;
}

var f1 = createFunction1();
console.log(f1()); // => 10
var f2 = createFunction2();
console.log(f2()); // => 20

function test() {
    var x = 30;
    var f3 = createFunction1();
    console.log(f3()); // => 10
}

test();
```
