import { ReactNode } from "react";

interface MainMenuProps {
  children: ReactNode;
}
export default function MainMenu({ children }: MainMenuProps) {
  return <main className="main">{children}</main>;
}
