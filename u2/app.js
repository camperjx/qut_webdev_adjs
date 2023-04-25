const http = require("http");
const fs = require("fs");
const path = "guestBook.json";

function routing(req, res) {
    const url = req.url;
    if (url.startsWith("/form")) {
        // The form page
        res.writeHead(200, {"Content-Type": "text/html"}); // http header
        res.write(`
   <form action=/add>
      <table>
      <tr><td><label>name<input name="name"></label></td></tr>
      <tr><td><label>age<input name="age"></label></td></tr>
      <tr><td> <label>gender<input name="gender"></label></td></tr>
      <tr><td><label>comment<textarea name="comment" ></textarea></td></tr>
                  
       <tr><td><input type="submit"></td></tr>
       </table>
   </form>
   `);
        res.end();
    } else if (url.startsWith("/add")) {
        // The add page
        // res.write("Add");
        fs.readFile(path, function (err, data) {
            if (err) {
                res.write("You should do some real error handling here");
                res.end();
                return;
            }

            // Try to read from the guestbook. If it fails, set the guest book to empty
            let guestBook = [];
            try {
                guestBook = JSON.parse(data);
            } catch (e) {
            }
            console.log(guestBook);

            // Add the name in the url params to the guestbook
            const params = new URLSearchParams(url.split("?")[1]); // Get the part of the url after the first "?"
            guestBook.push({
                name: params.get("name")
                , age: params.get('age')
                , gender: params.get('gender')
                , comment: params.get('comment')

                ,
            }); // Get the name param and add it to the guestbook


            // Write the updated guestbook to the filesystem
            fs.writeFile(path, JSON.stringify(guestBook), (err) => {
                if (err) {
                    res.write("You should do some real error handling here");
                    res.end();
                    return;
                }
                res.write("Successfylly updated the guestbook");
                res.end();
            });


        });


    } else if (url.startsWith("/read")) {


        res.writeHead(200, {"Content-Type": "application/json"}); // http header

        fs.readFile(path, function (err, data) {
            let content = JSON.parse(data);
            res.write(JSON.stringify(content));
            res.end();
        })

    } else {
        // No page matched the url
        res.write("No matching page");
        res.end();
    }
}

const server = http.createServer(routing)

server.listen(3000, function () {
    console.log("server start at port 3000")
})