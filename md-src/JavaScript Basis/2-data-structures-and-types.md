# 数据结构与数据类型

**Reference**
> [1] JavaScript Guide: [Grammar and types](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Grammar_and_types)

## 数据类型

JavaScript可以识别以下7种不同类型的值：

- 六种原型(Primitives)数据类型：原型数据类型是指不是对象并且没有方法的类型。
  - Boolean布尔值，`true`和`false`
  - null，一个表明`null`值的特殊关键字。其在逻辑运算上下文中为`false`，而在数值计算上下文中为`0`。
JavaScript是大小写敏感的，因此`null`与`Null`，`NULL`或其他变量完全不同。
  - undefined，变量未定义时的属性，其在逻辑运算上下文中为`false`，而在数值计算上下文中为`NaN`。
  - Number，表示数字，例如：`42`或者`3.14`。
  - String，表示字符串，例如：`'howdy'`。
  - Symbol，其为ECMAScript 6中新添加的类型，它的实例是唯一且不可改变的。
- Object对象。Object是一种既有数据又有操作数据的方法的数据类型。

`Objects`和`functions`是JavaScript的其他两个基本要素，你可以将`objects`看做命名了的数据的容器，
而`functions`可以看成是你需要执行的一些流程。

## 数据类型的转换

JavaScript是一种动态类型语言，你不需要在声明变量的时候指定其数据类型，并且在程序执行的过程中，变量的
数据类型是可以动态改变的，所以你可以如下编写代码而不会出现错误：
```js
var answer = 42;  //typeof answer --> "number"
answer = 'Thanks for all the fish...';  //typeof answer --> "string"
```
当数字与字符串进行`+`运算时，数字将会被转换为字符串
```js
x = 'The answer is ' + 42; // 'The answer is 42'
y = 42 + ' is the answer'; // '42 is the answer'
'37' + 7; // '377'
```
而当数字与字符串进行其他四则运算时，将会试图将字符串转换为数字，当字符串不是数字时，四则运算的结果为`NaN`
```js
'37' - 7; // 30
7 - '37'; // -30
'37' + 7 - 7; // 370

'ff' - 7; // NaN
```
## 将字符串转换为数字

有两个内置函数用来将字符串转换为数字：
- `parseInt()`
- `parseFloat()`

`parseInt()`只会返回整数部分，而小数部分将会被忽略。而且在使用该函数时，最好指定要转换字符串的进制数。
`parseFloat()`不支持其他进制转换（都是十进制）。

另一个可以将字符串转换为数字的方式是采用单母`+`运算符：
```js
'1.1' + '1.1'; // '1.11.1'
+'1.1' + +'1.1'; // 2.2
//注意中间的两个+中间要有空格，不然就变成了++运算了
```

## 字面量(Literals)

你经常需要利用字面量来代表JavaScript中的值，这些值是不可改变的。JavaScript中有以下几种类型的字面量：
- Array literal 数组字面量
- Boolean literal 布尔字面量
- Floating-point literal 浮点数字面量
- Integers 整数字面量
- Object literals 对象字面量
- RegExp literals 正则表达式字面量
- String literals 字符串字面量

### Array literals

数组字面量是一个由方括号`[]`括起来的零个或多个表达式的列表，其中每一个表达式代表数组中的一个元素。
```js
var coffees = ['French Roast', 'Colombian', 'Kona']; // coffees.length = 3, 数组前三个元素的值分别由列表指定

//数组中多余的逗号
var fish = ['lion', , 'angel']; //等价于 ['lion', undefined, 'angel']
fish = ['lion', , , 'angel'];   //等价于 ['lion', undefined, undefined 'angel']
fish = ['lion', , 'angel', ];   //等价于 ['lion', undefined, 'angel']
fish = ['lion', , 'angel', , ]; //等价于 ['lion', undefined, 'angel', undefined]
```
**显式地将缺失的元素声明为undefined，将大大提高代码的可读性和可维护性**

### Boolean literals

布尔类型有两种字面量：`true`和`false`。

