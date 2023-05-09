(function () {
    'use strict'

    const OMDB_API_KEY = '79f519c7'
    const movieUrl = 'https://mysterious-flat-dawn.glitch.me/movies'


    //selecting loading div
    const loader = $('#loading')

    // add display to loader
    const displayLoading = () => {
        loader.addClass("display")
    }

    // hide loading
    // uncomment if you need it at line 39
    const hideLoading = () => {
        loader.removeClass("display")
    }

    // const fetchHandler = () => {
    //     displayLoading()
    //     // setTimeout(() => {
    //     //     loader.removeClass("display")
    //     //     //     half a second delay
    //     // }, 500)
    //
    //     fetch(movieUrl).then(res => res.json()).then(res => {
    //         //remove timeout above and uncomment hideloading to have icon go away right when the info is loaded
    //         hideLoading()
    //         console.log(res)
    //     })
    // }

    const fetchHandler = async () => {
        displayLoading()
        const moviesResponse = await fetch(movieUrl)
        const moviesJSON = await moviesResponse.json()
        hideLoading()
        console.log(moviesJSON)

        createMovieCards(moviesJSON)


    }

    const createMovieCards = async arr => {
        let markup = ''
        // const movies = await fetchHandler()
        const newArr = arr.map(async movie => {
            const movieTitle = movie.title
            const movieDirector = movie.director
            const movieRating = movie.rating
            const movieGenre = movie.genre
            const movieImg = await fetchDBTitle(movieTitle)
            console.log(movieImg)

            return markup += `
            <div class="card" style="width: 18rem;">
                <img src="${movieImg}" class="card-img-top" alt="${movieTitle}">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            `
        })
        await Promise.all(newArr)

        $('.container').html(markup)
    }




    // **************************** //
    //post request
    const postMovie = obj => {
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        };
        fetch(movieUrl, postOptions)
            .then(res => res.json()).then(json => {
            fetchHandler()
        })
            .catch(/* handle errors */);
    }

    // postMovie({title: 'godzilla', genre: 'munster movei'})


    // **************************** //
    //Delete request
    //fetching with deleteOptions, and given an id
    const deleteOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const deleteMovie = e => {
        console.log(e.target.id);
        const id = e.target.id
        fetch(`https://mysterious-flat-dawn.glitch.me/movies/${id}`, deleteOptions).then(res => {
            fetchHandler()
        })
            .catch(/* handle errors */);
    }

    $('.deleteBtn').on('click', deleteMovie)

    // **************************** //
    //Patch request
    const patchMovie = (obj, id) => {
        const patchOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        };
        fetch(`https://mysterious-flat-dawn.glitch.me/movies/${id}`, patchOptions)
            .then(res => res.json()).then(json => {
            console.log(json)
            fetchHandler()
        })
            .catch(/* handle errors */);
    }

    // patchMovie({title: 'Godzilla', genre: 'monster movie'}, 9)

    // **************************** //
    //OMDB fetch
    // Async Await way
    const fetchDBTitle = async title => {
        const urlString = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${title}`
        const response = await fetch(urlString)
        const movieInfo = await response.json()

        console.log(movieInfo)
        return movieInfo.Poster

        console.log(movieInfo.Poster)
        $('.card').attr('src', PosterURL); // set poster


    }

    //Curriculum way
    // const fetchDBTitle = title => {
    //     const urlString = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${title}`
    //     fetch(urlString).then(res => res.json()).then(json => console.log(json))
    // }

    // fetchDBTitle('the big lebowski')


    fetchHandler()

})()



