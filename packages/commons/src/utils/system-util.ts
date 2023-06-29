export const getOS = (): string | null => {
    let userAgent = window.navigator.userAgent.toLowerCase();
    let macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i;
    let windowsPlatforms = /(win32|win64|windows|wince)/i;
    let iosPlatforms = /(iphone|ipad|ipod)/i;
    let os: string | null = null

    if (macosPlatforms.test(userAgent)) {
        os = "macos"
    } else if (iosPlatforms.test(userAgent)) {
        os = "ios"
    } else if (windowsPlatforms.test(userAgent)) {
        os = "windows"
    } else if (/android/.test(userAgent)) {
        os = "android"
    } else if (!os && /linux/.test(userAgent)) {
        os = "linux"
    }
    return os
}