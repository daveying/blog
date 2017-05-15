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
    var f3 = createFunction1();  //在函数作用域下创建函数
    console.log(f3()); // => 10
}

test();
```
## 调用函数

定义函数时也存在函数提升的情况，也就是先调用再声明，如：
```js
console.log(square(5)); // => 25

function square(n) {
    return n * n;
}
```
但是通过函数表达式形式定义的函数不能先调用，如：
```js
console.log(square);    // => undifined
console.log(square(5)); // TypeError: square is not a function

var square = function (n) {
    return n * n;
}
```
这很好理解，在进行变量提升的过程中，只提升声明，不提升定义，因此`console.log(square)`时不会报
`ReferenceError`，但是在调用函数时会报`TypeError`。

## 函数作用域

在函数中定义的变量不能在函数外部访问，因为这些变量定义的时候处于该函数作用域内。然而一个函数可以
访问所有在该函数中定义的变量（包括函数）以及该函数定义时所在作用域能访问到的变量。换而言之，
在全局作用域中定义的函数可以访问其自身作用域中的变量，也可以访问全局作用域中的变量，
一个在其他函数中定义的函数可以访问其母函数中定义的变量以及母函数的母函数中的变量，一直到全局变量。

例如：
```js
var num1 = 20,
    num2 = 3,
    name = 'Chamahk';
    
//这个函数在全局作用域中定义
function multiply() {
    return num1 * num2;
}    

multiply(); // 返回60

//嵌套的函数
function getScore() {
    var num1 = 2,
        num2 = 3;
        
    function add() {
        return name + ' scored ' + (num1 + num2); //该num1以及num2为getScore作用域下的变量，
                                                  //假如在getScore中没有找到，则会到getScore的
                                                  //上一作用域中寻找
    }
    
    return add();
}

getScore(); // 返回 "Chamahk scored 5"
```
## 作用域与函数堆栈

### 递归

函数可以在其自己的函数体内调用其自身，这样就会形成递归调用。有三种调用其自身的方式：
- 函数名
- arguments.callee
- 函数变量

例如如下函数：
```js
var foo = function bar() {
    // statements
}
```
在函数体内，可以通过以下几种方式调用其自身，并且是等价的
- `bar()`
- `arguments.callee()`
- `foo()`

在某种程度上，递归与循环类似，都是多次执行某一段代码，而且都需要提供终止的条件，比如：
```js
var x = 0;
while (x < 10) {
    // do something
    x++;
}

