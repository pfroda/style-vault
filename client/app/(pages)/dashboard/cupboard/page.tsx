'use client'
import Closet from "@/app/components/Closet/Closet";
import Footer from "@/app/components/Footer/Footer";
import useAuth from "@/app/hooks/useAuth";

function index() {
  const { user } = useAuth();

  return (
    <>
      {/* <Closet isOwnProfile={false} /> */}
      <Closet isOwnProfile={true} userId={user?.id!} />
      <Footer />
    </>
  )
}

export default index