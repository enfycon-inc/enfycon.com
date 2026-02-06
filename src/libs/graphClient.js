
import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";


let graphClient = null;

function getGraphClient() {
    if (graphClient) {
        return graphClient;
    }

    const tenantId = process.env.AZURE_TENANT_ID;
    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;

    if (!tenantId || !clientId || !clientSecret) {
        throw new Error("Azure credentials are not configured.");
    }

    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    const authProvider = async (callback) => {
        try {
            const token = await credential.getToken("https://graph.microsoft.com/.default");
            callback(null, token.token);
        } catch (error) {
            callback(error, null);
        }
    };

    graphClient = Client.init({
        authProvider,
    });

    return graphClient;
}

export async function sendMail({ subject, content, toRecipients }) {
    const client = getGraphClient();
    const userId = process.env.AZURE_USER_ID;

    if (!userId) {
        throw new Error("Azure user ID is not configured.");
    }

    const message = {
        subject: subject,
        body: {
            contentType: "HTML",
            content: content,
        },
        from: {
            emailAddress: {
                address: userId,
                name: "enfycon Support"
            }
        },
        toRecipients: toRecipients.map((email) => ({
            emailAddress: {
                address: email,
            },
        })),
    };

    await client.api(`/users/${userId}/sendMail`).post({
        message: message,
        saveToSentItems: "true",
    });
}
