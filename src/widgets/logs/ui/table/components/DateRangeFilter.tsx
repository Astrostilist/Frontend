import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

interface DateRangeFilterProps {
    value: [string | null, string | null];
    onChange: (value: [string | null, string | null]) => void;
    onApply: (value: [string | null, string | null]) => void;
}

export const DateRangeFilter = ({ value, onChange, onApply }: DateRangeFilterProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
                value={[
                    value[0] ? dayjs(value[0]) : null, 
                    value[1] ? dayjs(value[1]) : null
                ]}
                onChange={(newValue) => {
                   const range: [string | null, string | null] = [
                    newValue[0]
                        ? newValue[0].startOf('day').toISOString()
                        : null,
                    newValue[1]
                        ? newValue[1].endOf('day').toISOString()
                        : null,
                ];

                onChange(range);

                // автоматически применяем после выбора второй даты
                if (range[0] && range[1]) {
                    onApply(range);
                }

                // если очистили диапазон
                if (!range[0] && !range[1]) {
                    onApply([null, null]);
                }
                }}
                calendars={1}
                slotProps={{
                    textField: { 
                        size: 'small',
                        label: "Created At",
                    },
                }}
                localeText={{
                    start: "Дата от",
                    end: "Дата до",
                }}
            />
        </LocalizationProvider>
    );
};