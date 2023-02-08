//import css
import { Link } from "react-router-dom"
import "../index2.css"

const Public2 = () => {
  const content = (
    <section className="public-s">
      <main className="public-content">
        <h1 className="heading">
          Welcome to <span className="heading-2">Dan D. Repairs!</span>
        </h1>
        <main>
          <p>
            Located in Beautiful Downtown Foo City, Dan D. Repairs provides a
            trained staff ready to meet your tech repair needs.
          </p>
        </main>
        <Link to="/login">
          <button className="login-btn">Employee Login</button>
        </Link>
      </main>
      <footer className="adress">
        <b> Dan D. Repairs</b> | 555 Foo Drive | Foo City, CA 12345 | (555)
        555-5555
      </footer>
    </section>
  )
  return content
}

export default Public2
