import './goback.css';

import Image from 'next/image';
import back from '../../../public/close.png';
import { useRouter } from 'next/navigation';

function GoBack() {

  const router = useRouter();

  const handleBack = () => {
    router.back();
  }

  return (
    <div className="GoBack">
      <Image className='back' alt="" src={back} onClick={handleBack} />
    </div>
  )
}

export default GoBack