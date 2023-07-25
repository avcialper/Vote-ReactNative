import * as yup from 'yup'

const loginValidationsSchema = yup.object().shape({
    email: yup
        .string()
        .email('Geçerli bir mail adresi giriniz.')
        .required('Bu alan boş bırakılamaz.'),
    password: yup
        .string()
        .min(6, ({ min }) => `Şifre en az ${min} karakter uzunluğunda olmalıdır.`)
        .required('Bu alan boş bırakılamaz.')
})

const registerValidationsSchema = yup.object({
    email: yup
        .string()
        .email('Geçerli bir mail adresi giriniz.')
        .required('Bu alan boş bırakılamaz.'),
    password: yup
        .string()
        .min(6, ({ min }) => `Şifre en az ${min} karakter uzunluğunda olmalıdır.`)
        .required('Bu alan boş bırakılamaz.'),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Şifreler eşleşmemektedir.')
        .required('Bu alan boş bırakılamaz.')
})

export { loginValidationsSchema, registerValidationsSchema }
