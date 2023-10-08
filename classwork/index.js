const express = require("express");
const app = new express();
const path = require("path");
const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");
app.use(express.static("public"));

const ejs = require("ejs");
app.set("view engine", "ejs");
const { connect } = require('http2');


const { title } = require("process");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

let mongoDbQuery = "mongodb+srv://hmthakor2851:hardik@cluster0.clmnije.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDbQuery, { useNewUrlParser: true });

const fileUpload = require('express-fileupload');
app.use(fileUpload());

async function creatBlogPost() {
  try {
    const blogposts = await BlogPost.create({
      title: "Testing application second time",
      body: "this is message to all students",
    });

    console.log(blogposts);
  } catch (error) {
    console.error(error);
  }
}

// creatBlogPost();

async function creatBlogPost(req) {
  try {
    const blogpost = await BlogPost.create(req.body);
    console.log(blogpost);
  } catch (error) {
    console.log(error);
  }
}

async function findAllObjects() {
  try {
    const blogposts = BlogPost.find({});

    console.log(blogposts);
  } catch (error) {
    console.error(error);
  }
}

// findAllObjects();

async function findAllObjectsByID() {
  try {
    let id = "65175ef685376058f2168f9d";
    const blogposts = await BlogPost.findById(id);

    console.log(blogposts);
  } catch (error) {
    console.error(error);
  }
}

// findAllObjectsByID();

async function findAndUpdateByID() {
  try {
    const id = "65175ef685376058f2168f9d";
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(id, {
      title: "Updated title",
    });
    console.log(updatedBlogPost);
  } catch (error) {
    console.log(error);
  }
}

// findAndUpdateByID();

async function findAndDeleteByID() {
  try {
    const id = "65175ef685376058f2168f9d";
    const deletedBlogPost = await BlogPost.findByIdAndDelete(id);
    console.log(deletedBlogPost);
  } catch (error) {
    console.log(error);
  }
}

// findAndDeleteByID();

async function createBlogPost() {
  try {
    const blogpost = await BlogPost.create(req.body);
    res.redirect("/index");
  } catch (error) {
    console.log(error);
  }
}

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

app.get("/index", async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render("index.ejs", { blogposts: blogposts });
});

app.get("/index", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/post", (req, res) => {
  res.render("post.ejs");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

// app.post('/posts/store', (req, res)=>{
//     // console.log('Titile is:- '+req.body.title);
//     // console.log('Body is :- '+req.body.body);
//     res.redirect('/index');
// })

app.post("/posts/store", (req, res) => {
  // creatBlogPost(req);
  uploadImage(req);
  res.redirect("/index");
});

async function uploadImage(req, res){
        try{
        let image = req.files.image
        await image.mv(path.resolve(__dirname, "./public/img",image.name))
        const blogposts = await BlogPost.create({
        ...req.body,
        image: '/img/'+ image.name
        })
        // res.redirect('/')
        }catch(error){
        //handle error
        console.log(error)
        }
    }

// creatBlogPost();

app.get("/post/:id", async (req, res) => {
  const postId = req.params.id;
  console.log("req.params.id" + postId);
  const blogpost = await BlogPost.findById(postId);
  console.log(blogpost);
  res.render("post.ejs",{blogpost});
});

