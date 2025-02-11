import { SignIn } from "@/actions/authAction";
import { AiFillGoogleSquare } from "react-icons/ai";

export default function SignInGoogle() {
  return (
    <form
      className=" flex justify-center bg-zinc-800  py-3 mb-5  text-white rounded-xl"
      action={SignIn}
    >
      <button type="submit" className="flex items-center " >
        <AiFillGoogleSquare className="mr-2" size={20} />
        Signin with Google
      </button>
    </form>
  );
}
