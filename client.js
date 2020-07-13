const {Socket} = require('net');
​
const client = new Socket();
​
client.setEncoding('utf-8');
​
client.connect(8000, '10.51.7.43', () => {
    console.log('Connected');
    client.write('... was here!', 'utf-8');
});
