# Node.js Path 模块

Node.js的Path模块主要用于处理与文件路径相关的问题，你可以通过以下方式直接包含Path模块：

```js
const path = require('path');
```

## 操作系统相关

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


## 文件路径的组成

对于一个路径`/home/user/dir/file.txt`的不同部分有不同的名称，如下所示：
```
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"  /    home/user/dir / file  .txt "
└──────┴──────────────┴──────┴─────┘
```
`dir`是指包含该文件的目录(directory)，`root`是指根目录，`base`指文件的名字以及拓展名，其由两部分组成：`name`以及`ext`。


## 处理现有路径字符串的函数

### path.basename(path[, ext])

- `path` \<string> 路径字符串
- `ext` \<string> 可选，指定文件的拓展名
- 返回: \<string> 文件的base名称

```js
path.basename('/foo/bar/baz/asdf/quux.html'); // 返回 'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html'); // 返回'quux'

// 以下情况都是需要注意的
path.basename('/foo/bar/baz/asdf/quux.html', 'html'); // 返回'quux.'

path.basename('/foo/bar/baz/'); // 返回'baz'

path.basename('/foo/bar/baz/', '.html'); // 返回'baz'
```

### path.dirname(path)

- `path` \<string> 路径字符串
- 返回: \<string> 目录名

```js
path.dirname('/foo/bar/baz/asdf/quux'); // 返回'/foo/bar/baz/asdf'

path.dirname('/foo/bar/baz/'); // 返回'/foo/bar'
```

### path.extname(path)

- `path` \<string> 路径字符串
- 返回: \<string> 拓展名

```js
path.extname('index.html');
// Returns: '.html'

path.extname('index.coffee.md');
// Returns: '.md'

path.extname('index.');
// Returns: '.'

// 无拓展名的情况下，返回空字符串
path.extname('index');
// Returns: ''

// 首字符为.的情况下也返回空字符串
path.extname('.index');
// Returns: ''
```

### path.parse(path)

- `path` \<string> 路径字符串
- 返回： \<object>

该函数返回路径的各个部分，并且将结果组合在一个对象当中。当字符串中包含多余的`path.sep`时，多余的会被去除。

返回的对象包含以下属性：

- `dir` \<string>
- `root` \<string>
- `base` \<string>
- `name` \<string>
- `ext` \<string>

```js
// 在POSIX平台上
path.parse('/home/user/dir/file.txt');
// Returns:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }

// 多余的path.sep将被去除
path.parse('/home/user/dir//file.txt');
// Returns:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }

// 在windows上
path.parse('C:\\path\\dir\\file.txt');
// Returns:
// { root: 'C:\\',
//   dir: 'C:\\path\\dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
```

### path.isAbsolute(path)








