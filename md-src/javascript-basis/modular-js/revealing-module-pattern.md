# JavaScript模块化编程 -- Revealing module pattern

**Reference**
> [1] Learning JavaScript Design Patterns: [The Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)  
> [2] Modular Javascript: [A video by LearnCode.academy](https://www.youtube.com/watch?v=m-NYyst_tiY&index=2&list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f)  
> [3] 源代码: [github.com/daveying/modular-js](https://github.com/daveying/modular-js)

# Revealing module pattern

由于对象字面量中的任何数据都能被外部访问修改，如果这个模块是要让其他用户使用的话，很可能被错误的使用，造成模块逻辑混乱。

另一种模块化思路是采用闭包，该种方法在[Learning JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)这本书中成为Revealing module pattern。
采用闭包可以模拟出私有变量和私有方法的效果。因此解决了对象字面量的缺点。

同样考虑人名模块，HTML以及CSS代码不变，采用闭包来进行模块化。先贴出最终的代码以及运行效果。


<iframe width="100%" height="300" src="//jsfiddle.net/david_da/79hg7u24/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

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