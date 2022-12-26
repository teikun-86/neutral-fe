import moment from "moment/moment"
import useOutsideClick from "../hooks/outsideclick"

const { Transition } = require("@headlessui/react")
const { useState, Fragment, useRef } = require("react")
const { DayPicker } = require("react-day-picker")

const DatePicker = (props) => {
    const [show, setShow] = useState(false)
    const [display, setDisplay] = useState(moment(props.selected).format("ddd, DD MMM YYYY"))
    const ref = useRef(null)

    const outsideClick = useOutsideClick({
        ref: ref, callback: (event) => {
            setShow(false)
        }
    })

    const { options } = props

    return (
        <div ref={ref} className="relative w-full">
            <input readOnly onChange={() => s} value={display} {...props} onFocus={() => setShow(true)} />
            <Transition
                as={Fragment}
                enter="transition ease-in duration-200"
                enterFrom="opacity-0 -translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
                show={show}
            >
                <div className="absolute top-8 bg-white shadow-lg rounded-lg z-20">
                    <DayPicker
                        mode="single"
                        selected={props.selected}
                        onSelect={(value) => {
                            setShow(false)
                            setDisplay(moment(value).format("ddd, DD MMM YYYY"))
                            props.onSelect(value)
                        }}
                        disabled={options.disabled}
                    />
                </div>
            </Transition>
        </div>
    )
}

export default DatePicker