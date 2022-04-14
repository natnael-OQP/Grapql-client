import './App.css'

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
} from '@apollo/client'

function App() {
    const client = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache(),
    })

    const UserList = gql`
        query getUsers {
            users {
                name
                username
            }
        }
    `
    const { loading, error, data } = useQuery(UserList)
    console.log(data)

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <h1>hello world</h1>
            </div>
        </ApolloProvider>
    )
}

export default App
