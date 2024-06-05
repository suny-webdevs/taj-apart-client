import googleIcon from "../../assets/Icons/google.svg"
import PropTypes from "prop-types"

const SocialLogin = ({ handleGoogleLogin, handleGoogleSignUp }) => {
  return (
    <div>
      {handleGoogleLogin && (
        <button
          onClick={handleGoogleLogin}
          className="bg-white flex items-center text-gray-700 justify-center gap-x-3 text-sm sm:text-base rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5"
        >
          <img
            src={googleIcon}
            className="w-7 h-7"
          />
          <span>Login with google</span>
        </button>
      )}
      {handleGoogleSignUp && (
        <button
          onClick={handleGoogleSignUp}
          className="bg-white flex items-center text-gray-700 justify-center gap-x-3 text-sm sm:text-base rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5"
        >
          <img
            src={googleIcon}
            className="w-7 h-7"
          />
          <span>Sign up with google</span>
        </button>
      )}
    </div>
  )
}

SocialLogin.propTypes = {
  handleGoogleLogin: PropTypes.func,
  handleGoogleSignUp: PropTypes.func,
}

export default SocialLogin
