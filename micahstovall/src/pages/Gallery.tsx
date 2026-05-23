import GalleryCard from "../components/GalleryCard"

const cardsTop = [
  {
    title: "Mountain Biking",
    subtitle: "Mountain Biking",
    to: "/gallery/mountainbiking",
    image: ""
  },
  {
    title: "Climbing",
    subtitle: "Rock Climbing",
    to: "/gallery/climbing",
    image: ""
  },
  {
    title: "Backcountry Skiing",
    subtitle: "Backcountry Skiing",
    to: "/gallery/backcountryskiing",
    image: ""
  },
  {
    title: "Products",
    subtitle: "Product Showcases",
    to: "/gallery/products",
    image: ""
  }
]

const cardsBottom = [
  {
    title: "Street",
    subtitle: "Street Photography",
    to: "/gallery/street",
    image: ""
  },
  {
    title: "Fine Art",
    subtitle: "Fine Art Photography",
    to: "/gallery/fineart",
    image: ""
  },
  {
    title: "Landscapes",
    subtitle: "Natural Landscapes",
    to: "/gallery/landscapes",
    image: ""
  },
  {
    title: "Portraits",
    subtitle: "Human Portraits",
    to: "/gallery/portraits",
    image: ""
  }
]

export default function Gallery() {
  return (
    <main className="w-full text-gray-900 dark:text-gray-100">
      <section className="w-full h-[50vh] md:h-[55vh] relative">
        <img
          src="../../assets/images/landscapes/6-15-24_idaho-spring-19.jpg"
          alt="Gallery landing image"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20 flex items-center">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow">Gallery</h1>
            <p className="mt-3 text-white/90 max-w-2xl">A curated selection of photo categories. Explore the collections below.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsTop.map((c) => (
            <GalleryCard key={c.title} title={c.title} subtitle={c.subtitle} imageSrc={c.image} to={c.to} />
          ))}
        </div>
      </section>
            <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsBottom.map((c) => (
            <GalleryCard key={c.title} title={c.title} subtitle={c.subtitle} imageSrc={c.image} to={c.to} />
          ))}
        </div>
      </section>
    </main>
  )
}
