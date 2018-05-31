import React, { Component } from 'react'

export default class Welcome extends Component {
  render() {
    return (
      <article>
        <section>
          <h2>TimeTracker</h2>
          <p>
            Simple time tracker, track your activity over a day to see how much time you spent. The
            site is build for my portfolio and for personal use.
          </p>
        </section>
        <section>
          <h2>The Code</h2>
          <p>
            The site is built using ReactJS, GraphQL, Redux, Express, Apollo, Apollo-server, Babel
            and Webpack. Front-end and back-end are coded in ES6 and transpiled to native JS with
            Babel. Eslint and Prettier are used for consistent and bug free(ish) code.
          </p>
        </section>
        <section>
          <h2>The Front</h2>
          <p>
            The Front is made with ReactJS, Apollo-client(GraphQL queries), Redux(UI state) and some
            other external libraries for charts etc. Proptypes are used in each React component to
            make debugging a breeze. JWTs are used to store user session in local storage, which is
            easy, but not that secure way of storing session.
          </p>
        </section>
        <section>
          <h2>The Back</h2>
          <p>
            The back-end is built on top of express server and provides GraphQL interface to user
            information. Apollo-server is used for reduce boilerplate in GraphQL schemas and
            resolvers. Integration tests are used to make sure server is bug free(ish).
            Authentication is implemented with email&password pair and hashed with Bcrypt.
            Authorization and session data is implemented with JWTs and JWT data is send in request
            header. The data is stored in Mongodb with help of MongooseJS.
          </p>
        </section>
        <section>
          <h2>Hosting</h2>
          <p>
            The site is hosted in AWS EC2 instance, which was configured to use Nginx, Express and
            Mongodb. Setup is very basic, but should offer lightweight and robust back-end.
          </p>
        </section>
      </article>
    )
  }
}
