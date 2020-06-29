declare module 'worker-loader?inline=true!*' {
  declare const WebWorker: {
    prototype: Worker;
    new (): Worker;
  };

  export default WebWorker;
}
