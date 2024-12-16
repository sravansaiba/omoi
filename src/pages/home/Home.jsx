import BlogPostCard from "../../components/blogpostcard/BlogPostCard";
import HeroSection from "../../components/heroSection/HeroSection";
import Layout from "../../components/layout/Layout";



export default function Home() {
  return (
    <div>
      <Layout>
        <HeroSection/>
        <BlogPostCard/>
      </Layout>
    </div>
  )
}
