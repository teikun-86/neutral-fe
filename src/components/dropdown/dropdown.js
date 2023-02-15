import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const Dropdown = ({ className, ...props}) => {
    return (
        <Menu as="div" className={`!relative inline-block text-left ${className}`}>
            {
                props.children
            }
        </Menu>
    )
}

const Button = (props) => {
    return (
        <Menu.Button {...props}>
            {props.children}
        </Menu.Button>
    )
}

const Content = ({className = "", afterLeave = () => {}, ...props}) => {
    return (
        <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            afterLeave={afterLeave}
        >
            <Menu.Items className={`absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 py-1 ${className} dark:bg-gray-900 dark:divide-gray-700`} {...props}>
                <div className="relative w-full h-full z-20">
                    {props.children}
                </div>
            </Menu.Items>
        </Transition>
    )
}

const Item = ({ className = "", as = "button", ...props }) => {
    return (
        <Menu.Item as={as} className={`w-full bg-white hover:bg-gray-50 focus:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 flex items-center dark:focus:bg-gray-800 dark:text-gray-100 px-2 py-1  transition-all duration-100 ${className}`} {... props}>
            {props.children}
        </Menu.Item>
    )
}

const Divider = ({ className = "", ...props }) => {
    return (
        <div className={`w-full border-t my-1 border-gray-300/60 dark:border-gray-700/70`} {... props}>
        </div>
    )
}

Dropdown.Content = Content
Dropdown.Divider = Divider
Dropdown.Button = Button
Dropdown.Item = Item

export { Dropdown }