//以上循环可以转换为
function loop(x) {
    if (x >= 10) return;
    
    // do something same
    loop(x + 1);
}
```
但是，有些算法不能通过简单的循环实现，比如获得HTML DOM的所有节点的算法，用递归实现将更简单。
```js
function walkTree(node) {
    if (node == null) return;
    
    // do something with node
    for (var i = 0; i < node.childNodes.length; i++) {
        walkTree(node.childNodes[i]);
    }
}
```
理论上可以将所有的递归算法转换为费递归算法，但是通常来说逻辑上将更复杂并且需要使用堆栈。
事实上，递归就是使用了堆栈：函数堆栈。

举个例子：
```js
function foo(i) {
    if (i < 0) return;
    console.log('begin: ' + i);
    foo(i - 1);
    console.log('end: ' + i);
}
foo(3);
/* 输出：
begin: 3
begin: 2
begin: 1
begin: 0
end: 0
end: 1
end: 2
end: 3
*/
```

### 函数嵌套

在函数的内部定义函数称为函数的嵌套，在这里姑且称外部的函数为外部函数，称嵌套的函数称为内部函数。
- 内部函数只能在外部函数内部被调用
- 内部函数可以访问外部函数能访问的变量，而外部函数不能调用内部函数内部定义的变量

以下是一个多重嵌套的例子：
```js
function A(x) {
    function B(y) {
        function C(z) {
            console.log(x + y + z);
        }
        C(3)
    }
    B(2)
}
A(1); // => 6
```
上面例子中首先声明了一个函数`A(x)`，该函数中定义了一个变量`x`，紧接着调用了函数`A`，并传递参数
`1`，因此`A`中的`x`等于`1`；在执行函数`A`时，`A`函数体中首先声明了内部函数`B(y)`，
在`A`函数体中紧接着调用函数`B`，并传递参数`2`，因此`B`中的`y`等于`2`；在执行函数`B`时，`B`的函数体
声明了一个内部函数`C(z)`，然后紧接着调用了`C`，并传递参数`3`，因此`C`中的`z`等于`3`，执行函数`C`时，
函数体只有一条语句`console.log(x + y + z)`，由于函数`C`是可以访问函数`B`与函数`A`的变量的，因此`x = 1`,
`y = 2`, `z = 3`，因此最终会输出`6`。

在这个例子中，函数`C`可以可以访问函数`B`和`A`的变量，`B`能访问`A`的变量，但是反过来不行，
`A`不能访问`B`中和`C`中的变量，同样`B`也不能访问`C`中的变量。

### 命名冲突与作用域链

以一个例子来解释：
```js
function A(x) {
    function B(y) {
        function C(z) {
            console.log(x + y + z);
        }
        var x = 10;
        C(3);
    }
    var y = 40;
    B(2);
}
A(1); // => 15
```
上例中结果为15。分析一下就可以知道，`A`作用域中有两个变量`{x: 1, y: 40}`，而`B`作用域中也有两个变量
`{y: 2, x: 10}`。`C`作用域中有`{z: 3}`。当在`C`作用域中执行语句`console.log(x + y + z)`时，即在`C`
作用域访问`x, y, z`，当运行时在访问`x`时，先看`C`作用域中是否有这个变量，没有找到就会去`C`的上一级
作用域`B`中寻找，因为`B`中有变量`x`，并且其值为`10`，因此这里的`x`的取值就是`10`。当访问`y`时，现在
`C`中查找是否有`y`，没有就会去`B`中查找，因为`B`中有，并且值为`2`，因此这里的`y`取值就是`2`。当访问
`z`时，直接在`C`中就可以查找得到，并且值为`3`，所以最终输出的结果为`15`。假如函数`C`中需要访问一个
变量`k`，而`A`、`B`和`C`中都没有找到，JavaScript会再向上一层查找，即到全局作用域中查找，若全局作用域中
也没有能够查找到，系统会抛出`ReferenceError`，表明所访问变量未声明。

在这里`A`和`B`中的某些变量命名是重复的（即是冲突的情况），当冲突时，最里层作用域的变量起作用。以上
描述的其实是一条作用域链：`C`作用域-->`B`作用域-->`A`作用域-->全局作用域。


## 闭包

闭包是JavaScript中最强悍的功能之一。闭包之所以出现是因为内嵌函数具有对外部函数定义变量的访问权限（当然
整个作用域链条上的变量都可以访问）。由于JavaScript在进行内存回收时会检测某一内存是否被一个active的变量
引用，按理来说一个函数内部的变量在函数执行完毕之后将全部被回收，但是在某些情况下内嵌函数将比外部函数存
活得更久，若内嵌函数中引用了外部函数的变量，那么JavaScript在进行垃圾回收时认为外部函数的变量还在被引用，
于是这些变量不会被回收，这些变量会一直存活，直到所有引用其的内嵌函数都结束。

举个例子：
```js
var pet = function(name) {
    var getName = function() {
        return name;
    }
    return getName;
}

var myPet = pet('Vivie');

myPet(); // => "Vivie"
```

上面例子中作用域链为：`getName`作用域-->`pet`作用域-->全局作用域。`getName`中引用了`pet`作用域中的`name`。
虽然在进行`var myPet = pet('Vivie')`调用时，`pet`作用域已经结束，该作用域中的变量`name`也该被回收，但是
由于内部函数引用了`name`，而且内部函数作为返回值返回给全局变量`myPet`，因此被`getName`引用的`pet`作用域
中的变量`name`不会被回收。并且会一直存在，直到myPet被销毁。这中情况就说形成了闭包，之所以叫”闭包“是因为
这里的变量`name`只能通过函数`myPet`进行访问，形成了一个封闭的内存空间（不能直接访问）。

当你在此调用`pet`函数时，其实会生成新的闭包：
```js
var hisPet = pet('Vivie'); //又生成了一个闭包，虽然名称一样，但是与myPet所引用的name不是一块内存空间，该内存会一直存活直到hisPet被销毁
hisPet(); // => 'Vivie'
var herPet = pet("Kitty"); //又生成了一个闭包
herPet(); // => "Kitty"
```

实际用的时候，闭包远比上面的例子复杂，一个更复杂一点的例子如：
```js
var createPet = function(name) {
    var sex;
    
    return {
        setName: function(newName) {
            name = newName;
        },
        getName: function() {
            return name;
        },
        getSex: function() {
            return sex;
        },
        setSex: function(newSex) {
            if(typeof newSex === 'string' && 
                (newSex.toLowerCase() === 'male' || newSex.toLowerCase() === 'famale')) {
                sex = newSex;
            }
        }
    }
}

