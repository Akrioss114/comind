import svgPaths from "./svg-b0no0korb";
import imgHeaderImage from "figma:asset/4dd369a6b1dd2d9d8c3e5227ef4f51e7f941a6ba.png";
import imgBenefitImage from "figma:asset/624ca513adf58ee43a7949875bf7f394594e86b2.png";
import imgBenefitImage1 from "figma:asset/3b08d984c887ed2137ecba9e6ce406228ea26ca2.png";
import imgImage from "figma:asset/e9011cc6a766f3202a546cfe619a1087b798f2fa.png";
import imgIconContainer from "figma:asset/db3c9b538e4c1b7c181727f220c290f3f975c0d3.png";
import imgIconContainer1 from "figma:asset/00c7f50cc1b1c372142b0d0ac3c80d2316884a39.png";
import imgIconContainer2 from "figma:asset/26e2d4a052e14943801d48eb1eb5e50cf6397b11.png";
import imgIconContainer3 from "figma:asset/223c99176ada9a4d87f82f3f17ba3c38510c1e90.png";
import imgCtaContent from "figma:asset/bc72d365e6fb4776f269844a23a18e18145ec664.png";

function Symbol() {
  return (
    <div className="h-[17.42px] relative shrink-0 w-[15.241px]" data-name="Symbol">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2406 17.42">
        <g id="Symbol">
          <path d={svgPaths.pdca2500} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div aria-label="Company logo" className="content-stretch flex gap-[20px] items-center relative shrink-0" data-name="Logo">
      <Symbol />
      <p className="capitalize font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[1.058] not-italic relative shrink-0 text-[16px] text-white tracking-[-0.32px] whitespace-nowrap">Etran</p>
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="nav">
      <Logo />
      <a className="bg-[#d2fd9c] content-stretch cursor-pointer flex items-center justify-center px-[14px] py-[11px] relative rounded-[2.064px] shrink-0" data-name="Button" href="https://figma.com/sites">
        <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[1.058] relative shrink-0 text-[10px] text-black text-left tracking-[-0.2px] whitespace-nowrap">Get started</p>
      </a>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:Regular',sans-serif] font-normal gap-[20px] h-[114px] items-start relative shrink-0 w-full" data-name="Header">
      <h1 className="block capitalize leading-[0] relative shrink-0 text-[0px] text-[42px] text-white tracking-[-0.84px] w-[280px]">
        <span className="leading-[1.058]">{`Money transfers made `}</span>
        <span className="leading-[1.058] text-[#d2fd9c]">simple</span>
      </h1>
      <h2 className="block leading-[1.09] min-w-full relative shrink-0 text-[#cbcbcb] text-[16px] w-[min-content]">No personal credit checks or founder guarantee.</h2>
    </div>
  );
}

