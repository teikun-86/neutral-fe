import modalState from "@/hooks/modal";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const defaultProps = {
    size: "md",
    static: false,
    id: '',
    title: undefined,
    footer: <></>
};

const Modal = (props = defaultProps) => {
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

    const sizeClasses = () => {
        switch (props.size) {
            case 'sm':
                return "w-[90%] md:w-2/3 lg:w-1/3 xl:w-1/4";
                break;

            case 'lg':
                return "w-[90%] md:w-1/2 lg:w-1/2 xl:w-2/3";
                break;

            case 'xl':
                return "w-[90%] md:w-2/3 lg:w-2/3 xl:w-3/4";
                break;

            default:
            case 'md':
                return "w-[90%] md:w-1/3 lg:w-1/4 xl:w-1/3";
                break;
        }
    };

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog id={props.id} as="div" className="relative z-[80]" onClose={() => props.static ? {} : closeModal()}>
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

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={`${sizeClasses()} transform transition-all`}>
                                {
                                    props.clean === true
                                        ? props.children
                                        : (
                                            <div className="w-full bg-white rounded-lg overflow-hidden">
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

const Header = ({ className = "", ...props }) => {
    return (
        <div className={`py-3 px-4 relative ${className}`} { ...props }>
            {props.children}
        </div>
    )
}

const Body = ({className = "", ...props}) => {
    return (
        <div className={`py-3 px-4 relative ${className}`} { ...props }>
            {props.children}
        </div>
    )
}

const Footer = props => {
    return (
        <div className={`py-2 px-4 bg-gray-100 ${props.className}`}>
            {props.children}
        </div>
    )
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;


export {
    Modal
};