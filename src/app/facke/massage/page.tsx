"use client";

import React, { useState } from "react";
import Script from "next/script";

// 카카오 API 공유 옵션 인터페이스 정의
interface KakaoShareDefaultOptions {
  objectType: string;
  container?: {
    web_url?: string;
    mobile_web_url?: string;
    app_url?: string;
  };
  content: {
    title: string;
    description?: string;
    image_url?: string;
    link: {
      web_url?: string;
      mobile_web_url?: string;
      android_execution_params?: string;
      ios_execution_params?: string;
    };
  };
  social?: {
    like_count?: number;
    comment_count?: number;
    shared_count?: number;
    view_count?: number;
    subscriber_count?: number;
  };
  buttons?: Array<{
    title: string;
    link: {
      web_url?: string;
      mobile_web_url?: string;
      android_execution_params?: string;
      ios_execution_params?: string;
    };
  }>;
}

// 메타데이터는 클라이언트 컴포넌트에서 export할 수 없음
// Next.js App Router에서는 별도의 metadata.ts 파일이나 layout.tsx에서 처리

// 카카오 API 키
const KAKAO_JS_KEY = "bf2709c41f2f2de15ee6beaa268972e3";

export default function KakaoSharePage() {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // SDK 로드 완료 핸들러
  const handleKakaoSDKLoad = () => {
    try {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        // 카카오 JavaScript 키 초기화
        window.Kakao.init(KAKAO_JS_KEY);
        console.log("카카오 SDK 초기화 성공");
      }
      setSdkLoaded(true);
    } catch (err) {
      console.error("카카오 SDK 초기화 실패:", err);
      setError("카카오 SDK 초기화에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 카카오톡 공유 메시지 보내기
  const sendFoolMessage = () => {
    try {
      if (!window.Kakao) {
        setError(
          "카카오 SDK가 로드되지 않았습니다. 페이지를 새로고침 해보세요."
        );
        return;
      }

      if (!window.Kakao.Link) {
        setError(
          "카카오 공유(Link) API를 사용할 수 없습니다. 카카오 개발자 센터에서 플랫폼 등록을 확인해주세요."
        );
        return;
      }

      // 카카오톡 공유하기
      window.Kakao.Link.sendCustom({
        templateId: 119761, // 설정된 템플릿 ID
      });

      console.log("카카오톡 공유 요청 전송됨");
    } catch (err) {
      console.error("카카오톡 공유 실패:", err);
      setError(
        "메시지 공유에 실패했습니다. 템플릿 ID를 확인하거나 카카오 개발자 센터에서 설정을 확인해주세요."
      );
    }
  };

  // 디버깅 정보 확인
  const checkKakaoStatus = () => {
    try {
      if (!window.Kakao) {
        setError("SDK가 로드되지 않음");
        return;
      }

      const status = {
        initialized: window.Kakao.isInitialized(),
        hasLink: Boolean(window.Kakao.Link),
        apiKey: KAKAO_JS_KEY,
      };

      console.log("카카오 상태:", status);
      alert("콘솔에서 카카오 상태를 확인해보세요!");
    } catch (err) {
      console.error("상태 확인 실패:", err);
    }
  };

  return (
    <>
      {/* 카카오 SDK 스크립트 로드 */}
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="afterInteractive"
        onLoad={handleKakaoSDKLoad}
        onError={() =>
          setError(
            "카카오 SDK 로드에 실패했습니다. 네트워크 연결을 확인해주세요."
          )
        }
      />

      <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-6">📢 선착순 선물 쏜다!</h1>

          <button
            onClick={sendFoolMessage}
            className="px-6 py-3 text-lg bg-[#fee500] hover:bg-[#e6cf00] transition-colors rounded-lg font-medium mb-4 w-full"
            disabled={!sdkLoaded}
          >
            카카오톡으로 공유하기
          </button>

          {/* 디버깅 버튼 */}
          <button
            onClick={checkKakaoStatus}
            className="px-6 py-2 text-sm bg-gray-200 hover:bg-gray-300 transition-colors rounded-lg mb-4 w-full"
          >
            카카오 상태 확인하기
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <p className="mt-4 text-gray-500 text-sm">
            친구들에게 재미있는 메시지를 공유해보세요!
          </p>

          <div className="mt-6 text-xs text-gray-400">
            <p>문제가 지속되면:</p>
            <ol className="list-decimal text-left pl-5 mt-2">
              <li>카카오 개발자 센터에서 앱 설정 확인 (도메인, 플랫폼)</li>
              <li>메시지 템플릿 ID가 올바른지 확인</li>
              <li>HTTPS에서만 작동하는지 확인</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

// TypeScript에서 Kakao SDK 타입 선언
declare global {
  interface Window {
    Kakao: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Link: {
        sendCustom: (options: { templateId: number }) => void;
        sendDefault: (options: KakaoShareDefaultOptions) => void;
      };
    };
  }
}
