[_metadata_:author]:- "daveying"
[_metadata_:tags]:- "C/C++|链接与加载|链接共享库|目标文件结构"
[_metadata_:created-date]:- "2018-08-26 11:30am"

# C代码的链接与加载

高级编程语言向下封装了底层机器的运行细节，并向上暴露出简单而又完整的操纵底层机器的接口(各种语句语法)，使得我们可以只学习语言本身的概念就可以操纵计算机实现简单的应用程序，完成简单的任务。但是如果想要实现大型复杂的任务，或者想要对程序进行调优的时候，往往需要了解程序从编写到被机器执行之间到底发生了什么。我们都知道C/C++代码需要经过预处理器，编译器，汇编器以及链接器生成目标文件(机器代码)，然后会被操作系统的加载器加载到内存并执行。**本文主要阐述其中的链接和加载过程，阐述目标文件的分类以及文件结构，阐述目标文件在内存中的运行时印像，并拓展出C语言中的作用域规则的实现以及共享库的知识。**

## 编译器驱动程序

**编译器驱动程序**(compiler driver)是用来将C代码编译为**目标文件**的程序，其包含**预处理器**，**编译器**，**汇编器**和**链接器**。预处理器负责C代码的预处理工作，比如解析宏语句等，生成最终的C文件(其后缀为`.i`)。编译器将所有的`.i`文件翻译为一个ASCII汇编语言文件`.s`，然后汇编器将`.s`文件翻译为一个**可重定位目标文件**`.o`文件。最后链接器将所有的`.o`文件链接为一个**可执行目标文件**。在Linux shell中执行该文件时，shell调用操作系统中一个叫做**加载器**(loader)的函数，它将可执行目标文件中的代码和数据复制到内存中，并将控制转移到这个程序的开头。

编译驱动程序中，编译器和汇编器与机器和操作系统密切相关，而预处理器和链接器与操作系统没有太多关联。当然不同的操作系统中的链接器所面对的目标文件的格式是不一样的。

## 目标文件

目标文件有三种形式：

1. **可重定位目标文件**：包含二进制代码和数据，其形式可以在编译时与其他可重定位目标文件合并起来，创建一个可执行目标文件。(`.o`文件及静态链接库)
2. **可执行目标文件**：包含二进制代码和数据，其形式可以被直接复制到内存并执行。
3. **共享目标文件**：一种特殊类型的**可重定位目标文件**，可以在加载或者运行时被动态地加载进内存并链接。(动态链接库)

编译器和汇编器生成可重定位目标文件(包括共享目标文件)。链接器生成可执行目标文件。C语言是通过文件来划分模块的，一个文件会被编译为一个**目标模块**(object module)，一个目标模块实际上就是一个字节序列，而一个目标文件就是一个以文件形式存放在磁盘中的目标模块。不过，这两个术语可以互换地使用。

本文讨论基于的环境为Linux x86-64系统，使用标准的ELF-64(Executable and Linkable Format, 可执行可链接格式)**目标文件**格式。每个系统的目标文件格式都不相同，从贝尔实验室诞生的第一个Unix系统使用的是a.out格式，直到今天，可执行文件的默认文件名仍然是`a.out`(需要注意Linux下的a.out文件仍然是ELF格式，只是文件名沿用了)。Windows下使用**可移植可执行格式**(Portable Executable, PE)。而MacOS-X使用Mach-O格式。不过不管是哪个系统哪种格式，基本的概念是相同的。

## 什么是链接

**链接**(linking)是将各种代码和数据片段收集并组合成为一个单一文件的过程，这个文件可以被**加载**到内存并执行。链接可以在**编译时**(compile time)执行，也可以在**加载时**(load time)执行，甚至还可以在**运行时**(run time)执行。在早期的计算机系统中，链接是手动完成的，在现代系统中，链接是由**链接器**(linker)自动完成的。

链接器的输入为一组可重定位目标文件，输出为一个完全链接的、可以加载和运行的可执行目标文件。为了构造可执行文件，链接器必须完成两个主要任务：

1. **符号解析(symbol resolution)**：目标文件中定义了一系列符号，也引用了一系列符号，每个符号对应于一个函数、一个全局变量或一个静态变量。符号解析的目的是将每个符号引用和相应的一个符号定义关联起来。
2. **重定位(relocation)**：编译器和汇编器生成的代码节和数据节是从地址0开始的，在链接各个目标模块时(合并各个目标模块的代码节和数据节)，需要对符号的内存地址重定位，并且需要修改所有引用的内存地址。

可以用一个例子来小结以上的内容。以下是一个包含两个源文件的示例程序：

文件main.c
```c++
void swap();

int buf[2] = {1, 2};
int main() {
    swap();
    return 0;
}
```

文件swap.c
```c++
extern int buf[];

int *bufp0 = &buf[0];
int *bufp1;

void swap() {
    int temp;

    bufp1 = &buf[1];
    temp = *bufp0;
    *bufp0 = *bufp1;
    *bufp1 = temp;
}
```

要想将其编译为一个可执行目标文件需要首先预处理器、编译器以及汇编器生成可重定位目标文件`main.o`以及`swap.o`，然后再通过链接器进行符号解析以及符号重定位将`main.o`以及`swap.o`合并为一个完全链接的、可以加载和运行的可执行目标文件。下图显示了该过程：

