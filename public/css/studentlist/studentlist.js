function add(){
    let get1=document.querySelector(".addstd");
    let get2=document.querySelector(".addstudent");
    let get3=document.querySelector(".form-std");
    get1.addEventListener("click",()=>{
        get2.style.display="none";
        get3.style.display="block";
        get3.style.display = "flex";
    })
}


let disabled = true;
function navigate() {
    let divs = document.querySelectorAll(".navi-span");
    divs.forEach((element) => {
        element.addEventListener("click", async(event) => {
            console.log(event.currentTarget.id);
            if (event.currentTarget.id === 'navispan4' && disabled == true) {
                window.location.href = "/studentlist";
            } else if (event.currentTarget.id === 'navispan1') {
                window.location.href = "/";
            }else if(event.currentTarget.id==="navispan2"){
                window.location.href="/attendance";
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
    if (window.location.pathname == "/") {
        disabled = true
    }else if (window.location.pathname == "/studentlist") {
        divs[3].style.borderBottom = "1px solid  #006981"
        disabled = false;
    }
}
function validate(){
    let getphone=document.querySelector("#phone");
    let getroll=document.querySelector("#roll");
    let getname=document.querySelector("#name");
    let getcourse=document.querySelector("#course");
    let getsection=document.querySelector("#section");
    let getyear=document.querySelector("#year");
    let getbtn=document.querySelector("#input-form-btn");
    let checked=false;
    function vali(string,mini,maxi,id,obj){
        let min=mini;
        let max=maxi;
        let element=obj;
        let condition;
        let condition2;
        let myvalue=string.toString();
        function checking(str){
            let pattern=/^[A-Za-z\s]+$/;
            return pattern.test(str)
        }
        function checking2(str){
            let pattern = /^[0-9-]+$/;
            return pattern.test(str)
        }
        if(id=="idname" || id=="idcourse" || id=="idsection" ){
            console.log(checking(myvalue));
            condition=isNaN(string.value);
            condition2=checking(myvalue) && myvalue.length<=max & myvalue.length>=min;
        }else if(id=="idphone" || id=="idroll"){
            console.log(checking(myvalue));
            condition=!isNaN(event.target.value);
            condition2=myvalue.length<=max & myvalue.length>=min
        }else if(id=="idyear"){
            condition=isNaN(string.value);
            condition2=checking2(myvalue) && myvalue.length<=max & myvalue.length>=min;
        }
        if(condition){
            if(condition2){
                element.style.border="2px solid green";
                element.style.boxShadow="0.1px 0.1px 2px  green ,-0.1px -0.1px 2px green";
            }else{
                element.style.border="2px solid red";
                element.style.boxShadow="0.1px 0.1px 2px  red ,-0.1px -0.1px 2px red";
            }
        }else{
            element.style.border="2px solid red";
            element.style.boxShadow="0.1px 0.1px 2px  red ,-0.1px -0.1px 2px red";
        }
    }
    getphone.addEventListener("keyup",(event)=>{
        vali(event.target.value,10,10,"idphone",getphone)
    })
    getroll.addEventListener("keyup",(event)=>{
            vali(event.target.value,1,12,"idroll",getroll);
            console.log(i++)
    })
    getname.addEventListener("keyup",(event)=>{
        vali(event.target.value,1,30,"idname",getname);
    })
    getcourse.addEventListener("keyup",(event)=>{
        vali(event.target.value,1,40,"idcourse",getcourse);
    })
    getsection.addEventListener("keyup",(event)=>{
        vali(event.target.value,1,1,"idsection",getsection);
    })
    getyear.addEventListener("keyup",(event)=>{
        vali(event.target.value,1,10,"idyear",getyear);
    })

}
function msgbutton() {
    try {
        let div = document.querySelector(".pop-msg");
        let msgbtn = document.querySelector(".msg-button");
        msgbtn.addEventListener("click", () => {
            div.style.display = "none";
            window.location.href = "/studentlist"
        })
    } catch (err) {
        // console.log("no duplicate");
    }

}
validate();
add();
navigate();
msgbutton();