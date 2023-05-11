(function () {
    'use strict'

    const movieUrl = 'https://mysterious-flat-dawn.glitch.me/movies'

    // ************OMDB FETCH*********** //
    const fetchDBTitle = async title => {
        try {
            const urlString = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${title}`
            const response = await fetch(urlString)
            const movieInfo = await response.json()
            return movieInfo
        } catch (err) {
            console.log('oh no')
            return alert(err)
        }

    }

    // ***********LOADER WHEEL********** //
    const displayLoading = () => {
        $('#loading').addClass("display")
        $('body').css('background-attachment', "fixed")

    }

    const hideLoading = () => {
        $('#loading').removeClass("display")
        // $('body').css('background-attachment', "initial")
    }

    const fetchHandler = async () => {
        try {
            displayLoading()
            // UNCOMMENT FOR TIMER
            // setTimeout(() => {
            //             hideLoading()
            //             //     half a second delay
            //         }, 4000)
            const moviesResponse = await fetch(movieUrl)
            const moviesJSON = await moviesResponse.json()
            return moviesJSON
        } catch(err) {
            console.log('oh no')
            return alert(err)
        }

        // await createMovieCards(moviesJSON)
        // hideLoading()


    }

    const fetchAndCreateCards = async (arr) => {
        try {
            await createMovieCards(arr)
            hideLoading()
        } catch(err) {
            console.log('oh no')
            return alert(err)
        }

    }

    // ***********CREATE CARDS********** //
    // TODO CLEAN UP FUNCTION, ASYNC MAY NOT BE NECESSARY


    const createMovieCards = async arr => {
        try {
            const array = await arr
            let markup = ''
            const newArr = array.map(async movie => {
                const movieTitle = movie.title
                const movieDB = await fetchDBTitle(movieTitle)
                markup += `
            <div class="card card-set-height mt-3" id="grad2">
                <p class="genre text-center"><span class="badge rounded-pill bg-white">${movieDB.Genre}</span></p>
                <img src="${movieDB.Poster}" class="card-img-top" alt="${movieDB.Title}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <p class="rating d-flex justify-content-center"><i id="icon" class="fa-sharp fa-solid fa-star"></i> &nbsp; Rating: ${movie.rating}/10</p>
                    <hr>
                    <p class="card-info">Title: ${movieDB.Title}</p>
                    <hr>
                    <p class="director card-info">Director: ${movieDB.Director}</p>
                    <hr>
                    <p>
                        <a class="dropdown-toggle" data-bs-toggle="collapse" href="#collapse-${movie.id}" role="button" aria-expanded="false" aria-controls="collapseExample">
                        Plot
                        </a>
                    </p>
                    <div class="collapse" id="collapse-${movie.id}">
                        <div class="card card-body">
                            <p class="synopsis">${movieDB.Plot}</p>
                        </div>
                    </div>
                    <div class="">
                    <button type="button" class="btn btn-primary deleteBtn mt-2" id="delete-${movie.id}">Delete</button>
                     <button class="btn btn-primary editBtn mt-2" id="patch-${movie.id}">Edit</button>
                    </div>
                     
                </div>
            </div>
            `
            })
            await Promise.all(newArr)
            $('.container').html(markup)

        } catch (err) {
            console.log('oh no')
            console.log(err)
        }

        //  <button class="btn btn-primary editBtn mt-2" id="patch-${movie.id}">Edit</button>

    }

    // ************POST REQUEST FUNCTIONS*********** //
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
            void fetchAndCreateCards(fetchHandler())
        })
            .catch(/* handle errors */);
    }

    // SHOW MODAL WHEN ADD MOVIE IS CLICKED


    // CREATE OBJECT WITH INPUT, THEN PASS IT INTO postMovie()
    $('.addBtn').on('click', () => {
        const title = $('#movie-title').val()
        const rating = $('#movie-rating').val()
        const movieObj = {title, rating}
        postMovie(movieObj)
        // CLEARS THE INPUT FIELD
        $('#movie-rating').val("")
        $('#movie-title').val("")
    })

    // ************DELETE REQUEST FUNCTIONS*********** //
    const deleteOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };


    const deleteMovie = e => {
        // FOR EVENT CATCHING ON PARENT LISTENER
        if (e.target.classList.contains('deleteBtn')) {
            e.preventDefault()
            //ONLY DELETE IF THEY CONFIRM
            const confirmed = confirm('Are you sure you want to delete this movie?')
            if (confirmed) {
                // PULLING JUST THE NUMBER FROM THE STRING, TO USE AS ID
                const id = e.target.id.replace(/[^0-9]/g, "");
                fetch(`https://mysterious-flat-dawn.glitch.me/movies/${id}`, deleteOptions).then(res => {
                    void fetchAndCreateCards(fetchHandler())
                })
                    .catch(/* handle errors */);
            }
        }
    }

    // EVENT LISTENER ON PARENT FOR EVENT PROPAGATION
    $('.container').on('click', deleteMovie)

