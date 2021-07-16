import {SiteClient} from datocms-client;

export default async function recebedorDeRequests(request, response) {
    
    if(request.method === 'POST') {

        const TOKEN = '4d69a29483d6bd56b11461f6045992';

        const client = new SiteClient (TOKEN);

        const registroCriado = client.items.create({
            itemType: "972371",

        })

        response.json({
            dados:"sdfsd",
            registroCriado: registroCriado
        })
        return;
    }   
    response.status(404).json({
        message: "Ainda não temo nada no GET, tente via POST"
    })
}