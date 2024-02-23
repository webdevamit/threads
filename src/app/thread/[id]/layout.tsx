import { fetchUser } from "@/app/actions/user";
import BackButton from "@/app/components/thread/backButton";
import Nav from "@/app/core/nav";
import { ExtendedUser } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function ThreadPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const getUser = await fetchUser(user.id);

  if (!getUser?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <>
      <Nav
        create={{
          id: getUser.id,
          name: getUser.name,
          image: getUser.image,
        }}
        username={getUser.username}
      />
      <div className="px-3 relative mt-8 mb-6">
        <BackButton />
        <div className="text-2xl font-semibold absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          Thread
        </div>
      </div>

      {children}
    </>
  );
}
