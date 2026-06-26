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

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [googlePending, startGooglePending] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");

  function signInWithGoogle(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    startGooglePending(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
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
            toast.success("Email sent");
            router.push(`/verify-request?email=${email}`);
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
        "flex flex-col gap-6 w-full max-w-md mx-auto text-foreground",
        className,
      )}
      {...props}
    >
      <form>
        <Field>
          <FieldDescription className="flex flex-col gap-y-6 mb-8 text-center lg:text-left">
            <Logo className="mx-auto lg:mx-0" />
            <h2 className="text-4xl font-semibold tracking-tight text-card-foreground">
              Sign In.
            </h2>
          </FieldDescription>

          <div className="flex flex-col gap-y-4">
            <FieldGroup className="flex flex-col gap-y-4">
              {/* Input de Email */}
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailPending}
                required
              />

              {/* Botão de Email */}
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

              {/* Divisor "ou" com linhas laterais */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-4 text-xs uppercase text-muted-foreground tracking-wider">
                  ou
                </span>
                <div className="flex-grow border-t border-border"></div>
              </div>

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
                      src="/icons/linkeding-svg.svg"
                      alt="Sign in with Linkeding"
                      width={20}
                      height={20}
                    />
                    <span>Sign in with Linkeding</span>
                  </>
                )}
              </Button>

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

              {/* Termos e Políticas */}
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