var pet = createPet('Vivie');
pet.getName();                  // Vivie

pet.setName('Oliver');
pet.setSex('male');
pet.getSex();                   // male
pet.getName();                  // Oliver

var anotherPet = createPet('Kitty');
anotherPet.getName();           // Kitty
anotherPet.getSex();            // undifined 由于这是另一个闭包，sex的值没有被指定。
```
该例子中，外部函数返回的是一个对象，对象中包含了4个属性值，这些属性值都是函数，并且在这些函数中引用了外部函数
中的变量，从而形成了闭包。通过这种方式可以实现对象私有变量的功能。

另一个更凝练的例子：
```js
var getCode = (function() {
    var secureCode = "ojdswe2Ks]&di";
    return function() {
        return secureCode;
    }
}());

getCode(); // => "ojdswe2Ks]&di"
```
这个例子中通过闭包保护了`secureCode`，使得其称为只读的变量。这个例子中外部函数以及内嵌函数都是匿名函数，并且外
部函数在定义的时候就执行了。通过一个简单的例子来说明：
```js
var result = (     function square(x) { return x * x; } (2)     );
// result = 4;
```
赋值语句右边括号中包含了一个函数`square`的定义，然后在定义之后立马通过`()`进行调用并传递参数`2`，调用得到的结果
赋值给`result`。

在使用闭包时，很容易掉到坑里，如：
```js
var createPet = function(name) {
    return {
        getName: function(name) {
            return name;
        }
    }
}

var myPet = createPet('Vivie');
myPet.getName(); // =>undefined
```
`myPet.getName()`会的到`undefined`的原因在于在定义`getName`时，在`getName`中声明了一个变量`name`，根据作用域
链条，`getName`中的`name`起作用，而在调用时该变量为传递参数，因此为`undefined`。

另外还有跟`this`有关的坑，这个在之后再讨论（TODO: Add a link）。

## 使用`arguments`对象

传入函数的参数列表会存储在`arguments`对象中，该对象被称为array-like对象是因为其有length属性，以及可以通过`[]`
对`arguments`中的元素进行访问。调用函数时传入函数的第一个参数被储存在`arguments[0]`中，第二个存储在`arguments[1]`中，
以此类推。length粗存了传入的参数的总个数。

举个例子：
```js
function myConcat(separator) {
    var result = '';
    for (let i = 1; i < arguments.length; i++) {
        result += arguments[i] + separator;
    }
    return result;
}

myConcat(', ', 'red', 'orange', 'blue');
//return "red, orange, blue, "

myConcat('; ', 'elephant', 'giraffe', 'lion', 'cheetah');
//return "elephant; giraffe; lion; cheetah; "

myConcat('. ', 'sage', 'basil', 'oregano', 'pepper', 'parsley');
//return "sage. basil. oregano. pepper. parsley. "
```
通过`arguments`对象，使得在调用函数时，并不需要让传入的参数与定义时的参数个数一致。在上面例子中，第一个参数
传递给了`separator`，也会存储在`arguments[0]`中。从这里看出不管定义时参数列表是怎么样的，实际调用时的参数都
会储存在`arguments`对象中。甚至定义时参数列表为空也没有关系。当调用时传递的参数个数小于定义时参数个数，则没
有传入的参数的值为`undefined`。

## 函数参数

从ECMAScript2015开始，引入了默认参数以及rest参数。

### 默认参数

在JavaScript中，函数参数默认为`undefined`，但是在某些情况下，能设置为其他默认值是非常有用的。

在ECMAScript2015之前，实现默认参数指定方式为在函数体中对传入的参数进行判断，如果为`undefined`的
话就给定一个默认值。如：
```js
function multiply(a, b) {
    b = typeof b != 'undefined' ? b : 1;
    return a * b;
}

multiply(b); // => 5
```
通过默认参数特性，在函数体中进行判定不再需要，现在你可以简单的指定一个默认参数：
```js
function multiply(a, b = 1) {
    return a * b;
}

multiply(5); // => 5
```
**值得注意的一点**
```js
function setBackgroundColor(element, color = 'rosybrown') {
    element.style.backgroundColor = color;
}

