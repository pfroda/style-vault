import Link from 'next/link';

function Home() {
  return (
    <div>
      <p>Home</p>
      <Link href="/dashboard/userprofile">Profile</Link>
    </div>
  )
}

export default Home