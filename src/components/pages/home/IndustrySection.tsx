'use client';
import React, { useEffect, useRef } from 'react';
import { Button } from 'antd';
import { MdOutlineArrowOutward } from 'react-icons/md';

import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { TIndustry, useGetIndustriesQuery } from '@/redux/features/industry/industryApi';
import { getImageUrl } from '@/utils/getImageUrl';

gsap.registerPlugin(ScrollTrigger);

const IndustrySection: React.FC = () => {
      const sectionRef = useRef<HTMLDivElement>(null);
      const { data: industries } = useGetIndustriesQuery([]);

      useEffect(() => {
            const section = sectionRef.current;
            if (section) {
                  const cards = section.querySelectorAll('.industry-card');
                  gsap.set(cards, { opacity: 0, y: 50, scale: 0.9 });

                  gsap.to(cards, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        stagger: 0.2,
                        ease: 'power4.out',
                        scrollTrigger: {
                              trigger: section,
                              start: 'top 80%',
                              end: 'bottom 20%',
                              scrub: 0.3,
                        },
                  });
            }
      }, []);

      return (
            <div ref={sectionRef} className="bg-[#fffdf8] py-20 flex flex-col items-center px-4 overflow-hidden">
                  <div className="container mx-auto">
                        <h1 className="text-2xl md:text-4xl font-bold text-center text-title mb-3">What Is Your Industry?</h1>
                        <p className="text-center text-paragraph mb-16">
                              Forge connections with industry leaders and experts who can elevate your career and unlock your full
                              potential.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {industries?.map((industry: TIndustry) => (
                                    <div
                                          key={industry?._id}
                                          className="industry-card bg-white p-4 border rounded-lg flex items-center gap-4 cursor-pointer transition-shadow shadow-md hover:shadow-xl"
                                    >
                                          <div className="w-12 h-12 bg-[#FF6F3C]/10 rounded-lg flex items-center justify-center">
                                                <Image
                                                      width={50}
                                                      height={50}
                                                      src={getImageUrl(industry?.image)}
                                                      alt={industry?.name}
                                                      className="w-[50px] h-[50px]"
                                                />
                                          </div>
                                          <div>
                                                <h3 className="text-lg font-semibold text-title">{industry?.name}</h3>
                                                <p className="text-sm text-paragraph">{industry?.mentorCount} Mentor available</p>
                                          </div>
                                    </div>
                              ))}
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-center items-center mt-12">
                              <Button
                                    href="/mentors"
                                    type="primary"
                                    icon={<MdOutlineArrowOutward size={20} />}
                                    className="bg-[#FF6F3C] hover:bg-[#ff855c]"
                              >
                                    Explore All
                              </Button>
                        </div>
                  </div>
            </div>
      );
};

export default IndustrySection;
