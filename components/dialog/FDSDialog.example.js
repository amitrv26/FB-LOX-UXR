"use client";

/**
 * Example usage of FDSDialog component
 * 
 * This file demonstrates how to use FDSDialog in your application.
 * Wrap it in AnimatePresence for proper enter/exit animations.
 */

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import FDSDialog from "./FDSDialog";
import FDSDialogHeader from "./FDSDialogHeader";
import FDSDialogFooter from "./FDSDialogFooter";
import Button from "../button/Button";

export default function FDSDialogExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button content="Open Dialog" performAction={() => setIsOpen(true)} />

      <AnimatePresence>
        {isOpen && (
          <FDSDialog
            onClose={() => setIsOpen(false)}
            size="medium"
            aria-label="Example Dialog"
            header={
              <FDSDialogHeader onClose={() => setIsOpen(false)}>
                Dialog Title
              </FDSDialogHeader>
            }
            footer={
              <FDSDialogFooter alignment="right">
                <Button
                  content="Cancel"
                  performAction={() => setIsOpen(false)}
                  deemph
                />
                <Button
                  content="Confirm"
                  performAction={() => {
                    console.log("Confirmed!");
                    setIsOpen(false);
                  }}
                />
              </FDSDialogFooter>
            }
          >
            <div style={{ padding: "20px" }}>
              <p>This is the dialog content area.</p>
              <p>You can put any content here.</p>
            </div>
          </FDSDialog>
        )}
      </AnimatePresence>
    </>
  );
}

