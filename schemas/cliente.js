import z from 'zod'

const clientesSchema = z.object({
    DOCUMENTO_CLIENTE: z.string(),
    PNOMBRE_CLIENTE: z.string(),
    SNOMBRE_CLIENTE: z.string().optional(),
    PAPELLIDO_CLIENTE: z.string(),
    SAPPELLIDO_CLIENTE: z.string().optional(),
    TELEFONO_CLIENTE: z.string(),
    CORREO_CLIENTE: z.string().email(),
    PASSWORD_CLIENTE: z.string(),
    ID_TIPODOC: z.number().int()
})

export function validateCliente(input){
    return clientesSchema.safeParse(input);
}
export function validatePartialCliente(input){
    return clientesSchema.partial().safeParse(input);
}