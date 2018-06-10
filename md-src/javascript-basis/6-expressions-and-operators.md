[_metadata_:author]:- "daveying"
[_metadata_:tags]:- "JavaScript"
[_metadata_:created-date]:- "2017-05-17 09:34pm"

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

|运算符         |描述                           |例子           |
|:---           |:---                           |:---           |
|求余运算符(%)  |返回两个数相除的余数           |12 % 5 返回2 <br> 2.5 % 0.2 返回0.099...(0.1) <br> 3 % 1.2返回0.6   |
|自增运算符(++) |单目运算符, 对其操作数自增1. 当前缀自增时(++x), 返回值是该数增加之后的值, 当后缀自增时(x++), 返回值为该数增加前的值    |若x为3, 则++x将x的值增加到4, 返回值为4, 而x++也会将x的值增加到4, 但是返回值为3.    |
|自减运算符(--) |单目运算符, 对其操作数自减1. 返回值与自增运算符类似    |假如x的值为3, 当使用前缀自减时(--x), x的值变为2, 返回值为2, 而使用后缀自减时(x--), x的值也变为2, 但是返回值为3.    |
|取负运算符(-)  |单目运算符, 返回值为操作数乘以-1   |如x等于2, 那么-x返回-2.    |
|取正运算符(+)  |单目运算符, 返回数值本身, 若操作数不是数值, 会试图将操作数转换为数值   |+"3"返回3, +true返回1, "3" + "2"返回"32", 而+"3" + +"2"返回5   |
|取幂运算符(**) |对左操作数求取右操作数次幂 |2 ** 3返回8, 10 ** -1返回0.1   |


### 位运算符(Bitwise operators)

位运算符将其操作数作为32位二进制位对待, 例如数字3将被当做为1001, 位运算得到的返回值为JavaScript标准的数值.
若操作数为小数, 则先将小数转换为整数进行运算.

**位运算符**

|运算符     |使用方式   |描述                                                           |
|:---       |:---       |:---                                                           |
|位与       |a & b      |若对应位都为1, 则返回值的相应位也为1. 否则为0.                 |
|位或       |a \| b     |若对应位有一个为1, 则返回值相应位为1. 否则为0.                 |
|位异或     |a ^ b      |若对应位的值不相同, 则返回值相应位为1. 否则为0.                |
|位取反     |~ a        |返回值为a中的每一位取反                                        |
|左移位     |a << b     |返回值为将a中的每一位向左移b位, 并在右边补0所得到的值          |
|带符号右移位|a >> b    |返回值为将a中的每一位向右移b位, 左边补a最左边一位的值所得到的值|
|补0右移位  |a >>> b    |返回值为将a中的每一位向右移b为, 左边补0所得到的值              |

#### 按位逻辑操作

位操作遵循以下规则:
- 位操作数将被转化为32位整形数, 并且被表达为一系列的比特, 大于32比特的数字其高字节将会被忽略. 
例如, 如下大于32比特的数字将会被转化为32比特的数字:
```js
Before: 11100110111110100000000000000110000000000001
After:              10100000000000000110000000000001
```
- 第一个操作数的每一位和第二个操作数的对应位配对, 即第一位对第一位, 第二位对第二位.
- 位操作作用于配对好的比特对. 所得结果将重新组合为一个32位的整数.

**位操作例子**

|表达式     |结果   |二进制表示             |
|:---       |---    |:---                   |
|15 & 9     |9      |1111 & 1001 = 1001     |
|15 \| 9    |15     |1111 & 1001 = 1111     |
|15 ^ 9     |6      |1111 ^ 1001 = 0110     |
|~15        |-16    |~000...001111 = 111...110000   |
|~9         |-10    |~000...001001 = 111...110110   |

`~15`得到的是负值是因为最左边一位代表正负号.

#### 移位操作

|运算符     |描述                                   |范例                           |
|:---       |:---                                   |:---                           |
|<<(左移位) |将左操作数的各位向左移右操作数位, 左边移出位将被遗弃, 右边多出的空位由0补齐    |9<<2产生36, 因为1001左移2位变为100100, 即36.   |
|>>(带符号右移位) |将左操作数的各位向右移右操作数位, 右边移出位将被遗弃, 左边多出的空位由原值最左边位补齐 |9>>2得到2, 因为1001右移2位变为0010, 即是2. 而-9>>2得到-3, 这是由于右移补位时使用的为原数最左边位, 因此符号得到保留 |
|>>>(补0右移)|将左操作数的各位向右移右操作数位, 右边移出位将被遗弃, 左边多出的空位由0补齐   |19>>>2得到4, 因为10011右移2位变成00100, 即是4. 对于非负数, 补零右移和带符号右移得到的结果是一致的. |

