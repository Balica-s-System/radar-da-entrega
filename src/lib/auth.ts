import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, emailOTP } from "better-auth/plugins";
import { prisma } from "./db";
import { resend } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "Radar da Entrega <onboarding@resend.dev>",
          to: [email],
          subject: "Radar da Entrega - Seu código de verificação",
          html: `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verificação de E-mail - Radar da Entrega</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f5f7; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
              
              <tr>
                <td style="background-color: #0f172a; padding: 32px 24px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; tracking-tight: -0.05em;">
                    📦 Radar da Entrega
                  </h1>
                </td>
              </tr>

              <tr>
                <td style="padding: 40px 32px; text-align: center;">
                  <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 20px; font-weight: 600;">
                    Verifique seu e-mail
                  </h2>
                  <p style="margin: 0 0 32px 0; color: #64748b; font-size: 15px; line-height: 24px;">
                    Olá! Use o código OTP abaixo para confirmar sua identidade e acessar sua conta no Radar da Entrega. Ele é válido por apenas alguns minutos.
                  </p>

                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 32px;">
                    <span style="display: block; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.1em; margin-bottom: 8px;">
                      Seu código de acesso
                    </span>
                    <strong style="font-size: 36px; font-weight: 800; color: #0f172a; letter-spacing: 0.2em;">
                      ${otp}
                    </strong>
                  </div>

                  <p style="margin: 0; color: #94a3b8; font-size: 13px; line-height: 20px;">
                    Se você não solicitou este código, basta ignorar este e-mail com segurança.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding: 0 32px 32px 32px; text-align: center; border-top: 1px solid #f1f5f9;">
                  <p style="margin: 24px 0 0 0; color: #94a3b8; font-size: 12px;">
                    &copy; ${new Date().getFullYear()} Radar da Entrega. Todos os direitos reservados.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
        });
      },
    }),
    admin(),
  ],
});
