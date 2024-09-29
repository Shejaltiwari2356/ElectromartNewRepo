import { CheckIcon, ChevronRightIcon } from "lucide-react";

import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";

const ShorlistButton = () => {
  return (
    <AnimatedSubscribeButton
      buttonColor={subscribeStatus ? "#FFD700" : "#008000"} // Yellow for subscribed and Green for subscribe
      buttonTextColor="#ffffff"
      subscribeStatus={false}
      initialText={
        <span className="group inline-flex items-center">
          Subscribe{" "}
          <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      }
      changeText={
        <span className="group inline-flex items-center">
          <CheckIcon className="mr-2 size-4" />
          Subscribed{" "}
        </span>
      }
    />
  );
}
export default ShortlistButton;
