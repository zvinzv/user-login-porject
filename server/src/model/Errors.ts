type Error = ("Error Happen !" | "Username was duplicated !" | "Access Denide !")
export const Error400 = (message: Error, details: any) => ({"errMessage": message, "errDetails": details})
export const Error403 = (message: Error, details?: any) => ({"errMessage": message, "errDetails": details || ""})
export const Error500 = (message: Error, details: any) => ({"errMessage": message, "errDetails": details})