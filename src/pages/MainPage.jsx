import { useEffect, useState } from 'react';

import CartboardBoxes from '../../public/img/Cartboard_boxes_with_list_1.png';
import Slogan from '../../public/img/Slogan_1.png';
import CalculateDelivery from '../components/CalculateDelivery/CalculateDelivery.jsx';

export default function MainPage() {
  const [isMatches, setIsMatches] = useState(
    window.matchMedia('(min-width: 850px)').matches
  );
  useEffect(() => {
    window
      .matchMedia('(min-width: 850px)')
      .addEventListener('change', e => setIsMatches(e.matches));
  }, []);

  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  return (
    <div
      className={
        isMatches
          ? 'flex justify-center self-center h-screen mx-20'
          : 'flex flex-col justify-center self-center mt-10'
      }
    >

      {
        <div
          className={
            isMatches
              ? 'relative m-10 self-center align-middle h-fit'
              : 'relative self-center align-middle h-fit'
          }
        >
          <div className={isMatches ? 'relative scale-125' : 'relative'}>
            {isImagesLoaded && <img
              src={Slogan}
              alt='SHIFT DELIVERY - быстро, удобно, надежно!'
              className=' absolute inset-0 m-auto animate-spin-slow'
            />}
            <div
              className={ !isImagesLoaded?(
                "scale-75 relative inset-0 w-80 h-80 m-auto rounded-full bg-purple-950 bg-gradient-to-br from-fuchsia-300 to-purple-500 animate-pulse"
              ):
               ( "scale-75 relative inset-0 w-80 h-80 m-auto rounded-full bg-purple-950 bg-gradient-to-br from-fuchsia-300 to-purple-500")}
            />
          </div>
          <img
            src={CartboardBoxes}
            alt='Delivery illustation'
            onLoad={() => setIsImagesLoaded(true)}
            className={
              isMatches
                ? 'absolute m-auto inset-0 ease-linear duration-500 hover:transition-transform hover:ease-linear hover:scale-125'
                : 'absolute m-auto inset-0 ease-linear duration-500 scale-75 hover:transition-transform hover:ease-linear hover:scale-90'
            }
          />
        </div>
      }
      <div className={isMatches ? 'self-center ml-10' : 'self-center my-20'}>
        <CalculateDelivery />
      </div>
    </div>
  );
}
