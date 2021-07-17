import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    
    if(request.method === 'POST') {

        const TOKEN = '4d69a29483d6bd56b11461f6045992';

        const client = new SiteClient (TOKEN);

        const registroCriadoComunidade = await client.items.create({
            itemType: "972371",
            ...request.body,
        })

        response.json({
            registroCriadoComunidade: registroCriadoComunidade
        })
        return;
    }   
    response.status(404).json({
        message: "Ainda não temo nada no GET, tente via POST"
    })
}