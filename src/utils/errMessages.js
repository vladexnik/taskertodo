export function showErrorMessageSignIn(error, errMsg) {
  switch (error.code) {
    case 'auth/invalid-email':
      errMsg.value = 'Invalid email'
      break
    case 'auth/user-not-found':
      errMsg.value = 'No account with that email was found'
      break
    case 'auth/wrond-password':
      errMsg.value = 'Incorrect password'
      break
    case 'auth/email-already-in-use':
      errMsg.value = 'User with this email already exists'
      break
    default:
      errMsg.value = 'Email or password was incorrect'
      break
  }
}
