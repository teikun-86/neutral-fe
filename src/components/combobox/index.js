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

const Input = (props) => {
    return (
        <div className="relative w-full cursor-default overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <ComboboxParent.Input {...props} />
            {
                props.showButton 
                ?
                    <ComboboxParent.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </ComboboxParent.Button>
                : <></>
            }
        </div>
    )
}

const Container = (props) => {
    return (
        <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={props.afterLeave}
        >
            <ComboboxParent.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                {props.children}
            </ComboboxParent.Options>
        </Transition>
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

export default Combobox