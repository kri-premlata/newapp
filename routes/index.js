var express = require("express");
var router = express.Router();
const path = require("path");
const fs = require("fs");
const { name } = require("ejs");
const { title } = require("process");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Home Page" });
// });

// GET details
router.get("/user/:id", (req, res, next) => {
  console.log(req.params.id);
  res.render("details", { title: "EFG | Detailpage" });
});

// GET login
router.get("/login", (req, res, next) => {
  console.log(req.query);
  res.render("login");
});

// GET Register
router.get("/register", (req, res, next) => {
  // render register view with message if there is one in the session
  console.log(req.query);
  res.render("register");
});

// Post register
router.post("/register", (req, res, next) => {
  console.log(req.body);
  res.redirect(`/login`);
});

// Post Profile
router.post("/profile", (req, res, next) => {
  console.log(req.body);
  res.render("profile", { data: req.body });
});

// class 15

// Showing file path:- 
// 1. Create a form in homepage -> /
//           form must include input(filename) and button with method post and action "/create"

//2. Make a post route of "/create" in "index.js" now create a folder name "upload" in public folder, and 
// using path package send "path" of the .../upload/filename.ext to browser,
//e.g => let filepath = path.join(__dirname, "..", "public", "upload", req.body.filename)
// output:- "abc/public/upload/index.html"

// router.post("/create", (req, res, next) => {
//  const filepath= path.join(__dirname, "", "public", "upload", req.body.filename);
//   res.send(filepath);
// });



// POST CREATE ROUTE:- (creating new file in upload folder)

// 3. Use "fs" package to and create an empty file on the same path given above 
// and message to browser "file created!"

// router.post("/create",(req,res,next)=>{
//   try {
//   const filepath =path.join(__dirname, "..", "public", "upload", req.body.filename);
//   fs.writeFileSync(filepath,"");
//   res.send("File Created!");
// } catch (error) {
//   res.send(error);
// }
// });


// REDIRECTING THE EXITING ROUTE & DIFFERENT MEASSAGE(appending data into that file which
//  we will get from another form in HOME PAGE)

//4. Edit the "/create" post route and instead of sending "file created!" redirect 
// the route to "/" existing get route:-
//  e.g res.redirect("/")   // existing get route

router.post("/create", (req, res, next) => {
  try {
    const filepath = path.join(
      __dirname,
      "..",
      "public",
      "upload",
      req.body.filename
    );
    fs.writeFileSync(filepath, "");
    res.redirect("/");
  } catch (error) {
    res.send(error);
  }
});


// 5. Edit the "/" get route and read the directory "upload" with "path" 
//     and "fs" package and console.log(...) it in terminal

// router.get('/', function(req, res, next) {
//  const filepath = path.join(__dirname, "..", "public", "upload");
//  const files= fs.readdirSync(filepath);
//  console.log(files);
//  res.render('index', { title: 'Home Page'});
// });

// 6. Re-edit the again the "/" get route & render the files(array) to render &
//  with the help of forEach show the list of the files in "index.ejs"

router.get("/", (req, res, next)=> {
  const filepath = path.join(__dirname,"..","public","upload");
  const files = fs.readdirSync(filepath);
  console.log(files);
  res.render("index",{files});
});

// router.get("/", (req, res, next)=> {
//   res.render("index",{
//     users: [
//       { id: 1, name: "Kavya", email: "kavya@gmail.com", gender: "Female" },
//       { id: 2, name: "Dimple", email:   "dimple@gmail.com", gender: "Female" },
//       { id: 3, name: "Suman", email: "suman@gmail.com", gender: "Male" },
//       { id: 4, name: "Shivam", email: "shivam@gmail.com", gender: "Male" },
//     ],
//   });
// });


// Create "script.js" file in javascripts (by fs.writeFileSync() method)
// router.post("/create",(req,res,next)=>{
//   try {
//   const filepath = path.join(__dirname, "..", "public", "javascripts", req.body.filename);
//   fs.writeFileSync(filepath,"");
//   res.redirect("/");
// } catch (error) {
//   res.send(error);
// }
// });


// Class 16
// 7. Make the list item clickabble and redirect to /file/:filename get route make /file/:filename 
// get route in "index.js" where the route send the param "filename" to browser.
// 
// router.get('/file/:filename',(req,res,next)=>{
//   res.send(req.params.filename);
// });

// 8.In the get route /file/:filename write a code to delete the respective file coming in the params 
// with the help of path and fs and redirect the app to / get route


// router.get('/file/:filename',(req,res,next)=>{
//   fs.unlinkSync('/file/:filename');
//   res.send(req.params.filename);
//   res.redirect("/");
// })

router.get('/file/:filename',(req,res,next)=>{
  let filename=req.params.filename;
  res.render('delete',{
    filename:filename
  });
});

router.post('delete/:filename',(req,res,next)=>{
  let filename=req.params.filename;
  let filepath=path.join(__dirname,'..','public','upload',filename);
  fs.unlinkSync(filepath);
  res.redirect('/');
});



module.exports = router;
