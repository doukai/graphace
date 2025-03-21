import { get, type Writable, writable } from 'svelte/store';

/* all supported classes for z-index props 
z-[0]
z-[1]
z-[2]
z-[3]
z-[4]
z-[5]
z-[6]
z-[7]
z-[8]
z-[9]
z-[10]
z-[11]
z-[12]
z-[13]
z-[14]
z-[15]
z-[16]
z-[17]
z-[18]
z-[19]
z-[20]
z-[21]
z-[22]
z-[23]
z-[24]
z-[25]
z-[26]
z-[27]
z-[28]
z-[29]
z-[30]
z-[31]
z-[32]
z-[33]
z-[34]
z-[35]
z-[36]
z-[37]
z-[38]
z-[39]
z-[40]
z-[41]
z-[42]
z-[43]
z-[44]
z-[45]
z-[46]
z-[47]
z-[48]
z-[49]
z-[50]
z-[51]
z-[52]
z-[53]
z-[54]
z-[55]
z-[56]
z-[57]
z-[58]
z-[59]
z-[60]
z-[61]
z-[62]
z-[63]
z-[64]
z-[65]
z-[66]
z-[67]
z-[68]
z-[69]
z-[70]
z-[71]
z-[72]
z-[73]
z-[74]
z-[75]
z-[76]
z-[77]
z-[78]
z-[79]
z-[80]
z-[81]
z-[82]
z-[83]
z-[84]
z-[85]
z-[86]
z-[87]
z-[88]
z-[89]
z-[90]
z-[91]
z-[92]
z-[93]
z-[94]
z-[95]
z-[96]
z-[97]
z-[98]
z-[99]
hover:z-[0]
hover:z-[1]
hover:z-[2]
hover:z-[3]
hover:z-[4]
hover:z-[5]
hover:z-[6]
hover:z-[7]
hover:z-[8]
hover:z-[9]
hover:z-[10]
hover:z-[11]
hover:z-[12]
hover:z-[13]
hover:z-[14]
hover:z-[15]
hover:z-[16]
hover:z-[17]
hover:z-[18]
hover:z-[19]
hover:z-[20]
hover:z-[21]
hover:z-[22]
hover:z-[23]
hover:z-[24]
hover:z-[25]
hover:z-[26]
hover:z-[27]
hover:z-[28]
hover:z-[29]
hover:z-[30]
hover:z-[31]
hover:z-[32]
hover:z-[33]
hover:z-[34]
hover:z-[35]
hover:z-[36]
hover:z-[37]
hover:z-[38]
hover:z-[39]
hover:z-[40]
hover:z-[41]
hover:z-[42]
hover:z-[43]
hover:z-[44]
hover:z-[45]
hover:z-[46]
hover:z-[47]
hover:z-[48]
hover:z-[49]
hover:z-[50]
hover:z-[51]
hover:z-[52]
hover:z-[53]
hover:z-[54]
hover:z-[55]
hover:z-[56]
hover:z-[57]
hover:z-[58]
hover:z-[59]
hover:z-[60]
hover:z-[61]
hover:z-[62]
hover:z-[63]
hover:z-[64]
hover:z-[65]
hover:z-[66]
hover:z-[67]
hover:z-[68]
hover:z-[69]
hover:z-[70]
hover:z-[71]
hover:z-[72]
hover:z-[73]
hover:z-[74]
hover:z-[75]
hover:z-[76]
hover:z-[77]
hover:z-[78]
hover:z-[79]
hover:z-[80]
hover:z-[81]
hover:z-[82]
hover:z-[83]
hover:z-[84]
hover:z-[85]
hover:z-[86]
hover:z-[87]
hover:z-[88]
hover:z-[89]
hover:z-[90]
hover:z-[91]
hover:z-[92]
hover:z-[93]
hover:z-[94]
hover:z-[95]
hover:z-[96]
hover:z-[97]
hover:z-[98]
hover:z-[99]
*/
function createZIndex() {
    const zIndex: Writable<number> = writable(0);
    const { subscribe, set, update } = zIndex;
    return {
        subscribe,
        next: (n?: number | undefined) => {
            update(($zIndex) => $zIndex + (n || 100));
            return get(zIndex);
        },
        top: (n?: number | undefined) => get(zIndex) + (n || 0),
        reset: () => set(0)
    };
}

export const zIndex = createZIndex();