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

export const getCookieByName = (cname: string) => {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

/// check Invalid format file images ///
export const inValidFileImage = (event: any, isArr?: boolean) => {
    const acceptFileTypes = ['png', 'jpg', 'jpeg']; /// type file image accept
    const file = event.target.files.item(0);
    const fileType = file.type;
    const type = fileType.replace('image/', '');
    if (!isArr) return acceptFileTypes.includes(type);
    const fileList: any = event.target.files;
    const fileTypes = Object.values(fileList).map((file: any) => file?.type?.replace('image/', ''));
    return fileTypes?.every((file) => acceptFileTypes.includes(file));
};

/// check size image
export const inValidateSizeFile = (files: File | File[], isArr?: boolean) => {
    if (!files) return;
    if (!isArr && !Array.isArray(files)) return files.size / 1024 < 5 * 1024; /// check file > 5MB
    return (files as File[]).every((file) => file.size / 1024 < 5 * 1024);
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
