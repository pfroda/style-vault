'use client'
import ItemDetails from "@/app/components/Lists/ItemDetails/ItemDetails";
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
import Social from '@/app/components/Social/SocialGrid/SocialGrid';

function index() {
  return (
    <>
    <Header/>
    <ItemDetails />
    <Footer/>
    </>
  )
}

export default index