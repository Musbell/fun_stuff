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

const client = new hello_proto.HelloService('localhost:50051', grpc.credentials.createInsecure());

client.SayHello({ name: 'Node.js' }, function(error, response) {
  if (error) console.error(error);
  console.log(response.message);
});
