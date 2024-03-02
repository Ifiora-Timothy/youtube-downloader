"use client";
import {
    AlertCircle,
    ArrowRightIcon,
    Eye,
    EyeOff,
    Loader2,
    LockKeyhole,
    MailOpen,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import CustomInput from "../UI/CustomInput";
import { trpc } from "../_trpc/client";

export interface login {
  email: string;
  password: string;
}

const Login = () => {
  const [errorMessage, dispatch] = useFormState(Authenticate, undefined);
  const [form, setForm] = useState<login>({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const origin = searchParams.get("origin");

  const mutation = trpc.authLogin.useMutation({
    onSuccess: async (e) => {
      toast.success("Logged in successfully");
      router.refresh();
      origin ? router.push(`${origin}`) : router.push("/choices");
    },
    onError: async (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error(err.message);
      }
    },
  });

  //handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  interface Error {
    email?: string;
    password?: string;
  }

  async function Authenticate(
    prevState:
      | { email: string | undefined; password: string | undefined }
      | undefined,
    formData: FormData
  ) {
    setTimeout(() => {}, 2000);
    /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
    const formValidate = () => {
      let err: Error = {};

      if (!formData.get("email")) err.email = "email is required";
      if (!formData.get("password")) err.password = "password is required";
      return err;
    };

    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      mutation.mutate({ email, password });

      const res = mutation.data;
    } else {
      return { email: errs?.email, password: errs?.password };
    }
  }
  //TODO: check in realtime if the username or email already exist using server actions befro the suer is actually signed up
  //TODO:add refresh token functionality
  //TODO:make the loading spinner keep loadin until the login is finished
  return (
    <form className="flex items-center flex-col" action={dispatch}>
      <div className="w-[276px]  text-gray-900 flex items-center justify-center flex-col gap-4 mt-3">
        <CustomInput
          placeholder="email@example.com"
          Icon={() => <MailOpen />}
          name="email"
          type="email"
          isDouble={false}
          onChange={handleChange}
        />

        {errorMessage?.email && (
          <div className="flex items-start -mt-[14px] ml-3">
            <AlertCircle className="text-xs h-3 w-4  text-opacity-90 text-red-500" />
            <p className="text-[10px] truncate text-opacity-90  text-red-500">
              {errorMessage.email}
            </p>
          </div>
        )}

        <CustomInput
          placeholder="Password"
          name="password"
          IconOpen={() => <Eye className="cursor-pointer " />}
          IconClose={() => <EyeOff className="cursor-pointer " />}
          Icon={() => <LockKeyhole />}
          type="password"
          isDouble={true}
          setIsPasswordVisible={setIsPasswordVisible}
          onChange={handleChange}
          isPasswordVisible={isPasswordVisible}
        />
        {errorMessage?.password && (
          <div className="flex items-start -mt-[14px] ml-3">
            <AlertCircle className="text-xs h-3 w-4  text-opacity-90 text-red-500" />
            <p className="text-[10px] truncate text-opacity-90  text-red-500">
              {errorMessage.password}
            </p>
          </div>
        )}
      </div>
      <div className="pl-6 mt-10 pr-[21px] py-2 bg-gradient-to-b from-purple-700 to-purple-700 rounded-[53px]  shadow shadow-blue-400  drop-shadow-lg justify-center items-center inline-flex">
        <LoginButton isPending={mutation.isPending} />
      </div>
    </form>
  );
};

export default Login;

function LoginButton({ isPending }: { isPending: boolean }) {
  return (
    <button
      type="submit"
      className="text-white items-center flex  text-[10px] font-bold font-['Inter']"
      aria-disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="h-5 w-5 animate-spin text-gray-50 " />
      ) : (
        <>
          <>Log In</>
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </>
      )}
    </button>
  );
}
