import { useNavigation } from '@react-navigation/native'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'

import Input from '../ui/inputs/input'
import Button from '../ui/buttons/button'
import Checkbox from '../ui/inputs/checkbox';
import { commonButton, textWhiteBtn, whiteBtn } from '../../../utils/global.style'
import { mobileMask, zipCodeMask } from '../../../utils/masks'

const validationSchema = yup.object().shape({
  email: yup.string().matches(/\S+@\S+\.\S+/, 'Informe email válido').required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatório"),
})
const signUpValidationSchema = validationSchema.shape({
  name: yup.string().required("Nome é obrigatório"),
  mobile: yup.string().required("Número é obrigatório"),
  address: yup.object({
    street: yup.string().required("Rua é obrigatório"),
    neighborhood: yup.string().required("Bairro é obrigatório"),
    city: yup.string().required("Cidade é obrigatório"),
    state: yup.string().required("Estado é obrigatório"),
    number: yup.string().optional(),
    zipCode: yup.string().required("CEP é obrigatório"),
    complement: yup.string().optional(),
  }).required("Endereço é orbigatório"),
  terms: yup.bool().required("Termos é obrigatório"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Senhas devem ser iguais').required("Confirma senha é obrigatório"),
})
const initialValues = { email: "", password: "" }
const signUpInitialValues = {
  name: "", mobile: "",
  address: {
    street: "", neighborhood: "", city: "", state: "", number: "", zipCode: "", complement: ""
  },
  terms: "", confirmPassword: "" }

const FormLogin = ({ isLogin, action }) => {
  const navigation = useNavigation()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: isLogin ? initialValues : { ...initialValues, ...signUpInitialValues },
    validationSchema: isLogin ? validationSchema : signUpValidationSchema
  })
  return (
    <View>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} className="max-h-[350px]">
        {!isLogin && (
          <>
            <Text className="text-white font-semibold text-sm">Informações Pessoais</Text>
            <View className="mb-[10px]">
              <Input icon="person" label="Nome" placeholder="Nome" value={formik.values.name} onChangeText={formik.handleChange('name')} onBlur={formik.handleBlur('name')} />
              {formik.errors.name && formik.touched.name && (
                <Text className="text-red-500 text-sm">{formik.errors.name}</Text>
              )}
            </View>
          </>
        )}

        <View className="mb-[10px]">
          <Input icon="email" label="Email" placeholder="Email" keyboardType="email-address" value={formik.values.email} onChangeText={formik.handleChange('email')} onBlur={formik.handleBlur('email')} />
          {formik.errors.email && formik.touched.email && (
            <Text className="text-red-500 text-sm">{formik.errors.email}</Text>
          )}
        </View>

        {!isLogin && (
          <>
            <View className="mb-[10px]">
              <Input icon="phone" label="WhatsApp" placeholder="WhatsApp" keyboardType="phone-pad" value={formik.values.mobile} onChangeText={(e) => formik.setFieldValue('mobile', mobileMask(e))} onBlur={formik.handleBlur('mobile')} />
              {formik.errors.mobile && formik.touched.mobile && (
                <Text className="text-red-500 text-sm">{formik.errors.mobile}</Text>
              )}
            </View>

            <Text className="text-white font-semibold text-sm">Informações de Endereço</Text>
            <View className="mb-[10px]">
              <Input icon="my-location" label="Rua" placeholder="Rua" value={formik.values?.address?.street} onChangeText={formik.handleChange('address.street')} onBlur={formik.handleBlur('address.street')} />
              {formik.errors?.address?.street && formik.touched?.address?.street && (
                <Text className="text-red-500 text-sm">{formik.errors.address.street}</Text>
              )}
            </View>

            <View className="mb-[10px]">
              <Input icon="location-on" label="Bairro" placeholder="Bairro" value={formik.values?.address?.neighborhood} onChangeText={formik.handleChange('address.neighborhood')} onBlur={formik.handleBlur('address.neighborhood')} />
              {formik.errors?.address?.neighborhood && formik.touched?.address?.neighborhood && (
                <Text className="text-red-500 text-sm">{formik.errors?.address?.neighborhood}</Text>
              )}
            </View>

            <View className="mb-[10px]">
              <Input icon="location-city" label="Cidade" placeholder="Cidade" value={formik.values?.address?.city} onChangeText={formik.handleChange('address.city')} onBlur={formik.handleBlur('address.city')} />
              {formik.errors?.address?.city && formik.touched?.address?.city && (
                <Text className="text-red-500 text-sm">{formik.errors?.address?.city}</Text>
              )}
            </View>

            <View className="mb-[10px]">
              <Input icon="map" label="Estado" placeholder="Estado" value={formik.values?.address?.state} onChangeText={formik.handleChange('address.state')} onBlur={formik.handleBlur('address.state')} />
              {formik.errors?.address?.state && formik.touched?.address?.state && (
                <Text className="text-red-500 text-sm">{formik.errors?.address?.state}</Text>
              )}
            </View>

            <View className="mb-[10px]">
              <Input icon="confirmation-number" label="Número" placeholder="Número" value={formik.values.number} onChangeText={formik.handleChange('number')} onBlur={formik.handleBlur('number')} />
              {formik.errors.number && formik.touched.number && (
                <Text className="text-red-500 text-sm">{formik.errors.number}</Text>
              )}
            </View>

            <View className="mb-[10px]">
              <Input icon="code" label="CEP" placeholder="CEP" keyboardType="phone-pad" value={formik.values?.address?.zipCode} onChangeText={(e) => formik.setFieldValue('address.zipCode', zipCodeMask(e))} onBlur={formik.handleBlur('address.zipCode')} />
              {formik.errors?.address?.zipCode && formik.touched?.address?.zipCode && (
                <Text className="text-red-500 text-sm">{formik.errors?.address?.zipCode}</Text>
              )}
            </View>

            <View className="mb-[10px]">
              <Input icon="format-list-numbered" label="Complemento" placeholder="Complemento" value={formik.values?.address?.complement} onChangeText={formik.handleChange('address.complement')} onBlur={formik.handleBlur('address.complement')} />
              {formik.errors?.address?.complement && formik.touched?.address?.complement && (
                <Text className="text-red-500 text-sm">{formik.errors?.address?.complement}</Text>
              )}
            </View>
          </>
        )}

        {!isLogin && <Text className="text-white font-semibold text-sm">Informações de Segurança</Text>}
        <View>
          <Input icon="lock" label="Senha" placeholder="Senha" value={formik.values.password} onChangeText={formik.handleChange('password')} onBlur={formik.handleBlur('password')} secureTextEntry />
          {formik.errors.password && formik.touched.password && (
            <Text className="text-red-500 text-sm">{formik.errors.password}</Text>
          )}
        </View>

        {!isLogin && (
          <>
            <View className="mt-[10px]">
              <Input icon="shield" label="Repetir senha" placeholder="Repetir senha" value={formik.values.confirmPassword} onChangeText={formik.handleChange('confirmPassword')} onBlur={formik.handleBlur('confirmPassword')} secureTextEntry />
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <Text className="text-red-500 text-sm">{formik.errors.confirmPassword}</Text>
              )}
            </View>
            <TouchableOpacity activeOpacity={0.7} className="p-3 my-[30px] bg-brand-primary">
              <Text className="text-white font-semibold text-sm text-center">Termos de uso e privacidade</Text>
            </TouchableOpacity>
            <Checkbox label="Aceito os termos acima" checked={formik.values.terms} onPress={() => formik.setFieldValue('terms', !formik.values.terms)} />
            {formik.errors.terms && formik.touched.terms && (
              <Text className="text-red-500 text-sm">{formik.errors.terms}</Text>
            )}
          </>
        )}

        <Button onPress={formik.handleSubmit} disabled={!formik.isValid} className={`${commonButton} ${whiteBtn} mx-auto w-[160px] mt-[30px]`} text={action} textClassName={textWhiteBtn} />
      </ScrollView>
      {isLogin && (
        <View className="flex items-center flex-row justify-center space-x-1 mt-[20px]">
          <Text className="text-sm text-gray-200">Esqueceu sua senha?</Text>
          <Text className="text-sm text-gray-200 font-semibold" onPress={() => {
            navigation.navigate('recovery')
            formik.resetForm()
          }}>Recuperar</Text>
        </View>
      )}
    </View>
  )
}

export default FormLogin
