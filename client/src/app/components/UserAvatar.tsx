import Avatar from "boring-avatars";
import { useAppSelector } from "../hooks/useAppSelector";

const UserAvatar = () => {
  const username = useAppSelector((state) => state.auth.user?.username);

  return (
    <div className="flex gap-3 items-center">
      <Avatar name={username} variant="pixel" square />
      <span className="text-xl font-extrabold">{username}</span>
    </div>
  );
};

export default UserAvatar;
