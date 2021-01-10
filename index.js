const server = require('http').createServer();
const io = require('socket.io')(server);
let member=[]
let msg=[]

io.on('connection', client => {
  console.log(client.id)
  member.push(client.id)
  io.emit('member',member)
  client.on('clientMsg',(res)=> {
    let obj={side:"client",text:res.text}
    io.emit(res.id,obj)
  })
  client.on('adminMsg',(res)=> {
    let obj={side:"admin",text:res.text}
    io.emit(res.id,obj)
  })
  client.on('disconnect',(res)=> {
    let index=member.indexOf(client.id)
    member.splice(index,1)
    io.emit('member',member)
    console.log('disconnect')
  })
  //client.on('event', data => { /* … */ });
  //client.on('disconnect', () => { /* … */ });
});

function checkMember(x) {
  let index=member.indexOf(x)
  if(index===-1) {
    member.push(x)
  }
  else {
    member.splice(index,1)
  }
}

server.listen(3000);