![Static Linking](/pictures/static-linking.png)

(_Image source: Computer Systems - A Programmer's Perspective_)

为了阐述链接过程，对于目标文件的格式需要有一个大概的了解，下面这一节就来介绍各种目标文件的格式。

## 可重定位目标文件

下图展示了一个典型ELF可重定位目标文件的格式：

![ELF relocatable object file](/pictures/ELF-relocatable-object-file.png)

(_Image source: Computer Systems - A Programmer's Perspective_)

ELF header以一个16字节的序列开始，这个序列描述了生成该文件的系统的字的大小和字节顺序。ELF header剩下的部分包含帮助链接器语法分析和解释目标文件的信息，其中包含ELF header的大小、目标文件类型、机器类型、节头部表(section header table)的偏移，以及节头部表中条目的大小和数量。夹在ELF header和section header table之间的都是节(section)。

通过以下命令可以生成`main.c`的可重定位目标文件`main.o`：
```bash
gcc -c main.c
```
然后通过`readelf`工具可以查看`main.o`中的内容：
```bash
user@user-ubuntu:~/learn$ readelf main.o -a
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              REL (Relocatable file)
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x0
  Start of program headers:          0 (bytes into file)
  Start of section headers:          640 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           0 (bytes)
  Number of program headers:         0
  Size of section headers:           64 (bytes)
  Number of section headers:         12
  Section header string table index: 9

Section Headers:
  [Nr] Name              Type             Address           Offset
       Size              EntSize          Flags  Link  Info  Align
  [ 0]                   NULL             0000000000000000  00000000
       0000000000000000  0000000000000000           0     0     0
  [ 1] .text             PROGBITS         0000000000000000  00000040
       0000000000000015  0000000000000000  AX       0     0     1
  [ 2] .rela.text        RELA             0000000000000000  000001f0
       0000000000000018  0000000000000018   I      10     1     8
  [ 3] .data             PROGBITS         0000000000000000  00000058
       0000000000000008  0000000000000000  WA       0     0     8
  [ 4] .bss              NOBITS           0000000000000000  00000060
       0000000000000000  0000000000000000  WA       0     0     1
  [ 5] .comment          PROGBITS         0000000000000000  00000060
       0000000000000036  0000000000000001  MS       0     0     1
  [ 6] .note.GNU-stack   PROGBITS         0000000000000000  00000096
       0000000000000000  0000000000000000           0     0     1
  [ 7] .eh_frame         PROGBITS         0000000000000000  00000098
       0000000000000038  0000000000000000   A       0     0     8
  [ 8] .rela.eh_frame    RELA             0000000000000000  00000208
       0000000000000018  0000000000000018   I      10     7     8
  [ 9] .shstrtab         STRTAB           0000000000000000  00000220
       0000000000000059  0000000000000000           0     0     1
  [10] .symtab           SYMTAB           0000000000000000  000000d0
       0000000000000108  0000000000000018          11     8     8
  [11] .strtab           STRTAB           0000000000000000  000001d8
       0000000000000016  0000000000000000           0     0     1
Key to Flags:
  W (write), A (alloc), X (execute), M (merge), S (strings), l (large)
  I (info), L (link order), G (group), T (TLS), E (exclude), x (unknown)
  O (extra OS processing required) o (OS specific), p (processor specific)

There are no section groups in this file.

There are no program headers in this file.

Relocation section '.rela.text' at offset 0x1f0 contains 1 entries:
  Offset          Info           Type           Sym. Value    Sym. Name + Addend
00000000000a  000a00000002 R_X86_64_PC32     0000000000000000 swap - 4

Relocation section '.rela.eh_frame' at offset 0x208 contains 1 entries:
  Offset          Info           Type           Sym. Value    Sym. Name + Addend
000000000020  000200000002 R_X86_64_PC32     0000000000000000 .text + 0

The decoding of unwind sections for machine type Advanced Micro Devices X86-64 is not currently supported.

Symbol table '.symtab' contains 11 entries:
   Num:    Value          Size Type    Bind   Vis      Ndx Name
     0: 0000000000000000     0 NOTYPE  LOCAL  DEFAULT  UND
     1: 0000000000000000     0 FILE    LOCAL  DEFAULT  ABS main.c
     2: 0000000000000000     0 SECTION LOCAL  DEFAULT    1
     3: 0000000000000000     0 SECTION LOCAL  DEFAULT    3
     4: 0000000000000000     0 SECTION LOCAL  DEFAULT    4
     5: 0000000000000000     0 SECTION LOCAL  DEFAULT    6
     6: 0000000000000000     0 SECTION LOCAL  DEFAULT    7
     7: 0000000000000000     0 SECTION LOCAL  DEFAULT    5
     8: 0000000000000000     8 OBJECT  GLOBAL DEFAULT    3 buf
     9: 0000000000000000    21 FUNC    GLOBAL DEFAULT    1 main
    10: 0000000000000000     0 NOTYPE  GLOBAL DEFAULT  UND swap

No version information found in this file.
```

通过`readelf`可以方便地查看ELF header信息，Section header table信息以及Symbol table。

**References:**

- [Computer Systems - A Programmer's Perspective 3rd Edition](http://csapp.cs.cmu.edu/3e/home.html)
