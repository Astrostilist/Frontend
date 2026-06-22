interface CsvColumn<T> {
    key: keyof T;
    label: string;
}

export const exportToCSV = <T extends object>(
    data: T[],
    fileNamePrefix = "export",
    columns?: CsvColumn<T>[]
) => {
    if (!data || data.length === 0) {
        alert("Нет данных для экспорта");
        return;
    }

    const csvHeaders = columns?.map(col => col.label)
        ?? Object.keys(data[0]) as string[];

    const rows = data.map(item => 
        (columns ?? Object.keys(item).map(key => ({ key: key as keyof T, label: key })))
            .map(col => {
                const value = item[col.key];
                return `"${String(value ?? "").replace(/"/g, '""')}"`;
            })
            .join(",")
    );

    const csvContent = [
        csvHeaders.join(","),
        ...rows,
    ].join("\n");

    const blob = new Blob(
        [csvContent],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download =
        `${fileNamePrefix}_${new Date().toISOString().slice(0, 10)}.csv`;

    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
};