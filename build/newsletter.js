module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var wt = __webpack_require__(1);
	var app = __webpack_require__(2);
	var RESPONSE = __webpack_require__(7);

	module.exports = wt.fromExpress(app).auth0({
	  exclude: ['/subscribe'],
	  loginError: function loginError(error, ctx, req, res, baseUrl) {
	    res.writeHead(401, { 'Content-Type': 'application/json' });
	    res.end(JSON.stringify(RESPONSE.UNAUTHORIZED));
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("webtask-tools");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(3);
	var bodyParser = __webpack_require__(4);
	var _ = __webpack_require__(5);
	var Joi = __webpack_require__(6);

	var RESPONSE = __webpack_require__(7);

	var app = express();

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }));

	// parse application/json
	app.use(bodyParser.json());

	app.get('/subscribers', function (req, res) {
	  req.webtaskContext.storage.get(function (err, data) {
	    if (!err) {
	      res.writeHead(200, { 'Content-Type': 'application/json' });
	      res.end(JSON.stringify(data));
	    } else {
	      res.writeHead(400, { 'Content-Type': 'application/json' });
	      res.end(JSON.stringify(RESPONSE.ERROR));
	    }
	  });
	});

	app.post('/subscribe', function (req, res) {

	  var email = req.body.email;

	  if (email) {

	    req.webtaskContext.storage.get(function (err, data) {

	      if (err) {
	        res.writeHead(400, { 'Content-Type': 'application/json' });
	        res.end(JSON.stringify(RESPONSE.ERROR));
	      }

	      data = data || [];

	      if (_.indexOf(data, email) == -1) {
	        data.push(email);
	        req.webtaskContext.storage.set(data, function (err) {
	          if (err) {
	            res.writeHead(400, { 'Content-Type': 'application/json' });
	            res.end(JSON.stringify(RESPONSE.ERROR));
	          } else {
	            res.writeHead(200, { 'Content-Type': 'application/json' });
	            res.end(JSON.stringify(RESPONSE.OK));
	          }
	        });
	      } else {
	        res.writeHead(400, { 'Content-Type': 'application/json' });
	        res.end(JSON.stringify(RESPONSE.DUPLICATE));
	      }
	    });
	  } else {
	    res.writeHead(200, { 'Content-Type': 'application/json' });
	    res.end(JSON.stringify(RESPONSE.ERROR));
	  }
	});

	app.post('/', function (req, res) {
	  var body = req.webtaskContext.body;
	  if (body.message) {
	    client.sendMessage({
	      to: '+17027854119',
	      from: '+17026609897',
	      body: body.message
	    }, function (err, responseData) {
	      if (!err) {
	        res.end(JSON.stringify(RESPONSE.OK));
	      } else {
	        res.end(JSON.stringify(RESPONSE.ERROR));
	      }
	    });
	  } else {
	    res.end(JSON.stringify(RESPONSE.ERROR));
	  }
	});

	module.exports = app;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("joi");

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	  OK: {
	    statusCode: 200,
	    message: "You have successfully subscribed to MY SUPER newsletter!"
	  },
	  DUPLICATE: {
	    status: 400,
	    message: "You are already subscribed."
	  },
	  ERROR: {
	    statusCode: 400,
	    message: "Something went wrong. Please try again."
	  },
	  UNAUTHORIZED: {
	    statusCode: 401,
	    message: "You must be logged in to access this resource."
	  }
	};

/***/ }
/******/ ]);