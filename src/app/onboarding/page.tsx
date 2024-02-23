import { auth, currentUser } from "@clerk/nextjs";

import { redirect } from "next/navigation";
import { Screens } from "../components/onboarding/screens";
import { fetchUser } from "../actions/user";

export const revalidate = 0;

export default async function OnboardingLayout() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-up");
  }

  const getUser = await fetchUser(user.id);

  if (getUser?.onboarded) {
    redirect("/");
  }

  const userData = {
    id: user.id,
    username: getUser ? getUser.username : user.id.slice(5),
    name: getUser ? getUser.name : user.firstName ?? "",
    bio: getUser ? getUser.bio : "",
    image: getUser ? getUser.image : user.imageUrl,
  };

  return (
    <div className="px-3 pt-8">
      {user ? (
        <Screens isTaken={user ? true : false} userData={userData} />
      ) : null}
    </div>
  );
}