function Layer() {
  return (
    <div className="absolute inset-[0_19.33%_2.67%_16.67%]" data-name="Layer_1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.2 29.2">
        <g clipPath="url(#clip0_5_1494)" id="Layer_1">
          <path d={svgPaths.p1db78780} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_5_1494">
            <rect fill="white" height="29.2" width="19.2" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Layer1() {
  return (
    <div className="absolute left-[-0.4px] size-[30px] top-[-0.47px]" data-name="Layer_1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g clipPath="url(#clip0_5_1453)" id="Layer_1">
          <path clipRule="evenodd" d={svgPaths.p33172f00} fill="var(--fill-0, #394508)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p31561700} fill="var(--fill-0, #394508)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p22775c00} fill="var(--fill-0, #394508)" fillRule="evenodd" id="Vector_3" />
          <path clipRule="evenodd" d={svgPaths.pf251480} fill="var(--fill-0, #394508)" fillRule="evenodd" id="Vector_4" />
          <path clipRule="evenodd" d={svgPaths.p9026500} fill="var(--fill-0, #394508)" fillRule="evenodd" id="Vector_5" />
          <path clipRule="evenodd" d={svgPaths.p3d114000} fill="var(--fill-0, #394508)" fillRule="evenodd" id="Vector_6" />
          <path clipRule="evenodd" d={svgPaths.p217cb180} fill="var(--fill-0, #394508)" fillRule="evenodd" id="Vector_7" />
          <path clipRule="evenodd" d={svgPaths.p3a6b3b00} fill="var(--fill-0, #394508)" fillRule="evenodd" id="Vector_8" />
          <path clipRule="evenodd" d={svgPaths.p2d27b100} fill="var(--fill-0, #394508)" fillRule="evenodd" id="Vector_9" />
        </g>
        <defs>
          <clipPath id="clip0_5_1453">
            <rect fill="white" height="30" width="30" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Layer2() {
  return (
    <div className="absolute h-[28.81px] left-[2px] top-px w-[23.93px]" data-name="Layer_1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.93 28.81">
        <g clipPath="url(#clip0_5_1497)" id="Layer_1">
          <path d={svgPaths.p1acbfd00} fill="var(--fill-0, #394508)" id="Vector" />
          <path d={svgPaths.pb2b9000} fill="var(--fill-0, #394508)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_5_1497">
            <rect fill="white" height="28.81" width="23.93" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Modules() {
  return (
    <div className="content-start cursor-pointer flex flex-wrap gap-[10px] items-start relative shrink-0 w-full" data-name="Modules">
      <button aria-label="Jumps to the productivity section of the page" className="bg-[#619111] flex-[1_0_0] h-[120px] min-h-px min-w-px relative rounded-[4px]" data-name="Large nav buttons">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col gap-[14px] items-center justify-center px-[10px] py-[20px] relative size-full">
            <div className="relative shrink-0 size-[30px]" data-name="Icons">
              <Layer />
            </div>
            <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[1.15] min-w-full relative shrink-0 text-[12px] text-black text-center w-[min-content]">
              Instant
              <br aria-hidden="true" />
              Productivity
            </p>
          </div>
        </div>
      </button>
      <button aria-label="Jumps to the expense management section of the page" className="bg-[#619111] flex-[1_0_0] h-[120px] min-h-px min-w-px relative rounded-[4px]" data-name="Large nav buttons">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col gap-[14px] items-center justify-center px-[10px] py-[20px] relative size-full">
            <div className="relative shrink-0 size-[30px]" data-name="Icons">
              <Layer1 />
            </div>
            <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[1.15] min-w-full relative shrink-0 text-[12px] text-black text-center w-[min-content]">
              Expense
              <br aria-hidden="true" />
              Management
            </p>
          </div>
        </div>
      </button>
      <button aria-label="Jumps to the advanced technology section of the page" className="bg-[#619111] flex-[1_0_0] h-[120px] min-h-px min-w-px relative rounded-[4px]" data-name="Large nav buttons">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col gap-[14px] items-center justify-center px-[10px] py-[20px] relative size-full">
            <div className="relative shrink-0 size-[30px]" data-name="Icons">
              <Layer2 />
            </div>
            <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[1.15] min-w-full relative shrink-0 text-[12px] text-black text-center w-[min-content]">
              Advanced
              <br aria-hidden="true" />
              Technology
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}

function OurOfferings() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[154px] items-start relative shrink-0 w-full" data-name="Our offerings">
      <h3 className="block font-['Manrope:Medium',sans-serif] font-medium leading-[1.15] relative shrink-0 text-[#d2fd9c] text-[12px] w-full">Our offerings</h3>
      <Modules />
    </div>
  );
}

function ContactLinks() {
  return (
    <div className="content-stretch flex gap-[12.8px] items-start relative shrink-0 w-full" data-name="Contact links">
      <a className="content-stretch cursor-pointer flex items-center justify-center relative shrink-0" data-name="Link" href="https://figma.com/sites">
        <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[1.15] relative shrink-0 text-[#d2fd9c] text-[12px] text-left whitespace-nowrap">Contact</p>
      </a>
      <a className="content-stretch cursor-pointer flex items-center justify-center relative shrink-0" data-name="Link" href="https://figma.com/sites">
        <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[1.15] relative shrink-0 text-[#d2fd9c] text-[12px] text-left whitespace-nowrap">Social</p>
      </a>
      <a className="content-stretch cursor-pointer flex items-center justify-center relative shrink-0" data-name="Link" href="https://figma.com/sites">
        <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[1.15] relative shrink-0 text-[#d2fd9c] text-[12px] text-left whitespace-nowrap">Address</p>
      </a>
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Link">
        <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[1.15] relative shrink-0 text-[#d2fd9c] text-[12px] whitespace-nowrap">Legal Terms</p>
      </div>
    </div>
  );
}

function SidebarContainer() {
  return (
    <header className="bg-[#394508] max-w-[900px] relative shrink-0 w-full" data-name="Sidebar container">
      <div className="flex flex-col justify-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-start justify-center max-w-[inherit] pb-[30px] pt-[20px] px-[20px] relative w-full">
          <Nav />
          <Header />
          <OurOfferings />
          <ContactLinks />
        </div>
      </div>
    </header>
  );
}

function HeaderImage() {
  return (
    <div className="aspect-[335/223.99998474121094] relative rounded-[20px] shrink-0 w-full" data-name="Header image">
      <img alt="Person interacting with iPhone" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgHeaderImage} />
    </div>
  );
}

function Layer3() {
  return (
    <div className="relative size-[20.967px]" data-name="Layer_1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.9675 20.9675">
        <g clipPath="url(#clip0_5_1491)" id="Layer_1">
          <path d={svgPaths.pb15a280} fill="var(--fill-0, #619111)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_5_1491">
            <rect fill="white" height="20.9675" width="20.9675" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Logo2() {
  return (
    <div aria-label="Blooming brand logo" className="h-[20.967px] relative shrink-0 w-[85.223px]" data-name="Logo 01">
      <p className="absolute font-['Abhaya_Libre_Medium:Regular',sans-serif] leading-[1.1] left-[27.05px] not-italic text-[#619111] text-[16.233px] top-[2.03px] tracking-[-0.974px] whitespace-nowrap">Blooming</p>
      <div className="absolute flex items-center justify-center left-[-0.01px] size-[20.967px] top-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <Layer3 />
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute h-[15.557px] left-0 top-0 w-[16.232px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.2324 15.5566">
        <g id="Group 2147220594">
          <path d={svgPaths.p3ea20a00} fill="var(--fill-0, #619111)" id="Exclude" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[25.03px] top-0">
      <p className="absolute font-['Geist:Medium',sans-serif] font-medium leading-[1.1] left-[25.03px] text-[#619111] text-[16.233px] top-0 tracking-[-0.974px] whitespace-nowrap">BuildRight</p>
    </div>
  );
}

function Logo3() {
  return (
    <div aria-label="BuildRight brand logo" className="h-[18px] relative shrink-0 w-[95.025px]" data-name="Logo 02">
      <Group1 />
      <Group />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute left-0 size-[21.643px] top-0">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6427 21.6427">
        <g id="Group 2147220697">
          <path d={svgPaths.p12f1f400} fill="var(--fill-0, #619111)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Logo4() {
  return (
    <div aria-label="Flowbot brand logo" className="h-[21.643px] relative shrink-0 w-[79.643px]" data-name="Logo 03">
      <Group4 />
      <p className="-translate-x-1/2 absolute font-['Radio_Canada_Big:Regular',sans-serif] font-normal leading-[1.15] left-[50.64px] text-[#619111] text-[17.314px] text-center top-[0.82px] tracking-[-0.8657px] whitespace-nowrap">Flowbot</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[0_-0.29%_-1.96%_0.01%]">
      <p className="absolute font-['Saira:Regular',sans-serif] font-normal inset-[0_-0.29%_-1.96%_28.96%] leading-[1.15] text-[#619111] text-[17.314px] text-center tracking-[-0.8657px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Expor
      </p>
      <div className="absolute inset-[17.25%_77.61%_17.23%_0.01%]" data-name="Subtract">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.2598 12.8516">
          <path d={svgPaths.pe1f7700} fill="var(--fill-0, #619111)" id="Subtract" />
        </svg>
      </div>
    </div>
  );
}

function Logo5() {
  return (
    <div aria-label="Export brand logo" className="h-[19.615px] relative shrink-0 w-[77.106px]" data-name="Logo 04">
      <Group3 />
    </div>
  );
}

function Group2() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[14.73px] left-[calc(50%-0.01px)] top-[calc(50%+0.01px)] w-[63.495px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 63.4953 14.7305">
        <g id="Group 2147220659">
          <g id="Redo">
            <path d={svgPaths.p171a900} fill="var(--fill-0, #619111)" id="Vector" />
            <path d={svgPaths.p3b810f00} fill="var(--fill-0, #619111)" id="Vector_2" />
            <path d={svgPaths.p32b44840} fill="var(--fill-0, #619111)" id="Vector_3" />
            <path d={svgPaths.p1492c0c0} fill="var(--fill-0, #619111)" id="Vector_4" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p1078c200} fill="var(--fill-0, #619111)" fillRule="evenodd" id="Vector 2669 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p1a72c780} fill="var(--fill-0, #619111)" fillRule="evenodd" id="Vector 2670 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Logo6() {
  return (
    <div aria-label="Redo brand logo" className="h-[14.73px] relative shrink-0 w-[63.493px]" data-name="Logo 05">
      <Group2 />
    </div>
  );
}

function Logos() {
  return (
    <div className="content-center flex flex-[1_0_0] flex-wrap gap-[48px] items-center justify-center min-h-px min-w-px relative" data-name="Logos">
      <Logo2 />
      <Logo3 />
      <Logo4 />
      <Logo5 />
      <Logo6 />
    </div>
  );
}

function LogoWall() {
  return (
    <div className="content-start flex flex-wrap items-start overflow-clip py-[34px] relative rounded-[10px] shrink-0 w-full" data-name="Logo wall">
      <Logos />
    </div>
  );
}

function HeaderContainer() {
  return (
    <div className="bg-white h-[526.61px] relative shrink-0 w-full" data-name="Header container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[25px] items-center pt-[50px] px-[20px] relative size-full">
          <HeaderImage />
          <h2 className="block font-['Manrope:Regular',sans-serif] font-normal leading-[1.09] relative shrink-0 text-[20px] text-black text-center tracking-[-0.4px] w-full">
            We escalate transfer efficiency
            <br aria-hidden="true" />
            and productivity
          </h2>
          <LogoWall />
        </div>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0 text-center w-full" data-name="Header">
      <h2 className="block capitalize font-['Manrope:Regular',sans-serif] font-normal leading-[1.058] relative shrink-0 text-[#394508] text-[42px] tracking-[-0.84px] w-full">Get more done in a week</h2>
      <h2 className="block font-['Manrope:Medium',sans-serif] font-medium leading-[1.15] relative shrink-0 text-[#5d5d5d] text-[12px] w-full">Maximize your productivity with smarter tools designed to streamline your workflow to automate tasks, stay organized</h2>
    </div>
  );
}

function BentoContent() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:Regular',sans-serif] font-normal gap-[30px] items-center justify-end relative shrink-0 text-[#394508] w-full" data-name="Bento content">
      <p className="leading-[1.037] min-w-full relative shrink-0 text-[90px] text-center tracking-[-3.6px] w-[min-content]">2x</p>
      <p className="leading-[1.09] relative shrink-0 text-[16px] whitespace-nowrap">Double Your Productivity</p>
    </div>
  );
}

function Bento() {
  return (
    <div className="bg-[#d2fd9c] content-stretch flex flex-col h-[221.867px] items-center justify-end max-w-[500px] min-w-[275px] px-[20.267px] py-[30px] relative rounded-[10.667px] shrink-0 w-[330px]" data-name="Bento 01">
      <BentoContent />
    </div>
  );
}

function BentoContent1() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-center relative shrink-0 w-[234.667px]" data-name="Bento content">
      <div className="h-[98.459px] relative shrink-0 w-[142.264px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 142.264 98.4587">
          <g id="Vector">
            <path d={svgPaths.p2b837380} fill="#394508" fillOpacity="0.5" />
            <path d={svgPaths.p1dc45000} fill="#394508" fillOpacity="0.5" />
            <path d={svgPaths.p3401b400} fill="#394508" fillOpacity="0.5" />
            <path d={svgPaths.p18f576f0} fill="#394508" fillOpacity="0.5" />
            <path d={svgPaths.p5e83680} fill="#394508" fillOpacity="0.5" />
            <path d={svgPaths.p1d02bf80} fill="#394508" fillOpacity="0.5" />
            <path d={svgPaths.p20d70ff0} fill="#394508" fillOpacity="0.5" />
            <path d={svgPaths.p2d719a80} fill="#394508" fillOpacity="0.5" />
            <path d={svgPaths.p10532e00} fill="#394508" fillOpacity="0.5" />
            <path d={svgPaths.p14886880} fill="#394508" fillOpacity="0.5" />
            <path d={svgPaths.p1463ca40} fill="#394508" fillOpacity="0.5" />
            <path d={svgPaths.p37ee03f0} fill="#394508" fillOpacity="0.5" />
            <path d={svgPaths.p399d480} fill="var(--fill-0, #394508)" />
            <path d={svgPaths.p16aaf100} fill="var(--fill-0, #394508)" />
            <path d={svgPaths.p3fa70800} fill="var(--fill-0, #394508)" />
            <path clipRule="evenodd" d={svgPaths.p28f63950} fill="var(--fill-0, #394508)" fillRule="evenodd" />
          </g>
        </svg>
      </div>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[1.09] relative shrink-0 text-[#394508] text-[16px] whitespace-nowrap">Efficiency Increase Per Transfer</p>
    </div>
  );
}

function Bento1() {
  return (
    <div className="bg-[#d2fd9c] content-stretch flex flex-col h-[221.867px] items-center justify-end max-w-[500px] min-w-[275px] px-[20.267px] py-[30px] relative rounded-[10.667px] shrink-0 w-[330px]" data-name="Bento 02">
      <BentoContent1 />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center justify-center relative shrink-0 w-full" data-name="Row 1">
      <Bento />
      <Bento1 />
    </div>
  );
}

function BentoContent2() {
  return (
    <div className="content-stretch flex flex-col gap-[31px] items-center py-[7px] relative shrink-0 w-full" data-name="Bento content">
      <div className="h-[112px] relative shrink-0 w-[124.31px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 124.31 112">
          <g id="Vector">
            <path d={svgPaths.p90f5280} fill="var(--fill-0, #394508)" />
            <path clipRule="evenodd" d={svgPaths.p137a0180} fill="var(--fill-0, #394508)" fillRule="evenodd" />
            <path d={svgPaths.p1bbb2e00} fill="white" />
            <path d={svgPaths.p39cf6400} fill="white" />
            <path d={svgPaths.p19759680} fill="white" />
            <path d={svgPaths.p1ff90980} fill="white" />
            <path d={svgPaths.p18216300} fill="white" />
            <path d={svgPaths.p15c69c00} fill="var(--fill-0, #394508)" />
            <path d={svgPaths.p86ac300} fill="var(--fill-0, #394508)" />
            <path d={svgPaths.p139cf500} fill="var(--fill-0, #394508)" />
            <path d={svgPaths.p32d97c80} fill="var(--fill-0, #394508)" />
            <path d={svgPaths.p1626cb00} fill="var(--fill-0, #394508)" />
            <path d={svgPaths.p15a21c00} fill="var(--fill-0, #394508)" />
            <path d={svgPaths.p2620d800} fill="var(--fill-0, #394508)" />
            <path d={svgPaths.p64a8200} fill="var(--fill-0, #394508)" />
            <path d={svgPaths.p3ea12200} fill="var(--fill-0, #394508)" />
            <path d={svgPaths.pc782380} fill="var(--fill-0, #394508)" />
            <path d={svgPaths.p6c1d600} fill="var(--fill-0, #394508)" />
          </g>
        </svg>
      </div>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[1.09] relative shrink-0 text-[#394508] text-[16px] whitespace-nowrap">Centralize Your Finances</p>
    </div>
  );
}

function Bento2() {
  return (
    <div className="bg-[#d2fd9c] content-stretch flex flex-col h-[222px] items-start max-w-[500px] min-w-[275px] px-[51px] py-[26px] relative rounded-[10.667px] shrink-0 w-[330px]" data-name="Bento 03">
      <BentoContent2 />
    </div>
  );
}

function BentoContent3() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-center justify-end relative shrink-0 w-full" data-name="Bento content">
      <div className="h-[67.5px] relative shrink-0 w-[199.281px]" data-name="130%">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 199.281 67.5">
          <g id="130%">
            <path d={svgPaths.p35d64580} fill="var(--fill-0, #394508)" />
            <path d={svgPaths.p72a9780} fill="var(--fill-0, #394508)" />
            <path d={svgPaths.p3ad72000} fill="var(--fill-0, #394508)" />
            <path d={svgPaths.p17a97640} fill="var(--fill-0, #394508)" />
          </g>
        </svg>
      </div>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[1.09] relative shrink-0 text-[#394508] text-[16px] whitespace-nowrap">More Activity</p>
    </div>
  );
}

function Bento3() {
  return (
    <div className="bg-[#d2fd9c] content-stretch flex flex-col h-[221.867px] items-center justify-end max-w-[500px] min-w-[275px] px-[20.267px] py-[30px] relative rounded-[10.667px] shrink-0 w-[330px]" data-name="Bento 04">
      <BentoContent3 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center justify-center relative shrink-0" data-name="Row 2">
      <Bento2 />
      <Bento3 />
    </div>
  );
}

function BentoContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center justify-center relative shrink-0 w-full" data-name="Bento container">
      <Row />
      <Row1 />
    </div>
  );
}

function GetMoreDoneSection() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Get more done section">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[30px] items-center justify-center px-[20px] py-[80px] relative w-full">
          <Header1 />
          <BentoContainer />
        </div>
      </div>
    </div>
  );
}

function TheMostReliableApp() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="The Most Reliable App">
      <h2 className="block capitalize font-['Manrope:Regular',sans-serif] font-normal leading-[1.058] relative shrink-0 text-[#394508] text-[42px] text-center tracking-[-0.84px] w-full">The Most Reliable App</h2>
    </div>
  );
}

function BenefitImage() {
  return (
    <div className="aspect-[285/221] relative rounded-[10px] shrink-0 w-full" data-name="Benefit image">
      <img alt="Credit card" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgBenefitImage} />
    </div>
  );
}

function BenefitInformation() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:Medium',sans-serif] font-medium items-start leading-[1.15] relative shrink-0 text-[12px] w-full" data-name="Benefit information">
      <p className="relative shrink-0 text-black w-full">Scale Your Team, Not Your Card Expenses</p>
      <p className="relative shrink-0 text-[#5d5d5d] w-full">Issue virtual and physical cards at no additional cost to support teams of any size.</p>
    </div>
  );
}

function BenefitContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[19px] items-start relative shrink-0 w-full" data-name="Benefit container">
      <BenefitImage />
      <BenefitInformation />
    </div>
  );
}

