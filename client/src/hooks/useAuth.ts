import { Auth } from "@/middlewares/api"
import { showDialog, showToast } from "@/utils/alertUtils"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const useLogin = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [spinLoading, setSpinLoading] = useState(false);
    const navigate = useNavigate()

    const fetchSign = async () => {
        try {
            const response = await Auth.Login(emailValue, passwordValue)

            if(response.status === 200) {
                showToast('success', 'Sign in Success');
                navigate('/pages');
            }
        } catch (error : any) {
            if (error.response.status === 400) {
                showDialog('error', 'Invalid Login', "Email or password incorrect");
            } else {
                showDialog('error', 'Error Server');
            }
        }
    }

    const handleSubmit = () => {
        if (!emailValue && !passwordValue) {
            showDialog('error', 'Error', 'Name dan password tidak boleh kosong')
        } else {
            setSpinLoading(true)
            setTimeout(() => {
                setSpinLoading(false)
                fetchSign();
                setEmailValue('')
                setPasswordValue('')
            }, 2000)
        }
    };

    return {
        emailValue,
        setEmailValue,
        passwordValue,
        setPasswordValue,
        spinLoading,
        handleSubmit,  
    };
};

export default useLogin