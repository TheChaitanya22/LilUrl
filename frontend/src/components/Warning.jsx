import { Link } from "react-router-dom"

export function Warning ({label, buttonText, to}) {
    return <div className="text-sm font-bold px-2 py-2 flex justify-center">
        <div>
            {label}
        </div>
        <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
        </Link>
    </div>
}