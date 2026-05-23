import ParallaxImageSection from './ParallaxImageSection'

const imageData = import.meta.glob('/src/assets/images/navigation/*', {
  eager: true,
}) as Record<string, { default: string }>

const sections = Object.keys(imageData)
  .sort()
  .map((path, index) => {
    const src = imageData[path].default
    const fileName = path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? `image-${index + 1}`
    const titleMap: Record<string, string> = {
      'highwire_6.16.20-19': 'Climbing Photgraphy',
      '11-3-24_i35-insta-6': 'Mountain Biking Photography',
      'penn-2': 'Backcountry Skiing and Splitboarding Photography',
    }
    const captionMap: Record<string, string> = {
      'highwire_6.16.20-19': 'Curt in Clear Creek Canyon',
      '11-3-24_i35-insta-6': 'Jacob taking it to Flat',
      'penn-2': 'Penn sending it off the Triple',
    }

    return {
      src,
      alt: `${fileName.replace(/[-_]/g, ' ')} gallery image`,
      title: titleMap[fileName] ?? `Featured scene ${index + 1}`,
      description: captionMap[fileName] ?? `Featured scene ${index + 1}`
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
        <ParallaxImageSection
          key={section.src}
          src={section.src}
          alt={section.alt}
          title={section.title}
          description={section.description}
        />
      ))}
    </div>
  )
}
