# 数字和日期

**Reference**
> [1] JavaScript Guide: [Numbers and dates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates)  

## 数字(Numbers)

JavaScript中, 所有的数字都是[双精度浮点型(binary64)](https://en.wikipedia.org/wiki/Double-precision_floating-point_format). 在JavaScript中没有整数类型. JavaScript提供了一些特殊的数值: `+Infinity`, `-Infinity`以及`NaN`. 

对于数值, 有四种字面量: 十进制数字, 二进制数字, 八进制数字以及十六进制数字.

### 十进制数字

```js
1234567890
42

// 使用以0开头的数字的时候要格外小心
0777 //在JavaScript中以0开头的数字为八进制数, 因此该值实际是十进制的511

// 以下数字实际上为十进制数, 即888. 
0888 //虽然由0开头, 但是在八进制数中是没有数字8的, 所以JavaScript以十进制方式理解该数字.
```

### 二进制数字

二进制数字以"0B"或者"0b"打头, 当后边跟着的数字不是0或者1, 将会报错.

```js
var FLT_SIGNBIT  = 0b10000000000000000000000000000000;  // 2147483648
var FLT_EXPONENT = 0b01111111100000000000000000000000;  // 2139095040
var FLT_MANTISSA = 0B00000000011111111111111111111111;  // 8388607
```

### 八进制数字

八进制数以0打头, 但是当后面跟的数字超出了7, 则会被当做十进制数.

```js
var n = 0755; // 493
var m = 0644; // 420
```

为了避免歧义以及出现比较奇怪的bug, 应当使用"0o"或"0O"打头来表示八进制数.

```js
var a = 0o10; // 8
var a = 0o80; // => SyntaxError
```

### 十六进制数字


十六进制数字以"0x"或者"0X"打头, 后面的数字必须是0-f.
```js
0xFFFFFFFFFFFFFFFFF // 295147905179352830000
0x123456789ABCDEF   // 81985529216486900
0XA                 // 10
```

### 指数形式

```js
1E3     // 1000
2e6     // 2000000
0.1e2   // 10
```

## 数字对象

内置的`Number`对象提供了一些数值常量, 比如最大值, NaN, Infinity等.

```js
var biggestNum = Number.MAX_VALUE;
var smallestNum = Number.MIN_VALUE;
var infiniteNum = Number.POSITIVE_INFINITY;
var negInfiniteNum = Number.NEGATIVE_INFINITY;
var notANum = Number.NaN;
```

这些值是不能被改变的. 这些常量只能通过`Number`本身访问到, 而不能通过创建的`Number`对象访问.

以下总结了`Number`对象的属性:

|属性                       |描述                               |
|:---                       |:---                               |
|Number.MAX_VALUE           |能表达的最大的数字                 |
|Number.MIN_VALUE           |能表达的最小的数字                 |
|Number.NaN                 |代表"not a number"                 |
|Number.NEGATIVE_INFINITY   |代表负无穷; 当溢出时会返回这个值   |
|Number.POSITIVE_INFINITY   |代表正无穷; 当溢出时会返回这个值   |
|Number.EPSILON             |代表比1大的最小的数与1的差, 其实就是JavaScript表示数值的精度   |
|Number.MIN_SAFE_INTEGER    |JavaScript中最小的安全整数         |
|Number.MAX_SAFE_INTEGER    |JavaScript中最大的安全整数         |

以下是`Number`对象的方法

|方法                   |描述                               |
|:---                   |:---                               |
|Number.parseFloat()    |将一个字符串转换为浮点型数值, 与全局的`parseFloat()`函数作用一样.  |
|Number.parseInt()      |将一个字符串转换为整形, 可以指定字符串的进制. 与全局`parseInt()`一样.|
|Number.isFinite()      |确定一个数字是否为有限数字, 即非Infinity   |
|Number.isInteger()     |确定一个数字是否为整形                     |
|Number.isNaN()         |确定一个数是否为NaN. 这个比全局的`isNaN()`要更加鲁棒   |
|Number.isSafeInteger() |确定一个数字是否是安全整数                 |

`Number.prototype`的方法

这些方法是供由`new`生成的`Number`对象使用的, 或者对数字字面量使用.

|方法           |描述                                       |
|:---           |:---                                       |
|toExponential()|返回数字的指数形式字符串                   |
|toFixed()      |返回数字的小数形式, 可以指定小数点后保留的位数 |
|toPrecision()  |返回数字精确的小数形式                         |

```js
var num = new Number(123.45678);
num.toExponential();        // => "1.2345678e+2"
num.toFixed();              // => "123"
num.toFixed(1);             // => "123.4"
num.toFixed(2);             // => "123.46". 四舍五入
num.toPrecision();          // => "123.45678"

(123.45678).toFixed(3);     // => "123.457"
(0xff).toFixed(2);          // => "255.00"
```

## `Math`对象

`Math`对象提供了通用的属性运算函数以及通用的常数, 如`Math.PI`储存了`pi`的值(3.1415...).

以下列出了`Math`的方法:

|方法           |描述                                   |
|:---           |:---                                   |
|abs()          |取绝对值                               |
|sin(), cos(), tan()    |标准三角函数,参数为弧度        |
|asin(), acos(), atan(), atan2()    |逆三角函数, 返回值为弧度   |
|asinh(), acosh(), atanh()  |双曲三角函数               |
|pow(), exp(), expm1(), log10(), log1p(), log2()    |指数和对数函数 |
|floor(), ceil()    |返回最大/最小的小于等于/大于等于给定参数的整数 |
|min(), max()       |返回由逗号隔开的参数中的最大或最小值           |
|random()           |返回一个大于0小于1的随机数                     |
|[round()]([https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round), [fround()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround), [trunc()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc) |取整和截断函数                         |
|sqrt(), cbrt(), hypot()    |平方根, 立方根以及平方和函数           |
|sign()     |去符号函数, 可以获取数字的正负号                       |
|clz32()                    |数字的32位表达中打头的0的个数          |
|imul()                     |模拟C语言中中两个32位数相乘后得到的结果|

对于`Math`, 角度是弧度制的, 并且不能创建自己的`Math`对象, 只能使用内置的`Math`对象.

## `Date`对象

JavaScript使用`Date`对象以及其方法来处理与日期以及时间相关的应用. `Date`没有任何的属性值.

`Date`储存时间的方式是自1970年1月1日00:00:00以来的毫秒数, `Date`的范围是相对1970年01月01日00:00:00的-100,000,000天到100,000,000天.

要想创建一个`Date`对象:
```js
var dateObjectName = new Date([parameters]);
```

在上述格式中的`parameters`可以是如下几种情况:
- 缺省: 创建当前的日期, 例如`var today = new Date();`
- 代表日期的特定格式的字符串: "月 天, 年 小时:分钟:秒", 例如`var Xmas95 = new Date("December 25, 1995 13:30:00");` 如果小时分钟和秒缺省的话, 会默认将其设置为0.
- 一系列代表日期的整数, 依次为年, 月, 日, 小时, 分钟以及秒, 例如`var Xmas95 = new Date(1995, 11, 25, 9, 30, 0);`, 其中后三个参数可以缺省, 默认值为0.

不通过`new`关键字调用`Date()`函数时返回的是一个表明当前时间的字符串.

```js
Date(); // => "Thu Jun 01 2017 13:49:13 GMT+0800 (CST)"
```

### `Date`对象的方法

`Date`对象的方法可以分为以下几大类:

- "set"方法, 用来设置`Date`对象的日期以及时间.
- "get"方法, 用来获取`Date`对象的日期以及时间.
- "to"方法, 用来返回日期对象的字符串表示.
- parse和UTC方法, 用来翻译日期字符串.

在JavaScript中, 用整数来表示日期:
- 秒和分钟: 0到59
- 小时: 0到23
- 星期: 0(Sunday星期天)到6(Saturday星期六)
- 日期: 1到31
- 月份: 0(一月)到11(十二月). **语言的bug, 非常容易混淆**
- 年份: 代表年费的整数

在JavaScript中, 0代表一月, 依次类推, 如果用"get"函数获得的月份为4, 其代表的为5月. 在设置以及创建日期时, 如果要创建4月, 应当输入整数3.
















