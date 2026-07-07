"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
const faqs = [
  {
    question: "Do you travel for shoots?",
    answer:
      "Yes, we operate globally. While we are based in a central hub, our team frequently travels for commercial assignments and destination projects worldwide.",
  },
  {
    question: "What is your typical turnaround time?",
    answer:
      "Turnaround times vary depending on the scope of the project. A standard photography shoot typically takes 1-2 weeks for final edits, while major video productions may require 3-4 weeks for extensive post-production and color grading.",
  },
  {
    question: "Do you provide creative direction?",
    answer:
      "Absolutely. We offer full-service creative direction, including concept development, storyboarding, set design, and styling to ensure the final product perfectly aligns with your brand's vision.",
  },
  {
    question: "What equipment do you use?",
    answer:
      "We shoot on industry-leading cinema cameras (RED, ARRI, Sony Cinema Line) and high-resolution medium format and full-frame photography systems, paired with premium lighting gear.",
  },
  {
    question: "Can we get raw files?",
    answer:
      "Our final deliverables are fully retouched and color-graded to our exacting standards. We do not typically release RAW files, as our unique editing process is a core part of the CineOg aesthetic.",
  },
];
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section id="faq" className="w-full bg-background py-24 md:py-32">
      
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        <div className="text-center mb-16 md:mb-24">
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-6">
            
            Frequently Asked
          </h2>
          <p className="text-muted-foreground text-lg">
            
            Everything you need to know about partnering with CineOg.
          </p>
        </div>
        <div className="space-y-4">
          
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className=" ">
                
                <button
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D61F3B]"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  
                  <span
                    className={`text-xl md:text-2xl font-medium tracking-tight pr-8 transition-colors ${isOpen ? "text-[#D61F3B]" : "text-foreground"}`}
                  >
                    
                    {faq.question}
                  </span>
                  <div className="shrink-0 ml-4">
                    
                    {isOpen ? (
                      <Minus className="w-6 h-6 text-[#D61F3B]" />
                    ) : (
                      <Plus className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      
                      <p className="pb-6 text-muted-foreground text-base md:text-lg leading-relaxed">
                        
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
