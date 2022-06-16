import React from "react";
import { motion } from "framer-motion";

import CopyToClipboardText from "./CopyToClipboardText";

type EndPageProps = {
  uid: string;
};

const EndPage = ({ uid }: EndPageProps) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: -1000 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="m-auto h-full w-4/5 md:w-3/5 lg:w-2/5"
    >
      <div className="flex h-full flex-col justify-center ">
        <h1 className=" text-2xl font-bold">Done 🎉</h1>
        <h2 className="py-4">
          Thank you for completing the survey! Don&apos;t forget to click and
          copy the survey code below and paste it to the mturk page.
        </h2>
        <div className="pb-12 md:w-4/5">
          <CopyToClipboardText text={uid} />
        </div>
      </div>
    </motion.main>
  );
};

export default EndPage;
