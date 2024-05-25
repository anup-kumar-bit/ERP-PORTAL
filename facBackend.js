const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const { detail1, chats, datewise, alldates, signupinfo } = require("./attschema.js");
var flash = require('connect-flash');
const methodOverride = require("method-override");
const moment = require("moment");
const session = require("express-session");
const bcrypt = require("bcrypt");
const MongoDBStore = require('connect-mongodb-session')(session);


let PORT = 8080;
const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/session-store',
    collection: 'sessions'
});

app.use(flash())
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(session({
    secret: "anupsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    store:store
}))
async function main() {
    await mongoose.connect('mongodb://127.0.0.1/userattandence');
}
main().then(() => {
    console.log("connection successful");
}).catch((err) => {
    console.log(err);
})

app.use(express.static('public'));
const authenticateUser = (req, res, next) => {
    if (req.session.user) {
        console.log("session done");
        next();
    } else {
        res.redirect("/");
    }
};

app.get("/", (req, res) => {
    if(req.session.user){
        res.redirect("/Dashboard");
    }else{
        res.render("./login/login.ejs",{msg:req.flash("failure"),msg2:req.flash("success")})
    }
})
app.post("/signup", async (req, res) => {
    try {
        let { sign } = req.body;
        let saltRounds = 10;
        if (!sign || !sign.name || !sign.course || !sign.email || !sign.identity || !sign.password) {
            return res.status(400).send({ error: "All fields are required" });
        }
        const hashedPassword = await bcrypt.hash(sign.password, saltRounds);
        const get = new signupinfo({
            username: sign.name,
            course: sign.course,
            email: sign.email,
            identity: sign.identity,
            password: hashedPassword
        });
        await get.save();
        req.flash("success","Sucessfully sign in !!")
        res.redirect("/")
    } catch (error) {
        console.log(error)
        req.flash("failure","Error occured , Duplicate email not allow !")
        res.redirect("/")
    }
});
app.post("/login", async (req, res) => {
    let { Email, Password, Identity } = req.body;
    try {
        const user = await signupinfo.findOne({ email: Email });
        if (user !== null) {
            if (await bcrypt.compare(Password, user.password) && user.identity === Identity) {
                req.session.user = user.username;
                req.session.identity=user.identity;
                console.log("------Successfully  logged in -----");
                res.redirect("/Dashboard");
            } else {
                req.flash("failure","Incorrect Password or Identity");
                res.redirect("/");
            }
        } else {
            req.flash("failure","User not found");
            res.redirect("/");
        }
    } catch (err) {
        req.flash("failure","ERROR OCCURED");
        res.redirect("/");
    }
});
app.post("/logout",authenticateUser,(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log("error getting logout")
        }else{
            console.log("successfuly logout -----")
            res.redirect("/");
        }
    })
})

app.get("/Dashboard",authenticateUser, async (req, res) => {
    const allChats = await chats.find({});
    res.render("./Faculty/faculty-dash.ejs", { allChats: allChats });

})
app.post("/Dashboard",authenticateUser, (req, res, next) => {
    let { chating } = req.body;
    moment().locale('en');
    const today = moment();
    const formattedDate = today.format('DD-MM-YYYY');
    const formattedTime = today.format('hh:mm A');
    let chat = new chats({
        author:req.session.user ,
        chat: chating.mkpost,
        createdat: formattedDate,
        createtime: formattedTime
    })
    chat.save()
        .then(() => {
            res.redirect("/Dashboard")
        })
})
// -----------------in case to enable new input ---------------
// app.post("/news", (req, res, next) => {
//     let { newstxt } = req.body;
//     let setnews = new addnews({
//         news:newstxt.addnewstxt
//     })
//     setnews.save()
//         .then((new1) => {
//             res.redirect("/")
//             console.log(new1);
//     })
// })
// ---------------------------------------------------------------

