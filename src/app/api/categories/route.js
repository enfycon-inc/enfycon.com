import { getCategoryCounts } from "@/libs/wpBlogs";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const categories = await getCategoryCounts();

        return NextResponse.json(
            { categories },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                }
            }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}
