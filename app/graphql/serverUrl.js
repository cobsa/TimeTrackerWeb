const uri =
  process.env.NODE_ENV === 'production'
    ? 'http://ec2-35-180-119-122.eu-west-3.compute.amazonaws.com:3000/graphql'
    : 'http://localhost:3000/graphql'

export default uri
