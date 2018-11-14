/*
* @Author: Administrator
* @Date:   2018-11-08 15:41:43
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-08 16:19:43
*/

'use strict';
var http = require('http');
var fs = require('fs');
var path = require('path');
var file = path.resolve('one.txt');

http.createServer(function(request, response){
	var pathName = request.url;
	console.log(pathName);
	if (pathName !== '/favicon.ico') {
		var readable = fs.createReadStream(file, { highWaterMark: 5,  start: 2, end: 16 });

		var data = '';

		readable.on('open', function (tempData) {
			console.log('this is open event...' + tempData);
		})

		readable.on('readable', function () {
			console.info('------可以读了。。。');
		});

		readable.on('data', function (chunk) {
			response.write(chunk.toString() + '\n');
			readable.pause();
			setTimeout(function(){
				//继续读取
				readable.resume();
			}, 0);
			data += chunk;
		});

		readable.on('end', function () {
			response.end(data);
		});

		readable.on('close', function(){
			console.log('呀哈哈')
		})
	}
}).listen(8888);

console.log('server is running...');

