var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');

http.createServer(function(request, response) {
    var filePath = path.join(__dirname, 'assets', "index.html");
    var stat = fileSystem.statSync(filePath);

    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': stat.size,
        'Cache-Control': 'no-store',
        'Cache-Control': 'no-cache',
        'Cache-Control': 'max-age=10'
    });

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);
})
.listen(3000, () => (`Server running at http://localhost:3000`));