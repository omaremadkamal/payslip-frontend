import { link } from "fs";
import Link from "next/link";
import { LuKanban } from "react-icons/lu";

const SideNavItem = () => {
  return (
    <>
      <div className=" w-[50px] border-r h-[calc(100vh-70px)] ">
        <aside
          className="w-[50px] pr-[8px] pl-[8px] gap-[5px]
      flex flex-col items-center"
        >
          <div className="w-[44px] h-[44px] p-[10px]">
            <Link href="">
              <img src="/iconstack.io.svg" alt="dashboard" />
            </Link>
          </div>
          <div className="w-[44px] h-[44px] p-[10px]">
            <Link href="">
              <img src="/iconstack.1.svg" alt="" />
            </Link>
          </div>
          <div className="w-[44px] h-[44px] p-[10px] ">
            <Link href="">
              <img src="/iconstack.2.svg" alt="icons" />
            </Link>
          </div>
          <div className="w-[44px] h-[44px] p-[10px]">
            <Link href="">
              <img src="/iconstack.io3.svg" alt="icons" />
            </Link>
          </div>
          <div className="w-[44px] h-[44px] p-[10px]">
            <Link href="">
              <img src="/iconstack.io4.svg" alt="icons" />
            </Link>
          </div>

          <div className="w-[44px] h-[44px] p-[10px] ">
            <Link href="">
              <img src="/iconstack.io5.svg" alt="icons" />
            </Link>
          </div>
          <div className="w-[44px] h-[44px] p-[10px] ">
            <Link href="">
              <img src="/iconstack.io6.svg" alt="icons" />
            </Link>
          </div>

          <div className="w-[44px] h-[44px] p-[10px] ">
            <Link href="">
              <img src="/building.svg" alt="icons" />
            </Link>
          </div>
          <div className="w-[44px] h-[44px] p-[10px] ">
            <Link href="">
              <img src="/iconstack.io7.svg" alt="icons" />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
};

export default SideNavItem;
