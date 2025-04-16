"use client";

import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import { Button } from "./button";

type ConfirmButtonProps = {
  onClick: () => void;
  children: ReactNode;
  confirmText?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ConfirmButton = ({
  onClick,
  children,
  confirmText = "Confirm?",
  ...props
}: ConfirmButtonProps) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleClick = () => {
    if (isConfirming) {
      onClick();
      setIsConfirming(false);
    } else {
      setIsConfirming(true);
    }
  };

  return (
    <Button {...props} onClick={handleClick}>
      {isConfirming ? confirmText : children}
    </Button>
  );
};
