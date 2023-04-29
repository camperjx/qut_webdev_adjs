const http = require("http");
require("dotenv").config();
const API_KEY = process.env.WEATHERAPI_KEY;
// const API_KEY = "e700591406f749c099f145451232804";
const WEATHERAPI_BASE = "http://api.weatherapi.com/v1";

// async function weather(res) {
//     const data = {"condition": "Partly cloudy", "temperature": 28};
//     res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
//     res.write(JSON.stringify(data));
//     res.end();
// }
async function weather(res, location) {
    // console.log(API_KEY)

    const weatherResponse = await fetch(`${WEATHERAPI_BASE}/current.json?key=${API_KEY}&q=${location}`);
    const weatherData = await weatherResponse.json();
    const dateLastTime = new Date().getTime()
    const responseData = {"condition": weatherData.current.condition.text, "temperature": weatherData.current.temp_c, "icon": weatherData.current.condition.icon};

    res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
    res.write(JSON.stringify(responseData));
    res.end();
}



function routing(req, res) {
    const url = req.url;
    const method = req.method;
    if (url.startsWith("/weather") && method == "GET") {
        let location =new URLSearchParams(url.split("?")[1]).get("location")
        weather(res, location)
    } else {
        // No page matched the url
        res.write("No matching page");
        res.end();
    }
}
http.createServer(routing).listen(3000, function () {
    console.log("server start at port 3000"); //the server object listens on port
});