import { useSession } from "next-auth/react";

const useRole = () => {
  const { data: session } = useSession();
  const user = session?.user as any;

  return {
    isUser:
      user?.role === "User",

    role: user?.role,
  };
};

export default useRole;