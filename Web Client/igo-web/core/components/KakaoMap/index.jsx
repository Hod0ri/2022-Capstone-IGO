import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import locationData from "../../etc/location/station.json";

const MapContainer = styled.div`
  aspect-ratio: 320 / 220;
`;

const KakaoMap = ({ location = "신도림" }) => {
  const { lat: latitude, lng: longitude } = locationData.filter(
    (v) => v["name"] === location
  )[0];
  console.log(latitude, longitude);

  const [loadKakao, setLoadKakao] = useState(false);

  useEffect(() => {
    const target = [37.4035503, 126.930539];
    const loadKakaoMapScript = () => {
      const $script = document.createElement("script");

      $script.async = true;
      $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_REST_API_KEY}&autoload=false`;

      const onLoadKakaoMap = () => {
        window.kakao.maps.load(async () => {
          const mapContainer = document.getElementById("map");
          const mapOption = {
            center: new window.kakao.maps.LatLng(target[0], target[1]), // 지도의 중심좌표
            level: 5, // 지도의 확대 레벨
          };

          //지도 생성
          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          await axios.get("//apis-navi.kakaomobility.com/v1/directions", {
            headers: {
              Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_FIND_REST_API_KEY}`,
            },
            params: {},
          });
          //선 좌표 입력
          var linePath = [
            new kakao.maps.LatLng(33.452344169439975, 126.56878163224233),
            new kakao.maps.LatLng(33.452739313807456, 126.5709308145358),
            new kakao.maps.LatLng(33.45178067090639, 126.5726886938753),
          ];
          var polyline = new kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: "#fff", // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid", // 선의 스타일입니다
          });

          // 지도에 선을 표시합니다
          polyline.setMap(map);
        });
      };

      $script.addEventListener("load", onLoadKakaoMap);
      document.head.appendChild($script);
    };

    !loadKakao && loadKakaoMapScript();
  }, [loadKakao]);
  return (
    <>
      <MapContainer id="map" />
    </>
  );
};

export default KakaoMap;
