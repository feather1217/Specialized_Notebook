import SignUpForm from "../../components/from/signup_from";

export default function SignUpPage() {
  return <div className="flex flex-col items-center justify-center h-screen">
  <SignUpForm />
  <span className="mt-6 text-gray-600">已有帳號 ? 點此 <a href="/signin" className="text-[#1bb4a7]">登入</a></span>
</div>;
}
