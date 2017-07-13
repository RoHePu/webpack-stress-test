# webpack-stress-test
This repo provides a basic webpack configuration and a program that creates as many connected JS modules as you want.
We have written this POC to find out whether our webpack setup is so slow because of our project configuration or because of the huge amount of modules that needs to be processed.

In our project we have many [strongly connected components](https://en.wikipedia.org/wiki/Strongly_connected_component). We wanted to test whether the long incremential build time has something to do with our strongly connected components. Therefore the small program in this repo allows you to create as many cycles with as many files per cycle as you want.


## installation

Jump into the repo directory and simply run `npm install`.

## create files

Run the npm command `npm run create`. 

You can specify hom many files are created by passing some flags.
`npm run create -- --files 140 --cycles 100` will create 100 cycles having 140 files each. 

All JS files have a payload you can specify in the `file_creator.js`

## using webpack

There are three standard instructions you can use to run webpack:

`npm run build` to run the webpack build.

`npm run debug` to run the webpack build with node debugger.

`npm run dev` to run the webpack-dev-server.

`npm run debug_dev` to run the webpack-dev-server with node debugger.
