/* eslint-disable */
'use strict';

require('symbol-observable')
var Observable = require('zen-observable')

var root = global || window || this

root.Observable = Observable
