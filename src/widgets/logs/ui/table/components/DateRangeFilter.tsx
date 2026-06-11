import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

interface DateRangeFilterProps {
    value: [string | null, string | null];
    onChange: (value: [string | null, string | null]) => void;
}

export const DateRangeFilter = ({ value, onChange }: DateRangeFilterProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
                value={[
                    value[0] ? dayjs(value[0]) : null, 
                    value[1] ? dayjs(value[1]) : null
                ]}
                onChange={(newValue) => {
                    onChange([
                        newValue[0] ? newValue[0].format('YYYY-MM-DD') : null,
                        newValue[1] ? newValue[1].format('YYYY-MM-DD') : null
                    ]);
                }}
                calendars={1}
                slotProps={{
                    textField: { 
                        size: 'small',
                        label: "Created At",
                    },
                    actionBar: {
                        actions: ['clear', 'accept'],
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