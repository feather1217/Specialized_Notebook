import SignInForm from "../../components/from/signin_from";

export default function SignInPage() {
  return(
    <div className="flex flex-col items-center justify-center h-screen">
      <SignInForm />
      <span className="mt-6 text-gray-600">還沒有帳號？ 點此 <a href="/signup" className="text-[#1bb4a7]">註冊</a></span>
    </div>
  );
}
