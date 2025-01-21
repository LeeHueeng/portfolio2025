import React from "react";
import "./globals.css"; // 글로벌 스타일 불러오기
import { WaveAnimation } from "../components/WaveAnimation";
export const metadata = {
  title: "이현우 포트폴리오",
  description: "이현우의 포트폴리오 사이트입니다.",
  openGraph: {
    title: "이현우 포트폴리오",
    description: "이현우의 포트폴리오 사이트입니다.",
    images: ["/path/to/preview-image.jpg"],
  },
};
export default function Page() {
  return (
    <main className="min-h-screen w-full flex flex-col">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800">
            이현우 포트폴리오
          </h1>
          {/* 모바일에서는 네비게이션 숨김 */}
          <nav className="hidden md:block">
            <ul className="flex gap-5">
              <li>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-blue-500 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#activity"
                  className="text-gray-700 hover:text-blue-500 transition-colors"
                >
                  Activity
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-gray-700 hover:text-blue-500 transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-gray-700 hover:text-blue-500 transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-blue-500 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <section
        id="hero"
        className="relative flex items-center justify-center text-center bg-gradient-to-r from-blue-50 to-indigo-100 py-16 px-4 overflow-hidden"
      >
        <div className="max-w-3xl mx-auto z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 text-gray-900">
            안녕하세요, <br className="hidden sm:block" />
            <span className="text-blue-600">Software Engineer</span>{" "}
            이현우입니다.
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            문제 해결을 즐기며, 기술 학습을 통해 성장하는 개발자를 꿈꿉니다.
            <br />
            Next.js와 TypeScript를 중심으로 프론트엔드에 집중하고 있습니다.
          </p>
          <a
            href="#contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition-colors"
          >
            Get in Touch
          </a>
        </div>
        {/* 파도 애니메이션은 뒤에 존재하되, z-index 조정으로 콘텐츠 뒤에 위치 */}
        <WaveAnimation />
      </section>
      <section
        id="about"
        className="container mx-auto px-4 py-16 flex flex-col gap-8"
      >
        <h3 className="text-2xl font-bold mb-4 text-gray-800">About Me</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-700">
              <strong className="text-gray-800">이현우</strong> <br />
              1999.04.14.
            </p>
            <p className="text-gray-700">Software Engineer</p>
            <p className="text-gray-700">
              소프트웨어공학 학사 / 디지털 콘텐츠 공학 학사
            </p>
            <ul className="text-gray-700 list-disc list-inside">
              <li>여행과 글쓰기가 취미</li>
              <li>중학 시절부터 시작된 코딩 여정</li>
              <li>책임감 있고 재치발랄한 성격</li>
            </ul>
          </div>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              <strong className="text-gray-800">
                사람 이현우를 소개합니다.
              </strong>
              <br />
              중학 시절부터 스크래치로 코딩을 접하며 개발의 길을 걸었습니다.
              재치 발랄함과 함께 강한 책임감을 가지고 있으며, 여행과 글쓰기를
              즐깁니다.
            </p>
            <p>
              <strong className="text-gray-800">
                개발자 이현우를 소개합니다.
              </strong>
              <br />
              Next.js와 TypeScript를 중심으로 웹 개발 기술에 열정을 쏟고 있으며,
              브라우저의 구조와 렌더링에 대한 깊은 이해를 통해 문제 해결 능력을
              갖추고 있습니다.
            </p>
            <p>
              문제 해결 과정을 즐기며 꾸준한 학습을 통해 성장하는 개발자가 되기
              위해 끊임없이 도전하고 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section
        id="activity"
        className="bg-white py-16 px-4 border-t border-gray-200"
      >
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-gray-800">Activities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                비트스텝 (프론트앤드) [재직]
              </h4>
              <p className="text-sm text-gray-600">
                2024년 10월 ~ 재직중 <br />
                기획 및 Front 유지보수 및 개발 <br />
                React, Next.js, Figma, Flutter
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                성공회대학교 Codingbottle 소모임 [활동]
              </h4>
              <p className="text-sm text-gray-600">
                2023년 09월 ~ 2024년 2월 <br />
                Next.js, styled-components, TypeScript 등 <br />
                디자인 및 프론트엔드 팀 협업 프로젝트 진행
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                성공회대학교 IT 개발 동아리 S.owl [활동]
              </h4>
              <p className="text-sm text-gray-600">
                2023년 03월 ~ 2023년 09월 <br />
                React.js, TypeScript, Emotion 등 프론트엔드 기술 강의
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                성공회대학교 알고리즘 스터디 [활동]
              </h4>
              <p className="text-sm text-gray-600">
                2022년 06월 ~ 2022년 12월 <br />
                Python을 활용한 알고리즘 문제 풀이
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="container mx-auto px-4 py-16 border-t border-gray-200"
      >
        <h3 className="text-2xl font-bold mb-8 text-gray-800">Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-gray-800">Based</h4>
            <p className="text-gray-700">Next.js, React.js</p>
            <h4 className="text-xl font-semibold text-gray-800">언어</h4>
            <p className="text-gray-700">TypeScript, JavaScript</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-gray-800">API & State</h4>
            <p className="text-gray-700">
              API Request, redux, react-query, axios
            </p>
            <h4 className="text-xl font-semibold text-gray-800">스타일</h4>
            <p className="text-gray-700">styled-components, emotion</p>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="bg-white py-16 px-4 border-t border-gray-200"
      >
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-gray-800">Projects</h3>

          <ProjectCard
            title="DomiDomi"
            period="2023년 06월 ~ 2023년 11월"
            description="기숙사 근로 중 기존 시스템의 비효율을 줄이기 위해 제작한 웹 서비스"
            team="FE 2명, BE 2명"
            tech="Next.js, TypeScript, emotion, axios, Vercel, EC2 등"
            url="https://domidomis.duckdns.org/user/home"
            gitFE="https://github.com/DominestSKHU/Frontend"
            gitBE="https://github.com/DominestSKHU/Backend"
            notion="https://www.notion.so/Dominest-0c231effb7"
          />
          <ProjectCard
            title="포잇 캘린더"
            period="2023년 09월 ~ 2024년 2월"
            description="구글 일정관리를 위한 웹서비스"
            team="FE 3명, BE 4명, Design 2명"
            tech="Next.js, TypeScript, styled-components, axios, Vercel 등"
            url="https://www.jmgdh.duckdns.org/test"
            gitFE="https://github.com/codingBottle/JMGDH_Web"
            notion="https://wise-twilight-aaf.notion.site/ecc375a"
          />
          <ProjectCard
            title="알(뜰마)법사"
            period="2024년 03월 ~ 2024년 7월"
            description="자취 생활 중 고물가 시대에 절약을 위해 만든 웹 서비스"
            team="FE 1명, BE 1명, Design 1명"
            tech="Next.js, TypeScript, styled-components, axios, Vercel 등"
            url="https://albeobsa-front.vercel.app/"
            gitFE="https://github.com/jijijig/albeobsa-Front"
            notion="https://www.notion.so/6954e27ab79e428eb72bcf5610fc0212"
          />
        </div>
      </section>

      <section
        id="contact"
        className="container mx-auto px-4 py-16 border-t border-gray-200"
      >
        <h3 className="text-2xl font-bold mb-8 text-gray-800">Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-4 text-gray-700">
            <p>
              <strong className="text-gray-800">Phone:</strong> 010-8408-4111
            </p>
            <p>
              <strong className="text-gray-800">Email:</strong>{" "}
              <a
                href="mailto:zzxx373014@gmail.com"
                className="underline hover:text-blue-500"
              >
                zzxx373014@gmail.com
              </a>
            </p>
            <p>
              <strong className="text-gray-800">Github:</strong>{" "}
              <a
                href="https://github.com/LeeHueeng"
                className="underline hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                @LeeHueeng
              </a>
            </p>
            <p>
              <strong className="text-gray-800">Blog:</strong>{" "}
              <a
                href="https://hueeng.tistory.com/"
                className="underline hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                hueeng.tistory.com
              </a>
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-md shadow">
            <p className="mb-4 text-gray-600">
              프로젝트나 협업 제안 등 편하게 연락주세요.
            </p>
            <a
              href="mailto:zzxx373014@gmail.com"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              이메일 보내기
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Lee Hyunwoo. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">next.js & tailwindcss</p>
        </div>
      </footer>
    </main>
  );
}