function BenefitImage1() {
  return (
    <div className="aspect-[285/221] relative rounded-[10px] shrink-0 w-full" data-name="Benefit image">
      <img alt="Form image" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgBenefitImage1} />
    </div>
  );
}

function BenefitInformation1() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:Medium',sans-serif] font-medium items-start leading-[1.15] relative shrink-0 text-[12px] w-full" data-name="Benefit information">
      <p className="relative shrink-0 text-black w-full">Effortless Paper Tracking, Mobile Convenience</p>
      <p className="relative shrink-0 text-[#5d5d5d] w-full">Get precise control—at scale—with the ability to lock any card and restrict any type of spend.</p>
    </div>
  );
}

function BenefitContainer1() {
  return (
    <div className="content-stretch flex flex-col gap-[19px] items-start relative shrink-0 w-full" data-name="Benefit container">
      <BenefitImage1 />
      <BenefitInformation1 />
    </div>
  );
}

function SectionContent() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Section content">
      <BenefitContainer />
      <BenefitContainer1 />
    </div>
  );
}

function ReliableAppSection() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Reliable app section">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[30px] items-center px-[20px] py-[50px] relative w-full">
          <TheMostReliableApp />
          <SectionContent />
        </div>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="h-[400px] relative rounded-[10px] shrink-0 w-full" data-name="Image">
      <img alt="Person interacting with iPhone" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgImage} />
      <div className="flex flex-col items-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function ImageBreaker() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Image breaker">
      <div className="content-stretch flex flex-col items-start px-[20px] py-[60px] relative w-full">
        <Image />
      </div>
    </div>
  );
}

