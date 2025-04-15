import React from "react";

export const metadata = {
  title: "아무말 초대장: 돈내고 돈먹기 모임!",
  description: "아무말 초대장: 돈내고 돈먹기 모임!",
};

// 서버 컴포넌트에서 이미지 URL과 함께 인증 헤더를 처리하는 함수
async function getNaverMapImageUrl() {
  const baseUrl = "https://maps.apigw.ntruss.com/map-static/v2/raster";

  // 쿼리 파라미터 설정
  const params = new URLSearchParams({
    center: "126.82308497085069,37.4918339485327", // 좌표(경도,위도)
    level: "16", // 지도 확대 레벨
    w: "600", // 지도 이미지 가로 크기
    h: "300", // 지도 이미지 세로 크기
    markers: "type:d|size:mid|pos:127.1054328 37.3595963|label:돈내고 돈먹기", // 마커
  });

  const url = `${baseUrl}?${params.toString()}`;

  try {
    // 서버 측에서 요청하면서 인증 헤더 추가
    const response = await fetch(url, {
      headers: {
        "x-ncp-apigw-api-key-id": "yg0hqyljjy",
        "x-ncp-apigw-api-key": "pQAFYvxD7LlPQWWhdYBD2lGnmqxsnfUaozgF9aFK",
      },
      next: { revalidate: 3600 }, // 1시간마다 재검증
    });

    if (!response.ok) {
      console.error("네이버 지도 API 요청 실패:", response.status);
      return null;
    }

    // 바이너리 데이터를 base64로 변환
    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    return `data:image/jpeg;base64,${base64Image}`;
  } catch (error) {
    console.error("네이버 지도 API 오류:", error);
    return null;
  }
}

import Facke from "@/components/Facke";

export default async function Page() {
  // 서버 컴포넌트에서 네이버 지도 이미지 가져오기
  const mapImageUrl = await getNaverMapImageUrl();

  // Facke 컴포넌트에 props로 mapImageUrl 전달
  return <Facke mapImageUrl={mapImageUrl} />;
}
