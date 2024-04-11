"use client";

import { Button, Modal } from "flowbite-react";
import {
  CornerDownLeft,
  Headphones,
  HelpCircle,
  MessageSquare,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HelpModal() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center space-x-1 text-green-950 dark:text-slate-100"
      >
        <HelpCircle />
        <span>Help</span>
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          Need Help with Shopping, Talk to our Help Desk
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="tel:2567833663"
              className="flex items-center space-x-2 text-green-950 dark:text-slate-100"
            >
              <div className="flex items-center w-10 h-10 bg-lime-100 justify-center rounded-full">
                <Headphones className="w-6 h-6 text-lime-800" />
              </div>
              <span>Call: 07880994646</span>
            </Link>
            <Link
              href="/track"
              className="flex items-center space-x-2 text-green-950 dark:text-slate-100"
            >
              <div className="flex items-center w-10 h-10 bg-lime-100 justify-center rounded-full">
                <Truck className="w-6 h-6 text-lime-800" />
              </div>
              <span>Track your Order</span>
            </Link>
            <Link
              href="tel:2567833663"
              className="flex items-center space-x-2 text-green-950 dark:text-slate-100"
            >
              <div className="flex items-center w-10 h-10 bg-lime-100 justify-center rounded-full">
                <CornerDownLeft className="w-6 h-6 text-lime-800" />
              </div>
              <span>Returns and Refunds</span>
            </Link>
            <Link
              href="tel:2567833663"
              className="flex items-center space-x-2 text-green-950 dark:text-slate-100"
            >
              <div className="flex items-center w-10 h-10 bg-lime-100 justify-center rounded-full">
                <MessageSquare className="w-6 h-6 text-lime-800" />
              </div>
              <span>Chat with Us</span>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
