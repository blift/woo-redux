const fetchData = async () => {

  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()

}

export default async function HeroComponent() {

  const data = await fetchData();
  
  return (
    <div className="w-full container mx-auto mb-12">
      <h1 className="text-4xl font-bold text-gray-800">Hero</h1>
      <p className="mt-2">{data?.title}</p>
    </div>
  )
}