function Headline() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[481px]" data-name="Headline">
      <h2 className="block capitalize font-['Manrope:Regular',sans-serif] font-normal leading-[1.058] relative shrink-0 text-[#394508] text-[42px] text-center tracking-[-0.84px] whitespace-nowrap">First class software</h2>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0 w-[481px]" data-name="Section header">
      <Headline />
      <h2 className="block font-['Manrope:Medium',sans-serif] font-medium leading-[1.15] relative shrink-0 text-[#5d5d5d] text-[12px] text-center w-[351px]">Get real-time insights, seamless transactions, and advanced tools to manage your wealth effortlessly.</h2>
    </div>
  );
}

function IconContainer() {
  return (
    <div className="aspect-[335/250] relative rounded-[10px] shrink-0 w-full" data-name="Icon container">
      <img alt="Wallet icon" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgIconContainer} />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function IconInformationContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-center relative shrink-0 w-[140px]" data-name="Icon information container">
      <IconContainer />
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[1.15] relative shrink-0 text-[12px] text-black text-center w-full">Safe Storage</p>
    </div>
  );
}

function IconContainer1() {
  return (
    <div className="aspect-[335/250] relative rounded-[10px] shrink-0 w-full" data-name="Icon container">
      <img alt="Security icon" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgIconContainer1} />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function IconInformationContainer1() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-center relative shrink-0 w-[140px]" data-name="Icon information container">
      <IconContainer1 />
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[1.15] relative shrink-0 text-[12px] text-black text-center w-full">Secure</p>
    </div>
  );
}

