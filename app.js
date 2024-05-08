// const http = require('http')
// const fs = require('fs')
// fs.appendFile('demofile1.txt', 'Hello content!', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });

// http.createServer(function (req, res) {
//   fs.readFile('demofile1.txt', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     console.log("데모파일1.txt를 성공적으로 읽었습니다.");
//     return res.end();
//   });
// }).listen(8050);
// fs.appendFile('demofile1.txt', ' This is my text.', function (err) {
//   if (err) throw err;
//   console.log('Updated!');
// });
// fs.unlink('demofile1.txt', function (err) {
//   if (err) throw err;
//   console.log('File deleted!');
// });

const http = require('http');
const url = require('url');
const qs = require('querystring');

const app = http.createServer(function (request, response) {
  const _url = request.url;
  const pathname = url.parse(_url, true).pathname;
  if (pathname === '/') {
    response.writeHead(200);
    response.end(`
      <!doctype html>
      <html>
      <head>
        <title>POST</title>
        <meta charset="utf-8">
      </head>
      <body>
        <form action="/post_test" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p><textarea name="description" placeholder="description"></textarea></p>
          <p><input type="submit"></p>
        </form>
      </body>
      </html>
      `);
  } else if (pathname === '/post_test') {
    let body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      let post = qs.parse(body);
      console.log(post);
      const title = post.title;
      const description = post.description;
      response.end(`
          <!doctype html>
          <html>
          <head>
            <title>POST</title>
            <meta charset="utf-8">
          </head>
          <body>
            <p>title : ${title}</p>
            <p>description : ${description}</p>
          </body>
          </html>
          `);
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(8500);
