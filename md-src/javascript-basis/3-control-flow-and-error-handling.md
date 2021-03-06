[_metadata_:author]:- "daveying"
[_metadata_:tags]:- "JavaScript"
[_metadata_:created-date]:- "2017-04-29 11:32pm"

# 流程控制以及异常处理

## 语句块(Block statement)

最基本的语句是语句块，其用来将一些列语句组合起来。语句块是通过花括号`{}`来与其他语句分隔的。

```js
{
    statement_1;
    statement_2;
    .
    .
    .
    statement_n;
}
```
在流程控制语句中，语句块被大量使用。比如`if`,`for`,`while`等。

```js
while (x < 10) {
    x++;
}
```
**提醒**：在ECMAScript2015之前是没有块作用域的。在语句块中引入的变量具有全局作用域(块不在函数内部)
或者函数作用域(块在函数内部)。在ECMAScript2015之后，若要利用块作用域，需要用关键词`let`对变量进行
声明。用`var`进行声明仍然不是块作用域。
```js
var x = 1;
{
    var x = 2; //不是块作用域
}
console.log(x); // 2

let y = 1;
{
    let y = 2; //块作用域
}
console.log(y); // 1

var z = 1;
{
    let z = 2;  //块作用域
}
console.log(z); // 1
```
这与C或者Java是有很大的不同的。

## 条件语句

JavaScript提供了两种条件语句`if...else`以及`switch`。

### `if...else`语句

`if...else`语句如下所示
```js
if (condition) {
    statement_1;
} else {
    statement_2;
}
```
其基本逻辑为，如果`condition`被判定为`true`，则执行`statement_1`，否则执行`statement_2`。

有时也会使用`else if`来执行多重顺序条件判定：
```js
if (condition_1) {
    statement_1;
} else if (condition_2) {
    statement_2;
} else if (condition_n) {
    statement_n;
} else {
    statement_last;
}
```
这种情况下，只有第一个被判定为`true`的条件下的语句块会被执行。例如，`condition_2`判定为`true`，则只有
`statement_2`会被执行。条件语句是可以嵌套的。

### Falsy values

在JavaScript中，以下值在逻辑运算上下文中会被判定为`false`：
- false
- undefined
- null
- 0
- NaN
- 空字符串：""

所有其他的值，包括所有的object，都会被判定为`true`。这就会出现一个非常有意思的现象：
```js
var b = new Boolean(false);     // 创建一个Boolean对象，该对象的值为false
if (b) {}                       // b 在这里会被判定为true, 因为b是一个object
if (b == false) {}      // 该条件会被判定为true，因为==不检查类型，而b是可以转换为false的
if (b === false) {}     // 该条件会被判定为false，因为===检查类型，b的类型为object，而false的类型为boolean
```
**提醒**：Boolean对象的类型为`object`，而`Boolean.valueOf()`返回的值的类型为`boolean`。
```js
var b = new Boolean(false);
typeof b;                   // "object"
typeof b.valueOf();         // "boolean"
```
**应避免使用Boolean对象！**

### `switch`语句

`switch`语句的形式如下所示：
```js
switch (expression) {
    case label_1:
        statements_1;
        [break;]
    case label_2:
        statements_2;
        [break;]
        ...
    default:
        statements_def;
        [break;]
}
```
`switch`的逻辑是先计算`expression`的值，然后将这个值与`case`列表中的`label`比对，如果`expression`和
`case`中的值一致，则执行该`case`下的语句，直到遇到`break`语句。也就是说如果该`case`下没有`break`语句，
则会接着执行下一个`case`下的语句，直到遇到`break`为止。若`expression`没有与任一个`label`相等，则执行
`default`下对应的语句块。若没有提供`default`，则`switch`中的语句不会得到执行。例如：
```js
switch (fruittype) {
  case 'Oranges':
    console.log('Oranges are $0.59 a pound.');
    break;
  case 'Apples':
    console.log('Apples are $0.32 a pound.');
    break;
  case 'Bananas':
    console.log('Bananas are $0.48 a pound.');
    break;
  case 'Cherries':
    console.log('Cherries are $3.00 a pound.');
    break;
  case 'Mangoes':
    console.log('Mangoes are $0.56 a pound.');
    break;
  case 'Papayas':
    console.log('Mangoes and papayas are $2.79 a pound.');
    break;
  default:
   console.log('Sorry, we are out of ' + fruittype + '.');
}
console.log("Is there anything else you'd like?");
```
## 异常处理语句

异常处理分为两部分，你可以利用`throw`语句来抛出一个异常，然后用`try...catch`语句来处理抛出的异常。
- `throw`语句
- `try...catch`语句

### 异常的种类

