# JavaScript基础

**Reference**
> [1] JavaScript Guide: [Grammar and types](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Grammar_and_types)

## 三种声明

- `var`声明一个变量，可以选择将其初始化为一个值
- `let`声明一个块作用域的局部变量(block scope local variable)，可选择将其初始化为一个值
- `const`声明一个只读常亮

## 变量声明的三种方式

- 使用关键词`var`。例如`var x = 3;`，这个语法可以声明局部变量或者全局变量
- 直接赋值。例如`x = 4;`，这样会声明一个全局变量，但是在`use strict`模式下会产生一个`ReferenceError`。不推荐使用。
- 使用关键词`let`。例如`let y = 23;`。这个语法可以用来声明块作用域的局部变量。

## 变量求值

用`var`或`let`声明的但是未赋值的变量，其值会被设定为`undefined`。但是`var`和`let`关键词有一点点区别：

```javascript
console.log(x);
var x; //代码输出undefined
```
而
```javascript
console.log(y); //出现ReferenceError: y is not defined
let y; 
```
在ECMAScript2015中`let/const`不会被声明提升（hoisting）

`undefined`的值在逻辑判断上下文中会被当做`false`。例如可以这么用
```js
var myArray = [];

if (!myArray[1]) {
    myFunction();
}
```
而在数值计算上下文中会被当做`NaN`。例如
```js
var a;
a + a; //会得到NaN
```
当然在赋值的时候，你可以将变量初始化为`null`，`null`在逻辑判断上下文中被作为`false`，而在数值计算上下文
中被当做0。例如
```js
var n = null;
console.log(n + 32); //会输出32
```

## 变量作用域

当你在函数外面定义变量时，该变量称为全局变量，因为这个变量可以在当前文档中的任意地方对其进行访问。
当你在某个函数内部定义一个变量，这个变量被称为局部变量，因为这个变量只能在该函数中进行访问。

在ECMAScrip2015之前还没有块作用域，因此在一个语句块中声明的变量要么是全局变量，要么是局部变量，这取决于
代码块处于函数外部还是函数内部。如下面例子所示：

```js
if (true) {
    var x = 5;
}
console.log(x); //输出5
```
而如果在代码块中使用`let`声明变量，则变量属于块作用域，如下例所示：
```js
if (true) {
    let y = 5;
}
console.log(y); //ReferenceError: y is not defined
```
## 变量提升(Variable hoisting)

JavaScript允许你先使用变量，后声明变量，如下所示：
```js
console.log(x === undefined); //输出true
var x = 3;
```
之所以以上代码没有抛出`ReferenceError: x is not defined`，而是输出`true`，那是因为JavaScript将变量x的
声明提示到了代码最顶端，但是要注意的是，JavaScript不会提升赋值，因此在执行`console.log(x === undefined)`时，
x是没有被赋值的，因此才会输出`true`。综上，以上代码等价于：
```js
var x;
console.log(x === undefined);
x = 3;
```
由于这个原因，在写JavaScript代码时，尽量让变量的声明放置在代码的顶端（或者是函数体顶端），这样有利于
代码的可读性。

对于`let/const`，他们不会被提升。

## 函数提升(Function hoisting)

对于函数，只会提升函数声明(function declaration)，而不会提升函数表达式(function expression)。如下面例子：
```js
/*function declaration*/

foo(); //输出"foo

function foo() {
    console.log("foo");
}

/*function expression*/

baz(); //TypeError: baz is not a function

var baz = function () {
    console.log('baz');
}
```
对于函数声明，其会整个提升，因此在函数声明之前调用函数是可行的。但是对于第二种情况，其等价于如下代码：
```js
var baz; // baz目前还是undefined
baz();   //对undefined进行函数调用，当然会出现TypeError

baz = function () {
    console.log('baz');
}
```
由于变量提升值提升声明而不提示赋值，因此`baz`在进行函数调用的时候，其值为`undefined`，因此出现`TypeError`。

## 全局变量

全局变量其实global object的一个property。在浏览器端，全局对象（global object）是`window`，所以你可以通过
`window.variable`的形式访问全局变量。

> Consequently, you can access global variables declared in one window or frame from another window or 
> frame by specifying the window or frame name. For example, if a variable called phoneNumber is 
> declared in a document, you can refer to this variable from an iframe as parent.phoneNumber.
>
> -- From reference [1]

## 常量

常量不能重新被定义，也不能修改其值，并且在声明的时候必须赋值。const的作用域定义规则与`let`一致，在
语句块中定义的const常量是不能在代码块外访问的。

不能将变量重新定义为常量，也不能将常量重新定义为变量。也不能将一个函数名重新定义为const

```js
//case 1: var --> const
var a = 1;
const a = 5;     //出错SyntaxError: Identifier 'a' has already been declared

//case 2: const --> var
const b = 2;
var b = 3;       //出错SyntaxError: Identifier 'b' has already been declared

//case 3: var --> var
var c = 1;
var c = 2;       //OK

//case 4: const --> const
const d = 3.2;
const d = 3.2;   //出错SyntaxError: Identifier 'd' has already been declared

//case 5: function --> const
function f() {}
const f = 5;     //出错SyntaxError: Identifier 'f' has already been declared

//case 5: function --> var
function f() {}
var f = 3;       //OK
```
但是当常量为一个对象时：
```js
const MY_OBJECT = {'Key': 'Value'};
MY_OBJECT.Key = 'otherValue';  //OK

MY_OBJECT = {'Key': 'otherValue'}; //TypeError: Assignment to constant variable
```
以上可以看出，`MY_OBJECT`更像是一个指针，指针所储存的地址不可改变，即不能重新赋值指向另外一个对象，
但是`MY_OBJECT`所指向的内存空间的内容是可以改变的。（这点有点像Python）

