function IconContainer2() {
  return (
    <div className="aspect-[335/250] relative rounded-[10px] shrink-0 w-full" data-name="Icon container">
      <img alt="Money graph icon" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgIconContainer2} />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function IconInformationContainer2() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-center relative shrink-0 w-[140px]" data-name="Icon information container">
      <IconContainer2 />
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[1.15] relative shrink-0 text-[12px] text-black text-center w-full">Earn Interest</p>
    </div>
  );
}

function IconContainer3() {
  return (
    <div className="aspect-[335/250] relative rounded-[10px] shrink-0 w-full" data-name="Icon container">
      <img alt="People icon" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgIconContainer3} />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function IconInformationContainer3() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-center relative shrink-0 w-[140px]" data-name="Icon information container">
      <IconContainer3 />
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[1.15] relative shrink-0 text-[12px] text-black text-center w-full">Family Plans</p>
    </div>
  );
}

function IconSectionContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start pb-[8px] relative shrink-0" data-name="Icon section container">
      <IconInformationContainer />
      <IconInformationContainer1 />
      <IconInformationContainer2 />
      <IconInformationContainer3 />
    </div>
  );
}

function FirstClassSoftwareSection() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="First class software section">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[30px] items-center pb-[80px] pt-[48px] px-[40px] relative w-full">
          <SectionHeader />
          <IconSectionContainer />
        </div>
      </div>
    </div>
  );
}

