import { gql } from '@apollo/client'

// get all users
const UserList = gql`
    query {
        users {
            age
            name
            username
        }
    }
`
// get movie
const GET_MOVIE_BY_NAME = gql`
    query ($name: String!) {
        movie(name: $name) {
            name
            yearOfPublication
            isInTheaters
        }
    }
`
//   create User
const CREATE_USER = gql`
    mutation ($input: CreateUserInput!) {
        createUser(user: $input) {
            name
        }
    }
`
//  update username
// const Update_USERNAME = gql`
//     # mutation($id:)
// `

export { UserList, GET_MOVIE_BY_NAME, CREATE_USER }
