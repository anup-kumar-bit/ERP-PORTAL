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

let row = document.querySelector('.scroll');
function pauseAnimation() {
  row.classList.add('paused');
}

function resumeAnimation() {
  row.classList.remove('paused');
}

function attendenceGetreq() {
  let btn = document.querySelector("#attendanceButton");
  let btn4 = document.querySelector("#studentlist");
  let btn6 = document.querySelector("#fees");
  btn.addEventListener("click", () => {
    window.location.href="/attendance";
  })
  btn4.addEventListener("click",()=>{
    window.location.href="/studentlist"
  })
  btn6.addEventListener("click",()=>{
    window.location.href="/fee"
  })

}


slidebar();
attendenceGetreq();

