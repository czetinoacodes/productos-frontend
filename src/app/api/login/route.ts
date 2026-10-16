import { NextResponse } from "next/server";
import { loginRequest } from "@/lib/api";

// este handler router funciona como un proxy, ya que el navegador nunca llamará a Laravel
// se llama acá, sin CORS, y hacemos la petición real desde el servidor de Next.js

export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
        const { access_token } = await loginRequest(email, password);

        const response = NextResponse.json({ ok: true });

        response.cookies.set("token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax", // puede ser para el mismo odminio o no
            path: "/",
            maxAge: 60 * 60 //1 hora , tiempo de vida configurado en JWT.PHP o expires_in
        });
        return response;
    } catch {
        return NextResponse.json(
            { ok: false, message: "Credenciales inválidas" },
            { status: 401 }
        );
    }
}