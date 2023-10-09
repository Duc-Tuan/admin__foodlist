export const setLocation = (name: string, value: any) => {
    return localStorage.setItem(name, value);
}

export const getLocation = (name: string) => {
    return localStorage.getItem(name);
}

export const removeLocation = (name: string) => {
    return localStorage.removeItem(name);
}