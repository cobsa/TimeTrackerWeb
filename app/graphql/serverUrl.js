const uri =
  process.env.NODE_ENV === 'production' ? 'production_graphql' : 'http://localhost:3000/graphql'

export default uri
