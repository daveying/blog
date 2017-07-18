# JavaScript模块化编程

**Reference**
> [1] JavaScript Guide: [Grammar and types](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Grammar_and_types)


不管是前端还是后端，模块化编程思想对于JavaScript开发来说都是最基本而且也非常重要的。本笔记记录几种典型的模块化编程的Pattern。

对于一个如下图所示的添加人名的模块，在输入框中输入要添加的人的人名,当点击Add Person按钮，底下就会添加一个对应于这个人的方块，实现该模块有各种不同的方式，最为直接的是采用对象字面量来处理。

![Add Person Module](https://github.com/daveying/modular-js/blob/master/pic/add-person-module.png?raw=true)

## Object literal pattern



<iframe width="100%" height="300" src="//jsfiddle.net/david_da/1a7j0oug/4/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

