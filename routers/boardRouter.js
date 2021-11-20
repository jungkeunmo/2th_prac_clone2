const express = require("express");
const db = require("../db");
const checkLogin = require("../middleware/checkLogin");

const router = express.Router();

router.get("/list", checkLogin, (req, res, next) => {
    const selectQuery = `
        SELECT  A.id,
                A.title,
                B.name,
                A.createdAt
          FROM  boards  A
         INNER
          JOIN  users   B
            ON  A.userId = B.id
         ORDER  BY  A.createdAt DESC    
    `;
    const loggedIn = req.session.isLoggedIn;
    try {
        db.query(selectQuery, (err, rows) => {
            return res.render("screens/board/list", { loggedIn, boardList: rows });
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send("데이터 조회 실패");
    };
});

router.get("/detail", checkLogin, (req, res, next) => {
    const selectQuery =`
        SELECT  A.id,
                A.title,
                A.content,
                B.name,
                A.createdAt
          FROM  boards  A
         INNER  
          JOIN  users   B
            ON  A.userId = B.id
         WHERE  A.id = ${req.query.bid}     
    `;

    const loggedIn = req.session.isLoggedIn;
    try {
        db.query(selectQuery, (err, rows) => {
            res.render("screens/board/detail", { loggedIn, bData: rows[0] });
        })
    } catch (error) {
        console.error(error);
        return res.status(400).send("작성하는데 실패했습니다.");
    };
});

router.get("/update", checkLogin, (req, res, next) => {
    const loggedIn = req.session.isLoggedIn;
    res.render("screens/board/update", {loggedIn});
});

router.get("/write", checkLogin, (req, res, next) => {
    const loggedIn = req.session.isLoggedIn;
    res.render("screens/board/write", {loggedIn});
});

router.post("/write", (req, res, next) => {
    const insertQuery = `
        INSERT  INTO    boards (
            title,
            content,
            createdAt,
            updatedAt,
            userId
        ) VALUES (
            "${req.body.input_title}",
            "${req.body.input_content}",
            now(),
            now(),
            ${req.session.userId}
        )
    `;
    try {
        db.query(insertQuery, (err, rows) => {
            if(err) {
                console.error(err);
                return res.redirect("/board/list");
            };

            return res.redirect("/board/list");
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send("작성하는데 실패함");
    };
});

module.exports = router;