function CtaCopy() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full" data-name="CTA copy">
      <h3 className="block font-['Manrope:Regular',sans-serif] font-normal leading-[1.09] min-w-full relative shrink-0 text-[#d9d9d9] text-[32px] tracking-[-0.64px] w-[min-content]">Download Etran and manage everything from your phone.</h3>
      <a className="bg-[#d2fd9c] content-stretch cursor-pointer flex items-center justify-center px-[14px] py-[11px] relative rounded-[2.064px] shrink-0" data-name="Button" href="https://figma.com/sites">
        <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[1.058] relative shrink-0 text-[10px] text-black text-left tracking-[-0.2px] whitespace-nowrap">Get started</p>
      </a>
    </div>
  );
}

function CtaContent() {
  return (
    <div className="h-[350px] relative rounded-[10px] shrink-0 w-full" data-name="CTA content">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
        <img alt="Person interacting with iPhone" className="absolute max-w-none object-cover rounded-[10px] size-full" src={imgCtaContent} />
        <div className="absolute bg-[rgba(0,0,0,0.3)] inset-0 mix-blend-color-burn rounded-[10px]" />
      </div>
      <div className="flex flex-col justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-end pb-[34px] pt-[65px] px-[20px] relative size-full">
          <CtaCopy />
        </div>
      </div>
    </div>
  );
}

