(function() {
  window.addEventListener('load', function(e) {
    var socket = io();
    let mypick
    let myname
    let metwiejechat
    let thisframe

    function formHider() {
      document.querySelector(".inlog").classList.add('hidden');
      document.querySelector("main").classList.remove('hidden');
      document.querySelector("main").classList.add('revfade');
    }


function removeSelf(){
if(myname != undefined ){
document.querySelector(`.${myname}`).classList.add('hidden');
}
else {
  console.log("tried to remove user but i didnt")
}
}

    function namecheck() {
      console.log(mypick)
      const choices = document.querySelectorAll("aside div p")
      choices.forEach(ch => {
        if (ch.textContent === mypick) {
          console.log("this one is the same as mine")
          ch.classList.add('ult')
        }
      })
    }


    function joinroom() {
      const usernt = document.querySelectorAll(".usercont div")
      usernt.forEach(u => {
        u.removeEventListener('click', nognaamlozefunction)
        u.addEventListener('click', nognaamlozefunction)
      })
    }


    function nognaamlozefunction(e) {
      e.preventDefault();
      const newstyle = window.getComputedStyle(this)
      const newcolor = newstyle.getPropertyValue('background-color')
      const newroom = this.id.substring(2);
      const newname = this.getAttribute('class');
      metwiejechat = newroom
      console.log(newroom)

      document.querySelectorAll('.chatWindow').forEach(x => {
        x.classList.remove('tops')
      })
      document.querySelector(`.${this.id}`).classList.add('tops')
    }

    function chatmaker3000(users) {
      // console.log(users)
      document.querySelector('.chatContainer').innerHTML = '';
      users.forEach(u => {
        const newElement = `<div class="chatWindow id${u.id}">
        <p style="background-color: ${u.color};" class="chatstat">Now chatting with <span class="${u.naam}">${u.naam}</span></p>
        <div class="chatMessages">

        </div>

        <form class="plebchat" action="">
          <textarea class="inpud" name="message" placeholder="Schrijf een bericht..."></textarea>
          <p class="anthem"></p>
          <button class="send versturen" type="button">Versturen</button>
        </form>
      </div>`
        document.querySelector('.chatContainer').insertAdjacentHTML('beforeend', newElement)
        // document.querySelector(".userchatname").textContent = newname
        // document.querySelector(".chatstat").setAttribute("style", `background-color:${newcolor};`);
        // socket.emit('chat met', metwiejechat);
        eventMiddleware();
      })

    }

    socket.on('chat me', function(id) {
      // console.log(id)
    })

    document.querySelector('.inlog form').addEventListener('submit', function(e) {
      e.preventDefault();

      const username = e.target[0].value;
      if (username && username.length > 0) {
        socket.emit('set user', username);
        myname = username;
        // e.target[0].value = '';
        if (username === "paardenboi420" || username == "paardenboy" || username == "paardenboi" || username == "horse" || username == "tim") {
          document.querySelector('aside').classList.add('horse')
        }
        document.querySelector('.header h1').textContent = `I am ${username}`
        document.querySelector('.inlog').classList.add('fade');
        setTimeout(formHider, 200);
      }
    });



    socket.on('set user', function(array) {
      if (socket.length == 0) return
      const usercontainer = document.querySelector(".usercont");
      usercontainer.innerHTML = '';
      array.forEach(socket => {
        const html = `
    <div style="background-color: ${socket.color};" id="id${socket.id}" href="" class="${socket.naam}">
      <h3>${socket.naam}</h3>
      <p>${socket.choice}</p>
    </div>`;
        // console.log(socket)
        usercontainer.insertAdjacentHTML('beforeend', html);
        namecheck();
        joinroom();
        chatmaker3000(array)
        removeSelf();
      })
    });

    socket.on('teaser con', function(data) {
      const sug = document.querySelector(".suggestion-container")
      sug.innerHTML = '';
      if (data !== undefined) {
        data.val.forEach(item => {
          const element =
            `
  <article id="${item.frame}" class="${item.id} ${item.type}">
  <div>
  <h3>${item.name}</h3>
  <p>${item.artist}</p>
  </div>
  <img class="imgo" src="${item.cover_image}" alt="">
  </article>
  `

          sug.insertAdjacentHTML('beforeend', element)
        })
      }
    })

    function hider() {
      document.querySelector(".inlog").classList.remove('hidden');
      document.querySelector(".sugg").classList.add('hidden');
    }
function addVidEvent() {
// document.querySelector(".anthem").addEventListener('click', function(){
e.preventDefault();
const condainer = this.parentElement.parentElement;
let seconds = new Date().getSeconds()
let minutes = new Date().getMinutes()
let hours = new Date().getHours()
const frametime = hours + ":" + minutes + ":" + seconds
const frame = `        <li class="chatMessage mymesg">
<iframe  src="${thisframe}controls=0"  autoplay=1&
    loop=1&
    autohide=1&
    border=0&
    wmode=opaque&
    enablejsapi=1&
    modestbranding=1&
    controls=0&
    showinfo=0 frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <span>${frametime}</span>
  </li>
  `;
condainer.querySelector('.chatMessages').insertAdjacentHTML('beforeend', frame)
console.log(condainer.classList[1].substring(2))
  socket.emit('vid message', {
    href: thisframe,
    responder: condainer.classList[1].substring(2),
    time: frametime
  });
// })
}
    function joiner() {
      const computedStyling = window.getComputedStyle(this)
      const vidchoice = computedStyling.getPropertyValue('background-color')
      const eehhhh = this.querySelector('h3').textContent
      thisframe = this.id
      mypick = eehhhh
      socket.emit('video choice', {
        pickedvideo: eehhhh,
        color: vidchoice
      })
      document.querySelector(".sugg").classList.add('fade');
      setTimeout(hider, 200);
    }



    function preview() {
      const vidCont = document.querySelector("iframe");
      vidCont.src = this.value
    }

    socket.on('remove client', function(id) {
      console.log("deleting the client")
      console.log(id)
      const users = document.querySelectorAll('.usercont div')
      const sidecontainer = document.querySelector('.usercont')
      users.forEach(hit => {
        if (hit.id === "id" + id) {
          console.log(hit)
          sidecontainer.removeChild(hit);
        } else {
          console.log("no mf hits")
        }
      })
    })

    socket.on('temp vid', function(template) {
      const sug = document.querySelector(".suggestion-container")
      sug.innerHTML = '';
      if (template.val !== undefined) {
        template.val.forEach(item => {
          const element =
            `
    <article id="${item.frame}" class="${item.id}">
    <div>
    <h3>${item.name}</h3>
    <p>${item.artist}</p>
    </div>
    <img class="imgo" src="${item.cover_image}" alt="">
    </article>
    `
          sug.insertAdjacentHTML('beforeend', element)
          document.querySelectorAll('.suggestion-container article').forEach(function(temp) {
            temp.addEventListener('click', joiner)
          })
        })
      }
    })

    socket.on('temp change', function(data) {
      console.log('Temperature')
      console.log(data);
      const temperate = document.querySelector('.demp')
      const wind = document.querySelector('.wint')
      const humidity = document.querySelector('.neerslag')
      wind.textContent = data.wind
      temperate.textContent = data.temp + "°"
      humidity.textContent = data.humid
    });

    function eventMiddleware() {

      document.querySelectorAll('.send').forEach(btn => {
        btn.removeEventListener('click', addSendEvent)
        btn.addEventListener('click', addSendEvent)
      })
      document.querySelectorAll('.anthem').forEach(btn => {
        // btn.preventDefault();
        btn.removeEventListener('click', addVidEvent)
        btn.addEventListener('click', addVidEvent)
      })
    }

    function addSendEvent() {
      // document.querySelector('.send').addEventListener("click", function(e) {
      const container = this.parentElement.parentElement
      e.preventDefault();

      const message = container.querySelector('.inpud').value


      if (message == '' || message == null || message === " " || message === "  " || message === "   " || message === "    ") {
        console.log("illegal message")
        container.querySelector('.inpud').value = "";
        container.querySelector('.inpud').focus();
      } else {
        let seconds = new Date().getSeconds()
        let minutes = new Date().getMinutes()
        let hours = new Date().getHours()
        const timestamp = hours + ":" + minutes + ":" + seconds

        const clientMessage = `        <li class="chatMessage mymesg">
            <p>${message}</p>
            <span>${timestamp}</span>
          </li>
          `
        container.querySelector('.chatMessages').insertAdjacentHTML('beforeend', clientMessage)
        socket.emit('chat message', {
          msg: message,
          responder: container.classList[1].substring(2),
          time: timestamp
        });
        // socket.emit('chat message', document.querySelector('.inpud').value);
        container.querySelector('.inpud').value = "";
        container.querySelector('.inpud').focus();
        return false;
      }
      // });
    }

    socket.on('message history', function(data) {
      const chatWindow = document.querySelector(".chatMessages")
      data.forEach(x => {
        const theMessage =
          `
  <li class="chatMessage">
    <p>${x.msg}</p>
    <span>${x.time}</span>
  </li>
  `
        chatWindow.insertAdjacentHTML('beforeend', theMessage)
      })
    })

    socket.on('chat message', function(data) {
      console.log(data)
      const responder = document.querySelector(`.id${data.msg.sender}`)
      console.log(responder)
      console.log('id' + data.msg.sender)
      const newElement = `        <li class="chatMessage">
          <p>${data.msg.msg}</p>
          <span>${data.msg.time}</span>
        </li>
        `
      responder.querySelector('.chatMessages').insertAdjacentHTML('beforeend', newElement)
      //     const chatWindow = document.querySelector(".chatMessages")
      //     const theMessage =
      //       `
      // <li class="chatMessage ${data.user}">
      //   <p>${data.msg}</p>
      //   <span>${data.time}</span>
      // </li>
      // `
      //     chatWindow.insertAdjacentHTML('beforeend', theMessage)
    })

    socket.on('vid message', function(data) {
      console.log(data)
      const responder = document.querySelector(`.id${data.msg.sender}`)
      console.log('id' + data.msg.sender)
      const frame = `        <li class="chatMessage">

<iframe  src="${thisframe}controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <span>${data.msg.time}</span>
        </li>
        `;
      responder.querySelector('.chatMessages').insertAdjacentHTML('beforeend', frame)
    })


  });
}());
