import { RegisterForm } from "@/components/RegisterForm";

const RegisterPage = async () => {
  return (
    <section className="max-lg:p-0 p-6 flex w-scren flex-1 h-screen bg-[#212227] ">
      <div className="bg-[#17191C] flex items-center justify-center px-3 w-full rounded-2xl ">
        <div className="w-[90%] md:w-[60%] lg:w-[40%] ">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
};
export default RegisterPage;
