import Avatar from "boring-avatars";
import { useAppSelector } from "../hooks/useAppSelector";
import Square from "./Loaders/Square";

const UserAvatar = ({
  oppenentUsername,
  oppenent,
}: {
  oppenentUsername?: string;
  oppenent?: boolean;
}) => {
  const currentUserName = useAppSelector((state) => state.auth.user?.username);

  return (
    <div className="flex gap-3 items-center">
      {oppenent && !oppenentUsername ? (
        <Square />
      ) : (
        <Avatar
          name={oppenent ? oppenentUsername : currentUserName}
          variant="pixel"
          square
        />
      )}
      <span className="text-xl font-extrabold">
        {oppenent
          ? oppenentUsername
            ? oppenentUsername
            : "Waiting for the opponent player..."
          : currentUserName}
      </span>
    </div>
  );
};

export default UserAvatar;
