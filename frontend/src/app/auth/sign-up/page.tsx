'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Code, Eye, EyeOff, Lock, Mail, Phone, Rocket, User } from 'lucide-react'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<'founder' | 'developer' | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

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
          <div className="border-b border-gray-200">
            <div className="grid grid-cols-2">
              <button
                onClick={() => setUserType('founder')}
                className={`flex items-center justify-center gap-2 px-4 py-5 text-sm font-medium transition-colors ${userType === 'founder' ? 'bg-gray-50 text-indigo-600' : 'hover:bg-gray-50 hover:text-indigo-600'}`}
              >
                <Rocket className="h-4 w-4" />
                Join as Founder
              </button>
              <button
                onClick={() => setUserType('developer')}
                className={`flex items-center justify-center gap-2 px-4 py-5 text-sm font-medium transition-colors ${userType === 'developer' ? 'bg-gray-50 text-indigo-600' : 'hover:bg-gray-50 hover:text-indigo-600'}`}
              >
                <Code className="h-4 w-4" />
                Join as Developer
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Create Account
              </h1>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {userType
                  ? `Sign up as a ${userType} and start your journey`
                  : 'Choose your role to get started'}
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Full Name
                  </label>
                  <div className="relative mt-2">
                    <User className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email Address
                  </label>
                  <div className="relative mt-2">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone Number
                  </label>
                  <div className="relative mt-2">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="relative mt-2">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Your password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    href="/auth/sign-in"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Already have an account? Sign in
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {userType ? `Sign Up as ${userType.charAt(0).toUpperCase() + userType.slice(1)}` : 'Select a role to sign up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
