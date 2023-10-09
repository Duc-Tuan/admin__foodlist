export const isEmail = (email: string) => {
    const regex =
        /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

    if (!email) return false;
    if (!regex.test(email)) return false;
    return true;
};

export const isPhoneNumber = (phone?: string) => {
    const regex = /^\+?(?:84|0)(2|3|5|7|8|9)+([0-9]{8})\b$/;

    if (!phone) return false;
    if (!regex.test(phone)) return false;
    return true;
};

/// check String
export const isString = (value?: string) => {
    const regex = /[a-zA-Z]/;
    if (!value) return false;
    if (!regex.test(value)) return false;
    return true;
};

/// check phone Invalid
export const checkPhoneValid = (phone?: string) => {
    if (!phone) return 'Số điện thoại không được để trống!';
    if (isString(phone)) return 'Định dạng số điện thoại phải là số!';
    if (!isPhoneNumber(phone?.toString())) return 'Định dạng số điện thoại chưa đúng!';
};

/// check Invalid format file images ///
// export const inValidFileImage = (event: React.ChangeEvent<HTMLInputElement>, isArr?: boolean) => {
//     const acceptFileTypes = ['png', 'jpg', 'jpeg']; /// type file image accept
//     const file: any = event?.target?.files.item(0);
//     const fileType = file?.type;
//     const type = fileType?.replace('image/', '');
//     if (!isArr) return acceptFileTypes.includes(type);
//     const fileList: any = event?.target?.files;
//     const fileTypes = Object.values(fileList).map((file) => file?.type?.replace('image/', ''));
//     return fileTypes?.every((file) => acceptFileTypes.includes(file));
// };

/// check size image
export const inValidateSizeFile = (files: File | File[], isArr?: boolean) => {
    if (!files) return;
    if (!isArr && !Array.isArray(files)) return files.size / 1024 < 5 * 1024; /// check file > 5MB
    return (files as File[]).every((file) => file.size / 1024 < 5 * 1024);
};
