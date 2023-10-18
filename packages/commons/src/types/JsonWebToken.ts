export interface JsonWebToken {
    iss: string
    sub?: string
    upn?: string
    full_name?: string | undefined
    family_name?: string | undefined
    groups?: string[] | undefined
    roles?: string[] | undefined
    permissions?: string[] | undefined
    is_root?: boolean | undefined
    iat?: number
    exp?: number
}