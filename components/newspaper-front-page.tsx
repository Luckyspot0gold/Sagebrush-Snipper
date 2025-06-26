const NewspaperFrontPage = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold font-serif">The Stoneyard Gazette</h1>
        <p className="text-gray-600">Your Source for Local News and Frontier Insights</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Frontier Trader Story */}
        <div className="border-2 border-gray-800 p-4 bg-yellow-50">
          <h3 className="font-bold text-lg mb-2 font-serif">🌟 STONEYARD GAMING ANNOUNCES FRONTIER TRADER</h3>
          <img
            src="/images/frontiertraderposter.jpg"
            alt="Frontier Trader Poster"
            className="w-full h-32 object-cover mb-2 border border-gray-600"
          />
          <p className="text-sm leading-tight font-serif">
            Revolutionary GameFi platform bridges Old West trading with modern cryptocurrency markets. Features advanced
            trading algorithms, NFT rewards, and authentic frontier atmosphere. "It's like having a telegraph to Wall
            Street right from your saloon," says local trader.
          </p>
          <p className="text-xs mt-2 font-bold">Visit: /frontier-trader</p>
        </div>

        {/* Example Article (Replace with actual content) */}
        <div className="border border-gray-300 p-4">
          <h2 className="font-bold text-xl mb-2 font-serif">Local Blacksmith Wins County Fair</h2>
          <p className="text-sm leading-tight font-serif">
            John Smith, a local blacksmith, has won first prize at the annual County Fair for his intricate ironwork.
            His winning piece, a handcrafted horseshoe, was praised for its detail and craftsmanship.
          </p>
        </div>

        {/* Another Example Article */}
        <div className="border border-gray-300 p-4">
          <h2 className="font-bold text-xl mb-2 font-serif">Town Meeting Discusses New Schoolhouse</h2>
          <p className="text-sm leading-tight font-serif">
            A town meeting was held last night to discuss the construction of a new schoolhouse. Residents voiced their
            opinions on the proposed location and funding options.
          </p>
        </div>

        {/* Add more articles here */}
      </main>

      <footer className="text-center mt-8">
        <p className="text-gray-600">© 1888 The Stoneyard Gazette</p>
      </footer>
    </div>
  )
}

export default NewspaperFrontPage
