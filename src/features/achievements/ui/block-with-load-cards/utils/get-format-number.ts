export const getFormatNumber = () => (value: string | number) => {
    const num = parseFloat(String(value));

    return Number.isNaN(num) ? value : num.toFixed(1).replace('.', ',');
}
