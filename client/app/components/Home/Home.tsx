import Link from 'next/link';
import { useState } from "react";

function Home() {
  
 

  return (
    <div>
      <p>Home</p>
      <Link href="/dashboard/userprofile">Profile</Link>
      <br />
      
    </div>
  )
}

export default Home;

