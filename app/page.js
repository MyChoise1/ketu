import Layout from "@/components/layout/Layout"
import Product1 from "@/components/sections/Product1"
import Slider3 from "@/components/sections/Slider3"

export const metadata = {
  title: 'Kesari Turtle Engineers',
  description: 'Online Shopping',
}
export default function Home() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <Slider3 />
                <Product1 />
            </Layout>
        </>
    )
}