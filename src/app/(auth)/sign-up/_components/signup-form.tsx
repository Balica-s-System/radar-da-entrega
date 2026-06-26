import Link from "next/link";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SocialButtonLogin } from "../../sign-in/_components/social-button-login";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full max-w-4xl mx-auto text-foreground",
        className,
      )}
      {...props}
    >
      <form>
        <Field>
          <FieldDescription className="flex flex-col gap-y-6 mb-8">
            <Logo />
            <h2 className="text-4xl font-semibold tracking-tight text-card-foreground">
              Sign Up.
            </h2>
          </FieldDescription>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
            <div className="flex flex-col flex-1 justify-between">
              <FieldGroup className="flex flex-col gap-y-4">
                <Input
                  className="p-5 bg-transparent border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                  placeholder="Email*"
                />
                <Input
                  className="p-5 bg-transparent border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                  type="password"
                  placeholder="Enter your password*"
                />

                <Button className="w-full p-6 mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-md">
                  Register
                </Button>
              </FieldGroup>

              <div className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-foreground hover:underline font-medium"
                >
                  Sign In
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Separator
                orientation="horizontal"
                className="block lg:hidden w-full h-px bg-border"
              />
              <Separator
                orientation="vertical"
                className="hidden lg:block h-full min-h-55 w-px bg-border"
              />
            </div>

            <div className="flex flex-col flex-1 justify-between gap-y-6">
              <div className="flex flex-col gap-y-3 justify-center">
                <SocialButtonLogin
                  label="Sign in with Google"
                  src="/icons/google-svg.svg"
                />
                <SocialButtonLogin
                  label="Sign in with Linkeding"
                  src="/icons/linkeding-svg.svg"
                />
                <SocialButtonLogin
                  label="Sign in with Apple"
                  src="/icons/apple-icon.svg"
                />
              </div>

              <div className="text-center text-xs leading-relaxed text-muted-foreground max-w-sm mx-auto">
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
                  policy Services
                </Link>
              </div>
            </div>
          </div>
        </Field>
      </form>
    </div>
  );
}
