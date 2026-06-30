import { LogsTable } from "../widgets/logs/ui/table/LogsTable";
import { StatisticSection, type StatisticData } from "../widgets";
import {
  Typography,
  Box,
} from "@mui/material";

const mockData: StatisticData[] = [
  {
    id: '1',
    type: 'inquiry',
    value: 57,
    changePercent: 12.5,
    title: 'Запросы за 24ч',
  },
  {
    id: '2',
    type: 'successRate',
    value: 95.4,
    title: 'Успешные генерации',
  },
  {
    id: '3',
    type: 'retry',
    value: 3,
    changeAbsolute: 2,
    title: 'Задачи Retry',
  },
  {
    id: '4',
    type: 'dlq',
    value: 2,
    title: 'Задачи DLQ',
  },
];

export const LogsPage = () => {
  return (
    <Box
      sx={{
        px: 3,
        py: 3,
        maxWidth: "1125px",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textAlign: "left", mb: 3 }}
      >
        Главная
      </Typography>

      <Box sx={{ mb: 4 }}>
        <StatisticSection data={mockData} />
      </Box>

      <LogsTable />
    </Box>
  );
};
