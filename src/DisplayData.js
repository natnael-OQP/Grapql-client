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
    const { loading, error, data } = useQuery(UserList)
    const [fetchMovie, { data: MovieData, loading: MovieLoading }] =
        useLazyQuery()

    const handelChange = (e) => {
        setInput(e.target.value)
    }

    if (loading) return <h3>loading.....</h3>
    if (error) return <h3>{error}</h3>

    // console.log(data)
    console.log(input)

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
                <button>Fetch Data</button>
            </div>
        </div>
    )
}

export default DisplayData
