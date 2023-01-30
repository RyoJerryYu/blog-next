import style from "./style.module.css";

type IconProps = {
  className?: string;
};
const Icon: React.FC<IconProps> = ({ className }) => {
  return <div className={className}>Icon Here</div>;
};

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
        <div
          key={item.text}
          className={`relative float-left mx-8 ${style.textbox}`}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

type HeaderRightProps = {
  className?: string;
};
const HeaderRight: React.FC<HeaderRightProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className={style.textbox}>Header Right</div>
    </div>
  );
};

type HeaderProps = {
  children: React.ReactNode;
};
const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div className="top-0 fixed w-screen bg-red-200 z-10 h-16 flex">
      {children}
    </div>
  );
};

type WithHeaderProps = {
  children: React.ReactNode;
};
const WithHeader: React.FC<WithHeaderProps> = ({ children }) => {
  const items: NavBarItem[] = [
    { to: "/", text: "Post" },
    { to: "/", text: "Notes" },
    { to: "/", text: "Lesson" },
    { to: "/", text: "About" },
  ];
  return (
    <>
      <Header>
        <Icon className={`ml-2 w-32 ${style.headeritem}`} />
        <NavBar className={`ml-12 pr-2 ${style.headeritem}`} items={items} />
        <HeaderRight className={`ml-auto mr-8 ${style.headeritem}`} />
      </Header>

      {children}
    </>
  );
};

export default WithHeader;
