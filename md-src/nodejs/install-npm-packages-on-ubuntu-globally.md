# 在Ubuntu为特定用户安装全局NodeJS包

在Ubuntu上通过NPM以全局方式安装NodeJS包时经常出现与路径访问权限的问题：

```bash
$ npm install --global any-nodejs-package
```
当执行以上命令时，会出现例如`EPERM`或`EACCESS`的错误，根本原因在于执行以上命令需要向当前用户没有写权限的路径写入文件，因此Ubuntu系统会阻止该操作。

最直观的解决方案时在命令前冠以`sudo`，使得`npm`命令能往这些路径写入文件，但是这种方式不是最鲁棒的方式。

另一种方式则是让`npm`将安装包文件写入当前用户能访问的路径。其实就是为当前用户安装全局NodeJS包，其他用户是不能访问这些包的。

## 具体步骤

#### 1. 创建一个存放全局NodeJS包的路径

```bash
mkdir "${HOME}/.npm-packages"
```
`${HOME}`为当前用户的home路径，在Ubuntu下一般为`/home/username/`。

#### 2. 告诉`npm`存放全局NodeJS包的路径

方法是在`~/.npmrc`文件中加入一行：

```bash
prefix=${HOME}/.npm-packages
```

#### 3. 确保`npm`可以找到已安装的NodeJS包以及相应的man帮助文档

方法是在`.bashrc`中加入以下内容，`.bashrc`一般在你home目录下。

```bash
NPM_PACKAGES="${HOME}/.npm-packages"

PATH="$NPM_PACKAGES/bin:$PATH"

# Unset manpath so we can inherit from /etc/manpath via the `manpath` command
unset MANPATH # delete if you already modified MANPATH elsewhere in your config
export MANPATH="$NPM_PACKAGES/share/man:$(manpath)"
```

#### 4. 让设置立即生效

让设置生效的方式之一是重新打开一个新的Terminal，再重新运行`npm`安装命令。或者在当前Terminal中运行：

```bash
source ~/.bashrc
```
然后再运行`npm`安装命令即可。安装结束后，你可以去`~/.npm-packages/bin/`路径下查看已安装的NodeJS程序包。

经过以上的设置后，之后再安装`npm`包时就会直接安装到`${HOME}/.npm-packages`目录下了，也就不会再出现访问权限错误了。

