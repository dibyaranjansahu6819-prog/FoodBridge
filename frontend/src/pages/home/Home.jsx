import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="border-b bg-white/90 px-6 py-4 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="text-2xl font-bold text-green-600"
          >
            FoodBridge
          </Link>

          {/* Login / Register */}

          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="rounded-lg border border-green-600 px-5 py-2.5 font-medium text-green-600 transition hover:bg-green-50"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700"
            >
              Register
            </Link>

          </div>

        </div>
      </nav>


      {/* =========================
          HERO SECTION
      ========================= */}

      <main>

        <section className="mx-auto max-w-7xl px-6 py-20">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* LEFT SIDE */}

            <div>

              <div className="mb-5 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                Connecting food with people
              </div>


              <h1 className="text-5xl font-extrabold leading-tight text-gray-900 md:text-6xl">

                Share Food.

                <span className="block text-green-600">
                  Reduce Waste.
                </span>

                Help Communities.

              </h1>


              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">

                FoodBridge connects food donors with
                NGOs so that surplus food can reach
                people who need it instead of being
                wasted.

              </p>


              {/* HERO BUTTONS */}

              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  to="/register"
                  className="rounded-lg bg-green-600 px-6 py-3.5 font-semibold text-white shadow transition hover:bg-green-700"
                >
                  Get Started
                </Link>


                <Link
                  to="/login"
                  className="rounded-lg border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Login
                </Link>

              </div>

            </div>


            {/* RIGHT SIDE */}

            <div className="flex justify-center">

              <div className="relative flex h-80 w-full max-w-lg items-center justify-center rounded-3xl bg-green-600 shadow-2xl">

                <div className="text-center text-white">

                  <div className="text-8xl">
                    🍱
                  </div>

                  <h2 className="mt-5 text-3xl font-bold">
                    FoodBridge
                  </h2>

                  <p className="mt-2 text-green-100">
                    Food should reach people,
                    not landfills.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            FEATURES
        ========================= */}

        <section className="bg-white px-6 py-20">

          <div className="mx-auto max-w-7xl">

            <div className="text-center">

              <h2 className="text-3xl font-bold text-gray-900">
                How FoodBridge Works
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-gray-500">

                A simple platform connecting surplus
                food with organizations that can
                distribute it.

              </p>

            </div>


            {/* FEATURE CARDS */}

            <div className="mt-12 grid gap-8 md:grid-cols-3">


              {/* DONATE */}

              <div className="rounded-2xl bg-green-50 p-8 text-center transition hover:shadow-lg">

                <div className="text-5xl">
                  🍲
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  Donate Food
                </h3>

                <p className="mt-3 text-gray-600">

                  Donors can list surplus food with
                  quantity, pickup time, and location.

                </p>

              </div>


              {/* NGO */}

              <div className="rounded-2xl bg-blue-50 p-8 text-center transition hover:shadow-lg">

                <div className="text-5xl">
                  🏢
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  NGOs Find Food
                </h3>

                <p className="mt-3 text-gray-600">

                  NGOs can discover available food
                  donations and reserve them.

                </p>

              </div>


              {/* IMPACT */}

              <div className="rounded-2xl bg-yellow-50 p-8 text-center transition hover:shadow-lg">

                <div className="text-5xl">
                  ❤️
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  Make an Impact
                </h3>

                <p className="mt-3 text-gray-600">

                  Food reaches communities instead of
                  becoming unnecessary waste.

                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            CALL TO ACTION
        ========================= */}

        <section className="bg-green-700 px-6 py-20">

          <div className="mx-auto max-w-4xl text-center text-white">

            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to Make a Difference?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-green-100">

              Join FoodBridge and help connect
              surplus food with communities that
              need it.

            </p>


            <div className="mt-8 flex justify-center gap-4">

              <Link
                to="/register"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
              >
                Create Account
              </Link>

              <Link
                to="/login"
                className="rounded-lg border border-white px-6 py-3 font-semibold text-white transition hover:bg-green-600"
              >
                Login
              </Link>

            </div>

          </div>

        </section>


        {/* =========================
            FOOTER
        ========================= */}

        <footer className="bg-gray-900 px-6 py-8 text-center text-gray-400">

          <p>
            © 2026 FoodBridge. Connecting food
            with communities.
          </p>

        </footer>

      </main>

    </div>
  );
}

export default Home;