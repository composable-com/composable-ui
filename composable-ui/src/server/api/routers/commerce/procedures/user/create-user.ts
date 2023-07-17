import { z } from 'zod'
import { publicProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'
import {
  lowercaseLettersRegex,
  nameRegex,
  numbersRegex,
  specialCharacterRegex,
  uppercaseLettersRegex,
} from 'utils/regex'
import { PASSWORD_MIN_LENGTH } from 'utils/constants'

export const createUser = publicProcedure
  .input(
    z.object({
      firstName: z
        .string()
        .nonempty('validation.firstNameRequired')
        .refine(
          (value) => nameRegex.test(value),
          'validation.pleaseEnterAValidName'
        ),

      lastName: z
        .string()
        .nonempty('validation.lastNameRequired')
        .refine(
          (value) => nameRegex.test(value),
          'validation.pleaseEnterAValidName'
        ),

      email: z
        .string()
        .nonempty('validation.emailRequired')
        .email('validation.emailValid'),

      password: z
        .string()
        .nonempty('validation.passwordRequired')
        .min(PASSWORD_MIN_LENGTH, 'validation.passwordMinLength')
        .refine(
          (value) => lowercaseLettersRegex.test(value),
          'validation.passwordLowercase'
        )
        .refine(
          (value) => uppercaseLettersRegex.test(value),
          'validation.passwordUppercase'
        )
        .refine(
          (value) => numbersRegex.test(value),
          'validation.passwordNumbers'
        )
        .refine(
          (value) => specialCharacterRegex.test(value),
          'validation.passwordSpecialCharacter'
        ),
    })
  )
  .mutation(async ({ input }) => {
    return await commerce.createUser({ ...input })
  })