### 逻辑运算符(Logical operators)

逻辑运算符通常是与布尔值一起使用, 这种情况下逻辑运算符返回的值也是布尔值. 然而在JavaScript中一个非常有用点就是`&&`和`||`的返回值是其中一个操作数, 所以当`&&`和`||`的操作数不是布尔值时, 其返回值有可能不是布尔类型.

**逻辑运算符**

|运算符     |使用方式       |描述                                               |
|:---       |:---           |:---                                               |
|逻辑与(&&) |expr1 && expr2 |当expr1能被转换为false, 则返回expre1; 否则返回expr2.|
|逻辑或(\|\|)|expr1 \|\| expr2 |当expr1能被转换为true, 则返回expr1; 否则返回expr2. |
|逻辑非(!)  |!expr          |如果expr能被转换为true则返回false; 否则返回true.     |

**能够被转换为`false`的表达式有: `null`, `0`, `NaN`, 空字符串`""`以及`undefined`.**

以下例子表明了逻辑与`&&`是如何工作的:
```js
var a1 = true && true;      // => true
var a2 = true && false;     // => false
var a3 = false && true;     // => false
var a4 = false && (3 == 4)  // => false
var a5 = 'Cat' && 'Dog';    // => 'Dog'. 'Cat'不能转换为false, 因此返回'Dog'
var a6 = false && 'Cat';    // => false. 左操作数能够转换为false, 因此返回左操作数
var a7 = 'Cat' && false;    // => false. 左操作数不能转换为false, 因此返回右操作数false
```

以下例子表明了逻辑或`||`是如何工作的:
```js
var o1 = true || true;      // => true
var o2 = false || true;     // => true
var o3 = true || false;     // => true
var o4 = false || (3 == 4); // => false. 左操作数不能转换为true, 返回右操作数(3 == 4), 即false
var o5 = 'Cat' || 'Dog';    // => 'Cat'. 左操作数能够转换为true, 返回左操作数'Cat'
var o6 = false || 'Cat';    // => 'Cat'. 左操作数不能转换为true, 返回右操作数'Cat'
var o6 = 'Cat' || false;    // => 'Cat'. 左操作数能够转换为true, 返回做操作数'Cat'
```

以下例子表明了逻辑非`!`是如何工作的:
```js
var n1 = !true;         // => false
var n2 = !false;        // => true
var n3 = !'Cat';        // => false
```

#### 短路求值(Short-circuit evaluation)

逻辑运算符是从左至右进行评估的, 因此会出现以下两种情况:
- `false && anything`会永远返回`false`而不管后边表达式的取值
- `true || anything`会永远返回`true`而不管后边表达式的取值

并且这两个表达式中的`anything`在这种情况下是不会被取值的(执行), 所以`anything`中的语句不会对程序产生任何影响.

### 字符串运算符

出来逻辑运算符可以应用于字符串, 字符串连接运算符(`+`)也可以用于字符串操作. 其将两个字符串串接起来.

```js
console.log('my ' + 'string'); // log 'my string'
```
组合赋值运算符`+=`也可以用于字符串的串接:

```js
var myString = 'alpha';
myString += 'bet'; // => myString = alphabet
```

### 条件运算符(三目运算符)

这是JavaScript中唯一的三目运算符, 表达式将根据条件返回两个值中的一个:

```js
condition ? val1 : val2
```
如果`condition`为`true`, 则返回`val1`的值, 否则返回`val2`的值. 你可以使用条件运算符在任何可以使用运算符的地方.

```js
var status = (age >= 18) ? 'adult' : 'minor';
```

### 逗号运算符

逗号运算符`,`与C++中的逗号运算符规则一致, 其会评估被逗号运算符分隔的每一个表达式, 并返回最后一个表达式的值.

例如:
```js
var aa = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var a = [aa, aa, aa, aa, aa, aa, aa, aa, aa, aa];
for (var i = 0, j = 9; i <= j; i++, j--) {
    console.log('a[' + i + '][' + j + ']=' + a[i][j]);
}
/* output:
a[0][9]=10
a[1][8]=9
a[2][7]=8
a[3][6]=7
a[4][5]=6
*/
```

### 单目运算符

单目运算符是只有一个操作数的运算符.

#### delete

`delete`运算符删除一个对象, 一个对象的属性, 或者数组中特定序号的值. 语法格式为:

