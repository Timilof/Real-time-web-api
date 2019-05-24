const express = require('express');
var rp = require('request-promise');
const app = express()
  // .use(express.static('./src'))
  .use(express.static('app/src'))

const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 2200;
const fs = require('fs');
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function getVids(typo) {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/src/vids.json', function(error, data) {
      const jsonData = JSON.parse(data.toString());
      const filteredData = jsonData.data.filter(vids => {
        return vids.type == typo;
      })
      let result = {
        amount: 5,
        val: filteredData
      }
      resolve(result);
    });
  })
}



const currentWeather = {}
let feelTemp = 15.9999
let weatherstat = "sunny"
let windspeed = 4
let humidity = 30
let pickedVids = [];
let listVids = [];
let empty
const api = {
  mainUrl: 'https://data.buienradar.nl/2.0/feed/json',
  request: function(url) {
    rp(url)
      .then(function(dada) {
        const data = JSON.parse(dada);
        console.log("Timestamp " + data.actual.stationmeasurements[35].timestamp);
        // console.log("Sunpower " + data.actual.stationmeasurements[35].sunpower);
        console.log("Humidity " + data.actual.stationmeasurements[35].humidity);
        console.log("Windspeed " + data.actual.stationmeasurements[35].windspeed);
        console.log("Temperature " + data.actual.stationmeasurements[35].temperature);
        if (feelTemp === data.actual.stationmeasurements[35].feeltemperature) {
          console.log("Everything's the same so I'm not going to do anything")
        } else {
          console.log("There are some changes so I'm going to update stuff")
          feelTemp = data.actual.stationmeasurements[35].feeltemperature;
          windspeed = data.actual.stationmeasurements[35].windspeed;
          humidity = data.actual.stationmeasurements[35].humidity;
          checking();
        }

      })
      .catch(function(err) {
        console.log(err);
      });
  }
}

async function doThat(typo) {
  let value = await getVids(typo);

value.val.forEach(snap=>{
    pickedVids.forEach(item=>{
      if (item === snap.id){
        console.log("This item is already in the thing!!! ", snap.name)
        listVids.forEach(bop=>{
          if( bop.id !== snap.id){
            listVids.push(snap)
          }else{
console.log("liked vid double render prevention")
}
      })
value.val.splice(value.val.indexOf(snap), 1);
        }else{
console.log("nothing")
}
    })
})
  empty = value;
  io.emit('temp vid', value);
  io.emit('liked vid', listVids);
}

setInterval(function() {
  api.request(api.mainUrl);
  // console.log('testing')
}, 1000 * 6)
api.request(api.mainUrl);
function checking() {

  if (windspeed >= 10) {
    weatherstat = "stormy"
    doThat(weatherstat);
  } else if (feelTemp <= 16) {
    weatherstat = "cloudy";
    doThat(weatherstat);
  } else {
    weatherstat = "sunny"
    doThat(weatherstat);
  }
}
const videos = []
const messages = []
let users = []

io.on('connection', function(socket) {

  socket.on('video choice', function(choicedata){
    // console.log(socket.username + " picked " + pickedvideo)
    socket.colorscheme = choicedata.color
    socket.choice = choicedata.pickedvideo
    console.log(socket.choice)
    console.log(socket.colorscheme)
})

  socket.on('chat met', function(roommate){
  console.log("someone im talking to" + roommate)
  io.sockets.connected[roommate].emit('chat me', socket.id)
})

io.emit('set user', users)

  console.log('a user connected');
  console.log(socket.id);
  api.request(api.mainUrl);
  checking();
  io.emit('temp vid', weatherstat);


  io.emit('temp change', {
    temp: feelTemp,
    humid: humidity,
    wind: windspeed
  });

  socket.on('set user', function(naam){
    socket.username = naam;
    users.push({naam,id:socket.id, color:socket.colorscheme, choice: socket.choice});
    io.emit('set user', users);
  })
// io.emit()
  socket.emit('teaser con', empty);
socket.on('just joined', function(){
  socket.emit('message history', messages);
})



  socket.on('chat message', function(msg){
      messages.push(msg)
      console.log(messages)
      // io.emit('chat message', msg);
      msg.sender = socket.id
      console.log(msg.responder)
      console.log(io.sockets.connected);
      io.sockets.connected[msg.responder].emit('chat message', {msg})
    })

socket.on('vid message', function(msg){
      msg.sender = socket.id
      console.log(msg.responder)
      console.log(io.sockets.connected);
      io.sockets.connected[msg.responder].emit('vid message', {msg})
    })

    socket.on('disconnect', function() {
    io.emit('remove client', socket.id)
    const filtered = users.filter(user=>{
      if(user.naam !== socket.username){
        return user

}

})
users = filtered
      console.log(users);
        console.log(socket.id + " this user disconnected");

      });

});





http.listen(port, () => console.log(`Example app listening on port ${port}!`))
