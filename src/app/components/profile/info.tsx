"use client";

import { Button } from "@/app/core/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/core/dialog";
import { Github, HelpCircle } from "lucide-react";

export function InfoModal() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <HelpCircle className="w-5 h-5" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About This Project</DialogTitle>
          </DialogHeader>

          <div className="text-neutral-600 leading-relaxed">
            A threads clone made by{" "}
            <a
              href="https://www.facebook.com/amy202020"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="link"
                className="px-[3px] text-base w-auto py-0 h-auto"
              >
                Amit Chauhan
              </Button>
            </a>{" "}
            with Next.js server components, PostgresSql, Tailwind, Clerk, and
            Prisma.
          </div>
          <div className="text-neutral-600 leading-relaxed">
            It&apos;s mostly complete & working, with a few small bugs/missing
            features.
          </div>
          <DialogFooter>
            <a
              href="https://github.com/webdevamit/threads"
              target="_blank"
              rel="noreferrer"
              className="w-full mt-2"
            >
              <Button className="w-full" variant="outline">
                <Github className="w-5 h-5 mr-2" /> GitHub
              </Button>
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
