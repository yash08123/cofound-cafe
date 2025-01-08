import Link from 'next/link'
import { ArrowRight, Code, Rocket, Sparkles, Users, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#4f46e5,#0ea5e9)] opacity-20" />
        <div
          className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50/10 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div className="text-center">
            <h1 className="animate-fade-up bg-gradient-to-br from-white to-gray-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Tech Co-Founder
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Connect with talented developers or visionary founders to bring your startup ideas to life.
              Join our community of innovators and build the next big thing together.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/auth/sign-up"
                className="group relative inline-flex items-center gap-x-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-lg transition hover:bg-white/20"
              >
                Sign Up as Founder
                <Rocket className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/auth/sign-in"
                className="group inline-flex items-center gap-x-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                Sign In as Developer
                <Code className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join our platform in three simple steps and start building your dream team today.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  icon: Sparkles,
                  name: 'List Your Ideas',
                  description:
                    'Startup founders can create and list their ideas, detailing the required skills and compensation.',
                },
                {
                  icon: Users,
                  name: 'Connect with Talent',
                  description:
                    'Developers browse ideas and apply with personalized pitches and portfolios.',
                },
                {
                  icon: Zap,
                  name: 'Build Together',
                  description:
                    'Start collaborating immediately through our integrated communication platform.',
                },
              ].map((feature) => (
                <div
                  key={feature.name}
                  className="group relative rounded-2xl bg-white p-8 shadow-md transition-all hover:shadow-xl"
                >
                  <div className="absolute -inset-px rounded-2xl border-2 border-transparent bg-gradient-to-br from-indigo-500 to-blue-500 opacity-0 transition-all group-hover:opacity-10" />
                  <dt className="flex flex-col items-center gap-6">
                    <feature.icon className="h-10 w-10 text-indigo-600" aria-hidden="true" />
                    <div className="text-xl font-semibold leading-7 text-gray-900">{feature.name}</div>
                  </dt>
                  <dd className="mt-4 text-center text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Featured Ideas Section */}
      <section className="relative isolate bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Featured Startup Ideas
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Discover innovative projects seeking talented developers
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {[
              {
                title: 'AI-Powered Healthcare',
                description:
                  'Revolutionary healthcare platform using artificial intelligence for early disease detection.',
                skills: ['Machine Learning', 'Python', 'Healthcare API'],
                compensation: 'Equity + Salary',
              },
              {
                title: 'Sustainable Energy Platform',
                description: 'Building the future of renewable energy management and distribution.',
                skills: ['IoT', 'Blockchain', 'React'],
                compensation: 'Equity',
              },
              {
                title: 'EdTech Innovation',
                description: 'Transforming online education with personalized learning paths.',
                skills: ['React Native', 'Node.js', 'AWS'],
                compensation: 'Competitive Salary',
              },
            ].map((idea) => (
              <div
                key={idea.title}
                className="group relative isolate flex flex-col justify-between overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-16 shadow-2xl"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-500/20 via-transparent" />
                <div>
                  <h3 className="mt-3 text-2xl font-bold leading-6 tracking-tight text-white">
                    {idea.title}
                  </h3>
                  <p className="mt-6 text-sm leading-6 text-gray-300">{idea.description}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {idea.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <p className="text-sm text-gray-300">{idea.compensation}</p>
                  <Link
                    href="/dashboard/ideas"
                    className="group/link inline-flex items-center gap-x-1 text-sm font-medium text-white"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Start Your Journey?
              <br />
              Join our community today.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Connect with talented developers and visionary founders. Build something amazing together.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/auth/sign-up"
                className="group relative inline-flex items-center gap-x-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get Started Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <Link href="/" className="text-xl font-bold text-white">
                Startup Connect
              </Link>
              <p className="text-sm leading-6 text-gray-300">
                Connecting visionary founders with talented developers.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">Quick Links</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {['About Us', 'How It Works', 'Success Stories'].map((item) => (
                      <li key={item}>
                        <Link href="#" className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">Resources</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {['Blog', 'FAQ', 'Support'].map((item) => (
                      <li key={item}>
                        <Link href="#" className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {['Privacy Policy', 'Terms of Service'].map((item) => (
                      <li key={item}>
                        <Link href="#" className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-400">
              &copy; {new Date().getFullYear()} Startup Connect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

