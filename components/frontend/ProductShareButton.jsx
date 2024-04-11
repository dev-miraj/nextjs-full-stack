"use client";

import { Button, Modal } from "flowbite-react";
import {
  CornerDownLeft,
  Headphones,
  HelpCircle,
  MessageSquare,
  Share2,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ShareSocial } from "react-share-social";
export default function ProductShareButton({ urlToShare }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <button onClick={() => setOpenModal(true)} className="">
        <Share2 />
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Share this product with Others</Modal.Header>
        <Modal.Body>
          <ShareSocial
            url={urlToShare}
            socialTypes={[
              "whatsapp",
              "facebook",
              "twitter",
              "linkedin",
              "email",
            ]}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
