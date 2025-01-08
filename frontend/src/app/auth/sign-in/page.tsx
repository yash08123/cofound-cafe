'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from 'lucide-react'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto w-full max-w-md">
        <div className="absolute -top-10 text-gray-300">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Welcome back
              </h1>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="relative mt-2">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      className="block w-full rounded-lg border-0 py-3 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="relative mt-2">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="block w-full rounded-lg border-0 py-3 pl-10 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                      <span className="sr-only">
                        {showPassword ? 'Hide password' : 'Show password'}
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/sign-up"
                className="font-semibold leading-6 text-indigo-600 transition-colors hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
