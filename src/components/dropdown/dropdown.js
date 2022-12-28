import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const Dropdown = ({ className, ...props}) => {
    return (
        <div className="block h-full">
            <Menu as="div" className={`!relative inline-block text-left ${className}`}>
                {
                    props.children
                }
            </Menu>
        </div>
    )
}

const Button = (props) => {
    return (
        <Menu.Button {...props}>
            {props.children}
        </Menu.Button>
    )
}

const Content = ({className, ...props}) => {
    return (
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className={`absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 py-1 ${className}`} {...props}>
                {props.children}
            </Menu.Items>
        </Transition>
    )
}

Dropdown.Content = Content
Dropdown.Button = Button

export { Dropdown }