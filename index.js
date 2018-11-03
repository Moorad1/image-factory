var fetch = require('node-fetch');
var express = require('express');
var app = express()
const cors = require('cors');
var server = app.listen('4000', () => {
    console.log('Server Works/ Port 4000');
})
var links = [];
var urlString = 'https://api.unsplash.com/search/photos?';
var apiKey = '6996743d511007f229e948415a2e11c1b0d16fb65458d252b914e81cbc7d3a9d';

app.use(cors())
app.use(express.json());

app.post('/search',(req,res) => {
     var search = req.body.value;
     urlString += `client_id=${apiKey}&page=1&query=${search}`;
     console.log('GOT URL');
     fetch(urlString , {method:'get'})
     .then(res => res.json())
     .then(json  => {obj = json;})
     .then(() => {
         for (var i = 0;i < 10;i++) {
         links.push(obj.results[i].urls.regular);
         }  
         
     }).then(() => {
        urlString = 'https://api.unsplash.com/search/photos?'
        urlString += `client_id=${apiKey}&page=2&query=${search}`;
        console.log('GOT URL');
        fetch(urlString , {method:'get'})
        .then(res => res.json())
        .then(json  => {obj = json;})
        .then(() => {
            for (var i = 0;i < 10;i++) {
            links.push(obj.results[i].urls.regular);
            }  
        }).then(() => {
            urlString = 'https://api.unsplash.com/search/photos?'
            urlString += `client_id=${apiKey}&page=3&query=${search}`;
            console.log('GOT URL');
            fetch(urlString , {method:'get'})
            .then(res => res.json())
            .then(json  => {obj = json;})
            .then(() => {
                for (var i = 0;i < 10;i++) {
                links.push(obj.results[i].urls.regular);
                }  
            }).then(() => {
                res.json(links);
                links = [];
            })  
        })
     });
});

    