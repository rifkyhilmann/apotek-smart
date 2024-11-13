import { IconsLogo } from "@/assets"
import ButtonSubmit from "@/components/ui/Button/ButtonSubmit"
import InputField from "@/components/ui/Input/InputField"
import useLogin from "@/hooks/useAuth"

export const Login = () => {
    const {
        emailValue,
        setEmailValue,
        passwordValue,
        setPasswordValue,
        spinLoading,
        handleSubmit, 
    } = useLogin();

    return (
        <div className={`w-full h-screen flex items-center justify-center bg-gray-100 font-poppins`}>
            <div className="w-[350px] h-max min-h-[350px] rounded shadow-xl flex flex-col items-center py-6 px-7 bg-white">
                <div className="flex items-center gap-3">
                    <img src={IconsLogo} className="h-12 w-12" alt="" />
                    <p className="text-2xl font-pridi font-bold text-[#0255a3]">Apotek Smart</p>
                </div>
                <div className="flex flex-col items-center mt-5 mb-2">
                    <p className="text-xl font-bold ">Welcome Back!</p>
                    <p className="text-xs">Sign in to continue</p>
                </div>
                
                <div className="w-full h-max flex flex-col items-center gap-3 mt-2">
                    <InputField
                        title="Name"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                    />
                    <InputField
                        title="Password"
                        type="password"
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                    />
                    <div className="mt-5 mb-10 h-max w-full">
                        <ButtonSubmit 
                            isLoading={spinLoading}
                            onClick={handleSubmit}
                            title="Sign in"
                        />
                    </div>
                    <p className="text-xs font-medium text-[#0255a3]">@zerivo.technology</p>
                </div>
            </div>
        </div>
    )
}
