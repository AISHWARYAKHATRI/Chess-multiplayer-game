import React, { useState, ReactNode } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

import AppLogo from "../components/AppLogo";
import PlayIcon from "../../../public/playIcon.png";
import JoinIcon from "../../../public/joinIcon.png";
import Modal from "../components/Modal";
import Input from "../components/Input";
import { Button } from "../components/Button";

interface Props {
  children: ReactNode;
  containerStyles?: string;
}

const Layout: React.FC<Props> = ({ children, containerStyles }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameID, setGameID] = useState("");
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <section>
      <div className="auth-main">
        <div className="gradient" />
      </div>
      <main className="relative flex justify-center items-start">
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Join Game">
          <Input
            name="gameId"
            type="number"
            value={gameID}
            label="Enter the game ID"
            onChange={(e) => {
              setGameID(e.target.value);
            }}
          />
          <div className="flex justify-center items-center">
            <Button
              className="w-28"
              type="submit"
              onClick={() => {
                if (!gameID) toast.error("Please enter game ID");
                else router.push(`/game/${gameID}`);
              }}
            >
              Join
            </Button>
          </div>
        </Modal>
        <nav className="bg-[rgba(5,5,5,0.2)] w-[300px] h-[100vh] px-2 py-5 flex flex-col">
          <AppLogo size="sm" className="" />
          <ul className="flex flex-col gap-5 m-10">
            <Link href="/game/new" passHref>
              <li className="flex font-bold gap-2 items-center hover:text-cgreen-300 cursor-pointer">
                <img src={PlayIcon.src} width={30} alt="Play Game" />
                Play Game
              </li>
            </Link>
            <li
              className="flex font-bold gap-2 items-center hover:text-cgreen-300 cursor-pointer"
              onClick={openModal}
            >
              <img src={JoinIcon.src} width={25} alt="Join Game" />
              Join Game
            </li>
          </ul>
        </nav>
        <div
          className={`w-full h-full m-auto flex justify-center items-center lg:px-64 ${containerStyles}`}
        >
          {children}
        </div>
      </main>
    </section>
  );
};

export default Layout;
