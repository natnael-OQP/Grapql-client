import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { useState } from 'react'

const DisplayData = () => {
    const [input, setInput] = useState()
    const UserList = gql`
        # get all users
        query {
            users {
                age
                name
                username
            }
            # movies {
            #     input
            # }
        }
    `
    const GET_MOVIE_BY_NAME = gql`
        query ($name: String!) {
            movie(name: $name) {
                name
                yearOfPublication
                isInTheaters
            }
        }
    `

    const { loading, error, data } = useQuery(UserList)
    const [fetchMovie, { data: movieData, loading: movieLoading }] =
        useLazyQuery(GET_MOVIE_BY_NAME)

    const handelChange = (e) => {
        setInput(e.target.value)
    }

    if (loading) return <h3>loading.....</h3>
    if (error) return <h3>{error}</h3>

    console.log(data)
    console.log(movieData)

    return (
        <div>
            <ul>
                {data.users?.map((item, i) => (
                    <li key={i}>{item.name}</li>
                ))}
            </ul>

            {/* fetch */}
            <div>
                <input
                    value={input}
                    onChange={handelChange}
                    type="text"
                    placeholder="Search movies"
                />
                <button
                    onClick={() =>
                        fetchMovie({
                            variables: {
                                name: input,
                            },
                        })
                    }
                >
                    Fetch Data
                </button>

                {movieData && (
                    <div>
                        <h6>name: {movieData.movie.name}</h6>
                        <h6>
                            yearOfPublication:{' '}
                            {movieData.movie.yearOfPublication}
                        </h6>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DisplayData
