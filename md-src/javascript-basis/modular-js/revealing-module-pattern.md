[_metadata_:author]:- "daveying"
[_metadata_:tags]:- "JavaScript|ModularJS|Design Patterns"
[_metadata_:created-date]:- "2017-07-20 11:54pm"

# JavaScript模块化编程 -- Revealing module pattern

**Reference**
> [1] Learning JavaScript Design Patterns: [The Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)  
> [2] Modular Javascript: [A video by LearnCode.academy](https://www.youtube.com/watch?v=pOfwp6VlnlM&index=3&list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f)  
> [3] 源代码: [github.com/daveying/modular-js](https://github.com/daveying/modular-js)

# Revealing module pattern

由于对象字面量中的任何数据都能被外部访问修改，如果这个模块是要让其他用户使用的话，很可能被错误的使用，造成模块逻辑混乱。

另一种模块化思路是采用IIFE(**I**mmediately-**I**nvoked **F**unctional **E**xpression)，该种方法在[Learning JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)这本书中称为Revealing module pattern。
采用IIFE方式可以形成闭包，从而模拟出私有变量和私有方法的效果。因此解决了对象字面量的缺点。

同样以人名模块为例，采用IIFE来进行模块化。先贴出最终的代码以及运行效果。


<iframe width="100%" height="350" src="//jsfiddle.net/david_da/79hg7u24/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

该实现与上一个版本的实现的HTML和CSS都是一样的，只是JavaScript做了修改。以下是完整的JavaScript代码。


```js
var people = (function(){
    var people = ['David', 'Echo'];

    // cache DOM
    var $peopleList = $("#people-list");
    var $addButton = $("#add-button");
    var $textInput = $("#text-input");
    render();

    // bind events
    $addButton.on('click', addPerson);
    $peopleList.delegate('span.del', 'click', deletePerson);
    $peopleList.delegate('span.del', 'mouseover', changeColor);
    $peopleList.delegate('span.del', 'mouseout', changeColor);

    function render() {
        var lenPeople = people.length;
        var htmlStr = "";
        for (let i = 0; i < lenPeople; i++) {
            htmlStr += `<li><span class="name">${people[i]}</span><span class="del">&times;</span></li>`
        }
        $peopleList.html(htmlStr);
    };

    var addPerson = function (val) {
        var name = (typeof val === "string") ? val : $textInput.val();
        people.push(name);
        render();
    };

    function deletePerson (val) {
        var i;
        if (typeof val === "number") {
            i = val;
        } else {
            var $remove = $(val.target).closest('li');
            i = $peopleList.find('li').index($remove);
        }
        people.splice(i, 1);
        render();
    };

    function changeColor (event) {
        var $overred = $(event.target).closest('li');
        if (event.type === "mouseover")
            $overred.css("border-color", "red");
        else
            $overred.css("border-color", "grey");
    };
    return {
        addPerson: addPerson,
        deletePerson: deletePerson
    }
})();
```

模块的主体实际上是一个刚定义就立即被执行的匿名函数，在函数体中执行或定义模块的逻辑，然后通过返回值实现模块接口的开放。

对于模块主题的匿名函数，其结构如下：

```js
var people = (function () { /*函数体*/ })();
```
可以看出匿名函数`function () {}`刚定义就被执行，然后返回值赋值给`people`。匿名函数的返回值一般为一个对象，该对象中包含模块所要开放的接口函数。

## 私有变量效果的形成

通过IIFE的方式的好处是其生成了一个作用域，在函数中定义的变量只能在函数作用域中起作用。

```js
var name = 'Bob';
var people = (function () {
    var name = 'David';
    function sayName() {
        console.log(name);
    }

    return {
        sayName: sayName
    }
})();
console.log(name);
```

在这个简单的例子中，函数中定义的变量`name`只能在函数体中起作用,因此最后一个`console.log(name)`的输出为全局变量`'Bob'`，IIFE函数体中声明的函数`sayName`是可以访问到函数作用域中的变量的，因此函数`sayName`中访问的`name`的值为`'David'`。当这个IIFE函数执行完成后，返回值为一个对象并赋值给全局变量`people`，该对象包含一个属性`sayName`，其类型为函数。因此我们可以通过`people`调用函数体中定义的`sayName`函数。

在JavaScript中，一个变量只要有一个引用，就不会被销毁，若按照C/C++的逻辑，IIFE函数执行完毕之后，函数体中定义的变量应当被销毁，但是在JavaScript不一样，由于IIFE函数返回对象中的函数引用了IIFE中的变量`name`，因此`name`不会被销毁，并且能一直被`people.sayName`函数访问，直到`people.sayName`也被销毁为止。而由于`name`是IIFE函数作用域中的变量，除了`people.sayName`都不能访问该变量（即闭包），这样就达到了私有变量的效果，而这就是这种模式的价值所在。


```js
people.sayName() // log "David"
/*
people : Object {sayName: function}
sayName:function sayName()
__proto__:Object
*/

people.name = "Echo";
people.sayName() // log "David"
/*
people : Object {name: "Echo", sayName: function}
name:"Echo"
sayName:function sayName()
__proto__:Object
*/
```

上面例子当中，若调用`people.sayName`，会输出`'David'`而不是全局变量`'Bob'`，因为`sayName`引用的是函数体内部的`name`。既然函数外部修改`name`的值不起作用，如果通过`people`修改`name`的值会发生什么呢？如上面的例子，通过`people.name = 'Echo'`试图修改函数体中的`name`也是不起作用的，这个操作只是将返回的对象增加了一个`name`属性，而函数体的`name`变量不受影响，又因为`sayName`在函数体中定义，引用的`name`是函数体中的变量，也不可能引用返回对象中的`name`，因此`people.sayName`调用的结果仍然为`'David'`。

从上面例子也可以看出，执行`people.name = 'Echo'`前，`people`对象只有一项，而执行后`people`对象包含两项。但这并不影响`people.sayName`的输出。

弄清楚了私有变量形成的原理，再来看我们的人名模块就非常好理解了。人名模块中定义的`people`数组具有函数作用域，因此外部访问不了，也就防止了模块外程序对其直接进行修改。通过IIFE的返回值，又将能够访问人名模块中变量的两个函数返回回来，实现了模块接口的暴露。通过这两个函数，外部程序可以间接地修改人名模块中的变量，但是这种修改都是可控的修改，不会使模块逻辑混乱。

相比较于对象字面量，该种方式实现了模块的封装，并且能够提供有效接口。这就为面向对象的编程提供了基础。但是面向对象编程的另一个比较重要的方面是继承与多态。而Revealing Module Pattern对于此则毫无办法。

