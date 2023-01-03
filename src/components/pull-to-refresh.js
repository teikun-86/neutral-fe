import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import Draggable from "react-draggable"
import { SpinnerIcon } from "./icons"

export const PullToRefresh = ({ onRefresh = () => {}, ...props }) => {
    const [position, setPosition] = useState({x: 0, y: 0})
    const [status, setStatus] = useState(0)

    const onPullStart = (data) => {
        setPosition({x: 0, y: 0})
    }
    
    const onPull = (data) => {
        setPosition({x: 0, y: data.y > 50 ? 50: data.y})
        setStatus(data.y === 0 ? 0 : (data.y >= 50 ? 2 : 1))
    }
    
    const onPullEnd = (data) => {
        if (data.y > 50) {
            onRefresh()
            setStatus(3)
            setPosition({x: 0, y: 0})
            return
        }
        setPosition({x: 0, y: data.y})
    }

    return (
        <Draggable
            axis="y"
            handle=".drag-handler"
            defaultPosition={{ x: 0, y: 0 }}
            bounds={{ top: 0 }}
            position={position}
            onStart={onPullStart}
            onDrag={onPull}
            onStop={onPullEnd}
        >
            <div>
                {
                    status === 1
                    ? (
                        <div className="w-full grid place-items-center">
                            <ArrowDownIcon className="w-5 h-5" />
                            <p className="text-center text-sm font-semibold text-gray-800">Tarik untuk memperbarui</p>
                        </div>
                    )
                    : (
                        status === 2
                        ? (
                            <div className="w-full grid place-items-center">
                                <ArrowUpIcon className="w-5 h-5" />
                                <p className="text-center text-sm font-semibold text-gray-800">Lepas untuk memperbarui</p>
                            </div>
                        )
                        : (
                            status === 3
                            ?   <div className="w-full grid place-items-center">
                                    <SpinnerIcon className="w-5 h-5 animate-spin" />
                                </div>
                            : <></>
                        )
                    )
                }
                <div className="drag-handler">{props.children}</div>
            </div>
        </Draggable>
    )
}