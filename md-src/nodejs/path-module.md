# Node.js Path 模块

Node.js的Path模块主要用于处理与文件路径相关的问题，你可以通过以下方式直接包含Path模块：

```js
const path = require('path');
```

对于文件路径，在windows操作系统以及[POSIX](https://en.wikipedia.org/wiki/POSIX)标准的操作系统上表达方式是有区别的，因此在不同操作系统上使用Path模块需要注意这些差别。

以`path.basename()`举例，当传入的参数为`C:\temp\myfile.html`时，在不同的平台上运行的结果是不同的：

```js
// 在POSIX系统上
path.basename('C:\\temp\\myfile.html'); //运行结果为'C:\\temp\\myfile.html'

// 在windows系统上
path.basename('C:\\temp\\myfile.html'); //运行结果为'myfile.html'
```

为了在任意操作系统上处理windows格式的路径，并且保证获得正确的结果，可以使用`path.win32`：

```js
path.win32.basename('C:\\temp\\myfile.html'); //运行结果为'myfile.html'
// 由于指定了路径格式，因此在任何操作系统上运行可以得到相同的结果
```

同样，为了在任意操作系统上处理POSIX格式的路径，可以使用`path.posix`：
```js
path.posix.basename('/tmp/myfile.html'); //运行结果为'myfile.html'
```

另外不同的操作系统中路径之间的界定符是不一样的，比如在POSIX机器上运行以下代码：

```js
console.log(process.env.PATH);
// 输出 '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'

process.env.PATH.split(path.delimiter);
// 返回 ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']
```

同样的代码运行在windows下：

```js
console.log(process.env.PATH);
// 输出 'C:\Windows\system32;C:\Windows;C:\Program Files\node\'

process.env.PATH.split(path.delimiter);
// 返回 ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\']
```

可以看出，windows下路径是通过`;`区隔的，而在POSIX机器中，是通过`:`区隔的，但是不管在什么平台上运行：
```js
process.env.PATH.split(path.delimiter);
```
其运行的结果都是一样的，这是由于path模块帮我们处理好了这种情况，在windows下读取`path.delimiter`的值为`;`，而在POSIX机器中读取`path.delimiter`的值为`:`。

另外一个与操作系统有关的变量是`path.sep`，其代表了区隔上下级目录的符号，因此在windows下读取`path.sep`的值应为`\\`，在POSIX平台下读取的值应为`/`。


当然，当你通过`path.win32`或`path.posix`对`sep`进行取值时，其值与程序运行的平台无关。




