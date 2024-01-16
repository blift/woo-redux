import ProductsList from "./components/ProductsList"

export default async function Home() {


  return (
    <main className="flex flex-col min-h-screen p-24 bg-gray-100">
      <ProductsList />
    </main>
  )
}
