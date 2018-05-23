import gql from 'graphql-tag'

const GET_TYPES = gql`
  {
    __type(name: "RecordType") {
      enumValues {
        name
      }
    }
  }
`

export default GET_TYPES
