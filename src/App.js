import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";

import initializeAuthentication from './Firebase/firebase.initialize';
import { useState } from 'react';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


function App() {

  const [user, setUser] = useState({});
  // const [gitHubUser, setGitHubUser] = useState({});
  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loggedInUser);
      })
      .catch(error => {
        console.log('Google Sign In Error:', error.message);
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loggedInUser)
      })
      .catch(error => {
        console.log('Github Login Error:', error.message);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        console.log(error)
      });
  }
  return (
    <div className="App">
      {
        !user.name ?
          <div>
            <button onClick={handleGoogleSignIn}>Google Sign in</button>
            <button onClick={handleGithubSignIn}>Github Sign In</button>
          </div> :
          <button onClick={handleSignOut}>Sign Out</button>
      }

      {
        user.name && <div>
          <h2>Name: {user.name}</h2>
          <p>This is user mail : {user.email}</p>
          <img src={user.photo} />
        </div>
      }
      {/* {
        gitHubUser.name && <div>
          <h2>Name: {gitHubUser.name}</h2>
          <p>This is user mail : {gitHubUser.email}</p>
          <img src={gitHubUser.photo} />
        </div>
      } */}
    </div>
  );
}

export default App;
