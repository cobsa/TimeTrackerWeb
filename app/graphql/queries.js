import gql from 'graphql-tag'

const GET_RECORDS = gql`
  {
    records {
      _id
      type
      start
      end
      done
    }
  }
`

const GET_USER = gql`
  {
    user {
      name
      email
    }
  }
`

const CREATE_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!, $passwordAgain: String!) {
    addUser(name: $name, email: $email, password: $password, passwordAgain: $passwordAgain) {
      _id
    }
  }
`

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`

const queries = {
  GET_RECORDS,
  GET_USER,
  CREATE_USER,
  LOGIN_USER
}

export default queries
