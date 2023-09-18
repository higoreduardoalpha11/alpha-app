import { ScrollView, Text, View } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'

import Input from '../ui/inputs/input'
import Button from '../ui/buttons/button'
import { commonButton, textWhiteBtn, whiteBtn } from '../../../utils/global.style'

const validationSchema = yup.object().shape({
  email: yup.string().required("Email é obrigatório"),
})
const validationPasswordSchema = yup.object().shape({
  newPassword: yup.string().required("Senha nova é obrigatório"),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Senhas devem ser iguais').required("Confirma senha nova é obrigatório"),
  token: yup.string().required("Token é obrigatório"),
});
const initialValues = { email: "" }
const initialPasswordValues = { newPassword: "", confirmPassword: "", token: "" }

const FormRecoveryPassword = ({ action, isResetPassword }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: !isResetPassword ? initialValues : initialPasswordValues,
    validationSchema: !isResetPassword ? validationSchema : validationPasswordSchema
  })

  return (
    <View>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} className="max-h-[350px]">
        {!isResetPassword ? (
          <View className="mb-[10px]">
            <Input icon="email" label="Email" placeholder="Email" keyboardType="email-address" value={formik.values.email} onChangeText={formik.handleChange('email')} onBlur={formik.handleBlur('email')} />
            {formik.errors.email && formik.touched.email && (
              <Text className="text-red-500 text-sm">{formik.errors.email}</Text>
            )}
          </View>
        ) : (
          <>
            <View className="mb-[10px]">
              <Input icon="lock" label="Nova senha" placeholder="Nova senha" value={formik.values.newPassword} onChangeText={formik.handleChange('newPassword')} onBlur={formik.handleBlur('newPassword')} secureTextEntry />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <Text className="text-red-500 text-sm">{formik.errors.newPassword}</Text>
              )}
            </View>
            <View>
              <Input icon="shield" label="Repetir senha" placeholder="Repetir senha" value={formik.values.confirmPassword} onChangeText={formik.handleChange('confirmPassword')} onBlur={formik.handleBlur('confirmPassword')} secureTextEntry />
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <Text className="text-red-500 text-sm">{formik.errors.confirmPassword}</Text>
              )}
            </View>
          </>
        )
        }

        <Button onPress={formik.handleSubmit} disabled={!formik.isValid} className={`${commonButton} ${whiteBtn} mx-auto w-[160px] mt-[30px]`} text={action} textClassName={textWhiteBtn} />
      </ScrollView>
    </View>
  )
}

export default FormRecoveryPassword