function CtaSection() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="CTA section">
      <div className="content-stretch flex flex-col items-start pb-[100px] px-[20px] relative w-full">
        <CtaContent />
      </div>
    </div>
  );
}

function Main() {
  return (
    <main className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Main" tabIndex="-1">
      <HeaderContainer />
      <GetMoreDoneSection />
      <ReliableAppSection />
      <ImageBreaker />
      <FirstClassSoftwareSection />
      <CtaSection />
    </main>
  );
}

function Logo1() {
  return (
    <div className="h-[53.993px] relative shrink-0 w-[48.475px]" data-name="Logo">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.4752 53.9931">
        <g id="Logo">
          <path d={svgPaths.p3044d200} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.pdfd09f0} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function LeftSideFooterContainer() {
  return (
    <div aria-label="Etran name and logo" className="content-stretch flex flex-[1_0_0] flex-col gap-[141px] h-[238px] items-start min-h-px min-w-px relative" data-name="Left side footer container">
      <Logo1 />
      <div className="h-[36.085px] relative shrink-0 w-[115.474px]" data-name="Etran">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 115.474 36.0847">
          <g id="Etran">
            <path d={svgPaths.p389c1180} fill="var(--fill-0, black)" />
            <path d={svgPaths.pa5c5a00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1359fa00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2a8fe980} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2e4a0a00} fill="var(--fill-0, black)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ContactLinks1() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 text-black w-full" data-name="Contact links">
      <p className="relative shrink-0 w-full">hello@figma.com</p>
      <a className="block cursor-pointer relative shrink-0 w-full" href="https://figma.com/sites">
        Instagram
      </a>
      <a className="block cursor-pointer relative shrink-0 w-full" href="https://figma.com/sites">
        X
      </a>
      <a className="block cursor-pointer relative shrink-0 w-full" href="https://figma.com/sites">
        LinkedIn
      </a>
    </div>
  );
}

