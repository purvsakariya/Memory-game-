const cardarray = [
    {
        name: "Pokemone1",
        img: "pngs/pokemon1.png"
    }, {
        name: "Pokemone2",
        img: "pngs/pokemon2.png"
    }, {
        name: "Pokemone3",
        img: "pngs/pokemon3.png"
    }, {
        name: "Pokemone4",
        img: "pngs/pokemon4.png"
    }, {
        name: "Pokemone5",
        img: "pngs/pokemon5.png"
    }, {
        name: "Pokemone6",
        img: "pngs/pokemon6.png"
    }, {
        name: "Pokemone7",
        img: "pngs/pokemon7.png"
    }, {
        name: "Pokemone8",
        img: "pngs/pokemon8.png"
    }, {
        name: "Pokemone9",
        img: "pngs/pokemon9.png"
    }, {
        name: "Pokemone10",
        img: "pngs/pokemon10.png"
    }, {
        name: "Pokemone11",
        img: "pngs/pokemon11.png"
    }, {
        name: "Pokemone12",
        img: "pngs/pokemon12.png"
}]



let game = document.querySelector(".game")
let grid = document.createElement("section")
grid.classList.add("grid")
game.appendChild(grid)

let gamegrid = cardarray.concat(cardarray)

gamegrid.sort(() => 0.5 - Math.random())

gamegrid.forEach((item) => {
    const card = document.createElement("div")
    card.classList.add('card', item.name)
    card.dataset.name = item.name;

    const front = document.createElement("div")
    front.classList.add("front");

    const back = document.createElement("div");
    back.classList.add("back");
    back.style.backgroundImage = `url(${item.img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});

let attemptcount = 0;
let attempts = document.querySelector(".count");
attempts.innerHTML = attemptcount;

var sec = 0;
var timeinsec;
let min = 0;

function seccount() {
    sec = sec + 1;
    document.querySelector(".sec-count").innerHTML = Math.floor(sec % 60);
    timeinsec = setTimeout(seccount, 1000)
    min = Math.floor(sec / 60)
    document.querySelector(".min-count").innerHTML = min;
}

var timestarted = false;

let reset = document.querySelector(".reset")
reset.addEventListener("click", () => {
    let confirmreset = confirm("Whole Game Will Start Again.Countinue To Reset?")
    if (confirmreset === true) {
        window.location.reload();
    }
});

function reload() {
    let confirmreset = confirm("You win the game.Countinue?")
    if (confirmreset === true) {
        window.location.reload();
    }
}

let firstguess = "";
let secondguess = "";
let previoustarget = null;
let count = 0;
let delay = 1200;
const match = () => {
    setTimeout(document.body.style.backgroundImage = 'url("celebrate.jpg")',1200)
    setTimeout(reload(),30000)
    // var selected = document.querySelectorAll(".selected")
    // selected.forEach((card) => {
    //     card.classList.add("match")
    // });
};

const resetguesses = () => {
    firstguess = "";
    secondguess = "";
    count = 0;
    console.log("Game reset");
    var selected = document.querySelectorAll(".selected")
    selected.forEach((card) => {
        card.classList.remove("selected")
    })
}

grid.addEventListener("click", function (event) {
    !timestarted && seccount();
    timestarted = true;
    let clicked = event.target;
    attemptcount++;
    attempts.innerText = attemptcount/2;
    if (
        clicked.nodeName === "SECTION" ||
        clicked === previoustarget ||
        clicked.parentNode.classList.contains("selected")
    ) {
        return;
    }
    if (count < 2) {
        count++;
        if (count === 1) {
            // Assign first guess  
            firstguess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add("selected");
        } else {
            // Assign second guess  
            secondguess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add("selected");
        }
        // If both guesses are not empty...  
        if (firstguess !== "" && secondguess !== "") {
            // and the first guess matches the second match...  
            if (firstguess === secondguess) {
                setTimeout(match, delay);
                var matched = document.querySelectorAll(`.${firstguess}`);
                matched.forEach(node => node.addEventListener("click", function (e) {
                    e.stopPropagation();
                }))
                seccount = false;
                setTimeout(() => {
                    resetguesses
                }, 120000);
            } else {
                setTimeout(resetguesses, delay);
            }
        }
    }
    // Set previous target to clicked  
    previoustarget = clicked;
});