setBackgroundColor(someDiv)             // color set to 'rosybrown'
setBackgroundColor(someDiv, undefined)  // color set to 'rosybrown' too !!
setBackgroundColor(someDiv, 'blue');    // color set to 'blue'
```
这里你可以这么理解，默认参数的赋值是在传递参数过程发生之后才进行的，只要检测到这个参数为`undefined`就会将指定
的默认参数赋值给该参数。因此虽然传递了参数，只要该参数仍然是`undefined`，在进行默认参数赋值阶段，还是会将默认
参数赋值给这个参数。

默认参数是在运行时动态取值的，因此你可以通过一个函数的返回值对参数进行默认值设置：
```js
function callSomething(thing = something()) {
    return thing;
}

function something() {
    return 'sth';
}

callSomething(); // => 'sth'
```
默认参数也可以作为后面的默认参数：
```js
function singularAutoPlural(singular, plural = singular + 's', rallyingCry = plural + ' ATTACK!!') {
    return [singular, plural, rallyingCry];
}

singularAutoPlural('Gecko'); // => ['Gecko', 'Geckos', 'Geckos ATTACK!!']

singularAutoPlural('Fox', 'Foxes'); // => ['Fox', 'Foxes', 'Foxes ATTACK!!']

singularAutoPlural('Deer', 'Deer', 'Deer peaceably and respectfully petition the government for positive change.');
```

下面是一个比较复杂一点的例子：
```js
function go() {
  return ':P';
}

function withDefaults(a, b = 5, c = b, d = go(), e = this, 
                      f = arguments, g = this.value) {
  return [a, b, c, d, e, f, g];
}

function withoutDefaults(a, b, c, d, e, f, g) {
  switch (arguments.length) {
    case 0:
      a;
    case 1:
      b = 5;
    case 2:
      c = b;
    case 3:
      d = go();
    case 4:
      e = this;
    case 5:
      f = arguments;
    case 6:
      g = this.value;
    default:
  }
  return [a, b, c, d, e, f, g];
}

withDefaults.call({value: '=^_^='});
// [undefined, 5, 5, ":P", {value:"=^_^="}, arguments, "=^_^="]


withoutDefaults.call({value: '=^_^='});
// [undefined, 5, 5, ":P", {value:"=^_^="}, arguments, "=^_^="]
```
该例子中，在调用`withDefaults.call({value: '=^_^='})`时，将函数中的`this`设置为`{value: '=^_^='}`，而`arguments.length`等于0.
因此`a`为`undefined`因为没有默认参数，而`b`为默认参数`5`，`c`为默认参数`b = 5`，`d`为函数`go()`返回值`':P'`，
`e`为`this = {value: '=^_^='}`,`f`为`arguments`，其`length`值为`0`，而`g`则为`this.value = '=^_^='`。

不同与C++，默认参数还可以这么给：
```js
function f(x = 1, y) {
    return [x, y];
}

f(); // => [1, undefined]
f(2); // => [2, undefined]
```
只是实参与形参还是一一对应。

### `rest`参数

`rest`参数可以使得定义的函数可以接收一个不定长度的参数列表, 其语法形式如下所示:
```js
function f(a, b, ...theArgs) {
    // ...
}
```
如此定义之后`theArgs`会接收多出来的参数, `theArgs`为一个数组. 例如:
```js
function multiply(multiplier, ...theArgs) {
    return theArgs.map(x => multiplier * x);
}

var arr = multiply(2, 1, 2, 3);
console.log(arr); // => [2, 4, 6]
```
`arguments`参数包含了所有的实参, 而`rest`只包含没有指定名字的实参. `arguments`不是一个数组, 
只是类似数组, 而`rest`参数是一个真正的数组.

## 箭头函数(Arrow functions)

箭头函数的语法与下所示:
```js
(param1, param2, ..., paramN) => { statements }
(param1, param2, ..., paramN) => expression
//下面的等价于(param1, param2, ..., paramN) => { return expression; }

//当只有一个形式参数时, 以下两条语句是等价的
(singleParam) => { statements }
singleParam => { statements }

//当函数没有形参, 则需要采用如下形式
() => { statements }

//以下形式将返回一个对象字面量, 对象字面量外部的括号是不可省略的
params => ({foo: bar})

//可以在箭头函数里面使用rest以及默认参数
(param1 = 1, param2, ...rest) => { statements }
```















