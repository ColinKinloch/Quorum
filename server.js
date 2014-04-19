#!/bin/env node

var express = require('express');

var app = express();

var ip = "127.0.0.1";
var port = 9000;

app.use(express.logger());
app.use(express.static(__dirname + '/dist'));

app.listen(port, ip);