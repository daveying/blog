[_metadata_:author]:- "daveying"
[_metadata_:tags]:- "JavaScript|Promise|JavaScript Thread"
[_metadata_:created-date]:- "2017-04-29 11:32pm"

# Promises和JavaScript线程

## Promises

`Promise`对象被用来进行异步计算。一个`Promise`代表一个值，这个值有可能现在就能获取，也有可能
在一段时间后才能获取，或者永远也不能获取到。

### 语法
```js
new Promise(/*executor*/ function(resolve, reject) { ... });
```
`Promise`的参数是一个函数（该函数是一个匿名函数，在这里称其为`executor`），`executor`是由`Promise`立即执行，
`executor`接受两个函数参数：`resolve`和`reject`，这两个函数由`Promise`模块提供，用于传递信息（在接下来的说明
中将看到这一点）。`executor`函数是在创建`Promise`对象时立即执行的，甚至在返回`Promise`对象之前就已经执行完毕。
`executor`函数通常会初始化一些异步操作，一旦这些异步操作成功完成，则调用`resolve`函数，而当在异步操作的过程中
产生了错误，则调用`reject`函数。如果异步操作发生错误，`promise`被`reject`掉的话，`executor`函数的返回值将会被
忽略。

### 用例
```js
let myFirstPromise new Promise(function (resolve, reject) {
   setTimeout(function () {
       resolve("Success!");
   }, 250);
});

myFirstPromise.then(function (successMessage) {
    console.log("Yay! " + successMessage);
});
```


**Reference**
> [1] JavaScript Reference: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
