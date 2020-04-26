import cookies from 'js-cookie';

/**
 * The name of the cookie we set the User's auth token under.
 */
const TOKEN_COOKIE_NAME = 'TODOLIST-auth-token';

/**
 * Returns true if the User is authenticated.
 */
export const isAuthenticated = () => {
  const authToken = cookies.get(TOKEN_COOKIE_NAME);
  return !!authToken;
};

/**
 * Returns the User's auth token after validating their email and password. This
 * utility will set the User's token as a cookie.
 */
export const authenticate = async (email: string, password: string) => {
  try {
    const req = await fetch(`${process.env.REACT_APP_APP_URL}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!req.ok) {
      // [Error] User does not exist.
      if (req.status === 404) {
        // TODO: alert() is placeholder for some nice error handling.
        alert('The User does not exist.');
      }
      // [Error] Incorrect password.
      else if (req.status === 401) {
        // TODO: alert() is placeholder for some nice error handling.
        alert('You entered an incorrect password. Please try again.');
      }

      return null; // Return null for error.
    }

    const response = await req.json();
    const { token } = response;

    cookies.set(TOKEN_COOKIE_NAME, token, { expires: 1 });

    return token;
  } catch (e) {
    alert('Uh oh, something went wrong. Please try again.');
    return null;
  }
};