JavaScript可以抛出任意对象作为异常，但是不是所有的对象能产生相同的效果。尽管抛出数值或者字符串作为
错误信息十分常见，但是用下列专门用来处理异常的异常类型来创建异常会更加高效。
- [ECMAScript exceptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types)
- [DOMException](https://developer.mozilla.org/en-US/docs/Web/API/DOMException)和[DOMError](https://developer.mozilla.org/en-US/docs/Web/API/DOMError)

### `throw`语句

`throw`语句非常简单,`expression`中包含了你要抛出的信息。
```js
throw expression;
```
你可以抛出任何表达式，如下所示：
```js
throw 'Error2'; //string
throw 42;       //number
throw true;     //boolean
throw {toString: function() { return "I'm an object!"; } }; //object
```
你可以指定一个object作为异常抛出，然后你就可以在`catch`语句中对这个object的属性进行读取。
以下是一个例子，该例子创建了一个`UserException`，并且将其用`throw`语句抛出。
```js
// Create an object type UserException
function UserException(message) {
  this.message = message;
  this.name = 'UserException';
}

// Make the exception convert to a pretty string when used as a string 
// (e.g. by the error console)
UserException.prototype.toString = function() {
  return this.name + ': "' + this.message + '"';
}

// Create an instance of the object type and throw it
throw new UserException('Value too high');
```
### `try...catch`语句

`try`语句块中包含了一些列需要执行的代码，若这些代码中抛出了异常，`catch`语句会捕捉到这个异常，并对其
进行处理。如果`try`语句块中没有抛出异常，则`catch`语句块将不会执行。

以下代码利用了`try...catch`语句，该段代码在`try`语句块中运行了`getMonthName()`，当`myMonth`超出了12，则
`getMonthName()`会抛出一个异常，该异常会被`catch`捕捉到，然后在`catch`语句块中处理该异常。
```js
function getMonthName(mo) {
    mo = mo - 1;
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (months[mo]) {
        return months[mo];
    } else {
        throw 'InvalidMonthNo';
    }
}

try {
    monthName = getMonthName(myMonth);
} catch (e) {
    momthName = 'unknown';
    logMyErrors(e); //将抛出的异常传递到异常处理函数，这个函数是自定义的函数
}
```
`catch`语句中的`e`就是抛出的对象，该对象只有在`catch`语句块中有效。对于作为异常的对象：
```js
var a = 33; // 等价于window.a = 33
try {
    throw window;
} catch (e) {
    console.log('1.', e.a); //输出 33
    e.a = 22;
    console.log('2.', e.a); //输出 22
}

console.log('3.', a);     //输出 22，这里是因为在catch里面a被修改了

/* 输出
1. 33
2. 22
3. 22
*/
```
与`try...catch`配套的，还有一个`finally`语句，`finally`语句块包含了在`try...catch`语句执行之后
而在其他语句执行之前的语句，如果抛出了一个异常，就算没有异常处理，`finally`语句块也会执行。如下例
所示：
```js
openFile();
try {
    writeMyFile(theData);
} catch (e) {
    handleError(e);
} finally {
    closeMyFile();
}
```
如果在文件打开的情况下抛出了异常，则`finally`保证了在程序崩溃之前关闭文件。

如果在`finally`语句中返回了一个值，这个值将变为整个`try-catch-finally`语句块的返回值。
```js
function f() {
    try {
        console.log(0);
        throw 'bogus';
    } catch (e) {
        console.log(1);
        return true;        //在finally执行完之前，该return被挂起
        
        console.log(2);     //不能被执行
    } finally {
        console.log(3);
        return false;       //导致try-catch-finally语句从此返回，catch中挂起的语句得不到执行
        console.log(4);     //不能被执行
    }
    console.log(5);
}
f();
/* 输出
0
1
3
return false
*/
```
对于`catch`中抛出的异常，`finally`也能重写。**仔细看这两个例子！**
```js
function f() {
    try {
        throw 'bogus';
    } catch (e) {
        console.log('caught inner "bogus"');
        throw e; //在finally执行完成之前，throw被挂起，若finally中有return语句，该
                 //异常不会被抛出
    } finally {
        return false; //导致try-catch-finally语句从此返回，catch中挂起的语句得不到执行
    }
}

try {
    f();
} catch (e) {
    console.log('caught outer "bogus"');
}
/*当finally语句块中有return语句，则输出
caught inner "bogus"
*/
```
```js
function f() {
    try {
        throw 'bogus';
    } catch (e) {
        console.log('caught inner "bogus"');
        throw e; //在finally执行完成之前，throw被挂起，若finally中有return语句，该
                 //异常不会被抛出
    } finally {
        console.log("inner finally statement"); //执行完finally语句块之后，由于没有返回
                                                //将继续返回catch语句块执行挂起的语句，因此
                                                //异常将被抛出
    }
}

try {
    f();
} catch (e) {
    console.log('caught outer "bogus"');
}
/*当finally语句块中没有return语句，则输出
caught inner "bogus"
inner finally statement
caught outer "bogus"
*/
```
`try-catch-finally`语句块还可以嵌套，抛出的异常只会被捕捉一次，然后就会消失。
抛出的异常会被离得最近的`catch`语句块捕捉到。更多的说明可以参考[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#Nested_try-blocks)。

### 使用异常对象(Utilizing Error object)

借助与异常对象，你可以使用其中的`name`属性和`message`属性来获得异常的更多的信息。`name`提供了
异常的的类型（比如`DOMException`或者`Error`），而`message`提供了一些对于异常的简洁的描述性的信息，
其可以转换为字符串。

如果你要抛出你自定义的异常，为了充分利用这些优点，你可以使用`Error`构造函数。
```js
function doSomethingErrorProne() {
    if (ourCodeMakeAMistage()) {
        throw (new Error('Did something bad'));
    } else {
        doSomethingToGetAJavaScriptError();
    }
}

try {
    doSomethingErrorProne();
} catch (e) {
    console.log(e.name);  // logs 'Error'
    console.log(e.message); // logs 'Did something bad' or a JavaScript error message
}
```


**Reference**
> [1] JavaScript Guide: [Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)












