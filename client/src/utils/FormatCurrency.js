export const CURRENCY_STYLE = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

export function fortmatCurrency(number) {
    return CURRENCY_STYLE.format(number);
}