```js
delete objectName;  // 通过对象名删除一个对象
delete objectName.property; //删除一个对象的property
delete objectName[index];  //删除由index所标示的属性, 或者是有index标示的数组中的值.
delete property; //只有在with语句块中才合法
```
点这里了解[`with`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with)语句.

当`delete`语句删除成功时返回`true`, 当删除不成功时返回`false`.

当使用`var`, `let`以及`const`声明的变量是不能通过`delete`删除的:

```js
x = 42;
delete x;   // => true
x;          // ReferenceError: 'x' is not defined

var y = 2;
delete y;   // => false
y;          // => 2

let z = 3;
delete z;   // => false(在Chrome Version 58.0.3029.110 (64-bit Ubuntu版) 中测试时,
            //返回的为true, 但是实际上delete并没有成功, 因为执行该语句后还是可以获得z的值. 这应该是一个bug)
z;          // => 3

const w = 4;
delete w;   // => false(在Chrome Version 58.0.3029.110 (64-bit Ubuntu版) 中测试时,
            //返回的为true, 但是实际上delete并没有成功, 因为执行该语句后还是可以获得w的值)
w;          // => 4
```

删除对象属性以及对象
```js
firstObj = new Number();
firstObj.h = 1;
delete firstObj.h;  // => true
delete firstObj;    // => true

var secondObj = new Number();
secondObj.h = 2;
delete secondObj.h; // => true
delete secondObj;   // => false
```
删除数组元素
```js
var arr = [undefined, '', 'c', 'd'];
delete arr;     // => false. 由var定义的数组不能被删除
delete arr[3];  // => true
arr;            // => [undefined, '', 'c', undefined]

if(3 in arr) {
    // 这里不会被执行
}

if(1 in arr) {
    // 这里会被执行
}

if(0 in arr) {
    // 这里会被执行
}

var arr2 = [, undefined];
arr2[0];    // => undefined
0 in arr2;  // => false
1 in arr2;  // => true
```
奇怪的JavaScript!!!

#### typeof

`typeof`的用法:
```js
typeof operand
typeof (operand)
```

`typeof`运算符返回一个字符串来表明操作数的类型. 其中的括号是可选的.

举个例子:
```js
var myFun = new Function('5 + 2');
var shape = 'round';
var size = 1;
var foo = ['Apple', 'Mongo', 'Orange'];
var tody = new Date();

typeof myFun;           // returns 'function'
typeof shape;           // returns 'string'
typeof size;            // returns 'number'
typeof foo;             // returns 'object'
typeof today;           // returns 'object'
typeof dosentExist;     // returns 'undefined'

typeof true;            // returns "boolean"
typeof null;            // returns "object"

typeof 62;              // returns "number"
typeof 'Hello world';   // returns "string"

typeof document.lastModified; // returns "string"
typeof window.length;         // returns "number"
typeof Math.LN2;              // returns "number"

typeof blur;            // returns "function"
typeof eval;            // returns "function"
typeof parseInt;        // returns "function"
typeof shape.split;     // returns "function"

typeof Date;            // returns "function"
typeof Function;        // returns "function"
typeof Math;            // returns "object"
typeof Option;          // returns "function"
typeof String;          // returns "function"
```

#### void

`void`的用法如下:
```js
void (expression)
void expression
```

`void`使得语句被执行, 但是不返回返回值. `expression`是需要被执行的语句, 括号不是必须的, 但是推荐使用.

> You can use the void operator to specify an expression as a hypertext link. The expression is evaluated but is not loaded in place of the current document.  
> The following code creates a hypertext link that does nothing when the user clicks it. When the user clicks the link, `void(0)` evaluates to undefined, which has no effect in JavaScript.
> ```html
> <a href="javascript:void(0)">Click here to do nothing</a>
> ```  
> The following code creates a hypertext link that submits a form when the user clicks it.
> ```html
> <a href="javascript:void(document.form.submit())">Click here to submit</a>
> ```  
> -- From reference [1]

### 关系运算符

#### in

如果指定的属性在对应的对象中存在, 则返回`true`. 其语法格式如下:

```js
propNameOrNumber in objName
```
其中`propNameOrNumber`为一个字符串或者是数字, 其代表了属性名或者是数组的索引值. `objName`是对象的名称.

以下是一些例子:
```js
// 数组
var trees = ['redwood', 'bay', 'cedar', 'oak', 'maple'];
0 in trees; // => true
3 in trees; // => true
6 in trees; // => false

'bay' in trees;     // => false. 必须指定索引数字, 而不是对应的值
'length' in trees;  // => true. length是数组的属性

// 内置对象
'PI' in Math;           // => true
var myString = new String('coral');
'lenght' in myString;   // => true

// 自定义对象
var myCar = { make: 'Honda', model: 'Accord', year: 1998 };
'make' in myCar;    // => true
'model' in myCar;   // => true
```

