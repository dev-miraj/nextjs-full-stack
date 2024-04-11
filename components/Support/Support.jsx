import Link from "next/link";
import {
  CircleOff,
  CreditCard,
  Fullscreen,
  ShoppingBag,
  Shuffle,
} from "lucide-react";
import SearchForm from "./SearchForm";
import Faq from "./Faq";

export default function Support() {
  const supportLinks = [
    {
      title: "Place an Order",
      href: "#",
      icon: ShoppingBag,
    },
    {
      title: "Pay for your Order",
      href: "#",
      icon: CreditCard,
    },
    {
      title: "Track your Order",
      href: "#",
      icon: Fullscreen,
    },
    {
      title: "Cancel your Order",
      href: "#",
      icon: CircleOff,
    },
    {
      title: "Create a return",
      href: "#",
      icon: Shuffle,
    },
  ];
  return (
    <section className="flex w-full h-full flex-col">
      <div className="bg-slate-900 absolute inset-x-0 -z-10 dark:bg-white text-white dark:text-black md:h-[20%] h-[30%] mx-auto md:px-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8 px-1 md:px-0">
          {supportLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <Link
                key={i}
                href={link.href}
                className="bg-white dark:bg-slate-800 dark:text-white text-black flex flex-col items-center justify-center gap-1 py-14 px-8 rounded-md shadow-lg"
              >
                <Icon className="w-8 h-8" />
                {link.title}
              </Link>
            );
          })}
        </div>
        <div className="mt-8">
          <div className="px-8 md:px-0">
            <SearchForm placeholderContent={"Type keywords like; 'return'"} />
          </div>
          <div className="mt-4">
            <Faq />
          </div>
        </div>
      </div>
    </section>
  );
}
