export function Button ({label, onPress}) {
    return <div>
        <button onClick={onPress} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base w-full px-5 py-2.5 me-2 mb-2 mt-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer">
        {label}
        </button>
    </div>
}