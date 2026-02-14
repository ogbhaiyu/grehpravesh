import Hero from '../components/Hero'
import FeaturedProperties from '../components/FeaturedProperties'
import WhyChooseUs from '../components/WhyChooseUs'
import LeadCaptureForm from '../components/LeadCaptureForm'

export default function Home() {
    return (
        <main>
            <Hero />
            <FeaturedProperties />
            <WhyChooseUs />
            <LeadCaptureForm />
        </main>
    )
}
