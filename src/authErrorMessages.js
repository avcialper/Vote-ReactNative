export function authErrors(errorCode) {
    const errorMessages = {
        "auth/invalid-email": "Geçersiz e-posta.",
        "auth/user-disabled": "Devre dışı bırakılmış kullanıcı.",
        "auth/user-not-found": "Kayıtlı kullanıcı bulunamadı.",
        "auth/wrong-password": "Hatalı şifre.",
        "auth/email-already-in-use": "Kayıtlı kullanıcı.",
        "auth/weak-password": "Zayıf parola.",
        "auth/operation-not-allowed": "Geçrsiz kimlik doğrulama.",
        "auth/invalid-credential": "Sağlanan kimlik bilgisi hatalı biçimlendirilmiş veya süresi dolmuş.",
        "auth/account-exists-with-different-credential": "Aynı e-posta adresine ancak farklı oturum açma kimlik bilgilerine sahip bir hesap zaten var.",
        "auth/invalid-verification-code": "Geçrsiz doğrulama kodu.",
        "auth/invalid-verification-id": "Geçersiz ID."
    }
    return errorMessages[errorCode] || 'Unknow eroor.'
}