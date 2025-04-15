import React from "react";

export const metadata = {
  title: "카카오 장난 메시지 공유",
  description: "선착순 선물 쏜다! 카카오톡 공유 이벤트",
};

export default function KakaoShareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
