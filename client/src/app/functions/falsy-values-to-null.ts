export const falsyValuesToNull = <T>(obj: T): T => Object.fromEntries(
  Object.entries(obj).map(([key, value]) => [key, !!value ? value : null])
) as T
