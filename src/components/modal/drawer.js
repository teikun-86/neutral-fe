import modalState from "@/hooks/modal";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useRecoilState } from "recoil";

const Drawer = ({ showCloseButton = true, ...props }) => {
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useRecoilState(modalState); 
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleStart = (e, data) => {
        setPosition({ x: 0, y: 0 })
    }
    const handleDrag = (e, data) => {
        setPosition({ x: 0, y: data.y })
    }
    const handleStop = (e, data) => {
        if (position.y > 100) {
            closeModal()
            setPosition({ x: 0, y: 0 })
        } else {
            setPosition({ x: 0, y: 0 })
        }
    }

    useEffect(() => {

        setOpen(modalOpen === props.id)

        return () => {
        };
    }, [modalOpen, props.id]);

    const closeModal = () => {
        setModalOpen('');
    }

    return (
        <Transition className="w-full h-screen fixed inset-0 z-40" show={open} id={props.id}>
            <Transition.Child onClick={closeModal} className="w-full h-full bg-black/80 backdrop-blur-sm"
                enter="transition-all duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                leave="transition-all duration-300"
            />

            <Draggable
                axis="y"
                handle=".drag-handler"
                defaultPosition={{ x: 0, y: 0 }}
                bounds={{ top: 0 }}
                position={position}
                onStart={handleStart}
                onDrag={handleDrag}
                onStop={handleStop}
            >
                <Transition.Child
                    className="w-full absolute inset-x-0 bottom-0 rounded-t-3xl bg-white"
                    enter="transition-all duration-300"
                    enterFrom="opacity-0 -bottom-full"
                    enterTo="opacity-100 bottom-0"
                    leaveFrom="opacity-100 bottom-0"
                    leaveTo="opacity-0 -bottom-full"
                    leave="transition-all duration-300"
                >
                    {
                        showCloseButton && (
                            <button className="absolute top-1 right-1 rounded-full outline-none focus:outline-none ring-0 focus:ring-0 p-2 z-50" onClick={closeModal}>
                                <XMarkIcon className="w-7 h-7" />
                            </button>
                        )
                    }
                    {props.children}
                </Transition.Child>
            </Draggable>
        </Transition>
    );
};


const Header = ({ className = "", ...props }) => {
    return (
        <div className={`w-full block bg-white shadow my-1 py-1 px-2 relative rounded-t-3xl drag-handler ${className}`} { ...props }>
            {props.children}
        </div>
    )
}

const Body = ({ className = "", ...props}) => {
    return (
        <div className={`py-3 px-4 relative min-h-[30vh] max-h-[75vh] overflow-y-auto overflow-x-hidden gray-scrollbar ${className}`} { ...props }>
            {props.children}
        </div>
    )
}

const Footer = ({ className = "", ...props}) => {
    return (
        <div className={`py-2 px-4 bg-gray-100 sticky bottom-0 mt-2 border-t border-gray-300/50 ${className}`} { ...props }>
            {props.children}
        </div>
    )
}

Drawer.Header = Header;
Drawer.Body = Body;
Drawer.Footer = Footer;


export {
    Drawer
};