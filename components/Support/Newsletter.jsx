import React from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function Newsletter() {
  return (
    <div className='flex bg-white dark:bg-primaryColor items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16'>
      <div className='max-w-3xl mx-auto text-center lg:p-10'>
        <div>
          <p className='text-5xl tracking-tight text-black dark:text-white'>
            Subscribe and get
            <span className='lg:block'>benefits from our newsletter</span>
          </p>
          <p className='mt-4 text-lg tracking-tight text-gray-600 dark:text-gray-300'>
            If you could kick the person in the pants responsible for most of
            your trouble, you wouldn't sit for Link month. Imagine that, fam.
          </p>
        </div>
        <div className='flex flex-col items-center max-w-sm pt-8 pb-12 mx-auto md:pt-6'>
          <form
            className='flex flex-col items-center justify-center max-w-sm mx-auto'
            action=''
          >
            <div className='flex flex-col w-full gap-1 mt-3 sm:flex-row'>
              <input
                name='email'
                type='email'
                className='block w-full px-4 py-2 text-sm font-medium text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-full font-spline focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/50 disabled:opacity-50'
                placeholder='Enter your email...'
                required=''
              />
              <button
                type='button'
                className='items-center inline-flex  justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black'
              >
                <div style={{ position: "relative" }}></div>
                {/* Subscribe<!-- --> */}
                <MoveRight className='w-4 h-auto ml-2' />
              </button>
            </div>
          </form>
        </div>

        <div className='mx-auto sm:max-w-lg sm:flex'>
          <p className='mx-auto mt-3 text-xs text-gray-500'>
            By subscribing, you agree with Unwrapped’s
            <Link
              className='text-blue-600 hover:text-black unerline'
              target='_blank'
              href='#_'
            >
              Terms of Service
            </Link>
            and
            <Link
              className='text-blue-600 hover:text-black'
              target='_blank'
              href='#_'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
