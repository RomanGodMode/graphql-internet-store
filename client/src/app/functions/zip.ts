export const zip = <T1, T2>(arr1: T1[], arr2: T2[]) => arr1.map((e, i) => [e, arr2[i]] as [T1, T2])
