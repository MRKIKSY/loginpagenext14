//app\register\Form.tsx
'use client'
import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SuspenseBoundary = ({ children }: { children: React.ReactNode }) => (
  <React.Suspense fallback={<div>Loading...</div>}>
    {children}
  </React.Suspense>
);

const Form = () => {
  const router = useRouter();
  let callbackUrl = '/'; // default value

  return (
    <SuspenseBoundary>
      <InnerForm router={router} callbackUrl={callbackUrl} />
    </SuspenseBoundary>
  );
};

const InnerForm = ({ router, callbackUrl }: { router: any; callbackUrl: string }) => {
  const params = useSearchParams();
  callbackUrl = params.get('callbackUrl') || callbackUrl;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      console.log(res);
      console.log('Success login');
      if (res.ok) {
        return router.push(
          `/signin?callbackUrl=${callbackUrl}&success=Account has been created`
        );
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (err: any) {
      const error =
        err.message && err.message.indexOf('E11000') === 0
          ? 'Email is duplicate'
          : err.message;
      toast.error(error || 'error');
    }
  };

  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="font-bold py-10 text-2xl">NEXT JS USER INTERFACE 14 </h1>
        <br></br>
        <h6></h6>
        This registration form was built<br></br> by AKINOLA SAMUEL ELUYEFA
        <br></br> with the Javascript library framework<br></br> NextJs version 14.0
        <br></br> The user registration details <br></br> are stored via MongoDB.
        <h6 />
        <br></br>
        <br></br>
        User Registration
      </div>
      <div className="max-w-sm mx-auto card bg-base-300 my-4">
        <div className="card-body">
          <h1 className="card-title">Register</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="my-2">
              <label className="label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name', {
                  required: 'Name is required',
                })}
                className="input input-bordered w-full max-w-sm"
              />
              {errors.name?.message && (
                <div className="text-error">{errors.name.message}</div>
              )}
            </div>
            <div className="my-2">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: 'Email is invalid',
                  },
                })}
                className="input input-bordered w-full max-w-sm"
              />
              {errors.email?.message && (
                <div className="text-error"> {errors.email.message}</div>
              )}
            </div>
            <div className="my-2">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register('password', {
                  required: 'Password is required',
                })}
                className="input input-bordered w-full max-w-sm"
              />
              {errors.password?.message && (
                <div className="text-error">{errors.password.message}</div>
              )}
            </div>
            <div className="my-2">
              <label className="label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || 'Passwords should match!';
                  },
                })}
                className="input input-bordered w-full max-w-sm"
              />
              {errors.confirmPassword?.message && (
                <div className="text-error">{errors.confirmPassword.message}</div>
              )}
            </div>
            <div className="my-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
                Register
              </button>
            </div>
          </form>

          <div className="divider"> </div>
          <div>
            Already have an account?{' '}
            <Link className="link" href={`/signin?callbackUrl=${callbackUrl}`}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
