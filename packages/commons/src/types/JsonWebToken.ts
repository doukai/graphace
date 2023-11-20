export interface JsonWebToken {
    iss: string
    sub?: string
    upn?: string
    full_name?: string | undefined
    family_name?: string | undefined
    groups?: string[] | undefined
    roles?: string[] | undefined
    permission_types?: string[] | undefined
    is_root?: boolean | undefined
    iat?: number
    exp?: number
}