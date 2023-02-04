import Link from "next/link";
import style from "./style.module.css";

type NavBarItem = {
  to: string;
  text: string;
};
type NavBarProps = {
  className?: string;
  focusOn?: string;
  items: NavBarItem[];
};
const NavBar: React.FC<NavBarProps> = ({ className, items }) => {
  return (
    <div className={className}>
      {items.map((item) => (
        <div key={item.text} className={style.navBarItem}>
          <Link href={item.to} className={style.textlink}>
            {item.text}
          </Link>
        </div>
      ))}
    </div>
  );
};

type WithHeaderProps = {
  children: React.ReactNode;
  withFullScreen?: boolean;
};
const WithHeader: React.FC<WithHeaderProps> = ({
  children,
  withFullScreen,
}) => {
  const items: NavBarItem[] = [
    { to: "/posts", text: "Posts" },
    { to: "/tags/1", text: "Tags" },
  ];
  return (
    <>
      <div className={style.header}>
        {/* icon */}
        <div className={style.icon}>
          <div className={style.textbox}>
            <Link href={"/"} className={style.textlink}>
              {"Ryo's Blog"}
            </Link>
          </div>
        </div>

        {/* NavBar */}
        <NavBar className={style.navBar} items={items} />

        {/* headerRight */}
        <div className={style.headerRight}>
          <div className={style.textbox}>
            <Link href={"/about"} className={style.textlink}>
              About Me
            </Link>
          </div>
        </div>
      </div>

      {/* outside header */}
      {withFullScreen ? null : <div className={style.headerBg}></div>}

      {children}
      {/* add sth last of the site here */}
    </>
  );
};

export default WithHeader;