app.delete("/Dashboard/:id",authenticateUser, async (req, res) => {
    let { id } = req.params;
    let a = await chats.findByIdAndDelete(id);
    res.redirect("/Dashboard")
})


app.get("/attendance",authenticateUser, async (req, res) => {
    let st_details = await detail1.find({});
    let msg = '';
    console.log("student attandance -----");
    if (req.query.duplicate === 'true') {
        msg = "Duplicate Date Detected";
    }
    if (st_details.length == 0) {
        msg = "Cannot find record-Please Add students";
    }
    res.render("./markattandance/mark-att.ejs", { st_details: st_details, msg: msg });
});


app.post("/attendance",authenticateUser, async (req, res, err) => {
    let checkdb = await detail1.find({});
    try {
        let getting_value = req.body;
        let allstudents = Object.values(getting_value);
        // --------------------------checking duplicate---------------------------------
        let checkDuplicateDate = await alldates.find({});
        let checking = [];
        let noduplicate = true;
        for (let i = 0; i < checkDuplicateDate.length; i++) {
            checking.push(String(checkDuplicateDate[i].arrayOfDates));
        }
        let tocheck;
        for (const date_element of allstudents) {
            tocheck = date_element.date;
            // console.log(date_element);
            break;
        }
        for (let i = 0; i < checking.length; i++) {
            if (checking[i] == tocheck) {
                console.log("duplicate item detected")
                noduplicate = false;
            }
        }
        // console.log("---checking", checking);
        // console.log("----tocheck", tocheck);
        // -----------------------------------------------------------------------------------------------------
        if (noduplicate) {
            const duration_detail = await detail1.find({});
            let gettotclass = [];
            let getattclas = [];
            allstudents.forEach((get) => {
                if (get.btnradiop === "Present") {
                    gettotclass.push(Number(get.duration));
                    getattclas.push(Number(get.duration));
                }
                if (get.btnradiop === "Absent") {
                    gettotclass.push(Number(get.duration));
                    getattclas.push(0);
                }
            })
            let totalclass = [];
            let atttaken1 = [];
            duration_detail.forEach(async (ele) => {
                totalclass.push(ele.totalclass);
                atttaken1.push(ele.atttaken)
            })
            let updatedtaken = atttaken1.map((value, index) => value + getattclas[index])
            let updatedclass = totalclass.map((value, index) => value + gettotclass[index]);
            let calpercentage = updatedtaken.map((value, index) => ((value / updatedclass[index]) * 100).toFixed(2))
            console.log(updatedtaken);
            console.log(updatedclass);
            console.log(calpercentage);
            for (let i = 0; i < duration_detail.length; i++) {
                let document = duration_detail[i];
                document.atttaken = updatedtaken[i];
                document.totalclass = updatedclass[i];
                document.attandencepercentage = calpercentage[i];
                await document.save();
            }
            // ------------------------------
            let check1push = true;
            for (const element of allstudents) {
                // console.log("pushing value")
                if (check1push) {
                    let setdate = new alldates({
                        arrayOfDates: element.date
                    })
                    await setdate.save();
                    check1push = !check1push;
                }
                let finddate = await alldates.findOne({ arrayOfDates: element.date });
                let finduser = await detail1.findOne({ name: element.user });
                let datewisedetails = new datewise({
                    name: element.user,
                    course: element.Course,
                    date: finddate,
                    dur: element.duration,
                    p_or_t: element.btnradio,
                    status: element.btnradiop,
                    attandencepercentage: finduser
                })
                await datewisedetails.save();
            }
            // --------------------
            res.redirect("/attendance")

        }
        else {
            res.redirect("/attendance?duplicate=true")
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred");
    }
});
app.get("/attendance/list",authenticateUser, async (req, res) => {
    let obj = req.query;
    let msg = '';
    console.log("student attandence list-------")
    if (Object.keys(obj) == "undefined") {
        console.log("undefined date")
        msg = "cannot find record of this date"
        let data = ''
        let tdate = ''
        let percentage = ''
        res.render("./see-att-list/seelist.ejs", { msg: msg, data: data, tdate: tdate, percentage: percentage })
    } else {
        let id = Object.keys(obj);
        // console.log(id[0])
        // console.log("--------------------sss---------------------")
        let data = await datewise.find({ date: id[0] });
        let datefind = await alldates.find({ _id: id[0] });
        let tdate = datefind[0];
        let percentage = [];

        for (const element of data) {
            let now = await detail1.findOne({ _id: element.attandencepercentage });
            percentage.push(now);
        }
        // console.log(percentage);
        // console.log(data)
        // console.log("-----------------------------------------")
        res.render("./see-att-list/seelist.ejs", { msg: msg, data: data, tdate: tdate, percentage: percentage })
    }
    // console.log(obj);
})
app.post("/attendance/list",authenticateUser, async (req, res) => {
    let getting = req.body;
    let checkdate = await alldates.findOne({ arrayOfDates: getting.date })
    if (checkdate == null) {
        console.log("--%% Error Occured %%---");
        res.redirect("/attendance/list?undefined")
    } else {
        // console.log(checkdate.id);
        res.redirect(`/attendance/list?${checkdate.id}`)
    }
})
app.get("/studentlist",authenticateUser, async (req, res) => {
    let allstudents = await detail1.find({});
    let duplicate = req.query;
    let ditem = Object.keys(duplicate);
    // console.log("ditem",ditem);
    console.log("studentlist --------")
    let msg = ''
    if (allstudents.length == 0) {
        msg = "connot find record -Add students"
        allstudents = ''
        res.render("./studentlist/studentlist.ejs", { msg: msg, allstudents: allstudents });
    }
    else {
        if (ditem[0] == 'duplicate') {
            msg = "Duplicate Roll number not allowed"
            res.render("./studentlist/studentlist.ejs", { msg: msg, allstudents: allstudents });
        } else if (ditem[0] == 'Error') {
            msg = "Error occured, Please try with different values"
            res.render("./studentlist/studentlist.ejs", { msg: msg, allstudents: allstudents });
        }
        else {
            res.render("./studentlist/studentlist.ejs", { msg: msg, allstudents: allstudents });
        }
    }

})
app.post("/studentlist",authenticateUser, async (req, res) => {
    let getting_value = req.body;
    let allstudents = Object.values(getting_value);
    for (const element of allstudents) {
        let det1 = new detail1({
            name: element.Name,
            rollno: Number(element.Roll),
            course: element.Course,
            section: element.Section,
            year: element.Year,
            phone: Number(element.Phone),
            atttaken: 0,
            totalclass: 0,
            attandencepercentage: 0
        });
        try {
            await det1.save().then(() => {
                res.redirect("/studentlist");
            })
        } catch (err) {
            // console.log("Error:", err.name);
            if (err.code == 11000) {
                console.log("--%% Error Occured %%---");
                res.redirect("/studentlist?duplicate")
            } else if (err.name == 'ValidationError') {
                console.log("--%% Error Occured %%---");
                // console.log(err);
                res.redirect("/studentlist?Error")
            }
        }
    }
});
app.delete("/studentlist/:id",authenticateUser, async (req, res) => {
    let { id } = req.params;
    await detail1.findByIdAndDelete(id).then(async () => {
        let a = await detail1.find({})
        console.log("a",a);
        if (a.length<=0) {
            await alldates.deleteMany({});
        }
    })
    let b = await datewise.find({ attandencepercentage: id });
    if (b != null) {
        await datewise.deleteMany({ attandencepercentage: id });
    }
    console.log(b);
    res.redirect("/studentlist")
})
app.get("/fee", (req, res) => {
    res.render("./fees/fee.ejs")
})
app.get("/markgrade",async()=>{

})

app.listen(PORT, () => {
    console.log("listing server");
})