### Integers

整数可以用十进制，十六进制，八进制以及二进制表示
- 十进制整数直接由一串数字组成，且不能以`0`开头
- 八进制整数以`0`(或者`0O`，`0o`)开头，只能包括数字`0-7`
- 十六进制整数以`0x`或`0X`开头，可以包含数字`0-9`或字母`a-f`或`A-F`
- 二进制整数以`0b`或`0B`开头，只能包括数字`0`和`1`

`'use strict'`模式下，八进制整数字面量只能以`0o`或`0O`开头，而不能以`0`开头

### Floating-point literals

浮点数字面量可以由以下几个部分组成：
- 一个十进制的整数，可以带正负号
- 小数点
- 小数部分（由一串十进制数表示）
- 指数部分

指数部分指以`e`或`E`开头的部分，可以有正负号。浮点数字面量至少有一位数字，而且必须带小数点或者指数部分。

以下都是合法的浮点数字面量
```js
3.13
-.233231
-2.12e+12
1e1
1.e1
.1e-2
```
###  Object literals

对象字面量是一系列“属性-值”对的集合，并且用花括号`{}`括起来。注意不能如下使用对象字面量，因为`{`会被
误以为为语句块的开始。
```js
{ myCar: 'Saturn', getCar: "Honda", special: "Toyota" };
// SyntaxError: Unexpected token :
```
以下是对象字面量的一个例子，

```js
var sales = "Toyota";
var index = 1;

function carType(name) {
    if (name === "Honda") {
        return name + index;
        index++;
    } else {
        return "Sorry, we don't sell " + name + ".";
    }
}

var car = {myCar: 'Saturn', getCar: carType("Honda"), special: sales};
console.log(car.myCar); // "Saturn"
console.log(car.getCar); // "Honda1"
console.log(car.special); // "Toyota"

sales = "BWM";
console.log(car.special); // "Toyota"， 该结果表面对象属性值是执了的复制操作，也就是重新生成了一个字符串"Toyota"
console.log(car.getCar); // "Honda1"， 该结果说明在执行car赋值时，对象的每一个属性值就已经计算出来了
```
除了使用JavaScript标识符（变量名，函数名以及对象属性名），还可以使用字符串字面量或者数字字面量作为属性名称。
属性值也可以是另一个对象：
```js
var car = {
    manyCars: {
        a: 'Saab',
        'b': 'Jeep'
    },
    
    7: 'Mazda'
}
console.log(car.manyCars.b); // Jeep
console.log(car[7]); // Mazda

//对于用标识符命名的属性
console.log(car.manyCars.a);    // OK
console.log(car.manyCars[a]);   // ReferenceError: a is not defined
console.log(car.manyCars['a']); // OK

//对于数字字面量命名的属性
console.log(car.7);             // SyntaxError: Unexpected number
console.log(car[7]);            // OK
console.log(car['7']);          // OK

//对于用字符串字面量命名的属性
console.log(car.manyCar.b);     // OK
console.log(car.nanyCar.'b');   // SyntaxError: Unexpected string
console.log(car.manyCar[b]);    // ReferenceError: b is not defined
console.log(car.manyCar['b']);  // OK
```
对象的属性名可以为任意的字符串，包括空字符串`''`。当属性名称不是一个有效的标识符或者是不是数字时，必须
要将属性名用引号引起来（变成字符串）。属性名称不是标识符的时候不能通过`.`运算符获取其属性值，但是可以
采用与数组类似的记号`[]`来对属性值进行访问。

> #### Enhanced Object literal
> In ES2015, object literals are extended to support setting the prototype at construction, 
> shorthand for foo: foo assignments, defining methods, making super calls, and computing 
> property names with expressions. Together, these also bring object literals and class 
> declarations closer together, and let object-based design benefit from some of the same 
> conveniences.
> ```js
> var obj = {
>    // __proto__
>    __proto__: theProtoObj,
>    // Shorthand for ‘handler: handler’
>    handler,
>    // Methods
>    toString() {
>     // Super calls
>     return 'd ' + super.toString();
>    },
>    // Computed (dynamic) property names
>    [ 'prop_' + (() => 42)() ]: 42
>};
>```
>
>  -- From reference [1]

