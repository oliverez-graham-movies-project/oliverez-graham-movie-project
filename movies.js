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
            const movieDB = await fetchDBTitle(movieTitle)
            console.log(movieDB)
            // console.log(movieImg)

            return markup += `
            <div class="card col col-md-6 col-lg-6 col-xl-4" id="grad2">
            <div class="top-holder d-flex flex-column align-items-center ">
                <p class="title"><h1><u>${movieTitle}</u></h1></p>
                <p class="rating"><i class="fa-sharp fa-solid fa-star"></i> Rating: ${movieDB.imdbRating}/10</p>
            </div>
                <img src="${movieDB.Poster}" class="card-img-top" alt="${movieTitle}">
                <div class="card-body">
                    <p class="genre"><span class="badge rounded-pill bg-dark">${movieDB.Genre}</span></p>
                    <hr>
                    <p class="director">Director: ${movieDirector}</p>
                    <hr>
                    <p class="synopsis">Synospis: ${movieDB.Plot}</p>
                </div>
            </div>
            </div>
            <br>
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
        return movieInfo
    }

    //Curriculum way
    // const fetchDBTitle = title => {
    //     const urlString = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${title}`
    //     fetch(urlString).then(res => res.json()).then(json => console.log(json))
    // }

    // fetchDBTitle('the big lebowski')


    fetchHandler()

})()



