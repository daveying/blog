# 表达式和运算符

**Reference**
> [1] JavaScript Guide: [Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)  
> [2] JavaScript Reference: [Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

## 运算符

JavaScript包含如下几类运算符:
- 赋值运算符(Assignment operators)
- 比较运算符(Comparison operators)
- 算术运算符(Arithmetic operators)
- 位运算符(Bitwise operators)
- 逻辑运算符(Logical operators)
- 字符串运算符(String operators)
- 条件运(三目)算符(Conditional (ternary) operator)
- 逗号运算符(Comma operator)
- 单目运算符(Unary operators)
- 关系运算符(Relational operators)

JavaScript具有双目运算符以及单目运算符, 还有一个三目运算符: 条件运算符. 双目运算符需要两个操作数, 
一个在运算符的前面一个在后面:
```js
operand1 operator operand2
```
例如: `3 + 4`以及`x * y`.

单目运算符只需要一个操作数, 要么在运算符前面要么在后面:
```js
operator operand
//or
operand operator
```
例如: `x++`或者`++x`.

### 赋值运算符(Assignment operators)

赋值运算符依据右操作数的值对左操作数进行赋值. 最简单的赋值运算符为`=`, 其将右操作数的值赋给做操作数, 例如:
`x = y`意味着将`y`的值赋给`x`.

除此之外, 还有非常多的组合赋值符:

**组合赋值运算符**

|名称                                   |组合赋值运算符     |含义           |
|:-----                                 |:---------------   |:-----         |
|赋值运算符(Assignment)                 |x = y              |x = y          |
|加法赋值(Addition assignment)          |x += y             |x = x + y      |
|减法赋值(Subtraction assignment)       |x -= y             |x = x - y      |
|乘法赋值(Multiplication assignment)    |x *= y             |x = x * y      |
|除法赋值(Division assignment)          |x /= y             |x = x / y      |
|求余赋值(Remainder assignment)         |x %= y             |x = x % y      |
|求幂赋值(Exponentiation assignment)    |x **= y            |x = x ** y     |
|左移位赋值(Left shift assignment)      |x <<= y            |x = x << y     |
|右移位赋值(Right shift assignment)     |x >>= y            |x = x >> y     |
|无符号右移位赋值(Unsigned right shift assignment)  |x >>>= y   |x = x >>> y|
|位于赋值(Bitwise AND assignmen)        |x &= y             |x = x & y      |
|位异或赋值(Bitwise XOR assignment)     |x ^= y             |x = x ^ y      |
|位或赋值(Bitwise OR assignment)        |x \|= y            |x = x \| y     |


**解构赋值(Destructuring)**

解构赋值能够按照对于的解构进行赋值:
```js
var foo = ['one', 'two', 'three'];
//没有解构赋值的话
var one = foo[0];
var two = foo[1];
var three = foo[2];

//使用解构赋值就简单得多
var [one1, two1, three1] = foo;
console.log(one1); // => 'one'
```

### 比较运算符(Comparison operators)

比较运算符通过比较其两个操作数的值来获得一个逻辑值. 操作数可以是数值, 字符串, 逻辑值或者是对象.
字符串的比较是通过字典顺序获得, 使用的是Unicode编码值. **在大多数情况下, 如果相比较的两个操作数不是同一种类型, 
JavaScript都会试图将两个操作数转换为合适的类型后再进行比较, 这种行为通常导致最终在比较两个数值.**
唯一的例外是`===`和`!==`运算符, 它们会检查两个操作数的类型, 然后执行严格的等价性比较.

**比较运算符**

```js
var var1 = 3;
var var2 = 4;
```

|运算符             |描述                                       |返回true的情况                             |
|:---               |:---                                       |:---                                       |
|相等(==)           |当两个操作数相等时返回true                 |3 == var <br> "3" == var1 <br> 3 == '3'    |
|不等(!=)           |当两个操作数不相等时返回true               |var1 != 4 <br> var2 != "3"                 |
|严格相等(===)      |当两个操作数为相同类型并且相等时返回true   |3 === var1                                 |
|严格不相等(!==)    |当两个操作数不同类型时, 一定返回true, 当两个操作数相同类型, 当值不一样时返回true   |var1 !== "3" <br> 3 !== '3'    |
|大于(>)            |当左操作数大于右操作数时返回true           |var2 > var1 <br> "12" > 2                  |
|大于等于(>=)       |当左操作数大于等于右操作数时返回true       |var2 >= var1 <br> var1 >= 3                |
|小于(<)            |当左操作数小于右操作数时返回true           |var1 < var2 <br> "2" < 12                  |
|小于等于(<=)       |当左操作数小于等于右操作数时返回true       |var1 <= var2 <br> var2 <= 5                |

### 算术运算符(Arithmetic operators)

算术运算符将数值作为操作数, 并且返回一个数值. 基本的算术运算符为加法运算符(+), 减法运算符(-), 乘法运算符(*)以及除法运算符(/).
这些运算符和大多数编程语言中的运算符的行为一样.

```js
1 / 2;                      // => 0.5, JavaScript中没有整形一说, 都是number类型
1 / 0;                      // => Infinity
Infinity / Infinity;        // => NaN
100 / Infinity;             // => 0

if (Infinity) {
    console.log("Infinity在逻辑判定时为true");
}
// => Infinity在逻辑判定时为true

1 / 2 == 1.0 / 2.0;         // => true
```

除了基本的算术运算符(+, -, *, /), JavaScript中还包含以下算术运算符:

<iframe width="100%" height="300" src="//jsfiddle.net/david_da/gkvb4x88/embedded/js,html,css,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>











