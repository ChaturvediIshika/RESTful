const { urlencoded } = require('express');
const express=require('express');
const app=express();
const path=require('path')
const {v4:uuid}=require('uuid');
const methodOverride=require('method-override');

app.set('view engine','ejs')
app.use(express.static('public'))
app.set('views',path.join(__dirname,'views'))

app.use(urlencoded({extended:true}));
app.use(methodOverride('_method'));

let comments=[
    {
        id:uuid(),
        username:"ishika",
        text:"Hello"
    },
    {
        id:uuid(),
        username:"aakrati",
        text:"Hello"
    },
    {
        id:uuid(),
        username:"kajal",
        text:"Hello"
    }
];

app.get('/',(req,res)=>{
    res.send("Connected")
});

app.get('/comments',(req,res)=>{
    res.render('index',{comments})
});

app.get('/comments/new',(req,res)=>{
    res.render('new');
});

app.post('/comments',(req,res)=>{
    const {username,text}=req.body;
    comments.push({username,text,id:uuid()});
    res.redirect('/comments');
});

app.get('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const com=comments.find((comment)=>comment.id===id)
    res.render('show',{com});
})

app.get('/comments/:id/edit',(req,res)=>{
    const {id}=req.params;
    const com=comments.find((comment)=>comment.id===id)
    res.render('edit',{com});
})

app.patch('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const com=comments.find((comment)=>comment.id===id)
    const {text}=req.body;
    com.text=text;
    res.redirect('/comments');
})

app.delete('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const newcomments=comments.filter((comment)=>comment.id!==id);
    comments=newcomments;
    res.redirect('/comments');
})

app.listen(4000,()=>{
    console.log("server running");
})