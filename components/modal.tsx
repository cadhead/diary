import { ReactElement, ReactNode, useEffect } from "react";

type ModalAction = {
  buttonText: string,
  action: Function
}

type Props = {
  title: string,
  onClose: any,
  action?: ModalAction,
  isOpen?: boolean,
  children: ReactNode
}

export default function Modal({ title, children, onClose, action, isOpen }: Props): ReactElement {
  useEffect(() => {
    document.addEventListener(
      "keydown",
      (event: KeyboardEvent) => event.key === "Escape" ? onClose() : null
    );
  });


  return (
    <div className={`"relative top-1 z-10 overflow-y-auto" ${isOpen ? "block" : "hidden"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed flex items-end justify-center w-full px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>
        <div className="hidden sm:inline-block sm:align-middle sm:h-screenhidden sm:h-screen">&#8203;</div>
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-screen-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 id="modal-title" className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
              <div className="mt-2">
                {children}
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            { action ?
              <button type="button" className="px-4 py-2 mt-5 mb-5 font-bold text-white bg-indigo-900 rounded shadow hover:bg-indigo-800">{action.buttonText}</button>
            : null
            }
            <button onClick={onClose} type="button" className="px-4 py-2 mt-5 mb-5 ml-1 font-bold text-white bg-gray-900 rounded shadow hover:bg-gray-800">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
