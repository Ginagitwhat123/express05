const express = require("express");
const {singers} = require("./singers.json");
 //json 直接require進來時會從json格式變成物件(冒號左邊沒有雙引號) 但在common js中可以透過在const 的時候加上大括號就可以轉為陣列

const app = express();

app.get("/", (req, res) => {
    res.send("網站主頁")
})

app.get("/singer/:id.html", (req, res) => {
    const {id} = req.params; 
    const result =  singers.find(singer => {
        if(singer.id == id){
            return true;
        }
    });
    if(!result){
        res.send("<h1>404 - 找不到歌手</h1>")
        return;
    }
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>歌手: ${result.singer_name}</title>
    <style>
        img{
            width: 100%;
        }
    </style>
</head>
<body>
    <h1>${result.singer_name}</h1>
    <h3>${result.singer_id}</h3>
    <img src="${result.singer_img}" alt="">
</body>
</html>`)
})

app.get("*", (req, res) => {
    res.send("404")
})

app.listen(3000, () => {
    console.log("running at http://localhost:3000");
});