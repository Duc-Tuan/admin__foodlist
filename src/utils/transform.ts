// HEX color to transform RGBA
export const hexToRGBA = (hex: string, percentTransform?: string) => {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        const percent = ` , ${percentTransform ?? '0.1'}`;
        return '' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(', ') + percent;
    }
    // throw new Error('Bad Hex');
};