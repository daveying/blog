# JavaScript模块化编程 -- Revealing module pattern

**Reference**
> [1] Learning JavaScript Design Patterns: [The Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)  
> [2] Modular Javascript: [A video by LearnCode.academy](https://www.youtube.com/watch?v=m-NYyst_tiY&index=2&list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f)  
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

## 举例介绍IIFE闭包的形成，私有变量的形成

## 分析人名模块的实现原理 




