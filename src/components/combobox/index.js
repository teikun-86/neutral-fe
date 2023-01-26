import { Fragment } from 'react'
import { Combobox as ComboboxParent, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'

const Combobox = (props) => {

    return (
        <div className="block w-full">
            <ComboboxParent {...props}>
                <div className="relative mt-1">
                    {
                        props.children
                    }
                </div>
            </ComboboxParent>
        </div>
    )
}

const Input = ({ showButton = true, ...props}) => {
    return (
        <div className="relative w-full overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm cursor-pointer">
            <ComboboxParent.Button as="div" className="flex items-center">
                <ComboboxParent.Input {...props} />
                <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400 bg-white dark:bg-gray-900"
                    aria-hidden="true"
                />
            </ComboboxParent.Button>
        </div>
    )
}

const Container = ({className = "", afterLeave = () => {}, ...props}) => {
    return (
        <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={afterLeave}
        >
            <div className={`w-full md:w-[28rem] bg-white dark:bg-gray-900 rounded-lg overflow-hidden block absolute z-[70] shadow-lg right-0 ${className}`}>
                {props.children}
            </div>
        </Transition>
    )
}

const Options = (props) => {
    return (
        <ComboboxParent.Options className="max-h-80 w-full overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-900 py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" {...props}>
            {props.children}
        </ComboboxParent.Options>
    )
}

const Header = (props) => {
    let { className } = props
    
    return (
        <div {...props} className={`${className} px-3 py-2 border-b border-gray-300/30`}>
            {props.children}
        </div>
    )
}

const Footer = (props) => {
    let { className } = props

    return (
        <div {...props} className={`${className} w-full px-3 py-2 mt-2 bg-gray-100 dark:bg-gray-800`}>
            {props.children}
        </div>
    )
}

const Option = (props) => {
    return (
        <ComboboxParent.Option {...props}>
            {props.children}
        </ComboboxParent.Option>
    )
}

Combobox.Input = Input
Combobox.Container = Container
Combobox.Option = Option
Combobox.Options = Options
Combobox.Footer = Footer
Combobox.Header = Header

export default Combobox