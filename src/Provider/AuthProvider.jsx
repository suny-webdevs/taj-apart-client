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
import useAxiosPublic from "../Hooks/useAxiosPublic"

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("")
  const [loading, setLoading] = useState(true)
  const [preview, setPreview] = useState({})

  const googleProvider = new GoogleAuthProvider()
  const axiosPublic = useAxiosPublic()

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
    axiosPublic("/logout", { withCredentials: true })
    return signOut(auth)
  }

  const removeUser = (user) => {
    setLoading(true)
    return deleteUser(user)
  }

  // jwt
  const getToken = async (email) => {
    const { data } = await axiosPublic.post(
      "/jwt",
      { email },
      { withCredentials: true }
    )
    return data
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        getToken(currentUser?.email)
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
    preview,
    setPreview,
  }
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export default AuthProvider
