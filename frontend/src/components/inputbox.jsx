export function Inputbox({ label, placeholder, onChange }) {
    return <div>
        <div className="text-base font-medium text-left py-2">
            {label}
        </div>
        <input placeholder={placeholder} onChange={onChange}
        className="w-full px-2 py-1 border-slate-200 border rounded" />
    </div>
}