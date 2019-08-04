# board [![Build Status](https://travis-ci.org/ddojai/board.svg?branch=master)](https://travis-ci.org/ddojai/board)

## 사용 기술
### backend
* Java 1.8
* Spring Boot
* gradle

## multi- module
``` bash 
./tree board -L 2 -d -C
board
├── gradle
│   └── wrapper
├── module-api
│   ├── build
│   ├── out
│   └── src
└── module-common
    ├── build
    ├── out
    └── src
```