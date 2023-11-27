import Image from 'next/image'
import sofa from "./Images/couch (1).png"
import sofa2 from "./Images/sofa (1).png"
import Link from 'next/link'
import bed from "./Images/bed.png"
import dining from "./Images/restaurant.png"
import wardrobe from "./Images/wardrobe.png"
import recliner from "./Images/recliner.png"
import coffe_table from "./Images/coffee-table.png"
import study_table from "./Images/work-table.png"
import bookshelv from "./Images/bookshelf.png"
import seating from "./Images/chair.png"
import light_bulb from "./Images/floor-lamp.png"

export default function Home() {
  return (
    <div>
      <div className='bg-green-300 p-28 flex'>
        <div className='flex-col'>
          <h1 className='text-5xl text-gray-150 mb-8'>
            Modern Interior
            <br />
            Design Studio
          </h1>
          <div className='flex-row'>
            <button className='bg-yellow-500 text-white text-lg px-3 py-3 w-40 rounded-3xl mr-3'>
              Shop Now
            </button>
            <button className='text-slate-170 text-lg px-3 py-3 w-40 rounded-3xl border border-gray-700'>
              Explore
            </button>

          </div>
        </div>
          <div className='absolute right-16 top-16 z-10'>
            <Image 
                src={sofa}
                alt="sofa"
                width={700}
                height={700}
            />
        </div>
      </div>
      <div className='flex flex-col justify-center items-center bg-white text-black'>
        <div className='text-center'>
          <h3 className='text-3xl inline-block border-b-2 border-orange-300 pb-2 mt-5'>
            Explore our furniture range
          </h3>
        </div>

        <div className='flex-row flex items-center mt-4'>
          <div className='flex flex-col items-center'>
            <Image 
              src={sofa2}
              alt="sofa logo"
              width={40}
              height={40}
            />
            <span className="mt-2">Sofas</span>
          </div>

          <div className="ml-4 flex flex-col items-center">
            <Image 
              src={bed}
              alt="bed logo"
              width={40}
              height={40}
            />
            <span className="mt-2">Beds</span>
          </div>
          <div className="ml-4 flex flex-col items-center">
            <Image 
              src={dining}
              alt="dining logo"
              width={40}
              height={40}
            />
            <span className="mt-2">Dining</span>
          </div>
          <div className='ml-4 flex flex-col items-center'>
            <Image 
              src={wardrobe}
              alt="wardrobe logo"
              width={40}
              height={40}
            />
            <span className="mt-2">Wardrobe</span>
          </div>

          <div className='ml-4 flex flex-col items-center'>
            <Image 
              src={recliner}
              alt="recliner logo"
              width={40}
              height={40}
            />
            <span className="mt-2">Recliners</span>
          </div>
        </div>
        <div className='flex-row flex items-center mt-4'>
        <div className='ml-4 flex flex-col items-center'>
            <Image 
              src={coffe_table}
              alt="coffe table logo"
              width={40}
              height={40}
            />
            <span className="mt-2">Coffe table</span>
          </div>

          <div className='ml-4 flex flex-col items-center'>
            <Image 
              src={study_table}
              alt="study logo"
              width={40}
              height={40}
            />
            <span className="mt-2">Study table</span>
          </div>
          <div className='ml-4 flex flex-col items-center'>
            <Image 
              src={bookshelv}
              alt="bookshelv logo"
              width={40}
              height={40}
            />
            <span className="mt-2">Bookshelv</span>
          </div>

          <div className='ml-4 flex flex-col items-center'>
            <Image 
              src={seating}
              alt="seating logo"
              width={40}
              height={40}
            />
            <span className="mt-2">Seating</span>
          </div>
          <div className='ml-4 flex flex-col items-center'>
            <Image 
              src={light_bulb}
              alt="light-bulb logo"
              width={40}
              height={40}
            />
            <span className="mt-2">Light bulb</span>
          </div>
        </div>
      </div>
    </div>    
  )
}

// https://themewagon.github.io/furni/index.html
