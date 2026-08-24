import { Link } from 'react-router-dom'
import ParallaxImageSection from './ParallaxImageSection'

const imageData = import.meta.glob('/src/assets/images/navigation/*', {
  eager: true,
}) as Record<string, { default: string }>

const sectionPaths: Record<string, string> = {
  '1-penn-2': '/gallery/backcountryskiing',
  '2-stovy' : '/music',
  '3-highwire_6.16.20-19' : '/gallery/climbing',
  '' : '',
  '5-11-3-24_i35-insta-6': '/gallery/mountainbiking'
}

const sections = Object.keys(imageData)
  .sort()
  .map((path, index) => {
    const src = imageData[path].default
    const fileName = path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? `image-${index + 1}`
    const titleMap: Record<string, string> = {
      '1-penn-2': 'Backcountry Skiing and Splitboarding Photography',
      '2-stovy' : 'Stovy',
      '3-highwire_6.16.20-19': 'Climbing Photgraphy',
      '' : '',
      '5-11-3-24_i35-insta-6': 'Mountain Biking Photography',
    }
    const captionMap: Record<string, string> = {
      '1-penn-2': 'Penn sending it off the Triple',
      '2-stovy' : 'Throwing down',
      '3-highwire_6.16.20-19': 'Curt in Clear Creek Canyon',
      '' : '',
      '5-11-3-24_i35-insta-6': 'Jacob taking it to Flat'
    }

    return {
      src,
      alt: `${fileName.replace(/[-_]/g, ' ')} gallery image`,
      title: titleMap[fileName] ?? `Featured scene ${index + 1}`,
      description: captionMap[fileName] ?? `Featured scene ${index + 1}`,
      to: sectionPaths[fileName] ?? '/gallery',
    }
  })

export default function HomeCard() {
  if (sections.length === 0) {
    return (
      <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-12 text-center shadow-sm shadow-slate-200/60">
        <p className="text-base leading-8 text-slate-600">
          No images were found in <code>src/assets/images</code>. Add image files to populate this gallery.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <Link key={section.src} to={section.to} className="block transition-opacity duration-200 hover:opacity-95" aria-label={`View ${section.title} gallery`}>
          <ParallaxImageSection
            src={section.src}
            alt={section.alt}
            title={section.title}
            description={section.description}
          />
        </Link>
      ))}
    </div>
  )
}
