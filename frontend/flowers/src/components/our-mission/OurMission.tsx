import Image from "next/image";
import missions from "./mission.json";

const OurMission = () => {
  return (
    <div>
      <div className="mb-[40px]">
        <h2 className="fo</div>nt-bold text-[#171615] text-center uppercase leading-[-0.02em] text-[36px] md:text-[45px]  lg:text-[50px] ">
          What We Do
        </h2>
        <p className="mx-auto text-[16px] leading-[140%] text-center tracking-[-0.025em] text-[#2C2825] mt-[40px]">
          We bring a touch of that simple magic into your world.
        </p>
      </div>
      <div>
        {missions.map((mission) => (
          <div key={mission.id}>
            <p className="font-bold text-[50px] leading-[110%] text-center tracking-[-0.02em] uppercase text-[#171615]">
              {mission.number}
            </p>
            <Image
              src={mission.src}
              width={145}
              height={145}
              alt={mission.alt}
              className="my-[80px] mx-auto"
            />
            <h4 className="max-w-[540px] mx-auto font-bold text-[45px] leading-[110%] text-center tracking-[-0.02em] uppercase text-[#171615]">
              {mission.title}
            </h4>
            <p className=" max-w-[540px] mx-auto text-[16px] leading-[140%] text-center tracking-[-0.025em] text-[#2C2825] mt-[30px] mb-[80px]">
              {mission.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurMission;
