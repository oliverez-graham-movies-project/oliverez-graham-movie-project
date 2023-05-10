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
        await createMovieCards(moviesJSON)
        hideLoading()
        console.log(moviesJSON)
    }

    const createMovieCards = async arr => {
        arr.sort((a, b) => a.title.localeCompare(b.title))//SORT THE ARRAY ALPHABETICALLY BASED ON MOVIE TITLE
        let markup = ''
        // const movies = await fetchHandler()
        const newArr = arr.map(async movie => {
            const movieTitle = movie.title
            const movieDB = await fetchDBTitle(movieTitle)
            console.log(movieDB)
            // console.log(movieImg)

            return markup += `

            <div class="card col col-md-6 col-lg-6 col-xl-4" id="grad2">
            <div class="top-holder d-flex flex-column align-items-center ">
                <p class="title"><h1><u>${movieDB.Title}</u></h1></p>
                <p class="rating"><i class="fa-sharp fa-solid fa-star"></i> Rating: ${movieDB.imdbRating}/10</p>
            </div>
                <img src="${movieDB.Poster}" class="card-img-top" alt="${movieDB.Title}">
                <div class="card-body">
                    <p class="genre"><span class="badge rounded-pill bg-dark">${movieDB.Genre}</span></p>
                    <hr>
                    <p class="director">Director: ${movieDB.Director}</p>
                    <hr>
                    <p class="synopsis">Synospis: ${movieDB.Plot}</p>
                      <button type="button" class="btn btn-primary deleteBtn" id="${movie.id}">Delete</button>
                    <button class="btn btn-primary editBtn">Edit</button>

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

    // show modal on click
    $('.add-movie').on('click', () => {
        console.log('clicked')
        //triggering hidden modal button
        $('.add-movie-modal-btn').trigger('click')
    })

    $('.addBtn').on('click', () => {
        const movieObj = {title: $('#movie-title').val(), rating:  $('#movie-rating').val()}
        postMovie(movieObj)
        $('#movie-rating').val("")
        $('#movie-title').val("")
    })



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
        if(e.target.classList.contains('deleteBtn')) {
            e.preventDefault()
            const confirmed = confirm('Are you sure you want to delete this movie?')
            if (confirmed) {
                console.log('clicked')
                console.log(e.target.id);
                const id = e.target.id
                fetch(`https://mysterious-flat-dawn.glitch.me/movies/${id}`, deleteOptions).then(res => {
                    fetchHandler()

                })
                    .catch(/* handle errors */);
            }

        }

    }

    $('.container').on('click', deleteMovie)

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

    const editMovie = e => {
        e.preventDefault()
        if (e.target.classList.contains('editBtn')) {
            console.log('clicked')


        }
    }

    $('.container').on('click', editMovie)


    // **************************** //
    //OMDB fetch
    // Async Await way
    const fetchDBTitle = async title => {
        const urlString = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${title}`
        const response = await fetch(urlString)
        const movieInfo = await response.json()
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