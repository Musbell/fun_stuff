const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './hello.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const hello_proto = grpc.loadPackageDefinition(packageDefinition).HelloService;

function sayHello(call, callback) {
  callback(null, { message: 'Hello, ' + call.request.name });
}

const server = new grpc.Server();
server.addService(hello_proto.HelloService.service, { SayHello: sayHello });
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
console.log('Server running on http://127.0.0.1:50051');
server.start();
