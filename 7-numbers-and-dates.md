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










