"use client";
import React, { useEffect, useRef, useState } from "react";

// 네이버 맵 타입 정의
declare global {
  interface Window {
    naver?: {
      maps: {
        Map: any;
        Marker: any;
        LatLng: any;
        InfoWindow: any;
        Event: any;
        Position: {
          TOP_RIGHT: any;
        };
      };
    };
  }
}

type FlyingIconProps = {
  emoji: string;
  className?: string;
  style?: React.CSSProperties;
};

const FlyingIcon: React.FC<FlyingIconProps> = ({ emoji, className, style }) => {
  return (
    <div
      className={className}
      style={{ position: "absolute", fontSize: "2em", ...style }}
    >
      {emoji}
    </div>
  );
};

type FackeProps = {
  mapImageUrl?: string | null;
  locationAddress?: string;
};

export default function Facke({ mapImageUrl, locationAddress }: FackeProps) {
  // 지도 관련 상태와 ref
  const mapRef = useRef<HTMLDivElement>(null);
  const naverMapRef = useRef<any>(null);
  const [isNaverLoaded, setIsNaverLoaded] = useState(false);

  // 네이버 지도 초기화
  useEffect(() => {
    // 네이버 지도 API 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=yg0hqyljjy";
    script.async = true;
    script.onload = () => {
      setIsNaverLoaded(true);
      initializeMap();
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // 지도 초기화 함수
  const initializeMap = () => {
    if (mapRef.current && window.naver) {
      try {
        const location = new window.naver.maps.LatLng(
          37.4918339485327,
          126.82308497085069
        );

        // 지도 옵션 설정
        const mapOptions = {
          center: location,
          zoom: 15,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT,
          },
        };

        // 지도 생성
        naverMapRef.current = new window.naver.maps.Map(
          mapRef.current,
          mapOptions
        );

        // 마커 생성
        const marker = new window.naver.maps.Marker({
          position: location,
          map: naverMapRef.current,
          title: "돈내고 돈먹기",
        });

        // 정보창 생성
        const infoWindow = new window.naver.maps.InfoWindow({
          content: `
            <div style="padding: 10px; width: 200px; text-align: center;">
              <h3 style="margin: 5px 0;">돈내고 돈먹기</h3>
              <p style="margin: 5px 0;">2025년 4월 26일 오후 5시</p>
            </div>
          `,
        });

        // 마커 클릭 시 정보창 표시
        window.naver.maps.Event.addListener(marker, "click", () => {
          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(naverMapRef.current, marker);
          }
        });

        // 초기에 정보창 표시
        infoWindow.open(naverMapRef.current, marker);
      } catch (error) {
        console.error("네이버 지도 초기화 오류:", error);
        setIsNaverLoaded(false);
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "우스꽝 청첩장: 돈내고 돈먹기 모임!",
          text: "당신을 위해 준비된 세상에서 가장 웃긴 초대장! 2025년 4월 26일 오후 5시, 돈내고 돈먹기에서 만나요!",
          url: window.location.href,
        })
        .then(() => {
          console.log("공유 성공!");
        })
        .catch((error) => {
          console.error("공유 실패:", error);
        });
    } else {
      alert(
        "이 브라우저는 공유 기능을 지원하지 않아요. 주소를 복사해서 친구에게 전달하세요!"
      );
    }
  };

  // 길찾기 기능을 위한 좌표 (돈내고 돈먹기 좌표)
  const destinationCoords = {
    lat: 37.4918339485327,
    lng: 126.82308497085069,
  };

  // 카카오맵 앱 열기
  const openKakaoMap = () => {
    // 모바일 카카오맵 앱
    const kakaoMapUrl = `kakaomap://route?ep=${destinationCoords.lat},${destinationCoords.lng}&by=CAR`;

    // 모바일 앱이 없을 경우 웹으로 대체
    const kakaoMapWebUrl = `https://map.kakao.com/link/to/돈내고 돈먹기,${destinationCoords.lat},${destinationCoords.lng}`;

    // 앱 딥링크 시도 후 실패하면 웹으로
    setTimeout(() => {
      window.location.href = kakaoMapWebUrl;
    }, 1500);

    window.location.href = kakaoMapUrl;
  };

  // 네이버 지도 앱 열기
  const openNaverMap = () => {
    // 모바일 네이버맵 앱
    const naverMapUrl = `nmap://route/car?dlat=${destinationCoords.lat}&dlng=${destinationCoords.lng}&dname=돈내고돈먹기&appname=portfolio2025`;

    // 모바일 앱이 없을 경우 웹으로 대체
    const naverMapWebUrl = `https://map.naver.com/v5/directions/-/-/car/-/no/-/${destinationCoords.lng},${destinationCoords.lat},돈내고돈먹기,/`;

    // 앱 딥링크 시도 후 실패하면 웹으로
    setTimeout(() => {
      window.location.href = naverMapWebUrl;
    }, 1500);

    window.location.href = naverMapUrl;
  };

  // 구글 지도 앱 열기
  const openGoogleMap = () => {
    const googleMapUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationCoords.lat},${destinationCoords.lng}&travelmode=driving`;
    window.location.href = googleMapUrl;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          fontFamily: "'Comic Sans MS', 'Jua', sans-serif",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #ff9999, #ffcc99, #ffff99, #99ffcc, #99ccff)",
          backgroundSize: "400% 400%",
          animation: "gradientBG 15s ease infinite",
        }}
      >
        <h1
          style={{
            fontSize: "2.5em",
            textAlign: "center",
            marginBottom: "10px",
            color: "#ff0066",
            textShadow: "3px 3px 0 #ffd700, -3px -3px 0 #00ffcc",
            transform: "rotate(-2deg)",
          }}
        >
          🎉 아무말 초대장: 돈내고 돈먹기 모임! 🎉
        </h1>
        <p
          style={{
            fontSize: "1.2em",
            textAlign: "center",
            marginBottom: "20px",
            lineHeight: 1.8,
            color: "#5500aa",
            backgroundColor: "rgba(255,255,255,0.6)",
            padding: "15px",
            borderRadius: "10px",
            border: "3px dashed #ff6600",
            transform: "rotate(1deg)",
          }}
        >
          여러분, 상상도 못할{" "}
          <span
            style={{ fontSize: "1.3em", color: "#ff0000", fontWeight: "bold" }}
          >
            미친 초대장
          </span>
          이 도착했습니다!
          <br />
          <br />
          <strong style={{ fontSize: "1.5em", color: "#cc0066" }}>
            2025년 4월 26일 오후 5시
          </strong>
          에{" "}
          <strong
            style={{
              fontSize: "1.5em",
              color: "#009900",
              textDecoration: "underline wavy #ff00ff",
            }}
          >
            돈내고 돈먹기
          </strong>
          에서
          <br />
          직장인들의 애환이 뒤섞인 전설의 파티가 열립니다.
          <br />
          <br />이 초대장은{" "}
          <span
            style={{ fontSize: "1.4em", color: "#ff3300", fontStyle: "italic" }}
          >
            평범함은 NO!
          </span>
          <br />
          심심해서 만들어봤어요
        </p>

        {/* 네이버 다이나믹 맵 */}
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "350px",
            marginBottom: "20px",
            borderRadius: "10px",
            overflow: "hidden",
            transform: "rotate(-1deg)",
            border: "5px solid #ff9900",
            boxShadow: "8px 8px 0 rgba(0,0,0,0.2)",
            position: "relative",
          }}
        >
          <div
            ref={mapRef}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {/* 지도가 로드되지 않은 경우 폴백 이미지 표시 */}
            {!isNaverLoaded && mapImageUrl && (
              <img
                src={mapImageUrl}
                alt="돈내고 돈먹기 위치"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        </div>

        {locationAddress && (
          <p
            style={{
              fontSize: "1.1em",
              marginBottom: "15px",
              color: "#330066",
              textAlign: "center",
              padding: "10px 15px",
              backgroundColor: "rgba(255,255,255,0.7)",
              borderRadius: "8px",
              border: "2px dashed #6600cc",
              fontWeight: "bold",
              maxWidth: "90%",
            }}
          >
            📍 {locationAddress || "돈내고 돈먹기"}
          </p>
        )}

        {/* 지도 앱 연결 버튼 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "25px",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <button
            onClick={openKakaoMap}
            style={{
              padding: "12px 20px",
              fontSize: "1em",
              fontWeight: "bold",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#FEE500",
              color: "#000",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
            }}
          >
            <span style={{ fontSize: "1.2em" }}>🚕</span> 카카오맵으로 길찾기
          </button>

          <button
            onClick={openNaverMap}
            style={{
              padding: "12px 20px",
              fontSize: "1em",
              fontWeight: "bold",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#03C75A",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
            }}
          >
            <span style={{ fontSize: "1.2em" }}>🧭</span> 네이버 지도로 길찾기
          </button>
        </div>

        {!mapImageUrl && !isNaverLoaded && (
          <p
            style={{
              fontSize: "0.9em",
              marginBottom: "20px",
              color: "#555",
              textAlign: "center",
              padding: "10px",
              backgroundColor: "rgba(255,255,255,0.5)",
              borderRadius: "5px",
            }}
          >
            * 지도를 로드할 수 없습니다. 네트워크 연결을 확인하세요. *
          </p>
        )}
        <button
          onClick={handleShare}
          style={{
            padding: "15px 30px",
            fontSize: "1.2em",
            fontWeight: "bold",
            borderRadius: "50px",
            border: "none",
            background: "linear-gradient(45deg, #ff3300, #ff9900)",
            color: "#fff",
            cursor: "pointer",
            zIndex: 1,
            boxShadow: "0 5px 15px rgba(255, 153, 0, 0.4)",
            transform: "rotate(2deg)",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "rotate(-2deg) scale(1.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "rotate(2deg) scale(1)";
          }}
        >
          🎁 친구들한테 알리기 🎁
        </button>

        {/* 더 많은 아이콘들 추가 */}
        <FlyingIcon
          emoji="🐷"
          className="fly-icon fly-pig"
          style={{ top: "10%", left: "-50px", animationDelay: "0s" }}
        />
        <FlyingIcon
          emoji="🐷"
          className="fly-icon fly-pig"
          style={{ top: "40%", left: "-70px", animationDelay: "2s" }}
        />
        <FlyingIcon
          emoji="🐙"
          className="fly-icon fly-octopus"
          style={{ top: "20%", right: "-50px", animationDelay: "1s" }}
        />
        <FlyingIcon
          emoji="🐙"
          className="fly-icon fly-octopus"
          style={{ top: "60%", right: "-70px", animationDelay: "3s" }}
        />
        <FlyingIcon
          emoji="💰"
          className="fly-icon fly-money"
          style={{ top: "15%", left: "10%", animationDelay: "0.5s" }}
        />
        <FlyingIcon
          emoji="🍗"
          className="fly-icon fly-food"
          style={{ top: "35%", right: "15%", animationDelay: "1.5s" }}
        />
        <FlyingIcon
          emoji="🎊"
          className="fly-icon fly-party"
          style={{ top: "70%", left: "20%", animationDelay: "2.5s" }}
        />
        <FlyingIcon
          emoji="🤪"
          className="fly-icon fly-crazy"
          style={{ top: "85%", right: "25%", animationDelay: "3.5s" }}
        />
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Jua&display=swap");

        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .fly-icon {
          transition: transform 0.3s ease;
          z-index: 100;
        }
        .fly-icon:hover {
          transform: scale(1.5) rotate(20deg) !important;
        }
        .fly-pig {
          animation: flyPig 8s linear infinite;
        }
        .fly-octopus {
          animation: flyOctopus 10s linear infinite;
        }
        .fly-money {
          animation: flyMoney 7s linear infinite;
        }
        .fly-food {
          animation: flyFood 9s linear infinite;
        }
        .fly-party {
          animation: flyParty 6s linear infinite;
        }
        .fly-crazy {
          animation: flyCrazy 11s linear infinite;
        }

        @keyframes flyPig {
          0% {
            transform: translateX(-100px) translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateX(calc(100vw + 100px)) translateY(30px)
              rotate(360deg);
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 100px)) translateY(30px)
              rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes flyOctopus {
          0% {
            transform: translateX(calc(100vw + 100px)) translateY(0)
              rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateX(-100px) translateY(-40px) rotate(-360deg);
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(-100px) translateY(-40px) rotate(-720deg);
            opacity: 0;
          }
        }

        @keyframes flyMoney {
          0% {
            transform: translateY(-100px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(calc(100vh + 100px)) translateX(50px)
              rotate(360deg);
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 100px)) translateX(50px)
              rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes flyFood {
          0% {
            transform: translateY(calc(100vh + 100px)) translateX(0)
              rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(-100px) translateX(-70px) rotate(-360deg);
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(-70px) rotate(-720deg);
            opacity: 0;
          }
        }

        @keyframes flyParty {
          0% {
            transform: translate(-100px, -100px) scale(0.5) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(calc(100vw + 100px), calc(100vh + 100px))
              scale(1.5) rotate(360deg);
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(100vw + 100px), calc(100vh + 100px))
              scale(1.5) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes flyCrazy {
          0% {
            transform: translate(calc(100vw + 100px), calc(100vh + 100px))
              scale(0.5) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(-100px, -100px) scale(1.5) rotate(-360deg);
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-100px, -100px) scale(1.5) rotate(-720deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