type ProjectCardProps = {
  title: string;
  period: string;
  description: string;
  team: string;
  tech: string;
  url?: string;
  gitFE?: string;
  gitBE?: string;
  notion?: string;
};

function ProjectCard({
  title,
  period,
  description,
  team,
  tech,
  url,
  gitFE,
  gitBE,
  notion,
}: ProjectCardProps) {
  return (
    <div className="mb-10 bg-gray-50 rounded-lg shadow p-6">
      <h4 className="text-xl font-semibold text-gray-800 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{period}</p>
      <p className="mt-2 text-gray-700">{description}</p>
      <ul className="mt-2 text-gray-700 text-sm list-disc list-inside space-y-1">
        <li>
          <strong>Team:</strong> {team}
        </li>
        <li>
          <strong>Tech:</strong> {tech}
        </li>
      </ul>
      <div className="flex flex-wrap gap-4 mt-4">
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 text-sm"
          >
            배포 링크
          </a>
        )}
        {gitFE && (
          <a
            href={gitFE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 text-sm"
          >
            Git FE
          </a>
        )}
        {gitBE && (
          <a
            href={gitBE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 text-sm"
          >
            Git BE
          </a>
        )}
        {notion && (
          <a
            href={notion}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 text-sm"
          >
            Notion
          </a>
        )}
      </div>
    </div>
  );
}
