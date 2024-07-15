import NewProduct from "@/components/newProduct/NewProduct";
import Link from "next/link";

export default function Home() {
  return (
    <main className="px-4 mx-auto mt-10 max-w-7xl sm:mt-14">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 font-display sm:text-5xl md:text-6xl xl:text-7xl">
          <span className="block xl:inline">Explore and Buy Unique</span>
          <span className="block text-primary">Products, Templates, and Icons</span>
        </h1>
        <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-lg md:max-w-3xl">
          Discover, Purchase, and Enjoy a Wide Range of Products and Design Templates.
          We are actively searching, and curating the
          colorest resources out there.
        </p>
      </div>
      <div>
        <div className="max-w-3xl px-4 pt-8 mx-auto lg:max-w-screen-xl sm:pt-10 sm:px-6 lg:px-8">
          <div className="flex flex-row flex-wrap items-center justify-between">
            <div className="font-bold text-3xl tracking-tighter">New Products</div>
            <Link href='/' className="font-semibold text-base text-primary">View Products <span>&rarr;</span></Link>
          </div>
        </div>
        <NewProduct />
      </div>
      <div>
        <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
          <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
            <img src="https://astrolus.netlify.app/images/clients/microsoft.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="" height="" />
          </div>
          <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
            <img src="https://astrolus.netlify.app/images/clients/airbnb.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="" height="" />
          </div>
          <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
            <img src="https://astrolus.netlify.app/images/clients/google.svg" className="h-9 w-auto m-auto" loading="lazy" alt="client logo" width="" height="" />
          </div>
          <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
            <img src="https://astrolus.netlify.app/images/clients/ge.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="" height="" />
          </div>
          <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
            <img src="https://astrolus.netlify.app/images/clients/netflix.svg" className="h-8 w-auto m-auto" loading="lazy" alt="client logo" width="" height="" />
          </div>
          <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
            <img src="https://astrolus.netlify.app/images/clients/google-cloud.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="" height="" />
          </div>
        </div>
      </div>
    </main >)
}
