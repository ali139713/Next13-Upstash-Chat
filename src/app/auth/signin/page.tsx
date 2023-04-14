import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

const SignIn = async () => {
  const providers = await getProviders();

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <Image
          className="rounded-full mx-2 object-cover"
          width={700}
          height={700}
          src="https://links.papareact.com/161"
          alt="Profile Picture"
        />
      </div>
      <SignInComponent providers={providers} />
    </div>
  );
};

export default SignIn;
