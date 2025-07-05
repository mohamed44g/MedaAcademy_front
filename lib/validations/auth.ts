import * as Yup from "yup";

// Login validation schema
export const loginSchema = Yup.object({
  email: Yup.string()
    .email("البريد الإلكتروني غير صحيح")
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
});

// Register validation schema
export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, "الاسم الأول يجب أن يكون حرفين على الأقل")
    .max(50, "الاسم الأول لا يجب أن يزيد عن 50 حرف")
    .required("الاسم الأول مطلوب"),
  email: Yup.string()
    .email("البريد الإلكتروني غير صحيح")
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم"
    )
    .required("كلمة المرور مطلوبة"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة")
    .required("تأكيد كلمة المرور مطلوب"),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]+$/, "رقم الهاتف غير صحيح")
    .optional(),
  specialization: Yup.string().optional(),
});

// Forgot password validation schema
export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("البريد الإلكتروني غير صحيح")
    .required("البريد الإلكتروني مطلوب"),
});

// Reset password validation schema
export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم"
    )
    .required("كلمة المرور مطلوبة"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة")
    .required("تأكيد كلمة المرور مطلوب"),
});
