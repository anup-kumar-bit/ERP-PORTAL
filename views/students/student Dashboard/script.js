function slidebar() {
  let card1 = document.getElementById("card-img-1");
  let card2 = document.getElementById("card-img-2");
  let card3 = document.getElementById("card-img-3");
  let back = document.querySelector(".back");
  let next = document.querySelector(".next");
  var a = -330;
  var b = 0;
  var c = 330;
  card1.style.transform = `translateX(${a}px`;
  card2.style.transform = `translateX(${b}px`;
  card3.style.transform = `translateX(${c}px`;
  function n_p(value) {
    a = a + value;
    b = b + value;
    c = c + value;
    card1.style.transform = `translateX(${a}px`;
    card2.style.transform = `translateX(${b}px`;
    card3.style.transform = `translateX(${c}px`;
  }
  let counter = 0;
  let counter1 = 0;
  back.addEventListener('click', () => {
    if (counter < 1) {
      n_p(-330);
      counter++;
      counter1--;
    }
  });
  next.addEventListener('click', () => {
    if (counter1 < 1) {
      n_p(330);
      counter--;
      counter1++;
    }
  });


}

function progress() {
  let prog1 = document.getElementById("c-prog1");
  let prog2 = document.getElementById("c-prog2");
  class progressclass {
    constructor(prog, end1) {
      this.start = 0;
      let intervalid = setInterval(() => {
        this.start++;
        if (this.start > end1) {
          clearInterval(intervalid);
        } else {
          prog2.innerText = `${this.start}%`;
          prog.style.background = `conic-gradient(#4fcbce ${360 * (this.start / 100)
            }deg, white 0deg)`;
        }
      }, 40);
    }
  }
  const progobj1 = new progressclass(prog1, 82);
}
let row = document.querySelector('.scroll');
function pauseAnimation() {
  row.classList.add('paused');
}

function resumeAnimation() {
  row.classList.remove('paused');
}


slidebar();
progress();

