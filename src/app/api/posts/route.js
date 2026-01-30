
import GET_POSTS_QUERY from "@/libs/blogQueries";
import { siteConfig } from "@/config/siteConfig";

export async function POST(req) {
    try {
        const { after } = await req.json();
        const endpoint = siteConfig.blogApiUrl + "/graphql";

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: GET_POSTS_QUERY,
                variables: {
                    first: 15,
                    after: after || null,
                },
            }),
        });

        const json = await response.json();

        if (json.errors) {
            console.error(json.errors);
            return Response.json({ error: "Failed to fetch posts" }, { status: 500 });
        }

        return Response.json(json.data);
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
