# JavaScript模块化编程

**Reference**
> [1] Learning JavaScript Design Patterns: [The Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)  
> [2] Modular Javascript: [A video by LearnCode.academy](https://www.youtube.com/watch?v=m-NYyst_tiY&index=2&list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f)


不管是前端还是后端，模块化编程思想对于JavaScript开发来说都是最基本而且也非常重要的。本笔记记录几种典型的模块化编程的Pattern。

对于一个如下图所示的添加人名的模块，在输入框中输入要添加的人的人名,当点击Add Person按钮，底下就会添加一个对应于这个人的方块，实现该模块有各种不同的方式，最为直接的是采用对象字面量来处理。

![Add Person Module](https://github.com/daveying/modular-js/blob/master/pic/add-person-module.png?raw=true)


## Object literal pattern

使用对象字面量可以实现对一组相关联的数据、资源以及相应的操作函数进行组合。对于上述模块，人名列表即是要管理的数据，而资源则是输入框、按钮以及显示框等html DOM元素，而相应的函数则是事件的回调函数以及与模块初始化函数。

先给出最终的完整代码以及运行结果：

<iframe width="100%" height="300" src="//jsfiddle.net/david_da/1a7j0oug/5/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

现在来具体分析。该模块所要管理的数据其实就是人名列表，对于每个人名，在HTML`#people-list`中对应一个`li`元素。当人名列表发生变化时，重新生成对应于新列表的`ul`。改变人名列表的方式有两个，一种通过点击Add Person添加一个人名，另一种是通过点击人名框中的`x`删除对应的人名。与该模块相关的DOM资源有输入框`#text-input`、按钮`#add-button`以及人名框列表`#people-list`。这些DOM资源在模块初始化的时候通过jQuery获取。


```js
var people = {
    people: [],
    init: function () {
        this.$peopleList = $("#people-list");
        this.$addButton = $("#add-button");
        this.$textInput = $("#text-input");
        this.bindEvents();
        this.render();
    },
    bindEvents: function () {
        this.$addButton.on('click', this.addPerson.bind(this));
        this.$peopleList.delegate('span.del', 'click', this.deletePerson.bind(this));
        this.$peopleList.delegate('span.del', 'mouseover', this.changeColor.bind(this));
        this.$peopleList.delegate('span.del', 'mouseout', this.changeColor.bind(this));
    },
    render: function () {
        var lenPeople = this.people.length;
        var htmlStr = "";
        for (let i = 0; i < lenPeople; i++) {
            htmlStr += `<li><span class="name">${this.people[i]}</span><span class="del">&times;</span></li>`
        }
        this.$peopleList.html(htmlStr);
    },
    addPerson: function () {
        if (this.$textInput.val() === '') return;
        this.people.push(this.$textInput.val());
        this.render();
        this.$textInput.val("");
    },
    deletePerson: function (event) {
        var $remove = $(event.target).closest('li');
        var i = this.$peopleList.find('li').index($remove);
        this.people.splice(i, 1);
        this.render();
    },
    changeColor: function (event) {
        var $overred = $(event.target).closest('li');
        if (event.type === "mouseover")
            $overred.css("border-color", "red");
        else
            $overred.css("border-color", "grey");
    }
}
people.init();
```

以上是完整的JS代码， 人名列表用一个数组表示，然后在`init`函数中获取所有相关的DOM资源，并且储存起来，然后就是为这些资源绑定事件的回调函数，绑定事件在函数`bindEvent`中完成，分别是要绑定`#add-button`的点击事件、以及每个`li`中`class="del"`的`span`元素(即`x`对应的span)的点击事件。为了实现当光标放在`x`上时整个人名框的边框变为红色，以提醒对`x`的点击操作具有危险性，还需要绑定`mouseover`以及`mouseout`事件。这些事件所绑定的回调函数也放在这个对象当中，分别为`addPerson`、`deletePerson`以及`changeColor`函数。`addPerson`以及`deletePerson`仅仅对对象中的`people`数组进行更改，更改结束后调用`render`函数重新生成对应的`li`。

对于`render`函数只做一件事情，那就是根据`people`数组生成对应的`li`。

对于颜色的修改，只需要对`li`的css属性值进行修改即可。

在对象外，只需要调用`people.init()`则整个模块就能正常工作了。这种方式是直接简单，但是也有非常明显的缺点，对象的数据可以任意地修改，若要将这种模块作为产品发布，由于用户的行为不可预测，不正常的使用这个模块都将产生严重的逻辑混乱。
