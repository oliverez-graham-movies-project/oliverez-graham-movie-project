(function () {
    'use strict'

    //Test fetch
    fetch('https://mysterious-flat-dawn.glitch.me/movies').then(res => res.json()).then(res => console.log(res))


    //display loading
    //selecting dom elements
    const textInput = $('#inputPart')




    //post request TODO needs cleaning

    // const moviePost = {title: 'Godzilla', body: 'Monster movie'};
    // const url = 'https://mysterious-flat-dawn.glitch.me/movies';
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(moviePost),
    // };
    // fetch(url, options)
    //     .then(res => res.json()).then(res => console.log(res))
    //     .catch(/* handle errors */);

    //Delete request

    // const moviePost = {title: 'Godzilla', body: 'Monster movie'};
    // const url = 'https://mysterious-flat-dawn.glitch.me/movies';
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(moviePost),
    // };
    // fetch(url, options)
    //     .then(res => res.json()).then(res => console.log(res))
    //     .catch(/* handle errors */);



})()



