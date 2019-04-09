const AUTH_CHANGE = 'AuthenticationChangeEvent';

// A "good enough" URL query parser;
// can pull in an external lib later if needed,
// but will replace auth logic with blockchain-based approach before then
const parseUrlParams = (str: string): object => (
  str.replace(/^\?/, "").split("&").reduce(
    (query, str): object => {
      const [key, val] = str.split("=")
      query[key] = val
      return query
    },
    {}
  )
)

export const getCurrentUser = () => (
  parseUrlParams(window.location.search)["as"]
)

export const isMod = user => {
  return user === "mod"
}

export const login = () => {
  const asWho = window.prompt("Sign in as who?")
  window.history.pushState({}, "", `?as=${asWho}`)
  window.document.title = "Our DAO • Edit"
  window.dispatchEvent(new CustomEvent(AUTH_CHANGE))
}

export const logout = () => {
  window.history.pushState({}, "", "/")
  window.document.title = "Our DAO"
  window.dispatchEvent(new CustomEvent(AUTH_CHANGE))
}

export const addListener = func => {
  window.addEventListener(AUTH_CHANGE, func, false);
}

export const removeListener = func => {
  window.removeEventListener(AUTH_CHANGE, func, false);
}
