/**
 * Created by gerry on 16/8/3.
 */
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

var filePath = __dirname + "/comment_history.txt";//留言的存储文件
var endPoint = "/message_board";

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));
//app.use('/', express.static('./static'));


function getFileDataInJson() {
	var jsonData = JSON.parse(fs.readFileSync(filePath));
	return jsonData;
}

//读取历史留言
app.get(endPoint, function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');

	res.sendFile(filePath);
});

app.get('/test',function (res, req) {
	res.end("testGet");
});

app.post('/test',function (res, req) {
	res.end("testPost");
});

//去掉用户留言里的HTML tag
function stripUserInput(input) {
	if (input)
		return input.replace(/(<([^>]+)>)/ig, "");
}

//Post留言
/*app.post(endPoint, function (req, res) {

	res.header('Access-Control-Allow-Origin', '*');

	var newMessageObj = {};
	newMessageObj.name = stripUserInput(req.body.name);
	newMessageObj.email = stripUserInput(req.body.email);
	newMessageObj.message = stripUserInput(req.body.message);
	newMessageObj.website = stripUserInput(req.body.website);
	var isPrivateMessage = req.body.isPrivate;

	if (isPrivateMessage === "true") {//如果是Private留言，不要存入文件

		res.end("Your private message was sent successfully. Thank You!");
		return;
	}

	var historyComments;
	try {
		historyComments = getFileDataInJson();
	} catch (err) {
		historyComments = [];
	}

	historyComments.push(newMessageObj);
	fs.writeFile(filePath, JSON.stringify(historyComments, null, 4), function (err) {
		if (err) {
			res.end("Failed to leave message. Sorry!");
			return;
		}
		res.end("Your public message was sent successfully. Thank You!");
	});
});*/
var server = app.listen(8000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('message board app listening at http://%s:%s', host, port);
});