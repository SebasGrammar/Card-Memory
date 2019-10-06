/* BOARD */
let board = document.querySelector(".board")
/* CARDS */
let card = document.querySelector(".card")
let front = document.querySelector(".front")
let back = document.querySelector(".back")
/* ---------- */
let buttons = document.querySelectorAll(".board-size")

let score = document.querySelector(".score")

console.log(score)
let mainMenu = document.querySelector(".main-menu")
let timer = document.querySelector(".timer")
// let frontProperties = getComputedStyle(front)
// let backProperties = getComputedStyle(front)

let pictures = [
  "https://img.icons8.com/dotty/80/000000/falcon.png", "https://img.icons8.com/dotty/80/000000/kiwi-bird.png",
  "https://img.icons8.com/dotty/80/000000/toucan.png", "https://img.icons8.com/dotty/80/000000/owl.png",
  "https://img.icons8.com/dotty/80/000000/hatching-chicken.png", "https://img.icons8.com/dotty/80/000000/pinguin.png",
  "https://img.icons8.com/dotty/80/000000/stoned-bat.png", "https://img.icons8.com/dotty/80/000000/dragon.png",
  "https://img.icons8.com/dotty/80/000000/cute-termite.png", "https://img.icons8.com/dotty/80/000000/fenix.png",
  "https://img.icons8.com/dotty/80/000000/tiger-butterfly.png", "https://img.icons8.com/dotty/80/000000/bug--v2.png"
]

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function time(minute) {

  let count = minute - 1
  let seconds = minute * 60

  return function() {

    seconds--
    if (seconds % 60 >= 10) {
      timer.textContent = `${count}:${seconds % 60}`
    } else {
      timer.textContent = `${count}:0${seconds % 60}`
    }
    if (seconds % 60 === 0) {
      console.log("No")
      count--;
    }
    console.log(count)
  }
}

let normal = time(10)
let hard = time(5)

/*
setInterval(function() {
  twenty()
}, 100)
*/

function wipeBoard() {
  while (board.firstChild) {
    board.firstChild.remove();
  }
}
console.log(buttons.forEach(button => console.log(button)))
let status = ""

function game(num) {


  let len = pictures.length - 1
  let inner = 2; // Not working with 0. I have to figure out why.
  let used = []
  // let test = {}
  let random = Math.floor(Math.random() * (len - 0 + 1)) + 0; // The semicolon is mandatory here, it seems.
  let test = {}; // and here!

  if (status === "deployed") {
    wipeBoard()
  }

  (function boardSize() {

    let choices = []

    for (let i = 0; i < num; i++) {

      if (inner === 2) {
        inner = 0
        random = Math.floor(Math.random() * (len - 0 + 1)) + 0;
        while (used.includes(random)) {
          random = Math.floor(Math.random() * (len - 0 + 1)) + 0;
        }
      }

      used.push(random)

      let wrapper = document.createElement("div")
      wrapper.className = "wrapper"

      wrapper.innerHTML =
        `
        <div class="card">
          <div class="front"></div>
          <div class="back">
            <img class="picture">
          </div>
        </div>
      `

      board.appendChild(wrapper)
      inner++

    }

    let cards = document.querySelectorAll(".card")
    cards.forEach(card => card.addEventListener("click", flipCard))
    let images = document.querySelectorAll(".picture")

    for (let item of used) {
      if (!test[item]) {
        test[item] = 1
      } else {
        test[item]++
      }
    }
    //console.log(test)
    //console.log(used)
    shuffle(used)

    for (let p = 0; p <= used.length - 1; p++) {
      images[p].setAttribute("src", pictures[used[p]])
      cards[p].setAttribute("data-match", used[p])
      //console.log(cards[p])
    }

  })();

  mainMenu.style.display = "none";
  board.style.display = "grid"

  setInterval(function() {
    hard()
  }, 1000)


}

buttons.forEach(button => button.addEventListener("click", () => {

  //boardSize(Number(button.textContent))
  console.log(button.textContent)
  game(Number(button.textContent))
  status = "deployed"

}))


//boardSize(8)


let counter = 0;
let test = "";
let newScore = 0;

function flipCard() {
  let status = this.style.transform
  if (status) {
    this.style.setProperty("transform", "")
    status = ""
  } else {

    if (this.dataset.match === test) {

      // this.style.display = "none";
      let items = document.querySelectorAll(`[data-match="${test}"]`)
      items.forEach(item => item.style.visibility = "hidden")
      console.log(items)
      newScore += 100
      score.textContent = newScore
    }

    this.style.setProperty("transform", "rotateY(180deg)")
    this.style["pointer-events"] = "none"
    test = this.dataset.match
    //console.log(this.dataset.match)


  }

  counter++
  let cards = document.querySelectorAll(".card")
  if (counter >= 2) {
    cards.forEach(card => card.style.setProperty("pointer-events", "none"))
  }

  if (counter >= 2) {
    setTimeout(function() {


      cards.forEach(card => {
        card.style.setProperty("transform", "")
        //card.style["pointer-events"] = "auto"
        card.style["pointer-events"] = "auto"
        test = "";
        counter = 0;
      })

    }, 1000)
  }
  /*
  setTimeout(function() {
    if (counter >= 2) {
      
      cards.forEach(card => {
        card.style.setProperty("transform", "")
        //card.style["pointer-events"] = "auto"
        card.style["pointer-events"] = "auto"
        test = "";
        counter = 0;
      })
    }
  }, 1000)
  */

}