document.addEventListener("DOMContentLoaded", function () {
  gsp();
});
function togglePassword() {
  let password1 = document.getElementById('password');
  let password = document.getElementById('password2');
  let checkbox = document.querySelector('#showPasswordCheckbox');
  console.log(password1)
  checkbox.addEventListener("change",()=>{
    if(checkbox.checked){
      password1.type="text";
    }else{
      password1.type="password";
    }
  })
  let eye = document.querySelector('.showpass');
  let h=true;
  eye.addEventListener('click', () => {
    if(h){
      password.type="text";
      eye.src="/css/eyeopen.png"
    }else{
      password.type="password";
      eye.src="/css/eyecloses.png"
    }
    h=!h;
  })
}
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

function gsp() {
  let clbtn = document.querySelector("#cl2btnlogin");
  let clbtn2 = document.querySelector("#cl2btnsignup");
  clbtn.addEventListener("click", () => {
    gsap.to(
      ".block1",
      {
        x: "100%",
        borderRadius: "0px 10px 10px 0px",
      }
    )
    gsap.to(
      ".login-block", {
      x: "-100%",
      borderRadius: "10px 0px 0px 10px",
    }
    )
    gsap.to(
      ".login", {
      display: "none",
      delay: -4
    }
    )
    gsap.to(
      ".signup", {
      display: "block",
    }
    )
    gsap.to(
      ".loginfrm", {
        display: "none",
        delay:-4,
        opacity:"10%"
    }
    )
    gsap.to(
      ".signupfrm", {
        keyframes: [
          { display: "block", },
          { opacity:"100%" } 
        ]
    }
    )
  })
  clbtn2.addEventListener("click", () => {
    gsap.to(
      ".block1",
      {
        x: "0%",
        borderRadius: "10px 0px 0px 10px",
      }
    )
    gsap.to(
      ".login-block", {
      x: "0%",
      borderRadius: "0px 10px 10px 0px",
    }
    )
    gsap.to(
      ".login", {
      display: "block"
    }
    )
    gsap.to(
      ".signup", {
      display: "none",
      delay: -4
    }
    )
    gsap.to(
      ".loginfrm", {
        keyframes: [
          { display: "block", },
          { opacity:"100%" } 
        ]
    }
    )
    gsap.to(
      ".signupfrm", {
        display: "none",
        opacity:"10%",
        delay:-4
    }
    )
  })
}
function msgbutton() {
  try {
      let div = document.querySelector(".pop-msg");
      let msgbtn = document.querySelector(".msg-button");
      msgbtn.addEventListener("click", () => {
          div.style.display = "none";
          window.location.href = "/"
      })
  } catch (err) {
  }
}
togglePassword();
msgbutton();