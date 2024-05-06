import hero from "../assets/hero.png"

const Hero = () => {
  return (
    <div style={{ aspectRatio: "16/5" }}>
      <img src={hero} className="w-full max-h-[600px] object-cover brightness-75" loading="lazy" />
    </div>
  )
}

export default Hero
