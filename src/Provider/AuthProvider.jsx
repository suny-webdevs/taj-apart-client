import { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth"
import auth from "../Firebase/firebaseConfig"
// import useAxiosPublic from "../Hooks/useAxiosPublic"

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("")
  const [loading, setLoading] = useState(true)
  const googleProvider = new GoogleAuthProvider()
  // const axiosPublic = useAxiosPublic()

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  const userSignIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const googleSignIn = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const userSignOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  const removeUser = (bistroUser) => {
    setLoading(true)
    return deleteUser(bistroUser)
  }

  // jwt
  // const getToken = async (email) => {
  //   const userInfo = { email: email }
  //   const { data } = await axiosPublic.post("/jwt", userInfo)
  //   return data
  // }

  // save user
  // const saveUser = async (currentUser) => {
  //   console.log("saved user", currentUser)
  //   try {
  //     const userInfo = {
  //       name: currentUser?.displayName,
  //       email: currentUser?.email,
  //       photo: currentUser?.photoURL,
  //       role: "user",
  //     }
  //     const { data } = await axiosPublic.put("/users", userInfo)
  //     console.log(data)
  //     return data
  //   } catch (err) {
  //     console.log(err.message)
  //   }
  // }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        // getToken(currentUser.email)
        // saveUser(currentUser)
      } else {
        localStorage.removeItem("access-token")
      }
      setLoading(false)
    })
    return () => unSubscribe()
  }, [])

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    updateUserProfile,
    userSignIn,
    googleSignIn,
    userSignOut,
    removeUser,
  }
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export default AuthProvider
