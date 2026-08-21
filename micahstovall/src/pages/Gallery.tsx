import GalleryCard from "../components/GalleryCard"

const cardsTop = [
  {
    title: "Mountain Biking",
    subtitle: "Mountain Biking",
    to: "/gallery/mountainbiking",
    image: "../assets/images/mountainbiking/11-3-24_i35-insta-6.jpg"
  },
  {
    title: "Climbing",
    subtitle: "Rock Climbing",
    to: "/gallery/climbing",
    image: "../assets/images/climbing/highwire_6.16.20-19.jpg"
  },
  {
    title: "Backcountry Skiing",
    subtitle: "Backcountry Skiing",
    to: "/gallery/backcountryskiing",
    image: "../assets/images/backcountryskiing/proj_1-4.jpg"
  },
  {
    title: "Products",
    subtitle: "Product Showcases",
    to: "/gallery/products",
    image: "../assets/images/products/11-3-24_i35-insta-6.jpg"
  }
]

const cardsBottom = [
  {
    title: "Street",
    subtitle: "Street Photography",
    to: "/gallery/street",
    image: "../assets/images/street/proj1-1.jpg"
  },
  {
    title: "Fine Art",
    subtitle: "Fine Art Photography",
    to: "/gallery/fineart",
    image: "../assets/images/fineart/"
  },
  {
    title: "Landscapes",
    subtitle: "Natural Landscapes",
    to: "/gallery/landscapes",
    image: "../assets/images/landscapes/proj_1-4.jpg"
  },
  {
    title: "Portraits",
    subtitle: "Human Portraits",
    to: "/gallery/portraits",
    image: "../assets/images/portraits/IMG_1767.jpeg"
  }
]

export default function Gallery() {
  return (
    <main className="w-full text-gray-900 dark:text-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow">Gallery</h1>
            <p className="mt-3 text-white/90 max-w-2xl">A curated selection of photo categories. Explore the collections below.</p>
          </div>

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