function ContactDetails() {
  return (
    <div className="content-stretch flex flex-col gap-[12.639px] items-start relative shrink-0 w-[167px]" data-name="Contact details">
      <p className="relative shrink-0 text-[#5d5d5d] w-full">Contact</p>
      <ContactLinks1 />
    </div>
  );
}

function TermsAndConditions() {
  return (
    <div className="content-stretch cursor-pointer flex flex-col gap-[2px] items-start relative shrink-0 text-[#5d5d5d] w-full whitespace-nowrap" data-name="Terms and conditions">
      <a className="block relative shrink-0" href="https://figma.com/sites">{`Terms & Conditions`}</a>
      <a className="block relative shrink-0" href="https://figma.com/sites">
        Privacy
      </a>
    </div>
  );
}

function RightSideFooterContainer() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Manrope:Medium',sans-serif] font-medium h-[238px] items-start justify-between leading-[1.15] min-h-px min-w-px relative text-[12px]" data-name="Right side footer container">
      <ContactDetails />
      <TermsAndConditions />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#ededed] relative shrink-0 w-full" data-name="Footer">
      <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[31px] relative w-full">
        <LeftSideFooterContainer />
        <RightSideFooterContainer />
      </div>
    </footer>
  );
}

export default function Mobile() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center relative size-full" data-name="Mobile">
      <SidebarContainer />
      <Main />
      <Footer />
    </div>
  );
}