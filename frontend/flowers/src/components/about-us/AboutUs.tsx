const AboutUs = () => {
  return (
    <div className="about-us">
      <h2 className="font-bold text-[14px] leading-[140%] text-center tracking-[0.02em] uppercase text-[#575757]">
        Who We Are
      </h2>
      <p className=" w-[215px] sm:w-[412px] lg:w-[770px] font-bold text-[24px] sm:text-[36px] lg:text-[40px] leading-[110%] text-center tracking-[-0.025em] text-[#171615] mt-[20px] mb-[40px] mx-auto">
        We&apos;re Our Blooms® and we&apos;re here to help you find your floral
        story.
      </p>
      <button className=" flex items-center justify-center gap-[10px] px-[12px] pt-[8px] pb-[6px] w-[100px] sm:w-[110px] h-[31px] sm:h-[34px] bg-[#FFC800] rounded-[4px] mx-auto mb-[120px]">
        ABOUT US{" "}
      </button>
    </div>
  );
};
export default AboutUs;
