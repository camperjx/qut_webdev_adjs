const http = require("http");
const fs = require('fs');

const data = [
    "Siamese",
    "Persian",
    "Maine Coon",
    "Bengal",
    "Scottish Fold",
    "British Shorthair",
    "Sphynx",
    "Abyssinian",
    "American Shorthair",
    "Russian Blue",
    "Ragdoll",
    "Devon Rex",
    "Birman",
    "Siberian",
    "Manx",
    "Exotic Shorthair",
    "Burmese",
    "Tonkinese",
    "Savannah",
    "Himalayan",
];

function routing(req, res) {
    const url = req.url;
    const method = req.method
    if (url.startsWith("/data")) {
        // The form page
        // res.write("Data");
        if (method == "GET") {
            // The form page

            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify(data));

            res.end();
        }
        res.end();
    } else if (url.startsWith("/login")) {
        // The add page
        if (method == "POST") {
            // The form page
            res.write("Login");
            res.end();
        }
        res.end();
    } else if (url.startsWith("/client")) {
        // The add page

        const filename = "client.html"; // The Filename to read from


        // Try to read the file
        fs.readFile(filename, "binary", function (err, file) {
            // If there is an error, output the message as JSON and return
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.write(JSON.stringify({ error: err }));
                res.end();
                return;
            }

            // Respond with the HTML file
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(file, "binary");
            res.end();


        });


    } else {
        // No page matched the url
        res.write("No matching page");
        res.end();
    }
}
http.createServer(routing).listen(3000, function () {
    console.log("server start at port 3000"); //the server object listens on port
});