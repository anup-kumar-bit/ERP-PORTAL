function msgbutton() {
    try {
        let div = document.querySelector(".pop-msg");
        let msgbtn = document.querySelector(".msg-button");
        msgbtn.addEventListener("click", () => {
            div.style.display = "none";
            window.location.href = "/attendance/list"
        })
    } catch (err) {
        // console.log("no duplicate");
    }

}
function btnclr() {
    let pbtn = document.querySelectorAll(".pbtn");
    for (let i = 0; i < pbtn.length; i++) {
        if (pbtn[i].value > 75) {
            pbtn[i].style.color = "green";
        } else {
            pbtn[i].style.color = "red";
        }
    }
    // console.dir(pbtn);
}
function navigate() {
    let divs = document.querySelectorAll(".navi-span");
    divs.forEach((element) => {
        element.addEventListener("click", async(event) => {
            if (event.currentTarget.id === 'navispan2' ) {
                window.location.href = "/attendance";
            } else if (event.currentTarget.id === 'navispan1') {
                window.location.href = "/";
            }else if(event.currentTarget.id==="navispan4"){
                window.location.href = "/studentlist";
            }else if (event.currentTarget.id === "navispan7") {
                let response = await fetch("/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if(response.ok){
                    window.location.href=`${response.url}`
                }

            }
        });
    });
}

msgbutton();
btnclr();
navigate();