import { XIcon, MenuIcon, PencilAltIcon } from "@heroicons/react/solid";
import { useState } from "react";

type Props = {
  deleteFunc: any,
  editFunc?: any
}

export default function PostControlls({ deleteFunc, editFunc }: Props) {
  const [isOpened, setOpened] = useState(false);

  const toggle = () => {
    setOpened(!isOpened);
  }

  return (
    <div className="absolute flex top-4 right-5 h-[40px]">
      <div
        className={`"absolute p-2
          ${isOpened ? "flex" : "hidden"}` }>
        <button onClick={deleteFunc} title="Delete post" className="hover:opacity-50" name="postDelete">
          <XIcon className="w-5 h-5 text-gray-500" />
        </button>
        <button onClick={editFunc} title="Edit post" className="hover:opacity-50" name="postEdit">
          <PencilAltIcon className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <button onClick={toggle}><MenuIcon className="w-5 h-5 text-gray-500"/></button>
    </div>
  );
}
