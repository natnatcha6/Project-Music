// var mongoose    = require('mongoose');
// var Slide       = require('./models/slide');
// var data =[
//     {
//         image: 'https://i.pinimg.com/564x/48/4b/6a/484b6ab6243de8d65380b5742ede17e4.jpg',
//         class: "carousel-item active"

//     },

//     {
//         image: 'https://i.pinimg.com/564x/50/df/a0/50dfa0ec1251489035c6fa86fd2332a4.jpg',
//         class: "carousel-item"
//     },
    
//     {
//         image: 'https://i.pinimg.com/564x/85/c4/6f/85c46f7efb8ea54fa42236836e0a3d84.jpg',
//         class: "carousel-item"
//     },
    
// ];

// function seedDB(){
//     Slide.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log('remove DB completed');
//         data.forEach(function(seed){
//             Slide.create(seed, function(err, slide){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     console.log('new data add');
//                 }
//             });
//         });
//     });
// }

// module.exports = seedDB;

var mongoose    = require('mongoose');
var Music   = require('./models/music');
var data =[
    {   
        artist: "Justin Bieber",
        music: "Peaches",
        imageMu: "http://localhost:3000/images/home1.jpg",
        mp3: "http://localhost:3000/images/home1.jpg",
        melody: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {artist: "ROSÉ",
    music: "Gone",
    imageMu: "https://image.joox.com/JOOXcover/0/da1cab73156e1afe/300",
    mp3: "https://image.joox.com/JOOXcover/0/da1cab73156e1afe/300",
    melody: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
];

function seedDB(){
    Music.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log('remove DB completed');
        data.forEach(function(seed){
            Music.create(seed, function(err, artist){
                if(err){
                    console.log(err);
                } else {
                    console.log('new data add');
                }
            });
        });
    });
}

module.exports = seedDB;

// var mongoose    = require('mongoose');
// var Home      = require('./models/home');
// var data =[
//     {
//         no: "1",
//         artist: "Justin Bieber, Daniel Caesar, Giveon",
//         music: "Peaches",
//         imageMu:"http://localhost:3000/images/home1.jpg"
//     },
//     {
//         no: "3",
//         artist: "ROSÉ",
//         music: "Gone",
//         imageMu:"https://image.joox.com/JOOXcover/0/da1cab73156e1afe/300"
//     },
//     {
//         no: "5",
//         artist: "BTS",
//         music: "Dynamite",
//         imageMu:"https://image.joox.com/JOOXcover/0/03a5b7f0c9f69ae6/300"
//     },
//     {
//         no: "7",
//         artist: "Jawsh 685, Jason Derulo, BTS",
//         music: "Savage Love ",
//         imageMu:"https://image.joox.com/JOOXcover/0/b80e0a8bb5eeccfb/300"
//     },
//     {
//         no: "9",
//         artist: "Shawn Mendes",
//         music: "Monster",
//         imageMu:"https://image.joox.com/JOOXcover/0/adc24a2f40533407/300"
//     },
//     {
//         no: "11",
//         artist: "Taylor Swift",
//         music: "willow",
//         imageMu:"https://image.joox.com/JOOXcover/0/9cd766a9bed3f3aa/300"
//     },
//     {
//         no: "2",
//         artist: "ROSÉ",
//         music: "On The Ground",
//         imageMu:"https://image.joox.com/JOOXcover/0/da1cab73156e1afe/300"
//     },
//     {
//         no: "4",
//         artist: "Doja Cat",
//         music: "Kiss Me More",
//         imageMu:"https://image.joox.com/JOOXcover/0/09e602de6fbc09af/300"
//     },
//     {
//         no: "6",
//         artist: "Ariana Grande",
//         music: "34+35",
//         imageMu:"https://image.joox.com/JOOXcover/0/51dd6f3aa524074e/300"
//     },
//     {
//         no: "8",
//         artist: "Finn Askew",
//         music: "Roses",
//         imageMu:"https://image.joox.com/JOOXcover/0/84890e51e2f30c29/300"
//     },
//     {
//         no: "10",
//         artist: "John K",
//         music: "parachute",
//         imageMu:"https://image.joox.com/JOOXcover/0/bda136ffd1f4425b/300"
//     },
//     {
//         no: "12",
//         artist: "Ariana Grande",
//         music: "positions",
//         imageMu:"https://image.joox.com/JOOXcover/0/51dd6f3aa524074e/300"
//     }
// ];

// function seedDB(){
//     Home.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log('remove DB completed');
//         data.forEach(function(seed){
//             Home.create(seed, function(err, home){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     console.log('new data add');
//                 }
//             });
//         });
//     });
// }

// module.exports = seedDB;