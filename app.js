var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

var fs = require('fs');
var request = require('request');
var async=require('async');


const readline = require('readline');

const rl = readline.createInterface({
	input: fs.createReadStream('my-file.txt')
});
var urlList=[];
rl.on('line', function (line) {
	if(line){
		urlList.push(line);
	}
}).on('close', () => {
	console.log('Have a great day!');
		async.eachSeries(urlList,function(link,cb){
		request(link, function (error, response, body) {
			console.log('Line from file:', link);
			console.log('error:', error); // Print the error if one occurred
			console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			cb();
		});
	},function(err){
		console.log("send mail");

		
		var aws = require("aws-sdk");
var ses = new aws.SES({"accessKeyId": "yourAccessId", "secretAccessKey": "yourAccessKey", "region": "your region"});
var eparam = {
    Destination: {
      ToAddresses: ["jaypastagia@gmail.com"]
    },
    Message: {
      Body: {
        Html: {
          Data: "<p>Hello, this is a test email!</p>"
        },
        Text: {
          Data: "Hello, this is a test email!"
        }
      },
      Subject: {
        Data: "SES email test"
      }
    },
    Source: "jaypastagia@test.com",
    ReplyToAddresses: ["jaypastagia@test.com"],
    ReturnPath: "jaypastagia@test.com"
};
 
ses.sendEmail(eparam, function (err, data) {
  if (err) console.log(err);
  else console.log(data);
});


	});
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
