const express = require("express");
const db = require("../db");
const checkLogin = require("../middleware/checkLogin");

const router = express.Router();

router.get("/", checkLogin, (req, res, next) => {
    const loggedIn = req.session.isLoggedIn;

    res.render("screens/main", {loggedIn});
});

router.get("/signup", checkLogin, (req, res, next) => {
    const loggedIn = req.session.isLoggedIn;

    res.render("screens/signup", {loggedIn});
});

router.post("/signup", (req, res, next) => {
    const insertQuery = `
        INSERT  INTO    users (
            email,
            password,
            name,
            mobile,
            createdAt,
            updatedAt
        ) VALUES (
            "${req.body.input_email}",                    
            "${req.body.input_password}",                
            "${req.body.input_name}",                
            "${req.body.input_mobile}", 
            now(),
            now()                   
        )
    `;
    try {
        db.query(insertQuery, (err, rows) => {
            if (!err) {
                return res.redirect("/");
            };
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send("회원가입 실패");
    };   
});

router.get("/signin", checkLogin, (req, res, next) => {
    const loggedIn = req.session.isLoggedIn;

    res.render("screens/signin", {loggedIn});
});

router.post("/signin", (req, res, next) => {
    const selectQuery = `
        SELECT  id,
                email,
                password,
                name,
                mobile
          FROM  users
         WHERE  email = "${req.body.signinEmail}"
           AND  password = "${req.body.signinPassword}"    
    `;

    try {
        db.query(selectQuery, (error, rows) => {
            if (error) {
                console.error(error);
                return res.redirect("/signin");
            }

            if (rows.length === 0) {
                return res.redirect("/signin");
            }

            req.session.isLoggedIn = true;
            req.session.userId = rows[0].id;
            return res.redirect("/");
        });
    } catch (error) {
        console.log(error);
        return res.redirect("/signin");
    };
});

router.get("/logout", (req, res, next) => {
    req.session.isLoggedIn = false;
    req.session.userId = null;
    return res.redirect("/");
});

module.exports = router;