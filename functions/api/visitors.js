export async function onRequest(context) {
  const { env } = context;

  const UMAMI_URL = "https://api.umami.is/v1";
  const WEBSITE_ID = "0c0c7cc7-3489-4c24-b515-2d268fb4fb9f";

  try {
    const url = new URL(context.request.url);
    const startAt = url.searchParams.get("startAt") || "0";
    const endAt = url.searchParams.get("endAt") || Date.now().toString();

    const params = new URLSearchParams({
      startAt,
      endAt,
    });

    const response = await fetch(
      `${UMAMI_URL}/websites/${WEBSITE_ID}/stats?${params}`,
      {
        headers: {
          Accept: "application/json",
          "x-umami-api-key": env.UMAMI_API_KEY,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
