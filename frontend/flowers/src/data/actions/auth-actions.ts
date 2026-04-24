'use server';
import { cookies } from 'next/headers';
import { SigninFormSchema, SignupFormSchema } from '@/data/validation/auth';
import type { FormState } from '@/types/FormState';
import { z } from 'zod';

import { isAuthError, loginUserService, registerUserService } from '../services/auth';

const config = {
  maxAge: 60 * 60 * 24 * 7,
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
};

const clientAuthStateCookie = {
  maxAge: 60 * 60 * 24 * 7,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
};

export async function registerUserAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const fields = {
    username: formData.get('username'),
    password: formData.get('password'),
    email: formData.get('email'),
  };
  const validatedFields = SignupFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);
    return {
      ...prevState,
      success: false,
      data: {
        ...prevState.data,
        username: String(fields.username ?? ''),
        email: String(fields.email ?? ''),
      },
      zodErrors: flattenedErrors.fieldErrors,
      strapiErrors: null,
      message: 'Validation failed.',
    };
  }

  const responseData = await registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      success: false,
      strapiErrors: null,
      zodErrors: null,
      message: 'Could not reach Strapi. Please make sure the backend is running.',
    };
  }

  if (isAuthError(responseData)) {
    return {
      ...prevState,
      success: false,
      strapiErrors: {
        ...responseData.error,
        details: responseData.error.details ?? undefined,
      },
      zodErrors: null,
      message: 'Failed to Register.',
    };
  }

  const cookieStore = await cookies();
  cookieStore.set('jwt', responseData.jwt, config);
  cookieStore.set('logged-in', 'true', clientAuthStateCookie);

  return {
    success: true,
    message: 'User registration successful.',
    strapiErrors: null,
    zodErrors: null,
    data: {
      username: validatedFields.data.username,
      email: validatedFields.data.email,
    },
    jwt: responseData.jwt,
  };
}

export async function loginUserAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const fields = {
    identifier: formData.get('identifier'),
    password: formData.get('password'),
  };
  const validatedFields = SigninFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);
    return {
      ...prevState,
      success: false,
      data: {
        ...prevState.data,
        identifier: String(fields.identifier ?? ''),
      },
      zodErrors: flattenedErrors.fieldErrors,
      strapiErrors: null,
      message: 'Validation failed.',
    };
  }

  const responseData = await loginUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      success: false,
      strapiErrors: null,
      zodErrors: null,
      message: 'Could not reach Strapi. Please make sure the backend is running.',
    };
  }

  if (isAuthError(responseData)) {
    return {
      ...prevState,
      success: false,
      strapiErrors: {
        ...responseData.error,
        details: responseData.error.details ?? undefined,
      },
      zodErrors: null,
      message: 'Failed to Login.',
    };
  }

  const cookieStore = await cookies();
  cookieStore.set('jwt', responseData.jwt, config);
  cookieStore.set('logged-in', 'true', clientAuthStateCookie);

  return {
    success: true,
    message: 'Login successful.',
    strapiErrors: null,
    zodErrors: null,
    data: {
      identifier: validatedFields.data.identifier,
    },
    jwt: responseData.jwt,
  };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set('jwt', '', { ...config, maxAge: 0 });
  cookieStore.set('logged-in', '', { ...clientAuthStateCookie, maxAge: 0 });
}