#### instanceof

如果对象是特定的对象类型, 则`instanceof`运算符返回`true`. 其语法格式如下:
```js
objectName instanceof objectType
```

其中`objectName`是需要测试的对象, `objecType`为对象的类型, 比如`Date`或者`Array`.当需要在运行时检测对象的类型时, 可以是用`instanceof`运算符. 例如, 你需要捕捉异常时, 你可以通过异常的类型来决定如何处理异常.

举个例子:

```js
var theDay = new Date(1995, 12, 17);
theDay instanceof Date;         // => true
Date instanceof Function;       // => true. 由于Date是一个function
Function instanceof Function;   // => true. 由于Function本身也是一个function

function foo() {}
foo instanceof Function;        // => true

var arr = [];
arr instanceof Array;           // => true
```

### 运算符优先级

运算符的优先级决定了在评估一个表达式是以何种顺序求值的. 你可以通过括号`()`来控制表达式求值的顺序.

**运算符优先级**

|运算符类型         |运算符                     |
|:---               |:---                       |
|成员(member)       |`.` `[]`                   |
|函数调用/生成实例  |`()` `new`                 |
|取反/自增          |`!` `~` `-` `+` `++` `--` `typeof` `void` `delete` |
|乘除               |`*` `/` `%`                |
|加减               |`+` `-`                    |
|移位操作           |`<<` `>>` `>>>`            |
|关系运算符         |`<` `<=` `>` `>=` `in` `instanceof`    |
|等价判定           |`==` `!=` `===` `!==`      |
|位与               |`&`                        |
|位异或             |`^`                        |
|位或               |`|`                        |
|逻辑与             |`&&`                       |
|逻辑或             |`||`                       |
|条件运算符         |`? :`                      |
|赋值               |`=` `+=` `-=` `*=` `/=` `%=` `<<=` `>>=` `>>>=` `&=` `^=` `|=` |
|逗号运算符         |`,`                        |

更加详细的关于优先级说明请参考[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

## 表达式

> An expression is any valid unit of code that resolves to a value. - From reference [1]

表达式是用来获得一个值的一段合法代码.

每个合法的表达式都会得到返回值, 但是表达式可以概念上分为两类:
- 一类会产生副作用, 比如`x = 7`, 该表达式使用`=`操作数将`7`赋给`x`, 因此其改变了变量`x`的值. 而该表达式的返回值也是7.
- 另一类不会参数副作用, 比如`3 + 4`, 该表达式的返回值为`7`, 并且不对其他变量造成影响.

JavaScript中的表达式分为以下几类:
- 算术表达式: 表达式得到的结果为数值, 通常包含数值运算符.
- 字符串表达式: 表达式得到的结果为字符串, 通常包含字符串运算符.
- 逻辑表达式: 表达式得到的结果为布尔类型(`true`或`false`), 通常包含了逻辑运算符.
- 基本表达式(Primary expressions): javascript中基本的关键字和一般表达式.
- 左值表达式: 给左值赋值.

### 基本表达式(Primary expressions)

#### this

使用`this`关键字来指代当前对象(current object), 通常, `this`指代的是方法中正在被调用的对象. 语法为:

```js
this['propertyName']
this.propertyName
```

#### 分组运算符

分组运算符`()`控制表达式求值的顺序:

```js
var a = 1;
var b = 2;
var c = 3;

// default precedence
a + b * c     // 7
// evaluated by default like this
a + (b * c)   // 7

// now overriding precedence 
// addition before multiplication   
(a + b) * c   // 9

// which is equivalent to
a * c + b * c // 9
```

### 左值表达式

#### new

你可以使用`new`来创建一个自定义对象实例或者内置类型对象实例.

```js
var objName = new objType([param1, param2, ..., paramN]);
```

#### super

`super`关键字可以用来调用一个对象父类的函数, 它在用来调用一个类的父类的构造函数时非常有用.

#### Spread operator

当需要多个参数(比如函数调用时)或者多个值(比如字面量数组)时, Spread operator 允许一个表达式在原地展开.

例如: 现在你有一个数组，你想创建一个新数组，并将刚才那个作为它的一部分，用array的字面语法是不够的，你不得不写一些代码实现它，比如用些push, splice, concat等等。但是用spread syntax就没问题了：

```js
var parts = ['shoulder', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes'];
```
类似的,  spread operator 也可以用在函数调用的时候:
```js
function f(x, y, z) { }
var args = [0, 1, 2];
f(...args);
```

