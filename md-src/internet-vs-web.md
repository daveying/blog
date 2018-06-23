[_metadata_:author]:- "daveying"
[_metadata_:tags]:- "Internet|Web"
[_metadata_:created-date]:- "2017-04-29 11:32pm"

# Internet VS. Web

## Internet 是如何工作的?

### Internet介绍

Internet是Web的基础设施，Internet是由大量的计算机组成的网络，这些计算机无时无刻地进行数据交换。

对于两台计算机来说，若想进行通讯，那么非常直接的想法是将其用数据线连接起来即可，如下图所示。对于目前大多数计算机设备， 大多也支持无线方式连接（如WiFi/Bluetooth等），但是对于用户来说，可以任务两种连接方式没有任何区别。

![两台计算机直连](https://mdn.mozillademos.org/files/8441/internet-schema-1.png)

但是当要处理多个计算机直接的通讯时，直连方式会出现非常大的麻烦，如下图所示，这些计算机为了亮亮互联，需要多个网络接口，并且 导线将变得非常多。这种方式也不容易拓展，加入新的计算机几乎不可能。目前计算机上网只需要一根网线即可，因此肯定不是采用这种方式。

![计算机两两互联](https://mdn.mozillademos.org/files/8443/internet-schema-2.png)

为了解决上述问题，在网络中加入了一台专门用于数据转发的计算机，即路由器(router)，如下图所示。任意计算机的数据先发送到路由器， 然后由路由器转发到正确的目的地。路由器就只有这一个工作：就是保证来自任意一台计算机的数据被转发到正确的目的地。

![路由器网络](https://mdn.mozillademos.org/files/8445/internet-schema-3.png)

引入路由器之后，网络大大简化，并且拓展起来也非常简单。若存在其他计算机网络，只需要讲这两个网络的路由器连接起来即可，如下图所示。

![两个计算机网络的连接](https://mdn.mozillademos.org/files/8447/internet-schema-4.png)

各个路由器也可以连接到同一个上级路由器组成更加复杂的网络，如下图所示。

![更复杂的计算机网络](https://mdn.mozillademos.org/files/8449/internet-schema-5.png)

上面显示的网络已经非常接近于实际的互联网了，若要将世界上所有的计算机系统连接起来，最终还是需要讲你的计算机网络与其他网络连接在 一起，这是一项庞大的工程。但是其实在互联网普及之前，已经存在着已有的网络，如电话网络以及供电网络等，为了充分利用这些硬件设施， 我们还需要一种设备对互联网的信号和电话信号相互转换，这种设备叫做modem，有了modem，就可以使用电话网络设施传输网络信息了。如下图所示。

![modem网络](https://mdn.mozillademos.org/files/8451/internet-schema-6.png)

所以我们要想接入网络时需要找电信或者联通或者移动开通网络服务，因为他们掌握着电话网络设施。像他们这些公司都是ISP(Internet Service Provider)。ISP其实管理着一些特殊的路由器，这些路由器能够跟其他ISP的路由器连接，因此你只要接入联通的ISP就可以访问世界各国的计算机。整体的网络如下图所示。

![ISP网络](https://mdn.mozillademos.org/files/8453/internet-schema-7.png)

### 如何找到互联网上特定的计算机

若要发送信息到特定计算机，你必须要指定是哪一台计算机。因此每一台连接到互联网的计算机都一个独特的地址来标识它，这个地址叫做IP地址，IP地址由４个数字组成，由点号分隔，如`192.168.2.102`。

IP地址对于计算机来说非常容易处理，但是对于人们来说是比较难记住的，因此引入了域名(Domain name)来帮助人们记忆，比如要访问Google的服务器，只需要记住google.com即可，而不需要记住其服务器的IP地址。但是你在浏览器输入域名时，浏览器是不知道这个域名对应的IP地址的，因此浏览器首先将域名发送给网络上的DNS(Domain name server)，DNS服务解析出对应的IP地址返回给浏览器，浏览器再根据这个IP地址访问特定服务器。

## Web是如何工作的

### Clients和servers

连接到Web上的计算机被称为Client或者Server。如下图为Client和Server之间进行交互的简单的示意图:

![Client和Server之间的交互](https://mdn.mozillademos.org/files/8973/Client-server.jpg)

- Client其实就是用户的连上互联网的设备以及用于访问Web的软件（如Chrome和Firefox等）
- Server是存储了网页或者网络应用的计算机，当Client设备要访问网页时，一个网页文件的副本将从Server下载到Client设备，Client设备再将网页显示在用户的浏览器中。

### 其他组件

上述的Client和Server并不是Web的全部，还有其他的组件。现在想象Web是路，在路的一端是Client，想象为你的家，在路的另一端是Server，可以想象为你要买东西的商店。
- **网络连接**：网络连接使得你能够从Web上接收／发送消息，因此这有点像你家到商店的街道。
- **TCP/IP**：TCP/IP为定义数据应该如何在Web上传送的通讯协议，这有点像交通工具，如汽车／单车等等。
- **DNS**：DNS在上面已经介绍了，DNS有点像地址本，根据商店名称找到商店实际的地址。
- **HTTP**：(Hypertext Transfer Protocol),HTTP定义了一种Client和Server直接交流的语言。
- **Component files**：一个网站是由不同种类的文件组成的，这有点像你需要买的商品的不同的组成部分。这些文件一般分为两大类：程序文件以及固定资源。程序文件如HTML文件，CSS文件，以及JavaScript文件等等。固定资源如视频文件，图像文件，音频文件以及PDF等等。

### 用浏览器访问网站时，到底发生了什么?

1. 浏览器首先访问DNS服务器，找到服务器的IP地址（找到商店的地址）
2. 浏览器发送HTTP请求到服务器，请求其发送网站文件到Client（你到商店请求购买商品）。所有在Client和Server之间传输的数据都是通过TCP/IP进行的。
3. 服务器响应客户端的请求，服务器发送给客户端一个“200 OK”消息，这代表这服务器说：“当然你可以访问这个网站，网站文件在这里，拿走”，然后服务器就会将网站文件分解为一些列的小数据包发送给客户端（商店给了你商品，你将商品带回了家）
4. 浏览器将数据包重新组装，然后将网站显示在屏幕上（商品到达你家）。

### 数据包

为什么服务其要将网站文件分解为一些列小的数据包呢？为什么不直接一次性传输给你呢？这是由于一般存在非常多的客户端同时访问网站，如果先传输完一个客户端的数据，再传送其他客户端的数据的话，等待的时间将特别长。若将其分解，就可以同时响应多个客户端，发送给多个客户端。

## Internet和Web的区别

从上述的讨论可以看出，Internet和Web其实不是一回事。Internet更多的指互联的计算机硬件设施，其中的一些计算机为web服务器，可以将网站文件发送给其中的客户端计算机。Internet是硬件设施，而Web是一种建立在Internet基础上的服务。同样的服务还包括Email和IRC（Internet relay chat）等。


**References:**

- [Mozilla MDN: How does the Internet work?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work)
- [Mozilla MDN: How the Web works?](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)

