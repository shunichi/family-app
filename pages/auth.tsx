import FirebaseAuth from '../components/FirebaseAuth'
import Link from 'next/link'

const Auth = () => {
  return (
    <div>
      <p>Sign in</p>
      <div>
        <FirebaseAuth />
      </div>
      <p>
        <Link href="/">Home</Link>
      </p>
    </div>
  )
}

export default Auth
