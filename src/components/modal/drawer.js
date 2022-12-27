import modalState from "@/hooks/modal";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Drawer = (props) => {
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useRecoilState(modalState);

    useEffect(() => {

        setOpen(modalOpen === props.id)

        return () => {
        };
    }, [modalOpen, props.id]);

    const closeModal = () => {
        setModalOpen('');
    }

    return (
        <Transition duration={300} appear show={open} as={Fragment}>
            <Dialog id={props.id} as="div" className="relative z-10" onClose={() => props.static ? {} : closeModal()}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className={`fixed inset-0 bg-black/70 backdrop-blur-sm ${props.static ? "pointer-events-none" : ""}`} />
                </Transition.Child>

                <div className="fixed inset-x-0 bottom-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="translate-y-20"
                            enterTo="translate-y-0"
                            leave="ease-in duration-200"
                            leaveFrom="translate-y-0"
                            leaveTo="translate-y-20 opacity-0"
                        >
                            <Dialog.Panel className={`w-full transform transition-all`}>
                                {
                                    props.clean === true
                                        ? props.children
                                        : (
                                            <div className="w-full bg-white rounded-t-3xl overflow-hidden">
                                                {props.children}
                                            </div>
                                        )
                                }
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};


const Header = props => {
    return (
        <div className="py-3 px-4 relative shadow">
            {props.children}
        </div>
    )
}

const Body = props => {
    return (
        <div className="py-3 px-4 relative min-h-[30vh] max-h-[70vh] overflow-y-auto overflow-x-hidden">
            {props.children}
        </div>
    )
}

const Footer = props => {
    return (
        <div className={`py-2 px-4 bg-gray-100 sticky bottom-0 mt-2 border-t border-gray-300/50 ${props.className}`}>
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