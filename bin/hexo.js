#!/usr/bin/env node
'use strict';

const Hexo = require('hexo');
let hexo = new Hexo(`${process.cwd()}`, {
    //debug: true
});

exports.hexo = hexo;