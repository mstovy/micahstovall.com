import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import RaceTimer from './pages/RaceTimer'
import GalleryMountainBiking from './pages/gallery/MountainBiking'
import GalleryClimbing from './pages/gallery/Climbing'
import GalleryLandscapes from './pages/gallery/Landscapes'
import GalleryPortraits from './pages/gallery/Portraits'
import GalleryBackcountrySkiing from './pages/gallery/BackcountrySkiing'
import GalleryStreet from './pages/gallery/Street'
import GalleryFineArt from './pages/gallery/FineArt'
import GalleryProducts from './pages/gallery/Products'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />  
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="gallery/climbing" element={<GalleryClimbing />} />
          <Route path="gallery/mountainbiking" element={<GalleryMountainBiking />} />
          <Route path="gallery/landscapes" element={<GalleryLandscapes />} />
          <Route path="gallery/portraits" element={<GalleryPortraits />} />
          <Route path="gallery/backcountryskiing" element={<GalleryBackcountrySkiing />} />
          <Route path="gallery/street" element={<GalleryStreet />} />
          <Route path="gallery/fineart" element={<GalleryFineArt />} />
          <Route path="gallery/products" element={<GalleryProducts />} />
          <Route path="racetimer" element={<RaceTimer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