### RegExp literals

正则表达式字面量是指由`/`包括起来的一个字符串样式。下面是一个正则表达式的例子：
```js
var re = /ab+c/;
```

### String literals

字符串字面量是由单引号`'`或者双引号`"`对引起来的零个或多个字符的组合，但是不能单引号和双引号混用。以下是
一些合法的字符串字面量：
```js
'foo'
"bar"
'1234'
'one line \n another line'
"John's cat"
```
你可以对字符串字面量调用String对象的方法，这种情况JavaScript会自动利用字面量生成一个临时的String对象，然后
调用方法之后销毁这个String对象。
```js
console.log("John's cat".length) 
// Will print the number of symbols in the string including whitespace. 
// In this case, 10.
```
在ES2015，提供了一种模板字符串(template literals)，你可以在通过模板字符串前添加一个tag来自定义模板字符串
的解析过程，这可以用来防止注入攻击，或者用来建立基于字符串的高级数据抽象。
```js
// Basic literal string creation
`In JavaScript '\n' is a line-feed.`

// Multiline strings
`In JavaScript template strings can run
 over multiple lines, but double and single
 quoted strings cannot.`

// String interpolation
var name = 'Bob', time = 'today';
`Hello ${name}, how are you ${time}?`
```
**优先使用字符串字面量，而不是使用String对象**

#### 在字符串中使用特殊字符

除了常规字符之外，你还可以在字符串中使用特殊字符：
```js
'one line \n another line'
```
以下是JavaScript的特殊字符

|**字符**   |**含义**       |
|:----------|:--------------|
|\0         |Null byte      |
|\b	        |Backspace      |
|\f         |Form feed      |
|\n	        |New line       |
|\r	        |Carriage return|
|\t	        |Tab            |
|\v	        |Vertical tab   |
|\'	        |Apostrophe or single quote|
|\"	        |Double quote   |
|\\	        |Backslash character|
|\XXX       |The character with the Latin-1 encoding specified by up to three octal digits XXX between 0 and 377. For example, \251 is the octal sequence for the copyright symbol.|
|\xXX	    |The character with the Latin-1 encoding specified by the two hexadecimal digits XX between 00 and FF. For example, \xA9 is the hexadecimal sequence for the copyright symbol.|
|\uXXXX     |The Unicode character specified by the four hexadecimal digits XXXX. For example, \u00A9 is the Unicode sequence for the copyright symbol. See Unicode escape sequences.|
|\u{XXXXX}	|Unicode code point escapes. For example, \u{2F804} is the same as the simple Unicode escapes \uD87E\uDC04.|

#### 转义字符

对于那些未出现在上表中的字符，其所带的前导反斜线`\`将被忽略。但是这一用法已经被废弃，应当避免使用。
```js
'\paper' // 等价于'paper'
```

通过在引号前加上反斜线`\`，可以在字符串中插入引号，这就是引号转义：
```js
var quote = "He read \"The Cremation of Sam McGee\" by R.W. Service.";
console.log(quote);  // 运行结果：He read "The Cremation of Sam McGee" by R.W. Service.
```
要在字符串中插入'\'字面值，必须转义反斜线。例如，要把文件路径 `c:\temp` 赋值给一个字符串，可以采用如下方式:
```js
var home = "c:\\temp";
```
也可以在换行之前加上反斜线以转义换行（实际上就是一条语句拆成多行书写），
这样反斜线和换行都不会出现在字符串的值中。
```js
var str = "this string \
is broken \
across multiple\
lines."
console.log(str);   // this string is broken across multiplelines.
```
JavaScript没有"heredoc"语法，但可以用行末的换行符转义和转义的换行来近似实现 
```js
var poem = 
"Roses are red,\n\
Violets are blue.\n\
Sugar is sweet,\n\
and so is foo."
```

