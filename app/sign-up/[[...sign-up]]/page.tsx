import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="h-full bg-slate-500 grid place-content-center">
      <SignUp afterSignUpUrl={"/home"} />
    </section>
  );
}
