import React from "react";
import Image from "next/image";
import Link from "next/link";
const projects = [
  {
    title: "Urban Dynamics",
    industry: "Real Estate",
    description:
      "An architectural exploration of modern ultra-luxury living spaces in the heart of downtown.",
    image: "/hero/DSC00140.JPG",
  },
  {
    title: "Neon Pulse",
    industry: "Automotive",
    description:
      "High-octane commercial shoot featuring the latest electric sports car night testing.",
    image: "/hero/DSC07020.JPG",
  },
  {
    title: "Gastronomic Heritage",
    industry: "Hospitality",
    description:
      "A deep dive into the culinary arts, focusing on texture, ingredients, and the chef's passion.",
    image: "/hero/DSC09736.JPG",
  },
  {
    title: "The Silent Symphony",
    industry: "Fashion",
    description:
      "A minimal, avant-garde fashion editorial blending stark shadows with striking textiles.",
    image: "/hero/DSC07059.JPG",
  },
];
export function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="relative w-full bg-background py-24 md:py-32"
    >
      
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          
          <div className="max-w-xl">
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
              
              Featured Work
            </h2>
            <p className="text-muted-foreground text-lg">
              
              A curated selection of our finest visual narratives, crafted with
              precision and passion.
            </p>
          </div>
          <Link
            href="#projects"
            className="inline-flex items-center text-[#D61F3B] font-medium hover:text-foreground transition-colors uppercase tracking-widest text-sm"
          >
            
            View All Projects &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              
              <div className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-card">
                
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors duration-500" />
                {/* Industry Tag */}
                <div className="absolute top-6 left-6 bg-foreground/50 backdrop-blur-md border text-foreground text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-widest">
                  
                  {project.industry}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-[#D61F3B] transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground max-w-sm">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
