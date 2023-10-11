export const formatCurrency = (
    num: number,
    suffixes: string = "đ",
    positionSuffixes: string = "right",
    separate: string = ",",
    configNull?: {
        format?: string;
        toFixed?: number;
    }
) => {
    if (num) {
        const s = Number(num).toFixed(configNull?.toFixed);
        const regex = /\B(?=(\d{3})+(?!\d))/g;
        return positionSuffixes === "right"
            ? s.replace(regex, separate) + suffixes
            : suffixes + s.replace(regex, separate);
    }
    return !configNull ? 0 : configNull.format;
};