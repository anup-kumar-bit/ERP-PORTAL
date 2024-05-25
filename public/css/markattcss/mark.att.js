function handling() {
    let date_value = document.querySelector(".input-date");
    let set_value = document.querySelectorAll(".date-value-student");
    let today = new Date();
    set_value.forEach((e) => {
        e.value = `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`;
    });
    // date_value.value = Date.now();
    date_value.addEventListener('change', () => {
        set_value.forEach((e) => {
            e.value = `${date_value.value}`;
        });

    })

    let duration_take = document.querySelector("#Course-duration");
    let duration_set = document.querySelectorAll(".c-dur");
    duration_set.forEach((val) => {
        val.value = duration_take.value;
    })
    duration_take.addEventListener("change", () => {
        duration_set.forEach((val) => {
            val.value = duration_take.value;
        })
    })

}

function handlingform() {
    document.querySelector("#myForm").addEventListener("submit", function (event) {
        document.getElementsByClassName("inp").removeAttribute("disabled");
    });

}
function app() {
    let td = document.querySelectorAll(".percentage");
    for (let i = 0; i < td.length; i++) {
        if (Number(td[i].innerText) < 75) {
            td[i].parentElement.style.backgroundColor = "red";
            td[i].style.Color = "white";
        }
        else if (Number(td[i].innerText) >= 75) {
            td[i].parentElement.style.backgroundColor = "green";
            td[i].style.Color = "white";
        }
    }
}
function msgbutton() {
    try {
        let div = document.querySelector(".pop-msg");
        let msgbtn = document.querySelector(".msg-button");
        msgbtn.addEventListener("click", () => {
            div.style.display = "none";
            window.location.href = "/attendance"
        })
    } catch (err) {
    }
    try {
        let seelist = document.querySelector("#att-list")
        seelist.addEventListener("click", () => {
            window.location.href = "/attendance/list"
            console.log("triggered");
        })
    } catch (err) {

    }

}

let disabled = true;
function navigate() {
    let divs = document.querySelectorAll(".navi-span");
    divs.forEach((element) => {
        element.addEventListener("click", async (event) => {
            if (event.currentTarget.id === 'navispan2' && disabled == true) {
                window.location.href = "/attendance";
            } else if (event.currentTarget.id === 'navispan1') {
                window.location.href = "/";
            } else if (event.currentTarget.id === "navispan4") {
                window.location.href = "/studentlist";
            } else if (event.currentTarget.id === "navispan7") {
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
    if (window.location.pathname == "/") {
        divs[0].style.borderBottom = "1px solid  #006981"
        disabled = true
    } else if (window.location.pathname == "/attendance") {
        divs[1].style.borderBottom = "1px solid  #006981"
        disabled = false;
    }
}


// multipleform();
handling();
handlingform();
app();
msgbutton();
navigate();