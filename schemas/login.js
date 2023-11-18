import z from 'zod'

const loginSchema = z.object({
    CORREO_CLIENTE: z.string().email(),
    PASSWORD_CLIENTE: z.string()
})

export function validateDataLogin(input){
    return loginSchema.safeParse(input);
}