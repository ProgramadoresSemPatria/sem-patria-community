"use client";
import { usePermissionModal } from "@/hooks/use-modal";
import { SignIn } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Page() {
  const { isOpen, onClose } = usePermissionModal();

  useEffect(() => {
    if (isOpen) onClose();
  }, [isOpen, onClose]);

  return <SignIn />;
}
