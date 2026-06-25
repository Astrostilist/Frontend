import type { LogStatus } from "../../../../../shared/types/logs";

interface statusFilterProps {
    value: LogStatus | "";
    onChange: (value: LogStatus | '') => void;
}

export const StatusFilter = ({value, onChange}: statusFilterProps) => {
    return (
        <select
         value = {value}
         onChange={(e) => onChange(e.target.value as LogStatus | "")}
         style={{ 
                padding: "10px", 
                borderRadius: "4px", 
                border: "1px solid #ccc",
                minWidth: "180px"
            }}
         >
            <option value="">Все</option>
            <option value="completed">Success</option>
            <option value="failed">Failed</option>
            <option value="processing">Processing</option>
            <option value="pending">Pending</option>
        </select>
    )
}