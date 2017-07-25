# JavaScript模块化编程 -- Pubsub pattern

**Reference**
> [1] Learning JavaScript Design Patterns: [The Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)  
> [2] Modular Javascript: [A video by LearnCode.academy](https://www.youtube.com/watch?v=nQRXi1SVOow&list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f&index=4)  
> [3] 源代码: [github.com/daveying/modular-js](https://github.com/daveying/modular-js)

模块化的编程思路使得应用中的数据被封装隐藏，这中处理方式为我们提供了非常多的优点，但是数据的封装与隐藏实际上对模块之间的通信造成了麻烦。以如下图所示的两个模块作为例子，除了人名模块之外，还有一个状态模块，这个模块显示人名模块中人名的个数，人名模块中人名列表发生更改，状态模块也要随之更改。

![Add Person Module and Status module](https://github.com/daveying/modular-js/blob/master/pic/add-person-module-and-status-module.png?raw=true)

采用Revealing module pattern编写两个模块的代码如下所示：


<iframe width="98%" height="300" src="//jsfiddle.net/david_da/4tgvuz72/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


其中`stats`模块(取名为`stats`而不是`status`是因为在浏览器中通过`var status = {a : 'a'};`这样的语句定义得到的`status.a`为`undefined`)提供一个接口，该接口可以修改`stats`模块中显示的人数，然后每当`people`模块中人名个数发生变化的时候，调用`stats`提供的接口。这种方式对于两个模块之间的通信还是可以非常方便处理的，但是当有非常多的模块需要更新人名模块中的人数时，若采用这种方式，人名模块中必须得知所有其他相关模块的接口，假设更复杂的应用，几个模块之间相互要根据其他模块的状态更新自己的状态的时候，各个模块之间相互之间的接口调用关系将变得特别复杂，各个模块之间的高度耦合关系不利于应用的开发、测试、维护以及拓展。

为了让各个模块之间解耦，Pubsub pattern是一个非常好的解决方案。

<iframe width="100%" height="300" src="//jsfiddle.net/david_da/pvy1mh0w/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

