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

一个简单的`pubsub`模块如下所示。`pubsub`是publisher和subscriber的简称，字面意思就是发布-订阅模式。在具体实践中，Publisher只负责发布消息，不管其他模块会对这个消息做如何处理，Subscriber只负责对消息做出相应的反应即可。这样其实就实现了各个模块之间的解耦。发布-订阅模式也被成为`events`模式，两则没有本质的区别，只是publisher被视为事件的触发者，而subscriber被视为事件的响应者。

```js
var events = (function () {
    var events = {};
    function on(eventName, fn) {
        events[eventName] = events[eventName] || [];
        events[eventName].push(fn);
    };

    function off(eventName, fn) {
        if (events[eventName]) {
            var lenE = events[eventName].length;
            for (var i = 0; i < lenE; i++) {
                if (events[eventName][i] === fn) {
                    events[eventName].splice(i, 1)
                    break;
                }
            }
        }
    };
    function emit(eventName, data) {
        if (events[eventName]) {
            events[eventName].forEach(function(fn) {
                fn(data);
            });
        }
    }
    return {
        on: on,
        off: off,
        emit: emit
    }
})();
```

在这个简单的`pubsub`或者说`events`模块中，有一个事件列表，该表中存储注册的事件以及对应于该事件的处理函数。调用函数`on`将注册到一个特定的事件上，比如在本例`stats`模块就注册到了`peopleChange`事件，注册时需要提供一个事件处理函数，这个函数会在`peopleChang`被触发时得到执行。调用`off`函数会取消原本注册到特定事件的事件处理函数。而`emit`函数则用来触发特定事件，如`people`模块，一旦人名列表中个数发生改变则触发`peopleChange`事件，使得注册到该事件上的所有事件处理函数得到执行。通过这种方式各个模块可以实现解耦协作。




