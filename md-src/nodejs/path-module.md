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

- `path` \<string>
- Return: \<boolean>

该函数用于判断给定的路径是否是绝对路径。 如果给定的路径字符串长度为0，将返回`false`。

对于POSIX平台：
```js
path.isAbsolute('/foo/bar'); // true
path.isAbsolute('/baz/..'); // true
path.isAbsolute('qux/'); // false
path.isAbsolute('.'); // false
```
对于window平台：
```js
path.isAbsolute('//server');    // true
path.isAbsolute('\\\\server');  // true
path.isAbsolute('C:/foo/..');   // true
path.isAbsolute('C:\\foo\\..'); // true
path.isAbsolute('bar\\baz');    // false
path.isAbsolute('bar/baz');     // false
path.isAbsolute('.');           // false
```

## 用于生成特定路径字符串的函数

### path.format(pathObject)
- `pathObject`: \<Object>
    - `dir`: \<string>
    - `root`: \<string>
    - `base`: \<string>
    - `name`: \<string>
    - `ext`: \<string>
- 返回：\<string>

给定一个对象，根据该对象提供的信息生成一个路径字符串。

`pathObject`对象中提供的信息是有冗余的，当相互之间发生冲突的时候，是有优先级的：

- 当`pathObject.dir`提供了的时候，`pathObject.root`中的信息将被忽略。
- 当`pathObject.base`提供了的时候，`pathObject.name`和`pathObject.ext`将被忽略。

例如：
```js
// If `dir`, `root` and `base` are provided,
// `${dir}${path.sep}${base}`
// will be returned. `root` is ignored.
path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt'
});
// Returns: '/home/user/dir/file.txt'

// `root` will be used if `dir` is not specified.
// If only `root` is provided or `dir` is equal to `root` then the
// platform separator will not be included. `ext` will be ignored.
path.format({
  root: '/',
  base: 'file.txt',
  ext: 'ignored'
});
// Returns: '/file.txt'

// `name` + `ext` will be used if `base` is not specified.
path.format({
  root: '/',
  name: 'file',
  ext: '.txt'
});
// Returns: '/file.txt'

// On windows
path.format({
  dir: 'C:\\path\\dir',
  base: 'file.txt'
});
// Returns: 'C:\\path\\dir\\file.txt'
```
### path.resolve([...paths])

- `...path`: \<string>　一系列的路径或路径片段
- 返回：\<string>

该函数将一些了路径组合为一个绝对路径字符串。

函数将从给定的最右端的字符串开始处理，直到生成一个绝对路径后停止。例如：
```js
path.resolve('/foo', '/bar', 'baze'); // 返回：'/bar/baze'
//　从右往左，与'/bar'进行组合后就形成了绝对路径，因此不会再与第一个参数组合
```

当所有给定的路径都组合完了，还是没有获得绝对路径，则当前路径将被使用（即程序运行的路径）。

参数中的空字符串将被忽略，若没有参数传递进入函数，则当前程序运行路径将被返回。

```js
path.resolve('/foo/bar', './baz');
// Returns: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// Returns: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// if the current working directory is /home/myself/node,
// this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

### path.normalize(path)

- `path` \<string>
- 返回：\<string>

`path.normalize()`对给定的字符串进行归一化处理，去除多余的`path.sep`，并且解析`'..'`以及`'.'`。

```js
path.normalize('/foo/bar//baz/asdf/quux/..');
// Returns: '/foo/bar/baz/asdf'
```
```js
path.normalize('C:\\temp\\\\foo\\bar\\..\\');
// Returns: 'C:\\temp\\foo\\'
```
在Windows下即支持`\`也支持`/`，因此：
```js
path.win32.normalize('C:////temp\\\\/\\/\\/foo/bar');
// Returns: 'C:\\temp\\foo\\bar'
```

### path.join([...paths])
- `...paths` \<string>　一系列路径片段
- 返回：　\<string>

该函数用`path.sep`将各个片段连起来，然后调用`path.normalize()`将多余的`path.sep`去除，并且解析字符串中的`'..'`以及`'.'`。

长度为０的字符串将被忽略，若没有参数传入，将返回`'.'`。
```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'

path.join('foo', {}, 'bar');
// throws 'TypeError: Path must be a string. Received {}'
```

### path.relative(from, to)

- `from` \<string>
- `to` \<string>
- 返回：\<string>

该函数返回从`from`到`to`的相对路径，即在`from`路径下使用`cd returnedStr`就可以切换到`to`路径。函数具体的实现过程是分别通过`path.resolve()`函数将两个路径转换为绝对路径（因此有可能包含当前工作路径），然后在进行比较。当比较结束后在同一个路径，则返回空字符串，如果其中一个参数为空字符串，则会使用当前路径（`path.resolve('')`的结果）。

```js
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
// Returns: '../../impl/bbb'

path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb');
// Returns: '..\\..\\impl\\bbb'
```