import { ProfileIcon } from "@/app/_components";

export default function Header() {
  return (
    <header className="w-full flex px-5 py-3 justify-between fixed ">
      <div>대충 로고</div>
      <div className="justify-end ">
        <ProfileIcon />
      </div>
    </header>
  );
}
