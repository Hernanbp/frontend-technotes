import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useLoginMutation } from "./authApiSlice"
import { setCredentials } from "./authSlice"
import usePersist from "../../hooks/usePersist"

const Login = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrorMsg("")
  }, [username, password])

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)
  const handleToggle = () => setPersist((prev) => !prev)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername("")
      setPassword("")
      navigate("/dash")
    } catch (err) {
      if (!err.status) {
        setErrorMsg("No server response")
      } else if (err.status === 400) {
        setErrorMsg("Missing username or password")
      } else if (err.status === 401) {
        setErrorMsg("Unauthorized")
      } else {
        setErrorMsg(err.data?.message)
      }
      errRef.current.focus()
    }
  }

  const errClass = errorMsg ? "errmsg" : "offscreen"

  if (isLoading) return <p>Loading...</p>

  const content = (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errorMsg}
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordInput}
            required
          />
          <button className="form__submit-button">Sign In</button>

          <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust this device
          </label>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  )

  return content
}

export default Login
