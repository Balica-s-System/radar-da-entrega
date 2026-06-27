"use client";

import { Loader, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const callbackURL = searchParams?.get("callbackURL") || "/onboarding";

  const [googlePending, startGooglePending] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");

  function signInWithGoogle(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    startGooglePending(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Google, you will be redirected...");
          },
          onError: () => {
            toast.error("Internal server error");
          },
        },
      });
    });
  }

  function signInWithEmail(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            const redirectTo = callbackURL !== "/onboarding" ? callbackURL : undefined;
            toast.success("Email sent");
            router.push(
              `/verify-request?email=${encodeURIComponent(email)}${redirectTo ? `&callbackURL=${encodeURIComponent(redirectTo)}` : ""}`,
            );
          },
          onError: () => {
            toast.error("Error sending email");
          },
        },
      });
    });
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen w-full max-w-md mx-auto text-foreground px-4",
        className,
      )}
      {...props}
    >
      <form className="w-full">
        <Field>
          <FieldDescription className="flex flex-col items-center gap-y-4 mb-8 text-center">
            <Logo />
            <h2 className="text-4xl font-semibold tracking-tight text-card-foreground">
              Sign In.
            </h2>
          </FieldDescription>

          <div className="flex flex-col gap-y-4">
            <FieldGroup className="flex flex-col gap-y-4">
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailPending}
                required
              />

              <Button
                type="button"
                onClick={signInWithEmail}
                disabled={emailPending}
                className="w-full"
              >
                {emailPending ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    <span>Continue with Email</span>
                  </>
                )}
              </Button>

              <div className="relative flex py-2 items-center">
                <div className="grow border-t border-border"></div>
                <span className="shrink mx-4 text-xs uppercase text-muted-foreground tracking-wider">
                  ou
                </span>
                <div className="grow border-t border-border"></div>
              </div>

              {/* Google */}
              <Button
                type="button"
                onClick={signInWithGoogle}
                disabled={googlePending}
                className="w-full flex items-center justify-center gap-3 p-5 text-sm font-medium transition-colors bg-transparent border-input text-foreground hover:bg-accent hover:text-accent-foreground"
                variant="outline"
              >
                {googlePending ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Image
                      src="/icons/google-svg.svg"
                      alt="Sign in with Google"
                      width={20}
                      height={20}
                    />
                    <span>Sign in with Google</span>
                  </>
                )}
              </Button>

              {/* LinkedIn */}
              <Button
                type="button"
                onClick={signInWithGoogle}
                disabled={googlePending}
                className="w-full flex items-center justify-center gap-3 p-5 text-sm font-medium transition-colors bg-transparent border-input text-foreground hover:bg-accent hover:text-accent-foreground"
                variant="outline"
              >
                {googlePending ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Image
                      src="/icons/linkedin-svg.svg"
                      alt="Sign in with LinkedIn"
                      width={20}
                      height={20}
                    />
                    <span>Sign in with LinkedIn</span>
                  </>
                )}
              </Button>

              {/* Apple */}
              <Button
                type="button"
                onClick={signInWithGoogle}
                disabled={googlePending}
                className="w-full flex items-center justify-center gap-3 p-5 text-sm font-medium transition-colors bg-transparent border-input text-foreground hover:bg-accent hover:text-accent-foreground"
                variant="outline"
              >
                {googlePending ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Image
                      src="/icons/apple-icon.svg"
                      alt="Sign in with Apple"
                      width={20}
                      height={20}
                    />
                    <span>Sign in with Apple</span>
                  </>
                )}
              </Button>

              <div className="text-center text-xs leading-relaxed text-muted-foreground mt-4">
                By signing up, you agree to our{" "}
                <Link
                  href="#"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/80"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/80"
                >
                  Privacy Policy
                </Link>
              </div>
            </FieldGroup>
          </div>
        </Field>
      </form>
    </div>
  );
}
