import Link from 'next/link'
import Layout from '../components/Layout'
import { useUser } from '../utils/auth/useUser'

const IndexPage = () => {
  const { user, logout } = useUser()
  if (!user) {
    return (
      <>
        <p>Hi there!</p>
        <p>
          You are not signed in.{' '}
          <Link href={'/auth'}>
            <a>Sign in</a>
          </Link>
        </p>
      </>
    )
  }

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>

      <p>You're signed in. Email: {user.email}</p>
      <p
        style={{
          display: 'inline-block',
          color: 'blue',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onClick={() => logout()}
      >
        Log out
      </p>

      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <p>
        <Link href="/bookmarks">Bookmarks</Link>
      </p>
    </Layout>
  )
}

export default IndexPage
