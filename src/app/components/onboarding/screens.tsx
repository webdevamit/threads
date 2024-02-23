"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { OnboardingProfileCard } from "./card";
import { PrivacySelectCards } from "./privacy";
import { UserData } from "@/types";
import { Button } from "@/app/core/button";

export function Screens({
  userData,
  isTaken,
}: {
  userData: UserData;
  isTaken: boolean;
}) {
  const [screen, setScreen] = useState(0);

  const nextScreen = () => setScreen((prev) => prev + 1);

  if (screen === 0) {
    return (
      <>
        <div className="w-full flex h-10 items-center justify-end mb-16">
          {/* Skip <ChevronRight className="w-4 h-4 ml-2" /> */}
        </div>

        <div className="mb-12 space-y-1">
          <div className="text-2xl font-semibold text-center">Profile</div>
          <div className="text-muted-foreground text-center">
            Customize your Threads profile.
          </div>
        </div>

        <OnboardingProfileCard
          userData={userData}
          next={nextScreen}
          isTaken={isTaken}
        />
      </>
    );
  }
  return (
    <>
      <Button
        onClick={() => setScreen(0)}
        className="pl-2.5 mb-16"
        variant="ghost"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Back
      </Button>

      <div className="mb-12 space-y-1">
        <div className="text-2xl font-semibold text-center">Privacy</div>
        <div className="text-muted-foreground text-center">
          Your privacy on Threads and Instagram can be different.
        </div>
      </div>

      <PrivacySelectCards />
    </>
  );
}
