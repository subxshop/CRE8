// filepath: /c:/Users/hitea/OneDrive/Documents/CIS 230 Web Development/CIS 230/index.js
const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://192.168.1.25:${port}/`);
});