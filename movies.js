(function () {
    'use strict'

    const url = 'https://mysterious-flat-dawn.glitch.me/movies'

    //selecting loading div
    const loader = $('#loading')

    // add display to loader
    const displayLoading = () => {
        loader.addClass("display")

    }

    // hide loading
    // uncomment if you need it at line 39
    // const hideLoading = () => {
    //     loader.removeClass("display")
    // }

    const fetchHandler = () => {
        displayLoading()
        setTimeout(() => {
            loader.removeClass("display")
        //     half a second delay
        }, 500)

        fetch(url).then(res => res.json()).then(res => {
            //remove timeout above and uncomment hideloading to have icon go away right when the info is loaded
            // hideLoading()
            console.log(res)
        })
    }

    fetchHandler()



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