// ************PATCH REQUEST FUNCTIONS*********** //
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
            // console.log(json)
            void fetchAndCreateCards(fetchHandler())
        })
            .catch(/* handle errors */);
    }

    // NEED TO HOIST THE ID FROM THE CARD AND USE IT IN MODAL
    let movieId;

    const showEditModal = async e => {
        e.preventDefault()
        // FOR EVENT CATCHING ON PARENT LISTENER
        if (e.target.classList.contains('editBtn')) {
            // PULL THE NUMBER FROM THE ID ON BUTTON
            const id = e.target.id.replace(/[^0-9]/g, "");
            // FETCH MOVIE DATA
            const results = await fetch(movieUrl)
            const json = await results.json()
            // FILTER IT BASED ON OUR BUTTON ID TO GET CHOSEN MOVIE DATA
            const [currentMovie] = json.filter((movie) => {
                return movie.id == id
            })
            // USED filteredMovie DATA TO POPULATE EDIT MODAL
            $('#edit-movie-title').val(currentMovie.title)
            $('#edit-movie-rating').val(currentMovie.rating)
            // HOIST UPDATED ID TO USE IN editModalSubmit
            movieId = id
            // CLICK INVISIBLE MODAL BUTTON TO SHOW MODAL
            // TODO THERE IS A BETTER WAY TO DO THIS, I JUST DONT KNOW HOW
            $('.edit-movie-modal-btn').trigger('click')

        }
    }

    const editModalSubmit = () => {
        // TODO CAN MOST LIKELY HANDLE IN ERROR HANDLING
        // IF EITHER VALUE IS EMPTY ALERT USER
        if ($('#edit-movie-title').val() === '' || $('#edit-movie-rating').val() === '') {
            return alert("There must be a title and ranking")
        }

        // CREATE OBJECT BASED ON INPUT VALUES
        const movieObj = {title: $('#edit-movie-title').val(), rating: $('#edit-movie-rating').val()}

        // RUN PATCH FUNCTION WITH NEW OBJECT AND USE HOISTED movieId VALUE FROM showEditModal
        patchMovie(movieObj, movieId)

        // TODO MAY NOT NEED TO CLEAR, NEED TO TEST
        // CLEARS VALUES
        $('#movie-rating').val("")
        $('#movie-title').val("")
    }

    // CLICK EVENT FOR EDIT MODAL SUBMIT
    $('.editBtn-form').on('click', editModalSubmit)

    // EVENT LISTENER ON PARENT FOR EVENT PROPAGATION
    $('.container').on('click', showEditModal)

    // ************NAV SEARCH*********** //
    //need a function that takes an array of our movie data, then sorts it by name each change
    const filterMovies = async input => {
        // console.log(input)
        const movieArray = await fetchHandler()
        hideLoading()
        const filteredMovies = movieArray.filter(movie => {
            return movie.title.includes(input)
        })
        // console.log(filteredMovies)
        fetchAndCreateCards(filteredMovies)

    }

    //Select form input
    // console.log($('.search-form'));
    $('.search-form').on('keyup', () => {
        let input = $('.search-form').val()
        filterMovies(input)
    })


    // INITIAL FETCH CALL
    void fetchAndCreateCards(fetchHandler())


})()



