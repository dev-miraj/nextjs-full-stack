import Link from "next/link";
import {
  CircleOff,
  CreditCard,
  Fullscreen,
  ShoppingBag,
  Shuffle,
} from "lucide-react";
import Newsletter from "../Support/Newsletter";
import Faq from "../Support/Faq";
import SearchForm from "../Support/SearchForm";

export default function Support() {
  return (
    <section className="flex w-full h-full flex-col">
      <div className="bg-primaryColor absolute inset-x-0 -z-10 dark:bg-white text-white dark:text-black md:h-[20%] h-[30%] mx-auto md:px-8">
        <div className="md:px-8 py-4 px-3">
          <div className="flex flex-col gap-1 md:container md::px-[8rem]  px-2">
            <span className="text-xl">Support Center</span>
            <p className="font-bold text-[1.5rem]">Hi, how can we help you?</p>
            <p class="md:hidden block font-bold text-[1rem]">
              You can try to find your problem here or contact us
            </p>
          </div>
        </div>
      </div>
      <div className="!px-0 pt-28 md:pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-8 px-1 md:px-0">
          <Link
            href="_/"
            className="bg-white dark:bg-primaryColor dark:text-white text-black flex items-center justify-center gap-1 py-14 px-8 rounded-md shadow-lg"
          >
            <ShoppingBag className="w-8 h-8" />
            Place an Order
          </Link>
          <Link
            href="_/"
            className="bg-white dark:bg-primaryColor dark:text-white text-black flex items-center justify-center gap-1 py-14 px-8 rounded-md shadow-lg"
          >
            <CreditCard className="w-8 h-8" />
            Pay for Your Order
          </Link>
          <Link
            href="_/"
            className="bg-white dark:bg-primaryColor dark:text-white text-black flex items-center justify-center gap-1 py-14 px-8 rounded-md shadow-lg"
          >
            <Fullscreen className="w-8 h-8" />
            Track Your Order
          </Link>
          <Link
            href="_/"
            className="bg-white dark:bg-primaryColor dark:text-white text-black flex items-center justify-center gap-1 py-14 px-8 rounded-md shadow-lg"
          >
            <CircleOff className="w-8 h-8" />
            Cancel an Order
          </Link>
          <Link
            href="_/"
            className="bg-white dark:bg-primaryColor dark:text-white text-black flex items-center justify-center gap-1 py-14 px-8 rounded-md shadow-lg"
          >
            <Shuffle className="w-8 h-8" />
            Create a Return
          </Link>
        </div>
        <div className="mt-8">
          <div className="px-8 md:px-0">
            <SearchForm placeholderContent={"Type keywords like; 'return'"} />
          </div>
          <div className="mt-4">
            <Faq />
          </div>
          <div className="mt-4">
            <Newsletter />
          </div>
        </div>
      </div>
    </section>
  );
}
