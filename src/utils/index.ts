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

export const checkNullish = (data?: any) => {
    if (!data || (typeof data == 'string' && data == '') || isNaN(data) || data == undefined)
        return null;
    return data;
};


// format number to vietnamese currency
export const formatVietnameseCurrency = (number: Number) => {
    const digits = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    const units = ['', 'nghìn', 'triệu', 'tỷ'];
    // Convert the number to a string
    let strNumber = number.toString();
    // Split the number into integer and decimal parts
    let parts = strNumber.split('.');
    let integerPart = parseInt(parts[0]);
    let decimalPart = parseInt(parts[1] || '0');

    // Function to convert a three-digit number to words
    function convertThreeDigitNumber(num: any) {
        let result = '';
        let hundreds = Math.floor(num / 100);
        let tens = Math.floor((num % 100) / 10);
        let ones = num % 10;

        if (hundreds > 0) {
            result += digits[hundreds] + ' trăm ';
        }
        if (tens > 0) {
            if (tens === 1) {
                result += 'mười ';
            } else {
                result += digits[tens] + ' mươi ';
            }
        }
        if (ones > 0) {
            if (tens === 0 && hundreds !== 0) {
                result += 'lẻ ';
            }
            if (ones === 1 && tens > 1) {
                result += 'mốt ';
            } else if (ones === 5 && tens > 0) {
                result += 'lăm ';
            } else {
                result += digits[ones] + ' ';
            }
        }
        return result.trim();
    }
    // Start converting the integer part
    let words = '';

    if (integerPart === 0) {
        words = 'không đồng';
    } else {
        let unitIndex = 0;

        while (integerPart > 0) {
            let threeDigitNumber = integerPart % 1000;
            if (threeDigitNumber > 0) {
                let digitWords = convertThreeDigitNumber(threeDigitNumber);
                words = digitWords + ' ' + units[unitIndex] + ' ' + words;
            }
            integerPart = Math.floor(integerPart / 1000);
            unitIndex++;
        }
    }

    // Convert the decimal part to words
    let decimalWords = '';
    if (decimalPart > 0) {
        decimalWords = convertThreeDigitNumber(decimalPart) + ' xu';
    }

    // Combine the words and add the currency symbol
    let formattedNumber = (words + ' ' + decimalWords).trim();
    formattedNumber = formattedNumber.replace(/\s+/g, ' ');
    formattedNumber = formattedNumber.replace(/đồng$/g, 'đồng');

    return formattedNumber;
};
