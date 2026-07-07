"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  business: z.string().min(2, "Business name is required."),
  service: z.string().nonempty("Please select a service."),
  budget: z.string().nonempty("Please select a budget range."),
  message: z
    .string()
    .min(10, "Please provide more details about your project."),
});
type ContactFormValues = z.infer<typeof contactSchema>;
export function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });
  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };
  return (
    <section id="contact" className="w-full bg-secondary py-24 md:py-32">

      <div className="container mx-auto px-6 md:px-12">

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          <div className="lg:w-1/3">

            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">

              Let's create something extraordinary.
            </h2>
            <p className="text-muted-foreground text-lg mb-12">

              Share your vision with us, and we'll help bring it to life. We
              take on a limited number of projects per year to ensure
              unparalleled quality.
            </p>
            <div className="space-y-6">

              <div>

                <p className="text-sm tracking-widest text-[#D61F3B] uppercase font-bold mb-2">
                  Location
                </p>
                <p className="text-foreground text-lg">
                  Mumbai, India
                </p>
              </div>
              <div>

                <p className="text-sm tracking-widest text-[#D61F3B] uppercase font-bold mb-2">
                  Engagements
                </p>
                <p className="text-foreground text-lg">
                  cineog12@gmail.com
                  <br />
                  +91 87797 76586
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 max-w-2xl">

            {isSuccess ? (
              <div className="bg-card border border-[#D61F3B]/50 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">

                <h3 className="text-3xl font-bold text-foreground mb-4">
                  Inquiry Received
                </h3>
                <p className="text-muted-foreground text-lg">

                  Thank you for reaching out. A member of our executive team
                  will review your project details and contact you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>

                    <input
                      {...register("name")}
                      placeholder="Full Name"
                      className="w-full bg-card border rounded-xl px-6 py-4 text-foreground placeholder-gray-500 focus:outline-none focus:border-[#D61F3B] transition-colors"
                    />
                    {errors.name && (
                      <p className="text-[#D61F3B] text-xs mt-2 ml-2">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>

                    <input
                      {...register("email")}
                      placeholder="Email Address"
                      className="w-full bg-card border rounded-xl px-6 py-4 text-foreground placeholder-gray-500 focus:outline-none focus:border-[#D61F3B] transition-colors"
                    />
                    {errors.email && (
                      <p className="text-[#D61F3B] text-xs mt-2 ml-2">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>

                    <input
                      {...register("phone")}
                      placeholder="Phone Number"
                      className="w-full bg-card border rounded-xl px-6 py-4 text-foreground placeholder-gray-500 focus:outline-none focus:border-[#D61F3B] transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-[#D61F3B] text-xs mt-2 ml-2">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div>

                    <input
                      {...register("business")}
                      placeholder="Company / Brand Name"
                      className="w-full bg-card border rounded-xl px-6 py-4 text-foreground placeholder-gray-500 focus:outline-none focus:border-[#D61F3B] transition-colors"
                    />
                    {errors.business && (
                      <p className="text-[#D61F3B] text-xs mt-2 ml-2">
                        {errors.business.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>

                    <select
                      {...register("service")}
                      className="w-full bg-card border rounded-xl px-6 py-4 text-muted-foreground focus:outline-none focus:border-[#D61F3B] transition-colors appearance-none"
                    >

                      <option value="">Select Service</option>
                      <option value="commercial">Commercial Photography</option>
                      <option value="event">Event Coverage</option>
                      <option value="reels">Video & Reels</option>
                      <option value="full">
                        Full Campaign Production
                      </option>
                    </select>
                    {errors.service && (
                      <p className="text-[#D61F3B] text-xs mt-2 ml-2">
                        {errors.service.message}
                      </p>
                    )}
                  </div>
                  <div>

                    <select
                      {...register("budget")}
                      className="w-full bg-card border rounded-xl px-6 py-4 text-muted-foreground focus:outline-none focus:border-[#D61F3B] transition-colors appearance-none"
                    >

                      <option value="">Budget Range</option>
                      <option value="5k-10k">$5k - $10k</option>
                      <option value="10k-25k">$10k - $25k</option>
                      <option value="25k-50k">$25k - $50k</option>
                      <option value="50k+">$50k+</option>
                    </select>
                    {errors.budget && (
                      <p className="text-[#D61F3B] text-xs mt-2 ml-2">
                        {errors.budget.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>

                  <textarea
                    {...register("message")}
                    placeholder="Tell us about your project..."
                    rows={5}
                    className="w-full bg-card border rounded-xl px-6 py-4 text-foreground placeholder-gray-500 focus:outline-none focus:border-[#D61F3B] transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="text-[#D61F3B] text-xs mt-2 ml-2">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black font-semibold text-lg py-4 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                >

                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
