import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import { CREATE_USER, GET_MOVIE_BY_NAME, UserList } from './apollo'

const DisplayData = () => {
    const [search, setSearch] = useState()
    const [input, setInput] = useState()

    const { data, refetch } = useQuery(UserList)
    const [fetchMovie, { data: movieData }] = useLazyQuery(GET_MOVIE_BY_NAME)
    const [createUser] = useMutation(CREATE_USER)

    const handelChange = (e) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    console.log(input)
    return (
        <div>
            {/* create user  */}
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={handelChange}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={handelChange}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="age "
                    onChange={handelChange}
                />
                <button
                    onClick={() => {
                        createUser({
                            variables: {
                                input: { ...input, age: Number(input.age) },
                            },
                        })
                        refetch()
                        setInput(null)
                    }}
                >
                    creat user
                </button>
            </div>
            <ul>
                {data &&
                    data.users.map((item, i) => <li key={i}>{item.name}</li>)}
            </ul>

            {/* fetch */}
            <div>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search movies"
                />
                <button
                    onClick={() =>
                        fetchMovie({
                            variables: {
                                name: search,
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
